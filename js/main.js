
document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("projectForm");

    if (!form) {
        return;
    }


    /* =========================================
       CONTACT FORM → WHATSAPP
    ========================================= */

    form.addEventListener("submit", function (event) {

        /*
         * Prevent the form from refreshing
         * or submitting to a server.
         */
        event.preventDefault();
        event.stopPropagation();


        /* =====================================
           GET FORM VALUES
        ===================================== */

        const name =
            document.getElementById("name")?.value.trim() || "";

        const phone =
            document.getElementById("phone")?.value.trim() || "";

        const email =
            document.getElementById("email")?.value.trim() || "";

        const service =
            document.getElementById("service")?.value.trim() || "";

        const message =
            document.getElementById("message")?.value.trim() || "";


        /* =====================================
           VALIDATION
        ===================================== */

        if (
            !name ||
            !phone ||
            !email ||
            !service ||
            !message
        ) {

            alert(
                "Please complete all required fields before sending your request."
            );

            return;
        }


        /* =====================================
           WHATSAPP MESSAGE
        ===================================== */

        const whatsappMessage =
`Hello Morningside Systems,

I would like to make an enquiry about your services.

Name: ${name}

Phone / WhatsApp: ${phone}

Email: ${email}

Service Needed: ${service}

Project Details:
${message}

Thank you.`;


        /* =====================================
           WHATSAPP URL
        ===================================== */

        const whatsappURL =
            "https://wa.me/233556556080?text=" +
            encodeURIComponent(
                whatsappMessage
            );


        /* =====================================
           OPEN WHATSAPP
        ===================================== */

        window.open(
            whatsappURL,
            "_blank"
        );

    });

});



    





const featuredVideo =
    document.getElementById("featuredReviewVideo");

const featuredVideoSource =
    document.getElementById("featuredVideoSource");

const featuredReviewName =
    document.getElementById("featuredReviewName");

const featuredReviewService =
    document.getElementById("featuredReviewService");

const reviewThumbnails =
    document.querySelectorAll(".review-thumbnail");


if (
    featuredVideo &&
    featuredVideoSource &&
    featuredReviewName &&
    featuredReviewService &&
    reviewThumbnails.length
) {

    reviewThumbnails.forEach(function (review) {

        review.addEventListener("click", function () {

            const video =
                review.dataset.video;

            const poster =
                review.dataset.poster;

            const name =
                review.dataset.name;

            const service =
                review.dataset.service;


            /* =================================
               ACTIVE REVIEW
            ================================= */

            reviewThumbnails.forEach(function (item) {

                item.classList.remove("active");

            });

            review.classList.add("active");


            /* =================================
               STOP CURRENT VIDEO
            ================================= */

            featuredVideo.pause();


            /* =================================
               CHANGE VIDEO SOURCE
            ================================= */

            featuredVideo.src = video;

            featuredVideo.poster = poster;


            /* =================================
               LOAD NEW VIDEO
            ================================= */

            featuredVideo.load();


            /* =================================
               UPDATE CLIENT
            ================================= */

            featuredReviewName.textContent =
                name;

            featuredReviewService.textContent =
                service;

        });

    });

}


/* =========================================
   SCROLL FADE-IN ANIMATION
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const fadeElements =
        document.querySelectorAll(".scroll-fade");


    if (!fadeElements.length) {
        return;
    }


    /* Check if browser supports IntersectionObserver */

    if (!("IntersectionObserver" in window)) {

        fadeElements.forEach(function (element) {

            element.classList.add("is-visible");

        });

        return;
    }


    const fadeObserver =
        new IntersectionObserver(
            function (entries, observer) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "is-visible"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.1,

                rootMargin:
                    "0px 0px -50px 0px"
            }
        );


    fadeElements.forEach(function (element) {

        fadeObserver.observe(element);

    });

});



/* =========================================
   SCROLL RESTORATION
========================================= */

if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
}


window.addEventListener("load", function () {

    /*
     * If the URL has a section hash such as
     * #contact or #services, allow the browser
     * to navigate there.
     *
     * Otherwise start from the hero.
     */

    if (!window.location.hash) {

        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "instant"
        });

    }

});


/* =========================================
   NAVIGATION
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const header =
        document.getElementById("siteHeader");

    const menuToggle =
        document.getElementById("mobileMenuToggle");

    const mobileMenu =
        document.getElementById("mobileMenu");

    const mobileLinks =
        mobileMenu.querySelectorAll("a");


    /* =========================================
       STICKY NAV SCROLL STATE
    ========================================= */

    function updateHeader() {

        if (window.scrollY > 40) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    }


    updateHeader();

    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );


    /* =========================================
       MOBILE MENU
    ========================================= */

    function openMobileMenu() {

        mobileMenu.classList.add("active");

        menuToggle.classList.add("active");

        menuToggle.setAttribute(
            "aria-expanded",
            "true"
        );

        menuToggle.setAttribute(
            "aria-label",
            "Close navigation"
        );

        mobileMenu.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.style.overflow = "hidden";
    }


    function closeMobileMenu() {

        mobileMenu.classList.remove("active");

        menuToggle.classList.remove("active");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        menuToggle.setAttribute(
            "aria-label",
            "Open navigation"
        );

        mobileMenu.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.style.overflow = "";
    }


    menuToggle.addEventListener(
        "click",
        function () {

            if (
                mobileMenu.classList.contains(
                    "active"
                )
            ) {

                closeMobileMenu();

            } else {

                openMobileMenu();

            }

        }
    );


    /* =========================================
       CLOSE AFTER CLICKING LINK
    ========================================= */

    mobileLinks.forEach(function (link) {

        link.addEventListener(
            "click",
            function () {

                closeMobileMenu();

            }
        );

    });


    /* =========================================
       ESCAPE KEY
    ========================================= */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape" &&
                mobileMenu.classList.contains(
                    "active"
                )
            ) {

                closeMobileMenu();

            }

        }
    );

});