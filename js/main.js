document.addEventListener("DOMContentLoaded", function () {

    const form =
        document.getElementById("projectForm");

    if (!form) {
        return;
    }


    /* =========================================
       EMAILJS
    ========================================= */

    emailjs.init({
        publicKey: "H-OBnRdlhUWMwviKP",

        blockHeadless: true,

        limitRate: {
            id: "projectbridge-form",
            throttle: 10000
        }
    });


    /* =========================================
       SUBMISSION RESTRICTION
    ========================================= */

    const submittedEmails =
        JSON.parse(
            localStorage.getItem(
                "projectBridgeSubmittedEmails"
            ) || "[]"
        );


    function normalizeEmail(email) {

        return email
            .trim()
            .toLowerCase();

    }


    function hasSubmitted(email) {

        const normalizedEmail =
            normalizeEmail(email);

        return submittedEmails.includes(
            normalizedEmail
        );

    }


    function saveSubmittedEmail(email) {

        const normalizedEmail =
            normalizeEmail(email);

        if (
            !submittedEmails.includes(
                normalizedEmail
            )
        ) {

            submittedEmails.push(
                normalizedEmail
            );

            localStorage.setItem(
                "projectBridgeSubmittedEmails",
                JSON.stringify(
                    submittedEmails
                )
            );

        }

    }


    /* =========================================
       ELEMENTS
    ========================================= */

    const submitButton =
        form.querySelector(".form-submit");

    const modal =
        document.getElementById("formModal");

    const modalIcon =
        document.getElementById("formModalIcon");

    const modalTitle =
        document.getElementById("formModalTitle");

    const modalMessage =
        document.getElementById("formModalMessage");

    const modalButton =
        document.getElementById("formModalButton");

    const modalClose =
        document.getElementById("formModalClose");

    const modalOverlay =
        modal.querySelector(
            ".form-modal-overlay"
        );


    /* =========================================
       OPEN MODAL
    ========================================= */

    function openModal(
        type,
        title,
        message
    ) {

        modal.classList.remove(
            "error"
        );


        if (type === "error") {

            modal.classList.add(
                "error"
            );

            modalIcon.textContent = "!";

        } else {

            modalIcon.textContent = "✓";

        }


        modalTitle.textContent =
            title;

        modalMessage.textContent =
            message;


        modal.classList.add(
            "active"
        );

        modal.setAttribute(
            "aria-hidden",
            "false"
        );


        document.body.style.overflow =
            "hidden";

    }


    /* =========================================
       CLOSE MODAL
    ========================================= */

    function closeModal() {

        modal.classList.remove(
            "active"
        );

        modal.setAttribute(
            "aria-hidden",
            "true"
        );


        document.body.style.overflow =
            "";

    }


    modalClose.addEventListener(
        "click",
        closeModal
    );


    modalOverlay.addEventListener(
        "click",
        closeModal
    );


    /* =========================================
       FORM SUBMISSION
    ========================================= */

    form.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            event.stopImmediatePropagation();


            /* ================================
               GET EMAIL
            ================================= */

            const emailInput =
                document.getElementById(
                    "email"
                );


            const email =
                normalizeEmail(
                    emailInput.value
                );


            /* ================================
               CHECK PREVIOUS SUBMISSION
            ================================= */

            if (
                hasSubmitted(email)
            ) {

                openModal(
                    "error",
                    "Request Already Received",
                    "A project request has already been submitted using this email address. If you need to make another enquiry, please contact us directly on WhatsApp."
                );


                submitButton.disabled =
                    false;

                submitButton.textContent =
                    "Send Project Request";


                return;

            }


            /* ================================
               BUTTON
            ================================= */

            submitButton.disabled =
                true;

            submitButton.textContent =
                "Sending Request...";


            /* ================================
               SEND EMAIL
            ================================= */

            emailjs.sendForm(

                "service_k2oh989",

                "template_i0u3mxb",

                form

            )

            .then(function (response) {

                console.log(
                    "Email sent successfully:",
                    response
                );


                /* ============================
                   SAVE EMAIL
                ============================ */

                saveSubmittedEmail(
                    email
                );


                /* ============================
                   GET FORM VALUES
                ============================ */

                const name =
                    document.getElementById(
                        "name"
                    )
                    .value
                    .trim();


                const phone =
                    document.getElementById(
                        "phone"
                    )
                    .value
                    .trim();


                const service =
                    document.getElementById(
                        "service"
                    )
                    .value;


                const message =
                    document.getElementById(
                        "message"
                    )
                    .value
                    .trim();


                /* ============================
                   WHATSAPP
                ============================ */

                const whatsappMessage =
`Hello ProjectBridge,

I would like to make an enquiry about your services.

Name: ${name}

Phone / WhatsApp: ${phone}

Email: ${email}

Service Needed: ${service}

Project Details:
${message}

Thank you.`;


                const whatsappURL =
                    "https://wa.me/233556556080?text=" +
                    encodeURIComponent(
                        whatsappMessage
                    );


                /* ============================
                   SUCCESS MODAL
                ============================ */

                openModal(
                    "success",
                    "We've received your message.",
                    "Your project request has been received. We'll review the details and continue the conversation with you on WhatsApp."
                );


                submitButton.textContent =
                    "Request Received";


                /* ============================
                   CONTINUE BUTTON
                ============================ */

                modalButton.onclick =
                    function () {

                        window.location.href =
                            whatsappURL;

                    };


                /* ============================
                   AUTOMATIC WHATSAPP
                ============================ */

                setTimeout(
                    function () {

                        window.location.href =
                            whatsappURL;

                    },
                    3000
                );

            })


            /* =================================
               ERROR
            ================================= */

            .catch(function (error) {

                console.error(
                    "EmailJS error:",
                    error
                );


                /* ============================
                   ERROR MODAL
                ============================ */

                openModal(
                    "error",
                    "Something went wrong.",
                    "We couldn't send your project request. Please try again or contact us directly on WhatsApp."
                );


                submitButton.disabled =
                    false;

                submitButton.textContent =
                    "Send Project Request";


                modalButton.onclick =
                    function () {

                        closeModal();

                    };

            });

        }
    );

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