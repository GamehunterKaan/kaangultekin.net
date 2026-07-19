/* Site behaviour. Small, dependency-free, all progressive enhancement. */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* --- Mobile navigation ------------------------------------------------- */
  var toggle = document.getElementById("nav-toggle");
  var links = document.getElementById("nav-links");

  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.innerHTML = open
        ? '<i class="fas fa-xmark" aria-hidden="true"></i>'
        : '<i class="fas fa-bars" aria-hidden="true"></i>';
    });

    // Close the menu after following an in-page link.
    links.addEventListener("click", function (e) {
      if (e.target.closest("a") && links.classList.contains("is-open")) {
        links.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.innerHTML = '<i class="fas fa-bars" aria-hidden="true"></i>';
      }
    });
  }

  /* --- Nav border on scroll ---------------------------------------------- */
  var nav = document.getElementById("site-nav");

  if (nav) {
    var onScroll = function () {
      nav.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* --- Table of contents -------------------------------------------------- */
  (function () {
    var toc = document.getElementById("toc");
    var content = document.getElementById("project-content");
    if (!toc || !content) return;

    // kramdown's auto_ids gives every heading an id already; skip any that
    // somehow lack one rather than inventing links that go nowhere.
    var headings = [].slice
      .call(content.querySelectorAll("h2[id], h3[id]"))
      .filter(function (h) { return h.textContent.trim(); });

    // Not worth a rail for a handful of sections.
    if (headings.length < 3) return;

    var list = toc.querySelector(".toc__list");
    var items = {};

    headings.forEach(function (h) {
      var li = document.createElement("li");
      li.className = "toc__item" + (h.tagName === "H3" ? " toc__item--sub" : "");

      var a = document.createElement("a");
      a.href = "#" + h.id;
      a.textContent = h.textContent.trim();

      li.appendChild(a);
      list.appendChild(li);
      items[h.id] = li;
    });

    toc.hidden = false;

    if (reduceMotion || !("IntersectionObserver" in window)) return;

    // Scroll-spy: mark the heading nearest the top of the viewport.
    var visible = new Set();
    var spy = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) visible.add(e.target.id);
          else visible.delete(e.target.id);
        });

        var current = null;
        for (var i = 0; i < headings.length; i++) {
          if (visible.has(headings[i].id)) { current = headings[i].id; break; }
        }
        // Nothing on screen (mid-section): keep the last heading passed.
        if (!current) {
          for (var j = headings.length - 1; j >= 0; j--) {
            if (headings[j].getBoundingClientRect().top < 120) {
              current = headings[j].id;
              break;
            }
          }
        }

        Object.keys(items).forEach(function (id) {
          items[id].classList.toggle("is-active", id === current);
        });
      },
      { rootMargin: "-80px 0px -70% 0px", threshold: 0 }
    );

    headings.forEach(function (h) { spy.observe(h); });
  })();

  /* --- Scroll reveal ------------------------------------------------------ */
  var revealables = document.querySelectorAll(".reveal");

  if (!revealables.length) return;

  // No IntersectionObserver, or the user prefers less motion: show everything.
  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealables.forEach(function (el) {
      el.classList.add("is-visible");
    });
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -10% 0px", threshold: 0.05 }
  );

  revealables.forEach(function (el) {
    observer.observe(el);
  });
})();
