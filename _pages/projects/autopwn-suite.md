---
title: AutoPWN Suite
layout: splash
permalink: /projects/autopwn-suite/
use_mermaid: true
classes: wide
header:
  title: AutoPWN Suite
  overlay_color: "#242730ff"
  overlay_image: /assets/images/autopwn-suite.jpg
  overlay_filter: 0.3
  actions:
    - label: "<i class='fas fa-code'></i> View On GitHub"
      url: "https://github.com/GamehunterKaan/AutoPWN-Suite/"
excerpt: >
  Automated vulnerability scanning & exploitation framework
---

# Introduction

Security testers, red teams, and bug bounty hunters spend a lot of time chaining reconnaissance, service/version detection, vulnerability lookup and exploit retrieval. **AutoPWN Suite** automates that pipeline -- from discovery to exploit suggestion -- reducing manual overhead and letting you focus on investigation and exploitation logic rather than plumbing.

Built in Python and intended to run cross-platform (Linux/macOS/Windows), AutoPWN Suite is modular, scriptable, and designed so you can either run it as a CLI, use the built-in web dashboard, or import the core scanner as an API inside other tooling.

---

# Features

## CLI
* Fully automatic mode (`-y`) for minimal interaction.
* Automatic network range detection and host discovery (ARP or Ping).
* Version-based vulnerability detection via NIST NVD CVE lookup.
* Web app helpers: directory enumeration and basic XSS/LFI/SQLi probes.
* Exploit retrieval from Exploit-DB: downloads PoCs for matched CVEs.
* Multiple modes: `normal`, `evade`, `noise` to tune aggressiveness/stealth.
* Configurable scan techniques: TCP SYN, TCP Connect, UDP, Window, ACK, FIN, Xmas, Null, Maimon, SCTP.
* Programmatic API (`AutoScanner`) for integration and automation.
* Multiple output formats: HTML, SVG, TXT.
* Email and webhook reporting on scan completion.
* Daemon mode for periodic background scanning.

## Web UI

![Web UI Dashboard](/assets/images/autopwn-suite-dashboard.png)

* **Multiple concurrent scans** -- launch and monitor several scans simultaneously from the browser.
* **Live terminal output** -- real-time nmap commands and results streamed via Server-Sent Events (SSE).
* **Scan profiles** -- save and reuse scan configurations (technique, speed, timeout, ports, evasion, custom flags).
* **Scheduled scans** -- set up recurring scans on interval, daily, or weekly schedules with automatic profile loading.
* **Email notifications** -- HTML scan reports with inline result summaries sent on completion.
* **Webhook notifications** -- POST scan results to any webhook endpoint.
* **PDF and JSON export** -- download scan results directly from the dashboard.
* **Persistent settings** -- all settings, profiles, and schedules saved to disk as JSON.
* **Configurable via environment variables** -- `AUTOPWN_WEB_HOST`, `AUTOPWN_WEB_PORT`, `AUTOPWN_DATA_DIR`.
* **Docker ready** -- single-command deployment via Docker Compose.

---

# Demo

AutoPWN Suite has a very user friendly easy to read output.

[![asciicast](https://asciinema.org/a/509345.svg)](https://asciinema.org/a/509345)

---

# How It Works

## High-level runtime flow

1. CLI (`autopwn.py`) or Web UI launches a scan.
2. Host discovery via nmap ARP or Ping scan (`DiscoverHosts`).
3. Port scanning via `PortScan` using python-nmap.
4. Results analyzed via `AnalyseScanResults` into port arrays.
5. Service/version strings converted to search keywords via `GenerateKeyword` (`searchvuln.py`).
6. Keywords queried against NIST NVD 2.0 API via `searchCVE` (`nist_search.py`).
7. Exploit references fetched from Exploit-DB via `GetExploitInfo` (`getexploits.py`).
8. Web-specific checks run for HTTP services (`webvuln.py`).
9. Results compiled and exported (HTML/SVG/TXT), or posted via webhook/email.

---

## Sequence diagram (CLI mode)

<div class="mermaid">
sequenceDiagram
    participant User as User / CLI
    participant Main as autopwn.py
    participant Scanner as scanner.py
    participant Nmap as nmap (python-nmap)
    participant Vuln as searchvuln.py
    participant NIST as nist_search.py
    participant Exploit as getexploits.py
    participant Web as webvuln.py
    participant Report as report.py

    User->>Main: autopwn-suite -t target -y
    Main->>Scanner: DiscoverHosts(target, scantype, mode)
    Scanner->>Nmap: ARP or Ping scan (-sn)
    Nmap-->>Scanner: Return online hosts
    Scanner-->>Main: List of host IPs

    loop For each host
        Main->>Scanner: PortScan(host, speed, timeout, mode, flags)
        Scanner->>Nmap: TCP SYN scan (-sS -sV -O ...)
        Nmap-->>Scanner: Return PortScanner object
        Main->>Scanner: AnalyseScanResults(nm, host)
        Scanner-->>Main: PortArray [[ip, port, service, product, version], ...]

        Main->>Vuln: SearchSploits(PortArray, apiKey)
        Vuln->>Vuln: GenerateKeyword(product, version)
        Vuln->>NIST: searchCVE(keyword, apiKey)
        NIST-->>Vuln: List of Vulnerability objects
        Vuln-->>Main: List of VulnerableSoftware objects

        Main->>Exploit: GetExploitsFromArray(VulnsArray)
        Exploit-->>Main: Exploits saved to exploits/ directory

        Main->>Web: webvuln(host) - LFI, SQLi, XSS, dirbust
    end

    Main->>Report: InitializeReport(method, reportObj)
    Report-->>Main: Email sent or webhook posted
    Main-->>User: Display summary and save output
</div>

---

## Sequence diagram (Web UI mode)

<div class="mermaid">
sequenceDiagram
    participant Browser
    participant Flask as web_ui.py (Flask)
    participant Scheduler as Scheduler Thread
    participant ScanThread as Scan Thread
    participant Scanner as scanner.py
    participant NIST as nist_search.py

    Browser->>Flask: POST /api/scan/start {target, config}
    Flask->>Flask: Validate target and nmap flags
    Flask->>ScanThread: _launch_scan(config)
    Flask-->>Browser: {scan_id}

    Browser->>Flask: GET /api/events (SSE)

    loop Scan execution
        ScanThread->>Scanner: DiscoverHosts(target)
        ScanThread->>Scanner: PortScan(host, speed, timeout, mode, flags)
        ScanThread->>Scanner: AnalyseScanResults(nm, host)
        ScanThread->>NIST: searchCVE(keyword)
        ScanThread->>Flask: _broadcast(log event)
        Flask-->>Browser: SSE: data: {log event}
    end

    ScanThread->>Flask: _notify(job) - email/webhook

    Note over Scheduler: Runs every 60 seconds
    Scheduler->>Scheduler: _should_fire(schedule)
    Scheduler->>ScanThread: _launch_scan(profile config)
</div>

---

## Flow diagram (data pipeline)

<div class="mermaid">
flowchart TD
    A["CLI args or Web UI POST"] --> B["autopwn.py / web_ui.py"]
    B --> C["DiscoverHosts - ARP or Ping scan"]
    C --> D["PortScan - TCP SYN + version detection"]
    D --> E["AnalyseScanResults - Extract open ports"]
    E --> F["GenerateKeyword - Build search terms"]
    F --> G["searchCVE - Query NIST NVD 2.0 API"]
    G --> H["GetExploitInfo - Query Exploit-DB"]
    H --> I["webvuln - LFI, SQLi, XSS, Dirbust"]
    I --> J["Report - Email / Webhook / File Export"]

    style A fill:#0a0,stroke:#08f,stroke-width:2px,color:#fff
    style J fill:#0a0,stroke:#08f,stroke-width:2px,color:#fff
</div>

---

# Code Architecture

## Main components & responsibilities

| File | Responsibility |
|------|---------------|
| `autopwn.py` | CLI orchestrator. Parses args, runs scan pipeline or starts web server. |
| `api.py` | `AutoScanner` class. Programmatic scan API for use as a Python module. |
| `modules/scanner.py` | Nmap wrapper. Host discovery, port scanning, result parsing. |
| `modules/searchvuln.py` | Converts service/version strings into keywords and searches for CVEs. |
| `modules/nist_search.py` | Queries NIST NVD 2.0 API, returns `Vulnerability` dataclass objects. |
| `modules/getexploits.py` | Queries Exploit-DB, downloads PoC exploits for matched CVEs. |
| `modules/report.py` | Email (`SendEmail`) and webhook (`SendWebhook`) report delivery. |
| `modules/utils.py` | CLI parsing, `ScanMode`/`ScanType` enums, `is_root()`, output saving. |
| `modules/web_ui.py` | Flask web dashboard with REST API, SSE streaming, scheduler. |
| `modules/web/webvuln.py` | Orchestrates web vulnerability checks (LFI, XSS, SQLi, dirbust). |
| `modules/web/crawler.py` | `crawl()` -- discovers URLs on a target using BeautifulSoup. |
| `modules/web/lfi.py` | `LFIScanner` -- tests 64 path traversal payloads. |
| `modules/web/sqli.py` | `SQLIScanner` -- tests for SQL injection via error-based detection. |
| `modules/web/xss.py` | `XSSScanner` -- tests 21 XSS payloads for reflection. |
| `modules/web/dirbust.py` | `dirbust()` -- directory enumeration from a wordlist. |
| `modules/logger.py` | `Logger` class for formatted console logging. |
| `modules/banners.py` | ASCII art banner and version display. |
| `modules/random_user_agent.py` | Random User-Agent string generator for HTTP requests. |

---

## Key data structures

### Vulnerability (nist_search.py)

```python
@dataclass
class Vulnerability:
    title: str
    CVEID: str
    description: str
    severity: str          # CRITICAL, HIGH, MEDIUM, LOW
    severity_score: float  # CVSS score
    details_url: str       # Link to NVD page
    exploitability: float
```

### VulnerableSoftware (searchvuln.py)

```python
@dataclass
class VulnerableSoftware:
    title: str        # keyword (e.g. "apache 2.4.49")
    CVEs: list        # list of CVE ID strings
```

### ExploitInfo (getexploits.py)

```python
@dataclass
class ExploitInfo:
    Platform: str
    PublishDate: str
    Type: str
    ExploitDBID: str
    Author: str
    Metasploit: str
    Verified: str
    Link: str
```

### TargetInfo (scanner.py)

```python
@dataclass
class TargetInfo:
    mac: str
    vendor: str
    os: str
    os_accuracy: str
    os_type: str
```

### ScanJob (web_ui.py)

```python
class ScanJob:
    id: str              # UUID
    target: str
    config: dict         # scan configuration
    status: str          # running, stopping, completed, error
    started_at: str      # ISO 8601 UTC timestamp
    finished_at: str
    error: str
    _hosts: dict         # {ip: host_dict}
```

Host dict structure within ScanJob:

```json
{
  "ip": "192.168.1.10",
  "mac": "00:11:22:33:44:55",
  "vendor": "Raspberry Pi",
  "os": "Linux 5.x",
  "ports": [
    {"port": 80, "service": "http", "product": "nginx", "version": "1.18.0"}
  ],
  "vulns": [
    {
      "cve": "CVE-2021-23017",
      "description": "1-byte memory overwrite in nginx resolver",
      "severity": "high",
      "cvss": 7.7,
      "keyword": "nginx 1.18.0",
      "port": 80
    }
  ],
  "scan_status": "completed",
  "scan_id": "abc-123"
}
```

### AutoScanner result (api.py)

```json
{
  "192.168.1.10": {
    "ports": {
      "80": {"state": "open", "name": "http", "product": "nginx", "version": "1.18.0", ...}
    },
    "os": {
      "mac": "00:11:22:33:44:55",
      "vendor": "Unknown",
      "os_name": "Linux 5.x",
      "os_accuracy": "95",
      "os_type": "general purpose"
    },
    "vulns": {
      "nginx": {
        "CVE-2021-23017": {
          "description": "...",
          "severity": "HIGH",
          "severity_score": 7.7,
          "details_url": "https://nvd.nist.gov/vuln/detail/CVE-2021-23017",
          "exploitability": 3.9
        }
      }
    }
  }
}
```

---

## Scan modes

| Mode | Behavior |
|------|----------|
| `normal` | Standard nmap scan with default timing. |
| `evade` | Requires root. Adds packet fragmentation (`-f`), spoofed source port (`-g 53`), and data padding (`--data-length 10`). User speed and timeout settings are respected. |
| `noise` | Launches multiple aggressive nmap processes (`-A -T 5`) against targets to generate network traffic. Not available in web UI. |

## Scan types

| Type | Method |
|------|--------|
| `arp` | ARP scan (`-sn -PR`). Requires root. Fastest for local network. |
| `ping` | Ping scan (`-sn`). Works without root. Default fallback. |

---

# Web UI

![Web UI Dashboard](/assets/images/autopwn-suite-scan-running.png)

## Starting the web UI

### Standalone

```bash
autopwn-suite --web
autopwn-suite --web --web-host 0.0.0.0 --web-port 3000
```

### Docker

```bash
docker compose up -d
```

The web UI will be available at `http://localhost:8080`.

### Environment variables

| Variable | Default | Description |
|----------|---------|-------------|
| `AUTOPWN_WEB_HOST` | `0.0.0.0` | Listen address |
| `AUTOPWN_WEB_PORT` | `8080` | Listen port |
| `AUTOPWN_DATA_DIR` | `modules/` | Directory for settings, profiles, and schedule JSON files |

---

## REST API Reference

All endpoints accept and return JSON. The web dashboard is a single-page app that consumes this API.

### Scans

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/scans` | List all scan jobs (summary) |
| `GET` | `/api/scans/<scan_id>` | Get a single scan summary |
| `GET` | `/api/scans/<scan_id>/download` | Download full scan results as JSON |
| `POST` | `/api/scan/start` | Start a new scan |
| `POST` | `/api/scan/stop` | Stop a running scan |

**POST /api/scan/start** body:

```json
{
  "target": "192.168.1.0/24",
  "mode": "normal",
  "speed": 3,
  "host_timeout": 240,
  "scan_type": "arp",
  "nmap_flags": "-p 1-1000 --version-intensity 3",
  "scan_ports": true,
  "scan_vulns": true,
  "skip_discovery": false,
  "api_key": ""
}
```

**POST /api/scan/stop** body:

```json
{
  "scan_id": "uuid-here"
}
```

Input validation: targets and nmap flags are checked against shell metacharacter blocklists and regex patterns to prevent command injection.

### Hosts / Log / Events

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/hosts` | All discovered hosts (merged across all scans) |
| `GET` | `/api/log` | Log history (up to 5000 entries) |
| `GET` | `/api/events` | SSE event stream for real-time updates |

The SSE stream at `/api/events` pushes log entries as they happen. Each event is a JSON object:

```json
{
  "scan_id": "abc-123",
  "ts": "14:30:45",
  "level": "info",
  "msg": "[*] Scanning 192.168.1.1"
}
```

Levels: `info`, `warning`, `error`, `success`, `__scan_done__` (internal).


### Settings

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/settings` | Get all settings (password masked) |
| `PUT` | `/api/settings` | Update settings (deep merge) |
| `POST` | `/api/settings/test_email` | Send a test email |
| `POST` | `/api/settings/test_webhook` | Send a test webhook ping |

Settings structure:

```json
{
  "nist_api_key": "",
  "email": {
    "enabled": false,
    "smtp_host": "",
    "smtp_port": 587,
    "username": "",
    "password": "",
    "from_addr": "",
    "to_addr": "",
    "on_complete": true,
    "on_error": true,
    "on_vuln_found": true
  },
  "webhook": {
    "enabled": false,
    "url": "",
    "on_complete": true,
    "on_error": true,
    "on_vuln_found": true
  }
}
```

### Profiles

![Scan Profiles](/assets/images/autopwn-suite-profiles.png)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/profiles` | List all scan profiles |
| `POST` | `/api/profiles` | Create a profile |
| `PUT` | `/api/profiles/<id>` | Update a profile |
| `DELETE` | `/api/profiles/<id>` | Delete a profile |

**POST /api/profiles** body:

```json
{
  "name": "Stealth Scan",
  "description": "Low and slow evasion profile",
  "mode": "evade",
  "speed": 1,
  "scan_type": "arp",
  "scan_technique": "-sW",
  "ports": "1-1000",
  "version_intensity": 2,
  "os_detection": true,
  "nmap_flags": "",
  "host_timeout": 300,
  "scan_ports": true,
  "scan_vulns": true,
  "skip_discovery": false
}
```

### Schedules

![Scheduled Scans](/assets/images/autopwn-suite-schedules.png)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/schedules` | List all scheduled scans |
| `POST` | `/api/schedules` | Create a schedule (requires `profile_id`) |
| `PUT` | `/api/schedules/<id>` | Update a schedule |
| `DELETE` | `/api/schedules/<id>` | Delete a schedule |

**POST /api/schedules** body:

```json
{
  "name": "Nightly Scan",
  "target": "192.168.1.0/24",
  "profile_id": "uuid-of-profile",
  "enabled": true,
  "type": "daily",
  "time_utc": "02:00",
  "interval_value": 24,
  "interval_unit": "hours",
  "weekday": 0
}
```

Schedule types:
- `interval` -- fires every N minutes/hours/days.
- `daily` -- fires once per day at `time_utc` (HH:MM).
- `weekly` -- fires once per week on `weekday` (0=Monday) at `time_utc`.

### Other

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/version` | Returns `{"version": "..."}` |
| `GET` | `/` | Serves the dashboard (index.html) |

---

## Notifications

### Email

When enabled, scan completion triggers an HTML email containing:
- Scan metadata (target, scan ID, status, nmap command, timing)
- Per-host open ports table
- Per-host vulnerability table with CVE ID, severity, CVSS score, and description
- AutoPWN Suite icon as an inline CID attachment

### Webhook

When enabled, scan completion POSTs a JSON payload:

```json
{
  "event": "scan_completed",
  "scan_id": "abc-123",
  "target": "192.168.1.0/24",
  "host_count": 3,
  "vuln_count": 12,
  "started_at": "2025-01-15T14:30:00Z",
  "finished_at": "2025-01-15T14:35:22Z",
  "error": "",
  "timestamp": "2025-01-15T14:35:22Z"
}
```

Both email and webhook support conditional triggers: `on_complete`, `on_error`, `on_vuln_found`.

---

# Installation & Quick Usage

## Clone & install

```bash
git clone https://github.com/GamehunterKaan/AutoPWN-Suite.git
cd AutoPWN-Suite
pip install -r requirements.txt
```

## Run automatic scan

```bash
autopwn-suite -y
```

## Scan a specific target

```bash
autopwn-suite -t 192.168.1.100
```

## Set scanning speed (0-5)

```bash
autopwn-suite -s 5
```

## Choose mode (normal / evade / noise)

```bash
autopwn-suite -m evade
```

## Custom nmap flags

```bash
autopwn-suite -nf "-p 1-1000 --version-intensity 3"
```

## Output file and format

```bash
autopwn-suite -o result.html -ot html
autopwn-suite -o result.svg -ot svg
autopwn-suite -o result.txt -ot txt
```

## Reporting

```bash
# Webhook
autopwn-suite --report webhook --report-webhook <URL>

# Email
autopwn-suite --report email --report-email-to you@example.com \
  --report-email-from sender@example.com \
  --report-email-server smtp.example.com \
  --report-email-port 587 \
  --report-email user@example.com \
  --report-email-password yourpassword
```

Use `-h` or `--help` to see all options.

## Use as a module

```python
from autopwn_suite.api import AutoScanner

scanner = AutoScanner()
json_results = scanner.scan("192.168.0.1")
scanner.save_to_file("autopwn.json")
```

## Docker

```bash
# Web UI via Docker Compose
docker compose up -d

# CLI via Docker
docker run -it --net=host gamehunterkaan/autopwn-suite -t 192.168.1.0/24 -y
```

---

# Development and Testing

## Installing dependencies

```bash
poetry install
```

## Running tests

```bash
# Run all tests with coverage
poetry run test

# Run tests without coverage
poetry run test --no-cov

# Run only unit tests
poetry run test -m unit

# Run only integration tests
poetry run test -m integration

# Run tests excluding slow tests
poetry run test -m "not slow"
```

---

# Contributing & Developer Notes

* Add new feature modules under `modules/`. Import or register them with `api.py` or the CLI where appropriate.
* To add a new CVE source, implement a function that returns `Vulnerability` dataclass objects matching the shape used by `nist_search.searchCVE`.
* Implement new output formats by adding an exporter and registering its flag in `utils.py` `SaveOutput()`.
* Web UI API endpoints are defined in `_build_app()` inside `modules/web_ui.py`.

I would be glad if you are willing to contribute this project. I am looking forward to merge your pull request unless its something that is not needed or just a personal preference. Also minor changes and bug fixes will not be merged. Please create an issue for those and I will do it myself. [Click here for more info!](https://github.com/GamehunterKaan/AutoPWN-Suite/blob/main/.github/CONTRIBUTING.md)

# Legal

You may not rent or lease, distribute, modify, sell or transfer the software to a third party. AutoPWN Suite is free for distribution, and modification with the condition that credit is provided to the creator and not used for commercial use. You may not use software for illegal or nefarious purposes. No liability for consequential damages to the maximum extent permitted by all applicable laws.

# Support or Contact

Having trouble using this tool? You can [create an issue](https://github.com/GamehunterKaan/AutoPWN-Suite/issues/new/choose) or [create a discussion!](https://github.com/GamehunterKaan/AutoPWN-Suite/discussions)
