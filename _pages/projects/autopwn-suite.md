---
title: AutoPWN Suite
layout: splash
permalink: /projects/autopwn-suite/
toc: true
toc_label: "Table of Contents"
toc_icon: "cog"
toc_sticky: true
author_profile: true
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

## 🚀 Introduction

Security testers, red teams, and bug bounty hunters spend a lot of time chaining reconnaissance, service/version detection, vulnerability lookup and exploit retrieval. **AutoPWN Suite** automates that pipeline — from discovery to exploit suggestion — reducing manual overhead and letting you focus on investigation and exploitation logic rather than plumbing.

Built in Python and intended to run cross-platform (Linux/macOS/Windows), AutoPWN Suite is modular, scriptable, and designed so you can either run it as a CLI or import the core scanner as an API inside other tooling. The sections below explain what it does, how to use it, and — for developers — exactly how the code flows at runtime.

---

## 📖 Features

* Fully automatic mode (`-y`) for minimal interaction.
* Automatic network range detection and host discovery.
* Version-based vulnerability detection and CVE lookup.
* Web app helpers: directory enumeration and basic XSS/LFI/SQLi probes.
* Exploit retrieval: points to or downloads PoCs for matched vulnerabilities.
* Multiple modes: `normal`, `evade`, `noise` to tune aggressiveness/noise.
* Programmatic API (`AutoScanner`) for integration and automation.
* Multiple output formats: JSON, HTML, plain text (and visual SVGs where useful).

---

## 🧠 How It Works — Overview (developer-friendly)

Below is a combined textual + visual explanation of the runtime architecture and data flow. Paste the Mermaid diagrams directly into your docs (GitHub renders Mermaid).

### High-level runtime flow (short)

1. CLI (`autopwn.py`) or API call starts a scan.
2. `AutoScanner` launches an nmap discovery scan (via python-nmap).
3. Results are normalized to host objects (`InitHostInfo`).
4. Service/version strings → searchable keywords (`searchvuln`).
5. Keywords → vulnerability lookups (NIST or other DBs).
6. If CVEs/PoCs found → exploit references fetched/suggested.
7. Web-specific checks run for HTTP services.
8. Results compiled and exported (JSON/HTML/TXT) or posted to webhook/email.

---

### Sequence diagram (runtime interaction)

<div class="mermaid">
sequenceDiagram
    participant User as "User / CLI"
    participant AutoPWN as "autopwn.py"
    participant API as "AutoScanner (Core Engine)"
    participant Nmap as "nmap (python-nmap)"
    participant Parser as "InitHostInfo"
    participant Vuln as "searchvuln + nist_search"
    participant Exploit as "exploit_fetcher"
    participant Report as "Reporter / Exporter"

    User->>AutoPWN: Run autopwn-suite -t &lt;target&gt; -y
    AutoPWN->>API: Create AutoScanner instance
    API->>Nmap: Launch TCP SYN scan
    Nmap-->>API: Return hosts, ports, and service info
    API->>Parser: Normalize results into Host objects
    Parser-->>API: Return structured HostInfo list

    loop For each host/service
        API->>Vuln: Generate keywords (service + version)
        Vuln-->>API: Return CVE matches and summaries
        API->>Exploit: Fetch related exploit references
        Exploit-->>API: Return exploit metadata
    end

    API->>Report: Aggregate and format results
    Report-->>AutoPWN: Save JSON, HTML, TXT output
    AutoPWN-->>User: Display summary and report path
</div>

---

### Flow diagram (data pipeline view)

<div class="mermaid">
flowchart TD
    A["CLI / User Input"] --> B["autopwn.py - Parse args, config, mode"]
    B --> C["AutoScanner API (Core Engine)"]
    C --> D["nmap Scan: Host & Port Discovery"]
    D --> E["InitHostInfo - Normalize Data"]
    E --> F["searchvuln - Generate Keywords"]
    F --> G["nist_search - Query CVE Databases"]
    G --> H["exploit_fetcher - Retrieve Exploit References"]
    H --> I["Web Modules (XSS, LFI, SQLi Checks)"]
    I --> J["Reporter / Exporter (HTML, JSON, TXT)"]
    J --> K["Webhook / Email / Console Output"]

    style A fill:#0a0,stroke:#08f,stroke-width:2px,color:#fff
    style K fill:#0a0,stroke:#08f,stroke-width:2px,color:#fff
</div>

---

## 🧩 How the code works — detailed code workflow

This section explains runtime internals, responsibilities of main files, data structures, and extension points.

### Main components & responsibilities

* **`autopwn.py` (CLI orchestrator)**

  * Parses arguments, loads config, sets global mode (normal/evade/noise), instantiates `AutoScanner`, and prints summaries.
* **`api.py` (`AutoScanner` class)**

  * Primary engine. Exposes `scan(target)`, result export functions, and lower-level helpers like `InitHostInfo`. Ideal for importing into other Python tools.
* **`modules/`**

  * `searchvuln.py` — convert version/service output into searchable keywords.
  * `nist_search.py` — query NIST or other CVE sources and return normalized CVE objects.
  * `exploit_fetcher.py` (or similar) — locate PoC/exploit references and optionally download for manual review.
  * `web_helpers.py` — directory brute, XSS/LFI/SQLi quick checks and basic web probes.
  * `utils.py` — logging, root checks, formatting, timing helpers.

### Step-by-step runtime sequence (expanded)

1. **Argument parsing & config**

   * CLI flags: target(s), speed, mode, output type, `-y` for auto-confirmation, custom nmap flags, webhook/email config.
2. **Privilege & env checks**

   * A `utils.is_root()` influences whether aggressive scans (OS detection, version probes) run. Logger setup for pretty CLI output and optionally JSON logging.
3. **Discovery (nmap)**

   * `AutoScanner` runs an nmap TCP-SYN (or user-specified) scan through `python-nmap` and receives XML/JSON results.
4. **Normalization**

   * `InitHostInfo` converts raw nmap data into `HostResult` objects: IP, MAC (if present), vendor, OS guess, and `ServiceResult` list.
5. **Keyword generation**

   * `searchvuln.GenerateKeyword(service.version_string)` produces normalized tokens (e.g., `apache 2.4.49`, `openssl 1.0.2u`) for DB queries.
6. **CVE lookup**

   * `nist_search.searchCVE(keyword)` fetches matching CVEs and returns structured records (`id`, `summary`, `published_date`, `references`).
7. **Exploit retrieval**

   * If references/PoCs exist, exploit-fetcher modules attempt to retrieve or link to exploit code and attach metadata to the service entry.
8. **Web-specific checks**

   * For HTTP services, optional directory brute force and lightweight injection probes are run and attached to results.
9. **Modes impact**

   * `evade`: slower timing, jitter, stealth nmap flags.
   * `noise`: generate extra traffic patterns (for detection system testing).
   * Mode selection adjusts nmap flags, timeouts, and whether aggressive checks run.
10. **Reporting**

    * Results collated into a `ScanResult` object and serialized: JSON for machine consumption, HTML for human reports (with links to PoC locations), TXT for quick summaries.
11. **Return & error handling**

    * API returns structured result; CLI prints summary and output location. Recoverable errors are logged; non-recoverable errors exit with clear messages.

### Core data models (conceptual)

* **ScanResult**

```json
{
  "targets": [ HostResult, ... ],
  "summary": { "hosts_scanned": 3, "cves_found": 7 },
  "meta": { "scan_time": "2025-10-04T..." }
}
```

* **HostResult**

```json
{
  "ip": "192.168.1.10",
  "mac": "00:11:22:33:44:55",
  "vendor": "Cisco",
  "os": "Linux 4.x (guess)",
  "services": [ ServiceResult, ... ]
}
```

* **ServiceResult**

```json
{
  "port": 80,
  "proto": "tcp",
  "name": "http",
  "version": "Apache httpd 2.4.49",
  "keywords": ["apache 2.4.49","httpd 2.4"],
  "cves": [
    {
      "id":"CVE-2021-41773",
      "summary":"Path traversal vulnerability in Apache httpd",
      "published_date":"2021-10-05",
      "exploit_links":[ "https://example.com/poc" ]
    }
  ]
}
```

---

## 🛠 Installation & Quick Usage

Clone & install:

```bash
git clone https://github.com/GamehunterKaan/AutoPWN-Suite.git
cd AutoPWN-Suite
sudo pip install -r requirements.txt
```

Run automatic scan:

```bash
autopwn-suite -y
```

Scan a specific target:

```bash
autopwn-suite -t 192.168.1.100
```

Set scanning speed

```bash
autopwn-suite -s 5
```

Choose mode (normal / evade / noise):

```bash
autopwn-suite -m evade
```

Custom Nmap flags:

```bash
autopwn-suite -nf "-O -sV"
```

Output file and format:

```bash
autopwn-suite -o result.html -ot html
```

Webhook / Email reporting:

```bash
autopwn-suite --report webhook --report-webhook <URL>
autopwn-suite --report email --report-email-to you@example.com ...
```

Use `-h` or `--help` to see all options.


### Use as a module:

```python
from autopwn_suite.api import AutoScanner
scanner = AutoScanner()
json_results = scanner.scan("192.168.0.1")
scanner.save_to_file("autopwn.json")
```

---

## 🤝 Contributing & Developer Notes

* Add new feature modules under `modules/`. Import or register them with `api.py` or the CLI where appropriate.
* To add a new CVE source, implement a normalizer that returns the same CVE object shape used by `nist_search`.
* Implement new output formats by adding an exporter and registering its flag in `autopwn.py`.
* For contributors, a `docs/DEVELOPER.md` with the sequence/flow diagrams and minimal plug-in example is recommended.
