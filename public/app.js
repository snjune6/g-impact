(() => {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.querySelectorAll(".choices button").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".choices button").forEach((item) => item.setAttribute("aria-pressed", "false"));
      button.setAttribute("aria-pressed", "true");
    });
  });

  const form = document.getElementById("consult");
  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      form.querySelector(".done").hidden = false;
    });
  }

  /* Hero staggered reveal */
  document.querySelectorAll(".reveal-hero").forEach((el, index) => {
    el.style.setProperty("--hero-delay", `${800 + index * 1100}ms`);
    requestAnimationFrame(() => el.classList.add("is-shown"));
  });

  /* Scroll reveal */
  const reveals = [...document.querySelectorAll(".reveal")];
  function markInView(el) {
    el.classList.add("is-inview");
  }
  if (reduce) {
    reveals.forEach(markInView);
  } else if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            markInView(entry.target);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -5% 0px" }
    );
    reveals.forEach((el, index) => {
      el.style.setProperty("--reveal-delay", `${Math.min(index % 4, 3) * 80}ms`);
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) markInView(el);
      else io.observe(el);
    });
  } else {
    reveals.forEach(markInView);
  }

  /* Bubble focus cycle */
  const bubbleRoot = document.querySelector("[data-bubble-cycle]");
  if (bubbleRoot && !reduce) {
    const bubbles = [...bubbleRoot.querySelectorAll(".bubble")];
    let focus = 0;
    setInterval(() => {
      focus = (focus + 1) % bubbles.length;
      bubbles.forEach((bubble, index) => {
        bubble.classList.toggle("is-focus", index === focus);
        bubble.classList.toggle("is-mid", index === (focus + 1) % bubbles.length);
        bubble.classList.toggle("is-dim", index === (focus + 2) % bubbles.length);
      });
    }, 2200);
  }

  /* Products step active cycle */
  const stepsRoot = document.querySelector("[data-steps-cycle]");
  if (stepsRoot && !reduce) {
    const steps = [...stepsRoot.querySelectorAll("li")];
    let active = 0;
    let timer = null;
    const paint = () => {
      steps.forEach((step, index) => step.classList.toggle("is-active", index === active));
    };
    const start = () => {
      if (timer) return;
      timer = setInterval(() => {
        active = (active + 1) % steps.length;
        paint();
      }, 1600);
    };
    const stop = () => {
      if (!timer) return;
      clearInterval(timer);
      timer = null;
    };
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) start();
            else stop();
          });
        },
        { threshold: 0.35 }
      );
      io.observe(stepsRoot);
    } else {
      start();
    }
  }

  /* Process deck stacking */
  const screenCard = document.getElementById("screen-card");
  if (!screenCard) return;

  const screenSlides = [...screenCard.querySelectorAll(".deck-card")];
  const screenMotion = reduce ? 0 : 320;
  let screenIndex = 0;
  let screenPlaying = false;

  function measureDeck(card, mode) {
    if (mode === "hidden") return 0;
    const probe = card.cloneNode(true);
    probe.classList.toggle("is-open", mode === "open");
    probe.classList.toggle("is-peek", mode === "peek");
    probe.setAttribute("aria-hidden", "true");
    probe.style.cssText =
      "position:absolute;width:" +
      card.getBoundingClientRect().width +
      "px;height:auto;overflow:visible;visibility:hidden;pointer-events:none;transition:none;margin:0;";
    card.parentElement.appendChild(probe);
    const height = probe.querySelector(".deck-shell").offsetHeight;
    probe.remove();
    return height;
  }

  function showScreen(next) {
    screenIndex = next;
    const modes = screenSlides.map((_, index) =>
      index === next ? "open" : index < next ? "peek" : "hidden"
    );
    const targets = screenSlides.map((card, index) => measureDeck(card, modes[index]));
    screenSlides.forEach((card) => {
      card.style.height = card.getBoundingClientRect().height + "px";
    });
    screenSlides[0].getBoundingClientRect();
    screenSlides.forEach((card, index) => {
      const open = modes[index] === "open";
      card.classList.toggle("is-open", open);
      card.classList.toggle("is-peek", modes[index] === "peek");
      card.style.height = targets[index] + "px";
      if (open) card.removeAttribute("aria-hidden");
      else card.setAttribute("aria-hidden", "true");
    });
  }

  window.addEventListener("resize", () => {
    const modes = screenSlides.map((card) =>
      card.classList.contains("is-open") ? "open" : card.classList.contains("is-peek") ? "peek" : "hidden"
    );
    screenSlides.forEach((card, index) => {
      card.style.transition = "none";
      card.style.height = measureDeck(card, modes[index]) + "px";
    });
    screenSlides[0].getBoundingClientRect();
    screenSlides.forEach((card) => {
      card.style.transition = "";
    });
  });

  function advanceScreen() {
    const next = (screenIndex + 1) % screenSlides.length;
    showScreen(next);
    if (next === 0) {
      window.setTimeout(() => {
        screenPlaying = false;
        screenCard.classList.add("is-ready");
      }, screenMotion);
      return;
    }
    window.setTimeout(advanceScreen, 850 + screenMotion);
  }

  showScreen(0);

  screenCard.querySelector(".screen-play").addEventListener("click", () => {
    if (screenPlaying || screenIndex !== 0) return;
    screenPlaying = true;
    screenCard.classList.remove("is-ready");
    showScreen(1);
    window.setTimeout(advanceScreen, 850 + screenMotion);
  });
})();
