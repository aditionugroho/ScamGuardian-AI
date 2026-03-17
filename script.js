/* ═══════════════════════════════════════════════════════════
   Guardian — Main Application Script
═══════════════════════════════════════════════════════════ */

const Guardian = (() => {
  const PAGES = ["home", "checker", "url", "message"];
  let currentPage = "home";
  let toastTimer = null;
  let dropdownOpen = false;
  let mobileOpen = false;
  let countersRun = false;

  /* ── Page Router ──────────────────────────────────────── */
  function go(name) {
    if (!PAGES.includes(name)) return;

    // Close menus
    closeDropdown();
    closeMobile();

    // Hide all pages
    PAGES.forEach((p) => {
      const el = document.getElementById("page-" + p);
      if (el) el.classList.add("hidden");
    });

    const target = document.getElementById("page-" + name);
    if (!target) return;

    target.classList.remove("hidden");
    target.classList.add("page-enter");
    setTimeout(() => target.classList.remove("page-enter"), 400);

    // Inject shared footer into sub-pages
    const footerSlots = {
      checker: "checker-footer",
      url: "url-footer",
      message: "msg-footer",
    };
    const slotId = footerSlots[name];
    if (slotId) {
      const slot = document.getElementById(slotId);
      if (slot && slot.innerHTML.trim() === "") {
        const tmpl = document.getElementById("footer-template");
        if (tmpl) slot.appendChild(tmpl.content.cloneNode(true));
      }
    }

    // Reset result panels
    if (name === "checker") {
      document.getElementById("checker-result").classList.add("hidden");
    }
    if (name === "url") {
      document.getElementById("url-result").classList.add("hidden");
    }
    if (name === "message") {
      resetMsg();
    }

    currentPage = name;
    updateNav(name);
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Re-run reveal for new page
    setTimeout(runReveal, 100);
  }

  /* ── Nav Highlight ────────────────────────────────────── */
  function updateNav(page) {
    document
      .querySelectorAll(".nav-btn")
      .forEach((btn) => btn.classList.remove("active"));
    const map = {
      home: "home",
      checker: "tools",
      url: "tools",
      message: "tools",
      stats: "stats",
    };
    const target = map[page];
    if (target) {
      document
        .querySelectorAll(`[data-nav="${target}"]`)
        .forEach((btn) => btn.classList.add("active"));
    }
  }

  /* ── Dropdown ─────────────────────────────────────────── */
  function toggleDropdown() {
    dropdownOpen = !dropdownOpen;
    const dd = document.getElementById("nav-dropdown");
    const arrow = document.getElementById("dropdown-arrow");
    if (dropdownOpen) {
      dd.classList.remove("hidden");
      arrow.style.transform = "rotate(180deg)";
    } else {
      closeDropdown();
    }
  }

  function closeDropdown() {
    dropdownOpen = false;
    const dd = document.getElementById("nav-dropdown");
    const arrow = document.getElementById("dropdown-arrow");
    if (dd) dd.classList.add("hidden");
    if (arrow) arrow.style.transform = "rotate(0deg)";
  }

  /* ── Mobile Menu ──────────────────────────────────────── */
  function toggleMobile() {
    mobileOpen = !mobileOpen;
    const menu = document.getElementById("mobile-menu");
    if (mobileOpen) {
      menu.classList.remove("hidden");
    } else {
      menu.classList.add("hidden");
    }
  }

  function closeMobile() {
    mobileOpen = false;
    const menu = document.getElementById("mobile-menu");
    if (menu) menu.classList.add("hidden");
  }

  /* ── About Modal ──────────────────────────────────────── */
  function showAbout() {
    closeMobile();
    closeDropdown();
    document.getElementById("about-modal").classList.remove("hidden");
  }

  function closeAbout() {
    document.getElementById("about-modal").classList.add("hidden");
  }

  /* ── Scroll to Stats ──────────────────────────────────── */
  function scrollStats() {
    closeMobile();
    if (currentPage !== "home") {
      go("home");
      setTimeout(() => {
        const el = document.getElementById("stats");
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 400);
    } else {
      const el = document.getElementById("stats");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  /* ── Hero Search ──────────────────────────────────────── */
  function heroSearch() {
    const val = document.getElementById("hero-search").value.trim();
    go("checker");
    if (val) {
      setTimeout(() => {
        const input = document.getElementById("checker-input");
        if (input) {
          input.value = val;
          input.focus();
        }
      }, 350);
    }
  }

  /* ── Scan Simulation ──────────────────────────────────── */
  function simulateScan(btnId, callback) {
    const btn = document.getElementById(btnId);
    if (!btn) return;
    const orig = btn.innerHTML;
    btn.innerHTML = '<span class="spinner"></span>';
    btn.disabled = true;
    setTimeout(() => {
      btn.innerHTML = orig;
      btn.disabled = false;
      callback();
    }, 1400);
  }

  /* ── Checker ──────────────────────────────────────────── */
  function runChecker() {
    simulateScan("checker-submit", () => {
      const result = document.getElementById("checker-result");
      result.classList.remove("hidden");
      result.classList.add("page-enter");
      setTimeout(() => result.classList.remove("page-enter"), 400);
      setTimeout(
        () => result.scrollIntoView({ behavior: "smooth", block: "start" }),
        50,
      );
    });
  }

  function reportNumber() {
    toast(
      "success",
      "Laporan Dikirim",
      "Nomor ini telah dilaporkan ke database kami.",
    );
  }

  /* ── URL Checker ──────────────────────────────────────── */
  function runUrl() {
    simulateScan("url-submit", () => {
      const result = document.getElementById("url-result");
      result.classList.remove("hidden");
      result.classList.add("page-enter");
      setTimeout(() => result.classList.remove("page-enter"), 400);
      // Animate risk circle
      setTimeout(() => {
        const arc = document.getElementById("risk-arc");
        const num = document.getElementById("risk-num");
        if (arc) {
          // 85/100 → dashoffset = 314 - (85/100 * 314) = 314 - 266.9 = 47.1
          arc.style.strokeDashoffset = "47";
        }
        if (num) animateNumber(num, 0, 85, 1200);
      }, 100);
      setTimeout(
        () => result.scrollIntoView({ behavior: "smooth", block: "start" }),
        50,
      );
    });
  }

  /* ── Message Analysis ─────────────────────────────────── */
  function runMessage() {
    const input = document.getElementById("msg-input");
    if (!input || input.value.trim() === "") {
      toast(
        "warning",
        "Input Kosong",
        "Masukkan teks pesan yang ingin dianalisis.",
      );
      input.focus();
      return;
    }
    simulateScan("msg-submit", () => {
      document.getElementById("msg-placeholder").classList.add("hidden");
      const result = document.getElementById("msg-result");
      result.classList.remove("hidden");
      result.classList.add("page-enter");
      setTimeout(() => result.classList.remove("page-enter"), 400);
      // Animate progress bar
      setTimeout(() => {
        const bar = document.getElementById("msg-progress");
        if (bar) bar.style.width = "98.4%";
      }, 200);
    });
  }

  function resetMsg() {
    const result = document.getElementById("msg-result");
    const placeholder = document.getElementById("msg-placeholder");
    if (result) result.classList.add("hidden");
    if (placeholder) placeholder.classList.remove("hidden");
    const bar = document.getElementById("msg-progress");
    if (bar) bar.style.width = "0%";
  }

  /* ── Toast ────────────────────────────────────────────── */
  const TOAST_ICONS = {
    success: {
      bg: "bg-green-500/20",
      color: "text-green-400",
      svg: '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>',
    },
    warning: {
      bg: "bg-orange-500/20",
      color: "text-orange-400",
      svg: '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>',
    },
    info: {
      bg: "bg-cyan-500/20",
      color: "text-cyan-400",
      svg: '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>',
    },
    error: {
      bg: "bg-red-500/20",
      color: "text-red-400",
      svg: '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>',
    },
  };

  function toast(type, title, msg) {
    const el = document.getElementById("toast");
    const icon = document.getElementById("toast-icon");
    const t = document.getElementById("toast-title");
    const m = document.getElementById("toast-msg");
    const cfg = TOAST_ICONS[type] || TOAST_ICONS.info;

    icon.className = `w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${cfg.bg} ${cfg.color}`;
    icon.innerHTML = cfg.svg;
    t.textContent = title;
    m.textContent = msg;

    el.classList.remove("hidden", "hide");
    el.classList.add("show");

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      el.classList.remove("show");
      el.classList.add("hide");
      setTimeout(() => {
        el.classList.add("hidden");
        el.classList.remove("hide");
      }, 300);
    }, 3000);
  }

  /* ── Counter Animation ────────────────────────────────── */
  function animateNumber(el, from, to, duration) {
    const start = performance.now();
    function step(now) {
      const progress = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(from + (to - from) * ease);
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  function runCounters() {
    if (countersRun) return;
    countersRun = true;
    document.querySelectorAll(".counter").forEach((el) => {
      const target = parseInt(el.dataset.target);
      animateNumber(el, 0, target, 2000);
    });
  }

  /* ── Reveal on Scroll ─────────────────────────────────── */
  function runReveal() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 },
    );

    document
      .querySelectorAll(".reveal-card:not(.visible)")
      .forEach((el) => observer.observe(el));
  }

  /* ── Stats Observer ───────────────────────────────────── */
  function initStatsObserver() {
    const section = document.getElementById("stats");
    if (!section) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          runCounters();
          obs.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    obs.observe(section);
  }

  /* ── Close dropdown on outside click ─────────────────── */
  document.addEventListener("click", (e) => {
    const wrap = document.getElementById("nav-dropdown-wrap");
    if (wrap && !wrap.contains(e.target)) closeDropdown();
  });

  /* ── Keyboard shortcuts ───────────────────────────────── */
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeDropdown();
      closeMobile();
      closeAbout();
    }
  });

  /* ── Init ─────────────────────────────────────────────── */
  function init() {
    go("home");
    initStatsObserver();
    setTimeout(runReveal, 200);
  }

  // Public API
  return {
    go,
    scrollStats,
    heroSearch,
    toggleDropdown,
    toggleMobile,
    showAbout,
    closeAbout,
    runChecker,
    reportNumber,
    runUrl,
    runMessage,
    resetMsg,
    toast,
  };
})();

// Boot
document.addEventListener("DOMContentLoaded", () => {
  Guardian.go("home");
});
