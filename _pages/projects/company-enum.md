---
title: CompanyEnum
use_mermaid: true
layout: splash
permalink: /projects/company-enum/
classes: wide
header:
  title: CompanyEnum
  overlay_color: "#242730ff"
  overlay_image: /assets/images/companyenum.jpg
  overlay_filter: 0.3
  actions:
    - label: "<i class='fas fa-code'></i> View On GitHub"
      url: "https://github.com/GamehunterKaan/CompanyEnum/"
excerpt: >
  Comprehensive OSINT tool for company profiling and intelligence gathering.
---

# 🚀 Introduction

**CompanyEnum** is a powerful Open Source Intelligence (OSINT) framework designed to aggregate comprehensive data about companies from a multitude of public sources. For security researchers, corporate investigators, and market analysts, it automates the tedious process of data collection, providing a unified view of a company's profile.

From corporate structure and financials to the technology stack and security posture, CompanyEnum gathers and presents information in a clean, structured format, allowing you to focus on analysis rather than data hunting.

---

# 🧠 How It Works

<div class="mermaid">
flowchart TB
  A[Input: Company Name] --> B{Data Collection Modules};
  B --> C[Crunchbase API];
  B --> D[Craft.co API];
  B --> E["Security Scanners <br> (Headers, SSL, WHOIS)"];
  B --> F["Review Platforms <br> (TrustPilot, Careerbliss)"];
  C --> G[Data Aggregation & Normalization];
  D --> G;
  E --> G;
  F --> G;
  G --> H[Generate HTML Report];
  H --> I[View Report in Browser];
</div>

---

# 🎯 What CompanyEnum Aims To Do (High-Level)

CompanyEnum is built to **automate the aggregation** of open-source, public data about a target organization and present it via a **Web UI dashboard**. Its core goal is to reduce the manual overhead of crawlers, scripts, and spreadsheets into a unified interface for recon, triage, and reporting.

---

# ⚙️ Features

*   **Comprehensive Data Aggregation**: Gathers information from sources like Crunchbase, Craft.co, and various security tools.
*   **Multi-Faceted Profiling**: Builds a complete picture covering financials, people, technology, and public ratings.
*   **Structured Output**: Presents data in a clean, easy-to-read HTML report.
*   **Security Insights**: Includes results from security header scans, SSL certificate analysis, and WHOIS lookups.
*   **People Intelligence**: Identifies key personnel, including founders, executives, and board members.
*   **Technology Stack Discovery**: Enumerates web technologies, backend services, and provides estimates on IT spend.

---

# 🖼️ Example Output

Here is a sample of the data CompanyEnum provides in its HTML report. This demonstrates the breadth of information collected for a target company like "Microsoft."

<iframe src="/assets/companyenum-example-output.html" style="width: 100%; height: 600px; border: 1px solid #ccc; border-radius: 5px;" title="CompanyEnum Example Output Preview"></iframe>

---

# 🧠 Data Explained

CompanyEnum organizes the collected intelligence into several key sections. Here’s a breakdown of what each section contains, based on the example output.

---

## Summary

This section provides a high-level overview of the company.

*   **Basic Information**: Company Name, Website, Headquarters, Founders, and Founding Date.
*   **Business Domain**: Key sectors the company operates in.
*   **Corporate Overview**: A brief description of the company's business.
*   **Market Position**: A list of known competitors.

<pre>
<strong>Query:</strong> microsoft
<strong>Company Name:</strong> Microsoft
<strong>Website:</strong> microsoft.com
<strong>Headquarters:</strong> Redmond, Washington, U.S.
<strong>Founders:</strong> Bill Gates, Paul Allen
<strong>Founded Date:</strong> April 4, 1975
<strong>Sectors:</strong> Software, Cloud Computing, Consumer Electronics, Video Games
<strong>Description:</strong> Microsoft Corporation is an American multinational technology corporation...
<strong>Competitors:</strong> Apple, Google, Amazon, Oracle, Sony
</pre>

## Financials

This section dives into the financial and investment activities of the company.

*   **Stock Information**: Ticker symbol and current stock price.
*   **Financial Health**: Annual revenue.
*   **Investment History**: Details on funding rounds, investors, and the number of investments made.
*   **Corporate Actions**: Information on acquisitions and exits.
<pre>
<strong>Ticker:</strong> MSFT
<strong>Stock Price:</strong> $305.22
<strong>Revenue:</strong> $211.9B
<strong>Fund Round:</strong> 1
<strong>Acquisitions:</strong> 251
<strong>Acquisitions Description:</strong> LinkedIn, GitHub, Activision Blizzard
</pre>

## People

Gain insights into the key individuals associated with the company.

*   **Founders**: The individuals who started the company.
*   **Key Employees**: A list of top executives and their roles, sourced from platforms like Crunchbase and Craft.co.

<pre>
<strong>Founders:</strong>
Bill Gates, Paul Allen
<h4>Employees:</h4>
<strong>Satya Nadella:</strong> Chairman & Chief Executive Officer
<strong>Brad Smith:</strong> Vice Chair & President
</pre>

## Technology

Understand the company's technology footprint and security posture.

*   **Tech Stack**: The technologies used for their products and web services (e.g., Microsoft Azure, jQuery, React).
*   **Intellectual Property**: Number of patents and trademarks.
*   **Web Presence**: Monthly web traffic and IT spending estimates.
*   **Security Posture**: Results from security header analysis, SSL certificate validation (SSL Hopper, Sucuri), WHOIS data, and active scanning.
<pre>
<strong>Tech Stack:</strong> Microsoft Azure, jQuery, React
<strong>Patents:</strong> 84,123
<strong>Web Traffic:</strong> 1.2B Monthly Visits
<strong>Security Grade:</strong> A
<strong>SSL Issuer:</strong> DigiCert Inc
</pre>

## Ratings

This section provides a view of the company's public perception from both customers and employees.

*   **Customer Reviews**: Aggregated ratings and review snippets from TrustPilot.
*   **Employee Reviews**: Company culture and compensation insights from platforms like Careerbliss.

---

## 🛡️ Defensive Use Cases

While CompanyEnum is an OSINT tool, defenders can use it to:

- **Map External Footprint**: Discover domains, subdomains, and public assets that may have been forgotten or are improperly configured.
- **Identify Information Leakage**: Find sensitive metadata in public records, such as WHOIS data that isn't properly redacted or developer emails in code repositories.
- **Baseline Security Posture**: Get an attacker's-eye view of your organization's security headers, SSL/TLS configurations, and publicly exposed technologies.
- **Audit for Brand Impersonation**: Monitor for newly registered domains that resemble your brand, which could be used for phishing attacks.
