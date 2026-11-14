---
title: CompanyEnum
layout: project
permalink: /projects/company-enum/
use_mermaid: true
order: 7
card_description: >
  Type a company name and get one report built from Craft.co, Trustpilot,
  CareerBliss, WHOIS and a handful of web security scanners, with live
  progress while it collects.
header:
  overlay_image: /assets/images/companyenum.webp
  actions:
    - label: "<i class='fab fa-github'></i> Source on GitHub"
      url: "https://github.com/GamehunterKaan/CompanyEnum/"
excerpt: >
  The first hour of researching a company, done in about thirty seconds: profile, people, technology, security headers, certificates and reviews, gathered from public sources into one report.
---

## Why I made it

The first hour of looking into a company is always the same tabs: what they
do and who runs them, what their website is built on, how its headers and
certificate look, what WHOIS says, and what customers and employees write
about them. CompanyEnum opens those tabs for you. You type a name, watch each
source report in, and get one report at the end.

I wrote the first version in June 2023 and reworked it in April 2026, with
new collectors for the sites that had changed underneath it and a new
interface.

## What it collects

| Tab | Sources | What you get |
|---|---|---|
| Summary | Craft.co, with Google as a fallback for the website | Name, website, headquarters, founding date, description, sectors, competitors |
| Financials | Craft.co | Stock price, market cap, revenue |
| People | Craft.co | Executives and their roles |
| Technology | securityheaders.com, SSL Shopper, Sucuri SiteCheck, whois.com | Security header grade and raw headers, the TLS certificate and its names, Sucuri's findings, WHOIS records |
| Ratings | Trustpilot, CareerBliss | Overall scores and recent reviews |

An example report for Microsoft, from an earlier version of the interface:

<iframe src="/assets/companyenum-example-output.html" style="width: 100%; height: 600px; border: 1px solid var(--border); border-radius: var(--radius);" title="Example CompanyEnum report for Microsoft"></iframe>

## How it works

Submitting a name starts a background job that runs each collector in turn and
records its state. The browser goes to a progress page that checks in every
half second and shows each step as pending, running, done, skipped or failed.
When the job finishes, the page moves on to the report by itself.

<div class="mermaid">
flowchart TB
  A[Company name] --> B[Background job]
  B --> C[Craft.co profile and people]
  B --> D[Website: Craft.co, then Google]
  D --> E[Headers, TLS, Sucuri, WHOIS]
  B --> F[Trustpilot and CareerBliss reviews]
  C --> G[Report]
  E --> G
  F --> G
</div>

The interesting part is that every source fights scrapers differently, so each
collector uses the lightest approach that still works:

- **Plain requests and BeautifulSoup** for sites that don't block anyone
  (whois.com, SSL Shopper, the Sucuri API).
- **cloudscraper** for sites behind Cloudflare that let a convincing client
  through (Craft.co, securityheaders.com).
- **A real headless Chromium through Playwright** for the two review sites,
  which won't serve anything to a script.

A scan takes 20 to 40 seconds. If Craft.co doesn't know the company, the
website lookup falls back to a Google search; if Google answers with a
CAPTCHA, the Technology tab says the website wasn't found and everything else
still fills in.

## Using it on yourself

Most of what CompanyEnum finds is aimed outward, but it's just as useful
pointed at your own organization. It shows you what an attacker's first look
turns up: missing security headers, a certificate about to expire, WHOIS
records that name a person who left years ago, a tech stack that's easy to
fingerprint.

## Running it

```bash
pip install -r requirements.txt
playwright install chromium
python main.py
```

Then open `http://127.0.0.1:5000/` and type a company name. The scrapers read
real pages that change without warning, so expect the occasional source to
break until it's updated.
