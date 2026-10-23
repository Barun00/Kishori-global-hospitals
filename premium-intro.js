/* ==========================================================
   KISHORI GLOBAL HOSPITAL
   PREMIUM CINEMATIC LOGO INTRO
   Isolated module — does not replace website functionality
   ========================================================== */

(function () {
  "use strict";

  if (!document.body || document.getElementById("kghPremiumIntro")) {
    return;
  }

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const style = document.createElement("style");
  style.id = "kghPremiumIntroStyles";

  style.textContent = `
    #kghPremiumIntro {
      --kgh-teal: #53B4CD;
      --kgh-navy: #0F2D4D;
      --kgh-cyan: #B4F1FC;

      position: fixed;
      inset: 0;
      z-index: 999999;

      display: grid;
      place-items: center;

      width: 100%;
      height: 100%;
      height: 100dvh;

      overflow: hidden;
      isolation: isolate;

      color: #fff;

      background:
        radial-gradient(
          ellipse at 50% 40%,
          rgba(40, 132, 163, .28),
          transparent 37%
        ),
        radial-gradient(
          circle at 12% 90%,
          rgba(38, 123, 164, .18),
          transparent 30%
        ),
        linear-gradient(
          145deg,
          #061522 0%,
          #0F2D4D 52%,
          #071827 100%
        );

      font-family: 'Poppins', sans-serif;

      opacity: 1;
      visibility: visible;

      transition:
        opacity .85s cubic-bezier(.76, 0, .24, 1),
        visibility .85s ease;
    }

    #kghPremiumIntro *,
    #kghPremiumIntro *::before,
    #kghPremiumIntro *::after {
      box-sizing: border-box;
    }

    #kghPremiumIntro.kgh-exiting {
      opacity: 0;
      visibility: hidden;
      pointer-events: none;
    }

    #kghPremiumIntro .kgh-grid {
      position: absolute;
      inset: 0;
      z-index: -2;

      opacity: .16;
      pointer-events: none;

      background-image:
        radial-gradient(
          rgba(176, 232, 245, .5) .7px,
          transparent .7px
        );

      background-size: 34px 34px;

      mask-image:
        radial-gradient(
          ellipse at center,
          #000 0%,
          transparent 75%
        );
    }

    #kghPremiumIntro .kgh-ambient {
      position: absolute;
      z-index: -1;

      width: min(65vw, 580px);
      aspect-ratio: 1;

      border-radius: 50%;
      filter: blur(100px);
      opacity: .12;
      pointer-events: none;
    }

    #kghPremiumIntro .kgh-ambient-a {
      top: -32%;
      left: -20%;
      background: #37BBD6;

      animation: kghAmbientA 7s ease-in-out infinite alternate;
    }

    #kghPremiumIntro .kgh-ambient-b {
      right: -20%;
      bottom: -35%;
      background: #287AB4;

      animation: kghAmbientB 8s ease-in-out infinite alternate;
    }

    /* Subtle light beams */

    #kghPremiumIntro .kgh-beam {
      position: absolute;
      top: -25%;
      left: -65%;

      width: 28%;
      height: 150%;

      opacity: 0;
      pointer-events: none;

      background: linear-gradient(
        90deg,
        transparent,
        rgba(121, 219, 239, .065),
        transparent
      );

      transform: rotate(24deg);
      animation: kghBeam 2.3s ease .55s forwards;
    }

    /* Composition */

    #kghPremiumIntro .kgh-stage {
      position: relative;

      display: flex;
      flex-direction: column;
      align-items: center;

      width: min(92%, 520px);
      padding: 25px 12px;

      text-align: center;

      animation: kghStageIn .9s cubic-bezier(.16, 1, .3, 1) both;
    }

    /* Logo and orbital animation */

    #kghPremiumIntro .kgh-emblem {
      position: relative;

      display: grid;
      place-items: center;

      width: 246px;
      height: 246px;

      margin-bottom: 17px;
    }

    #kghPremiumIntro .kgh-glow {
      position: absolute;

      width: 155px;
      height: 155px;

      border-radius: 50%;
      background: var(--kgh-teal);
      filter: blur(52px);

      opacity: 0;
      animation: kghGlow 1.5s ease .25s forwards;
    }

    #kghPremiumIntro .kgh-orbit {
      position: absolute;

      border: 1px solid transparent;
      border-radius: 50%;

      opacity: 0;
    }

    #kghPremiumIntro .kgh-orbit-a {
      width: 190px;
      height: 190px;

      border-top-color: rgba(151, 236, 249, .9);
      border-right-color: rgba(151, 236, 249, .17);

      animation:
        kghOrbitAppear .7s ease .2s forwards,
        kghOrbitSpin 10s linear .9s infinite;
    }

    #kghPremiumIntro .kgh-orbit-b {
      width: 222px;
      height: 222px;

      border-bottom-color: rgba(83, 180, 205, .8);
      border-left-color: rgba(83, 180, 205, .2);

      animation:
        kghOrbitAppear .7s ease .35s forwards,
        kghOrbitReverse 13s linear 1s infinite;
    }

    #kghPremiumIntro .kgh-orbit-c {
      width: 238px;
      height: 238px;

      border: 1px dashed rgba(172, 230, 244, .16);

      animation:
        kghOrbitAppear .8s ease .5s forwards,
        kghOrbitSpin 24s linear 1s infinite;
    }

    /* Premium white logo plate */

    #kghPremiumIntro .kgh-logo-plate {
      position: relative;
      z-index: 2;

      display: grid;
      place-items: center;

      width: 132px;
      height: 132px;

      padding: 8px;
      overflow: hidden;

      background: #fff;
      border: 1px solid rgba(255, 255, 255, .88);
      border-radius: 29px;

      box-shadow:
        0 0 0 7px rgba(255, 255, 255, .035),
        0 22px 70px rgba(0, 0, 0, .30),
        0 0 45px rgba(83, 180, 205, .20);

      opacity: 0;

      transform:
        translateY(15px)
        scale(.65)
        rotate(-7deg);

      animation:
        kghLogoReveal 1.05s cubic-bezier(.16, 1, .3, 1) .16s forwards;
    }

    #kghPremiumIntro .kgh-logo {
      display: block;

      width: 100%;
      height: 100%;

      object-fit: contain;
      border-radius: 21px;
    }

    #kghPremiumIntro .kgh-logo-fallback {
      display: none;

      color: var(--kgh-teal);
      font-size: 82px;
      font-weight: 800;
      line-height: 1;
    }

    /* Reflection crossing the logo plate */

    #kghPremiumIntro .kgh-logo-plate::after {
      content: "";

      position: absolute;
      top: -40%;
      left: -100%;

      width: 48%;
      height: 180%;

      background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, .9),
        transparent
      );

      transform: rotate(22deg);
      pointer-events: none;

      animation: kghReflection 1s ease 1s forwards;
    }

    /* Tiny floating light particles */

    #kghPremiumIntro .kgh-particle {
      position: absolute;
      z-index: 3;

      width: 5px;
      height: 5px;

      border-radius: 50%;
      background: var(--kgh-cyan);

      box-shadow:
        0 0 10px rgba(180, 241, 252, .9),
        0 0 24px rgba(83, 180, 205, .65);

      opacity: 0;
      pointer-events: none;
    }

    #kghPremiumIntro .kgh-particle-a {
      top: 39px;
      right: 40px;
      animation: kghParticle 1.1s ease .9s forwards;
    }

    #kghPremiumIntro .kgh-particle-b {
      left: 32px;
      bottom: 48px;
      width: 4px;
      height: 4px;
      animation: kghParticle 1.1s ease 1.1s forwards;
    }

    #kghPremiumIntro .kgh-particle-c {
      right: 21px;
      bottom: 80px;
      width: 3px;
      height: 3px;
      animation: kghParticle 1.1s ease 1.3s forwards;
    }

    /* Brand identity */

    #kghPremiumIntro .kgh-copy {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
    }

    #kghPremiumIntro .kgh-overline {
      color: #9BC9D8;

      font-size: 9px;
      font-weight: 500;
      letter-spacing: 3px;

      opacity: 0;
      transform: translateY(9px);

      animation: kghTextReveal .7s ease .68s forwards;
    }

    #kghPremiumIntro .kgh-wordmark {
      margin: 13px 0 0;

      color: #fff;

      font-size: clamp(25px, 6vw, 36px);
      font-weight: 800;
      letter-spacing: 2px;
      line-height: 1.35;

      opacity: 0;
      transform: translateY(13px);

      animation: kghTextReveal .8s ease .82s forwards;
    }

    #kghPremiumIntro .kgh-wordmark span {
      color: var(--kgh-teal);
    }

    #kghPremiumIntro .kgh-divider {
      width: 0;
      height: 1px;

      margin-top: 17px;

      background: linear-gradient(
        90deg,
        transparent,
        var(--kgh-teal),
        transparent
      );

      animation: kghDivider .75s ease 1.12s forwards;
    }

    #kghPremiumIntro .kgh-subline {
      margin: 12px 0 0;

      color: #D5E7EF;
      font-size: 9px;
      font-weight: 500;
      letter-spacing: 5px;

      opacity: 0;
      transform: translateY(8px);

      animation: kghTextReveal .75s ease 1.2s forwards;
    }

    /* Animated progress */

    #kghPremiumIntro .kgh-loader {
      display: flex;
      flex-direction: column;
      align-items: center;

      width: 174px;
      margin-top: 35px;

      opacity: 0;

      animation: kghTextReveal .55s ease 1.1s forwards;
    }

    #kghPremiumIntro .kgh-track {
      width: 100%;
      height: 2px;

      overflow: hidden;
      border-radius: 20px;

      background: rgba(255, 255, 255, .15);
    }

    #kghPremiumIntro .kgh-track span {
      display: block;

      width: 100%;
      height: 100%;

      background: linear-gradient(
        90deg,
        #2C7F9B,
        #B4F1FC,
        #53B4CD
      );

      box-shadow: 0 0 14px rgba(83, 180, 205, .65);

      transform: scaleX(0);
      transform-origin: left;

      animation: kghProgress 3s cubic-bezier(.4, 0, .2, 1) forwards;
    }

    #kghPremiumIntro .kgh-loader-label {
      margin: 12px 0 0;

      color: #829FB0;
      font-size: 8px;
      font-weight: 500;
      letter-spacing: 2.5px;
    }

    /* Corner details */

    #kghPremiumIntro .kgh-corner {
      position: absolute;

      width: 32px;
      height: 32px;

      border: solid rgba(111, 193, 215, .42);

      opacity: 0;
      animation: kghCornerReveal .7s ease .8s forwards;

      pointer-events: none;
    }

    #kghPremiumIntro .kgh-corner-a {
      top: 28px;
      left: 28px;
      border-width: 1px 0 0 1px;
    }

    #kghPremiumIntro .kgh-corner-b {
      right: 28px;
      bottom: 28px;
      border-width: 0 1px 1px 0;
    }

    #kghPremiumIntro .kgh-signature {
      position: absolute;
      right: 31px;
      bottom: 34px;

      color: #7995A6;
      font-size: 8px;
      font-weight: 500;
      letter-spacing: 1.6px;

      opacity: 0;
      animation: kghCornerReveal .7s ease 1s forwards;
    }

    #kghPremiumIntro .kgh-signature span {
      color: var(--kgh-teal);
    }

    /* Skip intro */

    #kghPremiumIntro .kgh-skip {
      position: absolute;
      top: 25px;
      right: 26px;

      display: inline-flex;
      align-items: center;
      gap: 8px;

      padding: 9px 13px;

      color: #D4E5ED;
      background: rgba(255, 255, 255, .045);

      border: 1px solid rgba(255, 255, 255, .17);
      border-radius: 28px;

      font: 500 10px 'Poppins', sans-serif;
      letter-spacing: .3px;

      cursor: pointer;

      transition:
        background .2s ease,
        color .2s ease,
        border-color .2s ease;
    }

    #kghPremiumIntro .kgh-skip:hover {
      color: #fff;
      background: rgba(255, 255, 255, .12);
      border-color: rgba(180, 241, 252, .5);
    }

    #kghPremiumIntro .kgh-skip:focus-visible {
      outline: 2px solid var(--kgh-cyan);
      outline-offset: 4px;
    }

    /* Motion */

    @keyframes kghStageIn {
      from { opacity: 0; transform: translateY(12px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    @keyframes kghLogoReveal {
      0% {
        opacity: 0;
        transform: translateY(15px) scale(.65) rotate(-7deg);
        filter: blur(7px);
      }

      70% {
        opacity: 1;
        filter: blur(0);
      }

      100% {
        opacity: 1;
        transform: translateY(0) scale(1) rotate(0);
        filter: blur(0);
      }
    }

    @keyframes kghOrbitAppear {
      to { opacity: 1; }
    }

    @keyframes kghOrbitSpin {
      to { transform: rotate(360deg); }
    }

    @keyframes kghOrbitReverse {
      from { transform: rotate(360deg); }
      to   { transform: rotate(0deg); }
    }

    @keyframes kghGlow {
      from { opacity: 0; transform: scale(.45); }
      to   { opacity: .2; transform: scale(1.12); }
    }

    @keyframes kghReflection {
      from { left: -100%; }
      to   { left: 150%; }
    }

    @keyframes kghParticle {
      0% { opacity: 0; transform: scale(.3); }
      50% { opacity: 1; transform: scale(1.5); }
      100% { opacity: .75; transform: scale(1); }
    }

    @keyframes kghTextReveal {
      to { opacity: 1; transform: translateY(0); }
    }

    @keyframes kghDivider {
      to { width: 180px; }
    }

    @keyframes kghProgress {
      0% { transform: scaleX(0); }
      75% { transform: scaleX(.82); }
      100% { transform: scaleX(1); }
    }

    @keyframes kghAmbientA {
      from { transform: translate(-15px, -10px) scale(.9); }
      to   { transform: translate(65px, 60px) scale(1.2); }
    }

    @keyframes kghAmbientB {
      from { transform: translate(15px, 10px) scale(.9); }
      to   { transform: translate(-55px, -50px) scale(1.15); }
    }

    @keyframes kghBeam {
      0% { left: -65%; opacity: 0; }
      15% { opacity: 1; }
      100% { left: 145%; opacity: 0; }
    }

    @keyframes kghCornerReveal {
      to { opacity: 1; }
    }

    /* Mobile composition */

    @media (max-width: 540px) {
      #kghPremiumIntro .kgh-emblem {
        width: 214px;
        height: 214px;
        margin-bottom: 20px;
      }

      #kghPremiumIntro .kgh-logo-plate {
        width: 116px;
        height: 116px;
        border-radius: 25px;
      }

      #kghPremiumIntro .kgh-orbit-a {
        width: 168px;
        height: 168px;
      }

      #kghPremiumIntro .kgh-orbit-b {
        width: 193px;
        height: 193px;
      }

      #kghPremiumIntro .kgh-orbit-c {
        width: 207px;
        height: 207px;
      }

      #kghPremiumIntro .kgh-overline {
        font-size: 8px;
        letter-spacing: 2px;
      }

      #kghPremiumIntro .kgh-wordmark {
        letter-spacing: 1px;
      }

      #kghPremiumIntro .kgh-subline {
        letter-spacing: 4px;
      }

      #kghPremiumIntro .kgh-corner-a {
        top: 18px;
        left: 18px;
      }

      #kghPremiumIntro .kgh-corner-b {
        right: 18px;
        bottom: 18px;
      }

      #kghPremiumIntro .kgh-signature {
        right: 20px;
        bottom: 23px;
        font-size: 7px;
      }

      #kghPremiumIntro .kgh-skip {
        top: 16px;
        right: 16px;
      }
    }

    @media (max-height: 640px) {
      #kghPremiumIntro .kgh-stage {
        transform: scale(.83);
      }

      #kghPremiumIntro .kgh-emblem {
        margin-bottom: 4px;
      }

      #kghPremiumIntro .kgh-loader {
        margin-top: 20px;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      #kghPremiumIntro *,
      #kghPremiumIntro *::before,
      #kghPremiumIntro *::after {
        animation-duration: .01ms !important;
        animation-iteration-count: 1 !important;
        scroll-behavior: auto !important;
      }

      #kghPremiumIntro {
        transition-duration: .2s;
      }
    }
  `;

  document.head.appendChild(style);

  const intro = document.createElement("div");
  intro.id = "kghPremiumIntro";
  intro.setAttribute("role", "dialog");
  intro.setAttribute("aria-label", "Kishori Global Hospital introduction");
  intro.setAttribute("aria-modal", "true");

  intro.innerHTML = `
    <div class="kgh-grid"></div>

    <div class="kgh-ambient kgh-ambient-a"></div>
    <div class="kgh-ambient kgh-ambient-b"></div>
    <div class="kgh-beam"></div>

    <button type="button" class="kgh-skip">
      Skip intro <span aria-hidden="true">→</span>
    </button>

    <div class="kgh-stage">
      <div class="kgh-emblem">
        <div class="kgh-glow"></div>

        <div class="kgh-orbit kgh-orbit-a"></div>
        <div class="kgh-orbit kgh-orbit-b"></div>
        <div class="kgh-orbit kgh-orbit-c"></div>

        <div class="kgh-logo-plate">
          <img
            class="kgh-logo"
            src="logo-mark.png"
            alt="Kishori Global Hospital logo">

          <span class="kgh-logo-fallback" aria-hidden="true">K</span>
        </div>

        <span class="kgh-particle kgh-particle-a"></span>
        <span class="kgh-particle kgh-particle-b"></span>
        <span class="kgh-particle kgh-particle-c"></span>
      </div>

      <div class="kgh-copy">
        <span class="kgh-overline">
          YOUR HEALTH. OUR PRIORITY.
        </span>

        <h1 class="kgh-wordmark">
          KISHORI <span>GLOBAL</span>
        </h1>

        <div class="kgh-divider"></div>

        <p class="kgh-subline">HOSPITAL · CARING FOR LIFE</p>
      </div>

      <div class="kgh-loader" aria-hidden="true">
        <div class="kgh-track">
          <span></span>
        </div>

        <p class="kgh-loader-label">WELCOME TO BETTER CARE</p>
      </div>
    </div>

    <span class="kgh-corner kgh-corner-a"></span>
    <span class="kgh-corner kgh-corner-b"></span>

    <span class="kgh-signature">
      KGH <span>·</span> HEALTHCARE
    </span>
  `;

  const previousOverflow = document.body.style.overflow;
  const previousFocus = document.activeElement;

  document.body.appendChild(intro);
  document.body.style.overflow = "hidden";

  const skipButton = intro.querySelector(".kgh-skip");
  const logo = intro.querySelector(".kgh-logo");
  const logoFallback = intro.querySelector(".kgh-logo-fallback");

  logo.addEventListener("error", () => {
    logo.style.display = "none";
    logoFallback.style.display = "block";
  });

  let isExiting = false;

  function finishIntro() {
    if (isExiting) return;
    isExiting = true;

    intro.classList.add("kgh-exiting");
    document.body.style.overflow = previousOverflow;

    window.removeEventListener("keydown", onIntroKeydown);

    const removeDelay = reduceMotion ? 220 : 900;

    window.setTimeout(() => {
      intro.remove();
      style.remove();
    }, removeDelay);

    if (previousFocus && typeof previousFocus.focus === "function") {
      window.setTimeout(() => previousFocus.focus({ preventScroll: true }), 0);
    }
  }

  function onIntroKeydown(event) {
    if (event.key === "Escape") {
      finishIntro();
    }
  }

  skipButton.addEventListener("click", finishIntro);
  window.addEventListener("keydown", onIntroKeydown);

  // Show the intro briefly; then reveal the unchanged homepage.
  window.setTimeout(
    finishIntro,
    reduceMotion ? 700 : 3650
  );

  // Put keyboard focus on the skip control.
  skipButton.focus({ preventScroll: true });

})();