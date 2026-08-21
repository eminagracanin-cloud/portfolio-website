/* ==========================================================
   EMINA GRACANIN PORTFOLIO
   INTERACTIONS
   ========================================================== */


document.addEventListener("DOMContentLoaded", () => {


    /* ======================================================
       CURRENT YEAR
       ====================================================== */

    const yearElement =
        document.getElementById("currentYear");

    if (yearElement) {
        yearElement.textContent =
            new Date().getFullYear();
    }



    /* ======================================================
       MOBILE MENU
       ====================================================== */

    const menuButton =
        document.getElementById("menuButton");

    const mobileMenu =
        document.getElementById("mobileMenu");


    function closeMobileMenu() {

        if (!menuButton || !mobileMenu) {
            return;
        }

        menuButton.classList.remove("active");

        mobileMenu.classList.remove("open");

        document.body.classList.remove("menu-open");

        menuButton.setAttribute(
            "aria-expanded",
            "false"
        );

    }


    if (menuButton && mobileMenu) {

        menuButton.addEventListener(
            "click",
            () => {

                const isOpen =
                    mobileMenu.classList.toggle(
                        "open"
                    );

                menuButton.classList.toggle(
                    "active",
                    isOpen
                );

                document.body.classList.toggle(
                    "menu-open",
                    isOpen
                );

                menuButton.setAttribute(
                    "aria-expanded",
                    String(isOpen)
                );

            }
        );


        const mobileLinks =
            mobileMenu.querySelectorAll("a");


        mobileLinks.forEach(link => {

            link.addEventListener(
                "click",
                closeMobileMenu
            );

        });


        document.addEventListener(
            "keydown",
            event => {

                if (event.key === "Escape") {
                    closeMobileMenu();
                }

            }
        );

    }



    /* ======================================================
       SCROLL REVEAL
       ====================================================== */

    const revealElements =
        document.querySelectorAll(".reveal");


    const prefersReducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    if (prefersReducedMotion) {

        revealElements.forEach(element => {
            element.classList.add("visible");
        });

    }

    else {

        const revealObserver =
            new IntersectionObserver(

                entries => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target
                                .classList
                                .add("visible");

                            revealObserver
                                .unobserve(
                                    entry.target
                                );

                        }

                    });

                },

                {
                    threshold: 0.08,
                    rootMargin:
                        "0px 0px -40px 0px"
                }

            );


        revealElements.forEach(
            (element, index) => {

                /*
                    Small stagger for elements
                    initially visible on page load.
                */

                element.style
                    .transitionDelay =
                    `${Math.min(index * 25, 150)}ms`;

                revealObserver
                    .observe(element);

            }
        );

    }



    /* ======================================================
       ACTIVE DESKTOP NAVIGATION
       ====================================================== */

    const sections =
        document.querySelectorAll(
            "section[id], footer[id]"
        );

    const navLinks =
        document.querySelectorAll(
            ".desktop-nav a"
        );


    if (
        sections.length &&
        navLinks.length
    ) {

        const navObserver =
            new IntersectionObserver(

                entries => {

                    entries.forEach(entry => {

                        if (
                            !entry.isIntersecting
                        ) {
                            return;
                        }


                        const id =
                            entry.target.id;


                        navLinks.forEach(link => {

                            const matches =
                                link.getAttribute(
                                    "href"
                                ) === `#${id}`;


                            link.style.color =
                                matches
                                    ? "var(--ink)"
                                    : "";

                        });

                    });

                },

                {
                    rootMargin:
                        "-35% 0px -55% 0px",

                    threshold: 0
                }

            );


        sections.forEach(
            section => {
                navObserver.observe(
                    section
                );
            }
        );

    }



    /* ======================================================
       MOBILE HEADER SHADOW
       ====================================================== */

    const mobileBar =
        document.querySelector(
            ".mobile-bar"
        );


    if (mobileBar) {

        const updateMobileHeader =
            () => {

                const scrolled =
                    window.scrollY > 20;


                mobileBar.style
                    .boxShadow =
                    scrolled
                        ? "0 8px 25px rgba(0,0,0,.025)"
                        : "none";

            };


        window.addEventListener(
            "scroll",
            updateMobileHeader,
            {
                passive: true
            }
        );


        updateMobileHeader();

    }



    /* ======================================================
       SMOOTH INTERNAL LINKS
       ====================================================== */

    const internalLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    internalLinks.forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const href =
                    link.getAttribute(
                        "href"
                    );


                if (
                    !href ||
                    href === "#"
                ) {
                    return;
                }


                const target =
                    document.querySelector(
                        href
                    );


                if (!target) {
                    return;
                }


                event.preventDefault();


                target.scrollIntoView({
                    behavior:
                        prefersReducedMotion
                            ? "auto"
                            : "smooth",

                    block: "start"
                });

            }
        );

    });


});
