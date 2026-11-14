---
layout: home
permalink: /
description: >
  Kaan Gültekin is a software engineer in Çanakkale, founding engineer at
  SolonGate, and the author of AutoPWN Suite, an open-source vulnerability
  scanner.
---

<section class="hero">
  <div class="container">
    <div class="hero__inner">
      <span class="badge badge--accent hero__eyebrow">
        <span class="status-dot" aria-hidden="true"></span>
        Founding engineer at SolonGate
      </span>

      <h1 class="hero__title">
        Software engineer &amp;<br>
        <span class="hero__title-accent">cybersecurity researcher</span>
      </h1>

      <p class="hero__lead">
        I'm Kaan, from Çanakkale, Türkiye. I came to security from the
        offensive side, through CTFs and BadUSB experiments, and I've been
        building tools ever since: from
        <a href="{{ '/projects/autopwn-suite/' | relative_url }}">AutoPWN Suite</a>,
        the vulnerability scanner I started in 2022, to a
        <a href="{{ '/projects/canakkale-hat-sefer/' | relative_url }}">live bus tracker for Çanakkale</a>
        and <a href="{{ '/projects/fundhunter/' | relative_url }}">FundHunter</a>,
        an investment fund analysis and portfolio tracking app.
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
        <a class="fact" href="https://x.com/kaangultekin01/status/1532744189762584579" target="_blank" rel="noopener noreferrer">
          <span class="fact__icon"><i class="fas fa-ranking-star" aria-hidden="true"></i></span>
          <span>
            <strong class="fact__claim">
              #1 in Turkey on TryHackMe
              <i class="fas fa-arrow-up-right-from-square fact__arrow" aria-hidden="true"></i>
            </strong>
            <span class="fact__detail">and in the global top 11 of the monthly leaderboard, 2022</span>
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
            <span class="fact__detail">For a vulnerability I reported to them privately</span>
          </span>
        </a>
      </li>
      <li>
        <a class="fact" href="https://legacy.pentestmag.com/download/pentest-open-source-pentesting-toolkit/" target="_blank" rel="noopener noreferrer">
          <span class="fact__icon"><i class="fas fa-newspaper" aria-hidden="true"></i></span>
          <span>
            <strong class="fact__claim">
              Published in PenTest Magazine
              <i class="fas fa-arrow-up-right-from-square fact__arrow" aria-hidden="true"></i>
            </strong>
            <span class="fact__detail">I wrote the AutoPWN Suite entry, Oct 2022</span>
          </span>
        </a>
      </li>
      <li>
        <a class="fact" href="https://github.com/GamehunterKaan/AutoPWN-Suite" target="_blank" rel="noopener noreferrer">
          <span class="fact__icon"><i class="fab fa-github" aria-hidden="true"></i></span>
          <span>
            <strong class="fact__claim">
              AutoPWN Suite
              <i class="fas fa-arrow-up-right-from-square fact__arrow" aria-hidden="true"></i>
            </strong>
            <span class="fact__detail">1,150+ stars and the OpenSSF Gold badge</span>
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
        Security tools, and things I wanted and couldn't find: a bus app for my
        city, a way to see what Turkish investment funds actually hold, a packet
        capture you can watch.
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

<section class="section" id="now">
  <div class="container">
    <div class="section__head reveal">
      <span class="section__eyebrow">Right now</span>
      <h2 class="section__title">What I'm doing now</h2>
    </div>

    <div class="grid grid--3 reveal">
      <div class="card">
        <div class="card__icon"><i class="fas fa-shield-halved" aria-hidden="true"></i></div>
        <h3 class="card__title">SolonGate</h3>
        <p class="card__body">
          Founding engineer. SolonGate sits between AI agents and the tools they
          call, allows or blocks each call against a policy on the user's own
          machine, and records every decision in an audit trail. It also catches
          secrets and personal data before someone pastes them into a chatbot.
        </p>
      </div>
      <div class="card">
        <div class="card__icon"><i class="fas fa-terminal" aria-hidden="true"></i></div>
        <h3 class="card__title">AutoPWN Suite</h3>
        <p class="card__body">
          Most of this autumn went into making it trustworthy rather than bigger:
          a login for the dashboard, signed releases, a public write-up of every
          issue a security review found, and CVE matching that reads NVD's
          version ranges instead of grepping descriptions.
        </p>
      </div>
      <div class="card">
        <div class="card__icon"><i class="fas fa-map-location-dot" aria-hidden="true"></i></div>
        <h3 class="card__title">FundHunter and the bus app</h3>
        <p class="card__body">
          Both are live and still get regular commits. Their data refreshes on
          its own, every day for FundHunter and every hour for the Çanakkale bus
          timetables.
        </p>
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
          The next certificate on my list, to formalise the fundamentals.
        </p>
      </li>
      <li class="timeline__item">
        <h3 class="timeline__title">A home assistant of my own</h3>
        <p class="timeline__body">
          Voice commands, device control and some computer vision over the
          machines and ESP32 boards I already have running. Slowly.
        </p>
      </li>
    </ul>
  </div>
</section>

<section class="section" id="contact">
  <div class="container container--prose">
    <div class="section__head reveal">
      <span class="section__eyebrow">Contact</span>
      <h2 class="section__title">Get in touch</h2>
      <p class="section__lead">
        Email is the best way to reach me. Questions about AutoPWN Suite, a bug
        in one of these projects, or something you'd like to build together
        are all welcome.
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
