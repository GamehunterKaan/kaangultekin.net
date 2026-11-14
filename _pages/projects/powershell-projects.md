---
title: PowerShell Projects
layout: project
permalink: /projects/powershell-projects/
use_mermaid: true
order: 6
card_description: >
  A network scanner and a file search in plain PowerShell, so they run on a
  stock Windows machine with nothing to install. Plus some research I keep
  private.
header:
  overlay_image: /assets/images/powershell-tools.webp
  actions:
    - label: "<i class='fab fa-github'></i> The list on GitHub"
      url: "https://github.com/stars/GamehunterKaan/lists/powershell-projects"
excerpt: >
  Two small tools that only need the PowerShell already on every Windows machine, and a research project on in-memory techniques that stays unpublished.
---

## What's here

Two small tools from March 2022. Both are a single PowerShell script that runs
on a stock Windows machine, which is the whole point: sometimes the machine
you're on is one where you can't install anything.

### PowerShell-Network-Scanner

Finds the live hosts on the local network, then checks each one for the 1,000
ports Nmap scans by default. It won't replace Nmap, but it's there when Nmap
isn't.
[Source on GitHub](https://github.com/GamehunterKaan/PowerShell-Network-Scanner).

### PowerShell-File-Search

Searches every drive for text files that contain a string you give it. Handy
during triage, when you need to know where a value was written down.
[Source on GitHub](https://github.com/GamehunterKaan/PowerShell-File-Search).

## Fileless PowerShell research

I've also spent time on how in-memory PowerShell techniques show up in endpoint
telemetry, and where they don't. That work isn't published and won't be. What's
useful to defenders out of it is detection ideas and test cases, not code, and
code is the part that would be misused.

The loop it follows is the ordinary one for detection work:

<div class="mermaid">
flowchart TB
  Lab[Isolated lab] --> Run[Run a technique under test]
  Run --> Collect[Collect process and script telemetry]
  Collect --> Idea[Write a detection idea]
  Idea --> Tune[Tune the rule]
  Tune --> Check[Re-run and check it fires]
  Check --> Run
</div>

Some of what comes out of it is general enough to share:

- **Turn on script block logging.** Event ID 4104 records the PowerShell that
  actually ran, after deobfuscation, including code that never touched the disk.
- **Keep AMSI working.** Most in-memory PowerShell tradecraft starts by trying
  to switch it off, so a failed or tampered AMSI is a signal in itself.
- **Use Constrained Language Mode** for users who don't need the full
  language, enforced through application control rather than an environment
  variable.
- **Watch the parent process.** PowerShell started by Office, a browser or a
  script host is worth a second look far more often than PowerShell started
  from a terminal.

If you're on a SOC or EDR team and want to compare notes, or need test cases
for an authorized engagement, [email me](mailto:kaan@kaangultekin.net).
