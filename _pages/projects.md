---
title: Projects
layout: page
permalink: /projects/
wide: true
excerpt: >
  Security tooling, automation, and research. Everything here is something I
  built and shipped — most of it open source.
---

{%- assign projects = site.pages
      | where_exp: "p", "p.layout == 'project'"
      | sort: "order" -%}

<div class="grid grid--2">
  {%- for project in projects -%}
    {% include project-card.html project=project heading=2 %}
  {%- endfor -%}
</div>
