---
layout: home
permalink: /
description: >
  Kaan Gültekin — Software Engineer & Cybersecurity Researcher. Offensive security
  tooling, automation-first engineering, and open-source projects.
---

<section class="hero">
  <div class="container">
    <div class="hero__inner">
      <span class="badge badge--accent hero__eyebrow">
        <span class="status-dot" aria-hidden="true"></span>
        Available for collaboration
      </span>

      <h1 class="hero__title">
        Software engineer &amp;<br>
        <span class="hero__title-accent">cybersecurity researcher</span>
      </h1>

      <p class="hero__lead">
        I build offensive security tooling and automation that people actually use —
        from network scanning and post-exploitation frameworks to real-world
        vulnerability research.
      </p>

      <div class="btn-row hero__actions">
        <a class="btn btn--primary" href="{{ '/projects/' | relative_url }}">
          View projects
        </a>
        <a class="btn btn--secondary" href="{{ '/aboutme/' | relative_url }}">
          About me
        </a>
      </div>
    </div>
  </div>
</section>

<section class="section--tight">
  <div class="container">
    <ul class="fact-row reveal">
      <li>
        <a class="fact" href="https://tryhackme.com/p/TheKG" target="_blank" rel="noopener noreferrer">
          <span class="fact__icon"><i class="fas fa-ranking-star" aria-hidden="true"></i></span>
          <span>
            <strong class="fact__claim">
              #1 in Turkey, top 11 worldwide
              <i class="fas fa-arrow-up-right-from-square fact__arrow" aria-hidden="true"></i>
            </strong>
            <span class="fact__detail">was placed in TryHackMe monthly global ranking</span>
          </span>
        </a>
      </li>
      <li>
        <a class="fact" href="https://web.archive.org/web/20221107033704/https://discord.com/security" target="_blank" rel="noopener noreferrer">
          <span class="fact__icon"><i class="fas fa-shield-halved" aria-hidden="true"></i></span>
          <span>
            <strong class="fact__claim">
              Discord Security Hall of Fame
              <i class="fas fa-arrow-up-right-from-square fact__arrow" aria-hidden="true"></i>
            </strong>
            <span class="fact__detail">Responsible disclosure</span>
          </span>
        </a>
      </li>
      <li>
        <a class="fact" href="https://pentestmag.com/download/pentest-open-source-pentesting-toolkit/" target="_blank" rel="noopener noreferrer">
          <span class="fact__icon"><i class="fas fa-newspaper" aria-hidden="true"></i></span>
          <span>
            <strong class="fact__claim">
              Published in Pentest Magazine
              <i class="fas fa-arrow-up-right-from-square fact__arrow" aria-hidden="true"></i>
            </strong>
            <span class="fact__detail">Invited contributor</span>
          </span>
        </a>
      </li>
      <li>
        <a class="fact" href="https://github.com/GamehunterKaan/AutoPWN-Suite" target="_blank" rel="noopener noreferrer">
          <span class="fact__icon"><i class="fab fa-github" aria-hidden="true"></i></span>
          <span>
            <strong class="fact__claim">
              AutoPWN-Suite
              <i class="fas fa-arrow-up-right-from-square fact__arrow" aria-hidden="true"></i>
            </strong>
            <span class="fact__detail">Widely adopted open-source framework</span>
          </span>
        </a>
      </li>
    </ul>
  </div>
</section>

<section class="section" id="work">
  <div class="container">
    <div class="section__head reveal">
      <span class="section__eyebrow">Selected work</span>
      <h2 class="section__title">Things I've built</h2>
      <p class="section__lead">
        Security tooling, automation, and a couple of things that just needed to exist.
      </p>
    </div>

    {%- assign featured = site.pages
          | where_exp: "p", "p.layout == 'project'"
          | sort: "order" -%}

    <div class="grid grid--2 reveal">
      {%- for project in featured limit: 4 -%}
        {% include project-card.html project=project %}
      {%- endfor -%}
    </div>

    <div class="btn-row reveal" style="margin-top: var(--space-6);">
      <a class="btn btn--ghost" href="{{ '/projects/' | relative_url }}">
        See all projects <i class="fas fa-arrow-right" aria-hidden="true"></i>
      </a>
    </div>
  </div>
</section>

<section class="section" id="focus">
  <div class="container">
    <div class="section__head reveal">
      <span class="section__eyebrow">Research</span>
      <h2 class="section__title">What I'm working on</h2>
    </div>

    <div class="grid grid--3 reveal">
      <div class="card">
        <div class="card__icon"><i class="fas fa-terminal" aria-hidden="true"></i></div>
        <h3 class="card__title">Advanced post-exploitation</h3>
        <p class="card__body">
          Novel post-exploitation techniques in Windows environments using PowerShell
          and .NET, to better understand and defend against in-memory threats.
        </p>
      </div>
      <div class="card">
        <div class="card__icon"><i class="fas fa-shield-halved" aria-hidden="true"></i></div>
        <h3 class="card__title">Evasion techniques</h3>
        <p class="card__body">
          Researching and simulating modern AV/EDR evasion tactics so blue teams can
          build more resilient detection and response.
        </p>
      </div>
      <div class="card">
        <div class="card__icon"><i class="fas fa-sitemap" aria-hidden="true"></i></div>
        <h3 class="card__title">Active Directory security</h3>
        <p class="card__body">
          Common AD misconfigurations, attack paths like Kerberoasting, and defensive
          hardening for enterprise environments.
        </p>
      </div>
      <div class="card">
        <div class="card__icon"><i class="fas fa-gears" aria-hidden="true"></i></div>
        <h3 class="card__title">Framework development</h3>
        <p class="card__body">
          Building out AutoPWN-Suite's web application scanning and improving overall
          detection accuracy.
        </p>
      </div>
      <div class="card">
        <div class="card__icon"><i class="fas fa-robot" aria-hidden="true"></i></div>
        <h3 class="card__title">AI in automation</h3>
        <p class="card__body">
          How AI fits into security automation — intelligent vulnerability
          prioritisation through to adaptive response.
        </p>
      </div>
      <div class="card">
        <div class="card__icon"><i class="fas fa-diagram-project" aria-hidden="true"></i></div>
        <h3 class="card__title">Threat intel &amp; OSINT</h3>
        <p class="card__body">
          Automating OSINT collection and correlation to map external attack surface
          and surface emerging threats.
        </p>
      </div>
    </div>
  </div>
</section>

<section class="section" id="skills">
  <div class="container">
    <div class="section__head reveal">
      <span class="section__eyebrow">Toolkit</span>
      <h2 class="section__title">Technologies I work with</h2>
    </div>

    {%- comment -%}
      Logos degrade to a bare label if a CDN URL ever goes stale, so a dead
      image never leaves a broken-image glyph behind.
    {%- endcomment -%}
    <div class="reveal">
      <div class="skill-group">
        <div class="skill-group__label">Languages</div>
        <ul class="skill-list">
          <li><a class="skill" href="https://www.python.org" target="_blank" rel="noopener noreferrer"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg" alt="" loading="lazy" onerror="this.style.display='none'"> Python</a></li>
          <li><a class="skill" href="https://developer.mozilla.org/docs/Web/JavaScript" target="_blank" rel="noopener noreferrer"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="" loading="lazy" onerror="this.style.display='none'"> JavaScript</a></li>
          <li><a class="skill" href="https://learn.microsoft.com/powershell/" target="_blank" rel="noopener noreferrer"><img src="https://raw.githubusercontent.com/actions/starter-workflows/main/icons/powershell.svg" alt="" loading="lazy" onerror="this.style.display='none'"> PowerShell</a></li>
          <li><a class="skill" href="https://isocpp.org/" target="_blank" rel="noopener noreferrer"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/cplusplus/cplusplus-original.svg" alt="" loading="lazy" onerror="this.style.display='none'"> C++</a></li>
          <li><a class="skill" href="https://www.sqlite.org/" target="_blank" rel="noopener noreferrer"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/sqlite/sqlite-original.svg" alt="" loading="lazy" onerror="this.style.display='none'"> SQLite</a></li>
        </ul>
      </div>

      <div class="skill-group">
        <div class="skill-group__label">Security &amp; network analysis</div>
        <ul class="skill-list">
          <li><a class="skill" href="https://nmap.org/" target="_blank" rel="noopener noreferrer"><i class="fas fa-network-wired" aria-hidden="true"></i> Nmap</a></li>
          <li><a class="skill" href="https://www.metasploit.com/" target="_blank" rel="noopener noreferrer"><i class="fas fa-crosshairs" aria-hidden="true"></i> Metasploit</a></li>
          <li><a class="skill" href="https://scapy.net/" target="_blank" rel="noopener noreferrer"><i class="fas fa-layer-group" aria-hidden="true"></i> Scapy</a></li>
          <li><a class="skill" href="https://www.wireshark.org/" target="_blank" rel="noopener noreferrer"><i class="fas fa-wave-square" aria-hidden="true"></i> Wireshark</a></li>
          <li><a class="skill" href="https://www.exploit-db.com/" target="_blank" rel="noopener noreferrer"><i class="fas fa-database" aria-hidden="true"></i> Exploit-DB</a></li>
          <li><a class="skill" href="https://www.paramiko.org/" target="_blank" rel="noopener noreferrer"><i class="fas fa-terminal" aria-hidden="true"></i> Paramiko / SSH</a></li>
        </ul>
      </div>

      <div class="skill-group">
        <div class="skill-group__label">Web &amp; backend</div>
        <ul class="skill-list">
          <li><a class="skill" href="https://flask.palletsprojects.com/" target="_blank" rel="noopener noreferrer"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/flask/flask-original.svg" alt="" loading="lazy" onerror="this.style.display='none'"> Flask</a></li>
          <li><a class="skill" href="https://socket.io/" target="_blank" rel="noopener noreferrer"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/socketio/socketio-original.svg" alt="" loading="lazy" onerror="this.style.display='none'"> Socket.IO</a></li>
          <li><a class="skill" href="https://d3js.org/" target="_blank" rel="noopener noreferrer"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/d3js/d3js-original.svg" alt="" loading="lazy" onerror="this.style.display='none'"> D3.js</a></li>
          <li><a class="skill" href="https://leafletjs.com/" target="_blank" rel="noopener noreferrer"><i class="fas fa-map-location-dot" aria-hidden="true"></i> Leaflet</a></li>
          <li><a class="skill" href="https://developer.mozilla.org/docs/Web/Progressive_web_apps" target="_blank" rel="noopener noreferrer"><i class="fas fa-mobile-screen" aria-hidden="true"></i> PWA / Service Workers</a></li>
        </ul>
      </div>

      <div class="skill-group">
        <div class="skill-group__label">Automation &amp; testing</div>
        <ul class="skill-list">
          <li><a class="skill" href="https://www.selenium.dev" target="_blank" rel="noopener noreferrer"><img src="https://raw.githubusercontent.com/detain/svg-logos/780f25886640cef088af994181646db2f6b1a3f8/svg/selenium-logo.svg" alt="" loading="lazy" onerror="this.style.display='none'"> Selenium</a></li>
          <li><a class="skill" href="https://playwright.dev/" target="_blank" rel="noopener noreferrer"><i class="fas fa-robot" aria-hidden="true"></i> Playwright</a></li>
          <li><a class="skill" href="https://github.com/puppeteer/puppeteer" target="_blank" rel="noopener noreferrer"><img src="https://www.vectorlogo.zone/logos/pptrdev/pptrdev-official.svg" alt="" loading="lazy" onerror="this.style.display='none'"> Puppeteer</a></li>
          <li><a class="skill" href="https://docs.pytest.org/" target="_blank" rel="noopener noreferrer"><i class="fas fa-vial" aria-hidden="true"></i> pytest</a></li>
          <li><a class="skill" href="https://www.crummy.com/software/BeautifulSoup/" target="_blank" rel="noopener noreferrer"><i class="fas fa-file-code" aria-hidden="true"></i> BeautifulSoup</a></li>
        </ul>
      </div>

      <div class="skill-group">
        <div class="skill-group__label">Embedded &amp; IoT</div>
        <ul class="skill-list">
          <li><a class="skill" href="https://www.espressif.com/en/products/socs/esp32" target="_blank" rel="noopener noreferrer"><i class="fas fa-microchip" aria-hidden="true"></i> ESP32 / ESP8266</a></li>
          <li><a class="skill" href="https://www.arduino.cc/" target="_blank" rel="noopener noreferrer"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/arduino/arduino-original.svg" alt="" loading="lazy" onerror="this.style.display='none'"> Arduino</a></li>
          <li><a class="skill" href="https://www.raspberrypi.com/" target="_blank" rel="noopener noreferrer"><i class="fab fa-raspberry-pi" aria-hidden="true"></i> Raspberry Pi</a></li>
          <li><a class="skill" href="https://www.bluetooth.com/specifications/specs/" target="_blank" rel="noopener noreferrer"><i class="fab fa-bluetooth-b" aria-hidden="true"></i> BLE</a></li>
        </ul>
      </div>

      <div class="skill-group">
        <div class="skill-group__label">Platform &amp; tooling</div>
        <ul class="skill-list">
          <li><a class="skill" href="https://www.linux.org/" target="_blank" rel="noopener noreferrer"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/linux/linux-original.svg" alt="" loading="lazy" onerror="this.style.display='none'"> Linux</a></li>
          <li><a class="skill" href="https://www.docker.com/" target="_blank" rel="noopener noreferrer"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original.svg" alt="" loading="lazy" onerror="this.style.display='none'"> Docker</a></li>
          <li><a class="skill" href="https://git-scm.com/" target="_blank" rel="noopener noreferrer"><img src="https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg" alt="" loading="lazy" onerror="this.style.display='none'"> Git</a></li>
          <li><a class="skill" href="https://github.com/features/actions" target="_blank" rel="noopener noreferrer"><i class="fas fa-code-branch" aria-hidden="true"></i> GitHub Actions</a></li>
        </ul>
      </div>
    </div>
  </div>
</section>

<section class="section" id="principles">
  <div class="container">
    <div class="section__head reveal">
      <span class="section__eyebrow">Approach</span>
      <h2 class="section__title">How I work</h2>
    </div>

    <div class="grid grid--3 reveal">
      <div class="card">
        <h3 class="card__title">Offense informs defense</h3>
        <p class="card__body">
          The most effective way to build resilient defenses is to deeply understand
          and simulate modern attack vectors. Offensive research directly fuels
          defensive strategy.
        </p>
      </div>
      <div class="card">
        <h3 class="card__title">Automation for impact</h3>
        <p class="card__body">
          Automating repetitive work frees human expertise for creative
          problem-solving. Good tooling lets security people focus on what matters.
        </p>
      </div>
      <div class="card">
        <h3 class="card__title">Open source by default</h3>
        <p class="card__body">
          Sharing knowledge and tools raises the bar for everyone. I contribute to
          projects that make security more accessible and more effective.
        </p>
      </div>
    </div>
  </div>
</section>

<section class="section" id="next">
  <div class="container container--prose">
    <div class="section__head reveal">
      <span class="section__eyebrow">On the horizon</span>
      <h2 class="section__title">What's next</h2>
    </div>

    <ul class="timeline reveal">
      <li class="timeline__item">
        <h3 class="timeline__title">CompTIA Security+</h3>
        <p class="timeline__body">
          Formalising the cybersecurity fundamentals — anticipating, preventing, and
          responding to threats with more precision.
        </p>
      </li>
      <li class="timeline__item">
        <h3 class="timeline__title">A custom home assistant</h3>
        <p class="timeline__body">
          Voice commands, device control, and computer vision orchestrating my
          systems, IoT devices, and services — efficiently, securely, and quietly.
        </p>
      </li>
    </ul>
  </div>
</section>

<section class="section" id="contact">
  <div class="container container--prose">
    <div class="section__head reveal">
      <span class="section__eyebrow">Contact</span>
      <h2 class="section__title">Let's connect</h2>
      <p class="section__lead">
        Interested in research collaboration or open-source contributions? Get in touch.
      </p>
    </div>

    <div class="btn-row reveal">
      <a class="btn btn--primary" href="mailto:{{ site.author.email }}">
        <i class="fas fa-envelope" aria-hidden="true"></i> Email
      </a>
      <a class="btn btn--secondary" href="https://github.com/GamehunterKaan" target="_blank" rel="noopener noreferrer">
        <i class="fab fa-github" aria-hidden="true"></i> GitHub
      </a>
      <a class="btn btn--secondary" href="https://www.linkedin.com/in/kaan-gultekin/" target="_blank" rel="noopener noreferrer">
        <i class="fab fa-linkedin" aria-hidden="true"></i> LinkedIn
      </a>
    </div>
  </div>
</section>
