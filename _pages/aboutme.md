---
layout: single
permalink: /aboutme/
hidden: true
toc: true
toc_label: "Table of Contents"
toc_icon: "cog"
toc_sticky: true
author_profile: true
---

<!-- ✅ JSON-LD for SEO -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Kaan Gültekin",
  "jobTitle": "Cybersecurity Researcher & Software Engineer",
  "url": "https://kaangultekin.net",
  "sameAs": [
    "https://github.com/GamehunterKaan",
    "https://www.credly.com/users/kaan-gultekln",
    "https://tryhackme.com/p/GamehunterKaan",
    "https://twitter.com/kaangultekin01",
    "https://www.linkedin.com/in/kaan-gultekin"
  ],
  "description": "Cybersecurity researcher, software developer, and automation-focused engineer building open-source offensive and defensive security tools."
}
</script>

<style>
/* ✅ Parallax Banner */
.parallax-banner {
  background-image: url('/assets/images/splash-banner.png');
  height: 360px;
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(0,0,0,0.2);
  margin-bottom: 24px;
}

/* ✅ Animated Credly Badge */
.badge-animated img {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.badge-animated img:hover {
  transform: scale(1.07) rotate(1deg);
  box-shadow: 0 8px 20px rgba(0,0,0,0.25);
}

/* ✅ Contact Buttons */
.contact-buttons {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 24px;
}
.contact-buttons a {
  background: #0366d6;
  color: #fff !important;
  padding: 10px 18px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition: background 0.25s ease;
}
.contact-buttons a:hover {
  background: #024f9e;
}
</style>

<div class="parallax-banner"></div>

---

# <i class="fas fa-user"></i> About Me — Kaan Gültekin
{: .glow-text }
---

# <i class="fas fa-code"></i> Who I Am
{: .glow-text }
I’m **Kaan Gültekin** — a software engineering student, software developer, and cybersecurity researcher.  
I specialize in automation-first tooling, offensive security research, and open-source projects that support both red-team testing and defensive security awareness.

---

# <i class="fas fa-tools"></i> Projects

## 🔹 Offensive Frameworks & Red Team Automation
### **AutoPWN-Suite**  
A **comprehensive offensive automation framework** that streamlines post-exploitation and red-team workflows. AutoPWN-Suite has gained wide recognition across the security community and remains one of my most impactful open-source contributions.  
- Automates common offensive tasks into a unified workflow.  
- Reduces time for red teams and security researchers.  
- Widely adopted and cited within the infosec community.

---

## 🔹 USB / Hardware Exploitation
### **BadUSB-Browser**  
A **BadUSB proof-of-concept** demonstrating how malicious USB devices can interact with browsers to execute payloads.  
- Explores **USB attack vectors** against browser contexts.  
- Helps defenders understand **peripheral-based threats**.  
- For **lab testing and awareness training** only.

### **BadUSB-Meterpreter**  
A **USB exploitation PoC** integrating BadUSB techniques with Meterpreter sessions.  
- Demonstrates **cross-vector attack surfaces**.  
- Serves as a **red-team training scenario**.  
- Strictly research-oriented with clear defensive lessons.

### **VBSBadUSB**  
A **VBScript-based BadUSB research project**, showing how lightweight scripting can still be leveraged for malicious USB behaviors.  
- Small-scale **scripting PoC** for awareness.  
- Highlights that **legacy scripting languages** remain exploitable.  
- Designed for **educational and defensive purposes**.

---

## 🔹 PowerShell Tools & Research
### **PowerShell File Search**  
A **PowerShell utility** for fast file discovery across systems.  
- Locates files based on **patterns and parameters**.  
- Simplifies **data discovery in Windows environments**.  
- Lightweight, efficient, and open-source.

### **PowerShell Network Scanner**  
A **PowerShell utility** for scanning networks to discover online devices and enumerate open ports.  
- Searches the entire network to identify **active hosts**.  
- Scans discovered hosts for the **top 1000 ports**.  
- Fast, scriptable, and **easy to use** for quick reconnaissance.

### **PowerShell Fileless Malware (Research Project)** *(not public)*  
A **private proof-of-concept** exploring **fileless PowerShell techniques** to study in-memory execution and evasion strategies. This work is **not publicly released** and is used for controlled defensive and academic research.  
- Demonstrates modern **fileless attack patterns** in controlled environments.  
- Used to develop **detection and mitigation strategies**.  
- Intended for **internal/academic defensive research only**.

---

## 🔹 Recon & OSINT Tools
### **CompanyEnum**  
An **OSINT reconnaissance tool** for gathering open-source information about organizations. CompanyEnum automates company profiling and delivers results through a clean **Web UI**, making it efficient for both recon and defensive validation.  
- Aggregates scattered **public company data** into one view.  
- Speeds up reconnaissance with a **visual interface**.  
- Useful for **red-team recon** and **blue-team validation**.

👉 [Explore all projects →](/projects/)

---

# <i class="fas fa-certificate"></i> Certifications

## **Google Cybersecurity Professional Certificate (v2)**

<p align="center" class="badge-animated">
  <a href="https://www.credly.com/earner/earned/badge/7ef85df1-eed5-4013-a004-f1fe3ac59a46" target="_blank">
    <img src="/assets/images/google-cybersecurity-professional-certificate-v2.png" 
         alt="Google Cybersecurity Professional Certificate Badge" 
         style="max-width: 240px; border-radius: 12px; margin-top: 12px; margin-bottom: 12px;">
  </a>
</p>

Earned through **Coursera**, this certification covers **nine professional courses** totaling **130+ hours of guided cybersecurity training**.  
The curriculum encompasses hands-on labs and defensive practices, focusing on **incident response, network security, threat analysis, SIEM management, and Python automation**.
{: .glass .fade-in }
**Courses Completed:**
1. Foundations of Cybersecurity  
2. Play It Safe: Manage Security Risks  
3. Connect and Protect: Networks and Network Security  
4. Tools of the Trade: Linux and SQL  
5. Assets, Threats, and Vulnerabilities  
6. Sound the Alarm: Detection and Response  
7. Automate Cybersecurity Tasks with Python  
8. Put It to Work: Prepare for Cybersecurity Jobs  
9. Google Cybersecurity Capstone: Analyzing and Mitigating Security Threats  

- **Total Learning Time:** 130+ hours  
- **Issuer:** Google / Coursera  
- **Credential:** [View on Credly →](https://www.credly.com/earner/earned/badge/7ef85df1-eed5-4013-a004-f1fe3ac59a46)

---

# <i class="fas fa-flask"></i> Research

My research focuses on bridging **offensive innovation** with **defensive application**.  
Instead of building exploits for exploitation’s sake, I design projects that highlight blind spots in detection, help blue teams test defenses, and provide insights for security education.
{: .fade-in }
## Key Research Areas
- **Fileless & In-Memory Attacks**  
  Created a PowerShell fileless framework PoC, analyzing how adversaries abuse memory-only execution and providing defenders with guidance on detection strategies.  

- **USB Attack Vectors**  
  Designed multiple BadUSB-style research projects to showcase real-world risks of malicious peripherals and promote hardware-level security awareness.  

- **Automation & Post-Exploitation**  
  Through AutoPWN-Suite and related tooling, I study how offensive automation affects red-team efficiency, and how defenders can anticipate automation-based attack patterns.  

- **Disclosure & Collaboration**  
  Actively participate in bug bounty programs and responsible disclosure (e.g., Discord Security recognition).  

---

# <i class="fas fa-trophy"></i> Recognition & Achievements

- **TryHackMe** — Ranked #1 in Turkey and Top 11 globally.  
- **Discord** — Recognized on their Security page for a reported vulnerability.  
- **AutoPWN-Suite** — Widely cited and adopted open-source offensive framework.  
- **Google Cybersecurity Certificate (v2)** — Completed 9-course professional program with 130+ hours of training.  
- **Research Contributions** — Public PoCs and technical articles that support the security community.  

---

# <i class="fas fa-book-open"></i> Publications & Media

- Invited contributor to [**Pentest Magazine**: *Open-Source Pentesting Toolkit*.](https://pentestmag.com/download/pentest-open-source-pentesting-toolkit/)  
- Multiple GitHub write-ups and research notes included within repositories.  

---

# <i class="fas fa-handshake"></i> Collaboration & Ethics

I publish openly but operate within a strict **ethics-first framework**:  
- Controlled testing environments only  
- Defensive documentation with every project  
- Responsible disclosure for vulnerabilities  
- Commitment to transparency and educational value  



<div class="contact-buttons">
  <a href="mailto:kaan@kaangultekin.net"><i class="fas fa-envelope"></i> Email</a>
  <a href="https://github.com/GamehunterKaan" target="_blank"><i class="fab fa-github"></i> GitHub</a>
  <a href="www.linkedin.com/in/kaan-gultekin" target="_blank"><i class="fas fa-terminal"></i> LinkedIn</a>
  <a href="https://x.com/kaangultekin01" target="_blank"><i class="fas fa-terminal"></i> Twitter</a>
</div>
