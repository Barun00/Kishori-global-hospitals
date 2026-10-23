/* ============================================================
   KISHORI GLOBAL HOSPITAL
   PREMIUM CINEMATIC LOGO INTRO
   Self-contained module: markup + styles + animation
   ============================================================ */

(function () {
    "use strict";

    const html = document.documentElement;

    // Keep the page hidden until the intro is ready.
    html.classList.add("kgh-intro-pending");

    // ---------------------------------------------------------
    // 1. COMPLETE INTRO STYLES
    // ---------------------------------------------------------

    const styles = `
        html.kgh-intro-pending,
        html.kgh-intro-pending body {
            overflow: hidden !important;
        }

        html.kgh-intro-pending body > :not(#kghPremiumIntro) {
            opacity: 0 !important;
            pointer-events: none !important;
        }

        body > :not(#kghPremiumIntro) {
            transition: opacity .65s ease;
        }

        #kghPremiumIntro {
            --kgh-teal: #53B4CD;
            --kgh-blue: #3A9EBB;
            --kgh-navy: #0F2D4D;

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

            color: #FFFFFF;

            background:
                radial-gradient(
                    ellipse at 50% 42%,
                    rgba(45, 128, 158, .22) 0%,
                    transparent 43%
                ),
                linear-gradient(
                    145deg,
                    #071827 0%,
                    #0F2D4D 53%,
                    #071725 100%
                );

            opacity: 1;
            visibility: visible;

            font-family: "Poppins", sans-serif;

            transition:
                opacity .9s cubic-bezier(.77, 0, .18, 1),
                visibility .9s ease;
        }

        #kghPremiumIntro *,
        #kghPremiumIntro *::before,
        #kghPremiumIntro *::after {
            box-sizing: border-box;
        }

        #kghPremiumIntro.kgh-exit {
            opacity: 0;
            visibility: hidden;
            pointer-events: none;
        }


        /* Ambient light */

        #kghPremiumIntro .kgh-light {
            position: absolute;
            z-index: -2;

            width: min(75vw, 650px);
            aspect-ratio: 1;

            border-radius: 50%;
            filter: blur(100px);

            opacity: .12;
            pointer-events: none;
        }

        #kghPremiumIntro .kgh-light-a {
            top: -28%;
            left: -24%;

            background: #36BDD8;

            animation:
                kghAmbientA 8s ease-in-out infinite alternate;
        }

        #kghPremiumIntro .kgh-light-b {
            right: -24%;
            bottom: -32%;

            background: #2376B8;

            animation:
                kghAmbientB 9s ease-in-out infinite alternate;
        }


        /* Delicate background grid */

        #kghPremiumIntro .kgh-grid {
            position: absolute;
            inset: 0;
            z-index: -1;

            opacity: .15;
            pointer-events: none;

            background-image:
                radial-gradient(
                    rgba(150, 222, 238, .27) .8px,
                    transparent .8px
                );

            background-size: 31px 31px;

            mask-image: radial-gradient(
                ellipse at center,
                black 0%,
                transparent 77%
            );
        }


        /* Main composition */

        #kghPremiumIntro .kgh-stage {
            position: relative;

            display: flex;
            flex-direction: column;
            align-items: center;

            width: min(92%, 520px);
            padding: 25px 12px;

            text-align: center;

            animation:
                kghStageIn 1s cubic-bezier(.16, 1, .3, 1) both;
        }


        /* Logo and orbital stage */

        #kghPremiumIntro .kgh-emblem {
            position: relative;

            display: grid;
            place-items: center;

            width: 252px;
            height: 252px;

            margin: 0 auto 19px;
        }

        #kghPremiumIntro .kgh-glow {
            position: absolute;

            width: 150px;
            height: 150px;

            border-radius: 50%;

            background: #53B4CD;
            filter: blur(51px);

            opacity: 0;

            animation: kghGlow 1.6s ease .4s forwards;
        }


        /* Orbit rings */

        #kghPremiumIntro .kgh-ring {
            position: absolute;

            border: 1px solid transparent;
            border-radius: 50%;

            opacity: 0;
        }

        #kghPremiumIntro .kgh-ring-a {
            width: 194px;
            height: 194px;

            border-top-color: rgba(126, 222, 241, .8);
            border-right-color: rgba(126, 222, 241, .14);

            animation:
                kghRingAppear .8s ease .25s forwards,
                kghSpin 10s linear 1.05s infinite;
        }

        #kghPremiumIntro .kgh-ring-b {
            width: 224px;
            height: 224px;

            border-bottom-color: rgba(126, 222, 241, .65);
            border-left-color: rgba(126, 222, 241, .13);

            animation:
                kghRingAppear .8s ease .4s forwards,
                kghSpinReverse 14s linear 1.2s infinite;
        }


        /* Logo card */

        #kghPremiumIntro .kgh-logo-card {
            position: relative;
            z-index: 2;

            display: grid;
            place-items: center;

            width: 138px;
            height: 138px;

            padding: 7px;
            overflow: hidden;

            background: #FFFFFF;

            border: 1px solid rgba(255, 255, 255, .85);
            border-radius: 29px;

            box-shadow:
                0 0 0 7px rgba(255, 255, 255, .035),
                0 22px 65px rgba(0, 0, 0, .28),
                0 0 40px rgba(83, 180, 205, .20);

            opacity: 0;

            transform:
                translateY(17px)
                scale(.65)
                rotate(-8deg);

            animation:
                kghLogoEnter 1.1s
                cubic-bezier(.16, 1, .3, 1)
                .18s forwards;
        }

        #kghPremiumIntro .kgh-logo {
            display: block;

            width: 100%;
            height: 100%;

            object-fit: contain;

            border-radius: 22px;
        }


        /* Light sweep over the logo */

        #kghPremiumIntro .kgh-logo-card::after {
            content: "";

            position: absolute;
            top: -40%;
            left: -85%;

            width: 45%;
            height: 180%;

            background: linear-gradient(
                90deg,
                transparent,
                rgba(255, 255, 255, .9),
                transparent
            );

            transform: rotate(23deg);

            animation: kghLightSweep 1.05s ease 1s forwards;

            pointer-events: none;
        }


        /* Tiny luminous accents */

        #kghPremiumIntro .kgh-spark {
            position: absolute;
            z-index: 3;

            width: 5px;
            height: 5px;

            border-radius: 50%;

            background: #C4F7FF;

            box-shadow:
                0 0 10px rgba(130, 226, 244, .9),
                0 0 24px rgba(83, 180, 205, .75);

            opacity: 0;

            animation: kghSpark 1.1s ease forwards;
        }

        #kghPremiumIntro .kgh-spark-a {
            top: 32px;
            right: 44px;
            animation-delay: .95s;
        }

        #kghPremiumIntro .kgh-spark-b {
            bottom: 44px;
            left: 38px;
            width: 4px;
            height: 4px;
            animation-delay: 1.15s;
        }

        #kghPremiumIntro .kgh-spark-c {
            right: 28px;
            bottom: 77px;
            width: 3px;
            height: 3px;
            animation-delay: 1.35s;
        }


        /* Brand copy */

        #kghPremiumIntro .kgh-copy {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 100%;
        }

        #kghPremiumIntro .kgh-eyebrow {
            color: #9CC8D7;

            font-size: 9px;
            font-weight: 500;
            letter-spacing: 3px;

            opacity: 0;
            transform: translateY(10px);

            animation: kghTextEnter .75s ease .7s forwards;
        }

        #kghPremiumIntro .kgh-wordmark {
            margin: 13px 0 0;

            color: #FFFFFF;

            font-family: "Poppins", sans-serif;
            font-size: clamp(25px, 6vw, 37px);
            font-weight: 800;
            letter-spacing: 2.3px;
            line-height: 1.4;

            opacity: 0;
            transform: translateY(14px);

            animation: kghTextEnter .8s ease .86s forwards;
        }

        #kghPremiumIntro .kgh-wordmark span {
            color: var(--kgh-teal);
        }


        /* Thin accent divider */

        #kghPremiumIntro .kgh-divider {
            width: 0;
            height: 1px;

            margin-top: 17px;

            background: linear-gradient(
                90deg,
                transparent,
                #53B4CD,
                transparent
            );

            animation: kghDivider .8s ease 1.12s forwards;
        }

        #kghPremiumIntro .kgh-tagline {
            margin: 12px 0 0;

            color: #D3E2EC;

            font-size: 9px;
            font-weight: 500;
            letter-spacing: 5px;

            opacity: 0;
            transform: translateY(8px);

            animation: kghTextEnter .75s ease 1.22s forwards;
        }


        /* Loader */

        #kghPremiumIntro .kgh-loader {
            display: flex;
            flex-direction: column;
            align-items: center;

            width: 170px;
            margin-top: 38px;

            opacity: 0;

            animation: kghTextEnter .55s ease 1.2s forwards;
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
                #A1EDF9,
                #3A9EBB
            );

            box-shadow: 0 0 12px rgba(83, 180, 205, .7);

            transform: scaleX(0);
            transform-origin: left;

            animation: kghLoad 2.7s cubic-bezier(.4, 0, .2, 1) forwards;
        }

        #kghPremiumIntro .kgh-loader-label {
            margin: 12px 0 0;

            color: #819CAF;

            font-size: 8px;
            font-weight: 500;
            letter-spacing: 2.5px;
        }


        /* Corner details */

        #kghPremiumIntro .kgh-corner {
            position: absolute;

            width: 32px;
            height: 32px;

            border: solid rgba(107, 188, 209, .45);

            opacity: 0;

            animation: kghCorner 1s ease .9s forwards;

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

            color: #809BAD;

            font-size: 8px;
            font-weight: 500;
            letter-spacing: 1.6px;

            opacity: 0;
            animation: kghCorner 1s ease 1s forwards;
        }

        #kghPremiumIntro .kgh-signature span {
            color: var(--kgh-teal);
        }


        /* Skip button */

        #kghPremiumIntro .kgh-skip {
            position: absolute;
            top: 25px;
            right: 26px;

            padding: 9px 13px;

            color: #C2D7E1;
            background: rgba(255, 255, 255, .045);

            border: 1px solid rgba(255, 255, 255, .16);
            border-radius: 30px;

            font: 500 10px "Poppins", sans-serif;
            letter-spacing: .3px;

            cursor: pointer;

            transition:
                background .2s ease,
                color .2s ease;
        }

        #kghPremiumIntro .kgh-skip:hover {
            color: #FFFFFF;
            background: rgba(255, 255, 255, .12);
        }


        /* Keyframes */

        @keyframes kghStageIn {
            from {
                opacity: 0;
                transform: translateY(12px);
            }

            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @keyframes kghLogoEnter {
            0% {
                opacity: 0;
                transform:
                    translateY(17px)
                    scale(.65)
                    rotate(-8deg);
                filter: blur(8px);
            }

            72% {
                opacity: 1;
                filter: blur(0);
            }

            100% {
                opacity: 1;
                transform:
                    translateY(0)
                    scale(1)
                    rotate(0);
                filter: blur(0);
            }
        }

        @keyframes kghLightSweep {
            0% {
                left: -85%;
            }

            100% {
                left: 145%;
            }
        }

        @keyframes kghRingAppear {
            to {
                opacity: 1;
            }
        }

        @keyframes kghSpin {
            to {
                transform: rotate(360deg);
            }
        }

        @keyframes kghSpinReverse {
            from {
                transform: rotate(360deg);
            }

            to {
                transform: rotate(0deg);
            }
        }

        @keyframes kghGlow {
            from {
                opacity: 0;
                transform: scale(.45);
            }

            to {
                opacity: .2;
                transform: scale(1.15);
            }
        }

        @keyframes kghSpark {
            0% {
                opacity: 0;
                transform: scale(.3);
            }

            50% {
                opacity: 1;
                transform: scale(1.5);
            }

            100% {
                opacity: .75;
                transform: scale(1);
            }
        }

        @keyframes kghTextEnter {
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @keyframes kghDivider {
            to {
                width: 180px;
            }
        }

        @keyframes kghLoad {
            0% {
                transform: scaleX(0);
            }

            75% {
                transform: scaleX(.84);
            }

            100% {
                transform: scaleX(1);
            }
        }

        @keyframes kghAmbientA {
            from {
                transform: translate(-20px, -10px) scale(.9);
            }

            to {
                transform: translate(65px, 65px) scale(1.2);
            }
        }

        @keyframes kghAmbientB {
            from {
                transform: translate(20px, 10px) scale(.9);
            }

            to {
                transform: translate(-55px, -55px) scale(1.15);
            }
        }

        @keyframes kghCorner {
            to {
                opacity: 1;
            }
        }


        /* Responsive layout */

        @media (max-width: 540px) {
            #kghPremiumIntro .kgh-emblem {
                width: 215px;
                height: 215px;
                margin-bottom: 22px;
            }

            #kghPremiumIntro .kgh-logo-card {
                width: 118px;
                height: 118px;
                border-radius: 25px;
            }

            #kghPremiumIntro .kgh-ring-a {
                width: 170px;
                height: 170px;
            }

            #kghPremiumIntro .kgh-ring-b {
                width: 196px;
                height: 196px;
            }

            #kghPremiumIntro .kgh-eyebrow {
                font-size: 8px;
                letter-spacing: 2px;
            }

            #kghPremiumIntro .kgh-wordmark {
                letter-spacing: 1.5px;
            }

            #kghPremiumIntro .kgh-tagline {
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
                bottom: 24px;
                font-size: 7px;
            }

            #kghPremiumIntro .kgh-skip {
                top: 17px;
                right: 17px;
            }
        }


        /* Reduced-motion support */

        @media (prefers-reduced-motion: reduce) {
            #kghPremiumIntro *,
            #kghPremiumIntro *::before,
            #kghPremiumIntro *::after {
                animation-duration: .01ms !important;
                animation-iteration-count: 1 !important;
            }

            #kghPremiumIntro {
                transition-duration: .2s;
            }
        }
    `;

    const style = document.createElement("style");
    style.id = "kghPremiumIntroStyles";
    style.textContent = styles;

    document.head.appendChild(style);


    // ---------------------------------------------------------
    // 2. CREATE THE INTRO
    // ---------------------------------------------------------

    function startIntro() {
        if (document.getElementById("kghPremiumIntro")) return;

        const reducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        const originalOverflow = document.body.style.overflow;

        document.body.style.overflow = "hidden";

        const intro = document.createElement("div");

        intro.id = "kghPremiumIntro";
        intro.setAttribute("role", "presentation");

        intro.innerHTML = `
            <div class="kgh-light kgh-light-a"></div>
            <div class="kgh-light kgh-light-b"></div>
            <div class="kgh-grid"></div>

            <button
                type="button"
                class="kgh-skip"
                aria-label="Skip introduction">
                Skip intro <span aria-hidden="true">→</span>
            </button>

            <div class="kgh-stage">

                <div class="kgh-emblem">

                    <div class="kgh-glow"></div>

                    <div class="kgh-ring kgh-ring-a"></div>
                    <div class="kgh-ring kgh-ring-b"></div>

                    <div class="kgh-logo-card">
                        <img
                            class="kgh-logo"
                            src="logo-mark.png"
                            alt="Kishori Global Hospital logo">

                        <span
                            class="kgh-logo-fallback"
                            style="display:none;font-size:64px;font-weight:800;color:#3A9EBB">
                            K
                        </span>
                    </div>

                    <div class="kgh-spark kgh-spark-a"></div>
                    <div class="kgh-spark kgh-spark-b"></div>
                    <div class="kgh-spark kgh-spark-c"></div>

                </div>

                <div class="kgh-copy">

                    <span class="kgh-eyebrow">
                        YOUR HEALTH, OUR COMMITMENT
                    </span>

                    <h1 class="kgh-wordmark">
                        KISHORI <span>GLOBAL</span>
                    </h1>

                    <div class="kgh-divider"></div>

                    <p class="kgh-tagline">
                        CARING FOR LIFE
                    </p>

                </div>

                <div class="kgh-loader">
                    <div class="kgh-track">
                        <span></span>
                    </div>

                    <p class="kgh-loader-label">
                        WELCOME TO BETTER CARE
                    </p>
                </div>

            </div>

            <div class="kgh-corner kgh-corner-a"></div>
            <div class="kgh-corner kgh-corner-b"></div>

            <span class="kgh-signature">
                KGH <span>·</span> HEALTHCARE
            </span>
        `;

        document.body.appendChild(intro);

        // If the logo path is wrong, show a simple fallback letter.
        const logo = intro.querySelector(".kgh-logo");
        const fallback = intro.querySelector(".kgh-logo-fallback");

        logo.addEventListener("error", function () {
            logo.style.display = "none";
            fallback.style.display = "block";
        });

        let finished = false;

        function finishIntro() {
            if (finished) return;
            finished = true;

            intro.classList.add("kgh-exit");

            html.classList.remove("kgh-intro-pending");

            document.body.style.overflow = originalOverflow;

            window.setTimeout(function () {
                intro.remove();

                const introStyle = document.getElementById(
                    "kghPremiumIntroStyles"
                );

                if (introStyle) {
                    introStyle.remove();
                }
            }, reducedMotion ? 250 : 950);
        }

        intro.querySelector(".kgh-skip").addEventListener(
            "click",
            finishIntro
        );

        // Keep the introduction short enough for returning visitors.
        window.setTimeout(
            finishIntro,
            reducedMotion ? 450 : 3400
        );
    }


    // ---------------------------------------------------------
    // 3. START WHEN THE PAGE STRUCTURE IS READY
    // ---------------------------------------------------------

    if (document.readyState === "loading") {
        document.addEventListener(
            "DOMContentLoaded",
            startIntro,
            { once: true }
        );
    } else {
        startIntro();
    }

})();