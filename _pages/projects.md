---
title: Projects
layout: page
permalink: /projects/
wide: true
excerpt: >
  The things I've built, each with a write-up of how it works and what went
  wrong along the way. Almost all of it is open source.
---

{%- assign projects = site.pages
      | where_exp: "p", "p.layout == 'project'"
      | sort: "order" -%}

<div class="grid grid--2">
  {%- for project in projects -%}
    {% include project-card.html project=project heading=2 %}
  {%- endfor -%}
</div>

<div class="section__head" style="margin-top: var(--space-8);">
  <span class="section__eyebrow">Mostly from 2022</span>
  <h2 class="section__title">Smaller and older</h2>
</div>

<div class="grid grid--3">
  <div class="card">
    <h3 class="card__title"><a href="https://github.com/GamehunterKaan/BadUSB-Suite" target="_blank" rel="noopener noreferrer">BadUSB-Suite</a></h3>
    <p class="card__body">A generator for BadUSB attacks that I never finished. Its README says not to use it, and it means it.</p>
  </div>
  <div class="card">
    <h3 class="card__title">C# console tools</h3>
    <p class="card__body">
      <a href="https://github.com/GamehunterKaan/SharpCam" target="_blank" rel="noopener noreferrer">SharpCam</a>,
      <a href="https://github.com/GamehunterKaan/CSharp-GPS" target="_blank" rel="noopener noreferrer">CSharp-GPS</a> and
      <a href="https://github.com/GamehunterKaan/CSharp-Microphone-Recorder" target="_blank" rel="noopener noreferrer">Microphone Recorder</a>:
      three tiny tools for the webcam, the GPS and the microphone.
    </p>
  </div>
  <div class="card">
    <h3 class="card__title"><a href="https://github.com/GamehunterKaan/powershell-usb-cloner" target="_blank" rel="noopener noreferrer">powershell-usb-cloner</a></h3>
    <p class="card__body">Watches for USB storage being plugged in and copies it with robocopy. From 2026.</p>
  </div>
</div>
