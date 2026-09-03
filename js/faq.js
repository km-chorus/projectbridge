/* =========================================
   FAQ ACCORDION
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const faqItems =
        document.querySelectorAll(".faq-item");


    faqItems.forEach(function (item) {

        const question =
            item.querySelector(".faq-question");


        question.addEventListener(
            "click",
            function () {

                const isOpen =
                    item.classList.contains("open");


                /* Close all other questions */

                faqItems.forEach(function (otherItem) {

                    otherItem.classList.remove("open");

                    otherItem
                        .querySelector(".faq-question")
                        .setAttribute(
                            "aria-expanded",
                            "false"
                        );

                });


                /* Open clicked question */

                if (!isOpen) {

                    item.classList.add("open");

                    question.setAttribute(
                        "aria-expanded",
                        "true"
                    );

                }

            }
        );

    });

});



document.addEventListener("DOMContentLoaded", function () {

    const promoToast = document.getElementById("promoToast");
    const promoClose = document.getElementById("promoClose");

    if (!promoToast) return;


    /*
    =========================================
    SETTINGS
    =========================================
    */

    const FIVE_MINUTES = 5 * 60 * 1000;

    const LAST_CLOSED_KEY = "promoToastLastClosed";


    /*
    =========================================
    SHOW PROMO
    =========================================
    */

    function showPromo() {

        promoToast.classList.add("show");

    }


    /*
    =========================================
    FIRST VISIT
    =========================================
    */

    const lastClosed =
        localStorage.getItem(LAST_CLOSED_KEY);


    if (!lastClosed) {

        // Show immediately on first visit
        showPromo();

    } else {

        /*
        =========================================
        RETURNING VISITOR

        Check how long ago the user closed it.
        =========================================
        */

        const timeSinceClosed =
            Date.now() - parseInt(lastClosed);


        if (timeSinceClosed >= FIVE_MINUTES) {

            // Five minutes have already passed
            showPromo();

        } else {

            /*
            Five minutes have not passed yet.
            Calculate remaining time.
            */

            const remainingTime =
                FIVE_MINUTES - timeSinceClosed;


            setTimeout(function () {

                showPromo();

            }, remainingTime);

        }

    }


    /*
    =========================================
    CLOSE PROMO
    =========================================
    */

    if (promoClose) {

        promoClose.addEventListener("click", function () {

            // Hide promo
            promoToast.classList.remove("show");


            // Save the exact time it was closed
            localStorage.setItem(
                LAST_CLOSED_KEY,
                Date.now().toString()
            );


            /*
            =========================================
            SHOW AGAIN AFTER 5 MINUTES
            =========================================
            */

            setTimeout(function () {

                showPromo();

            }, FIVE_MINUTES);

        });

    }


    /*
    =========================================
    COUNTDOWN TO OCTOBER 26, 2026
    =========================================
    */

    const promotionDate =
        new Date("2026-10-26T00:00:00").getTime();


    function updateCountdown() {

        const now = Date.now();

        const distance =
            promotionDate - now;


        if (distance <= 0) {

            document.getElementById("days").textContent = "00";
            document.getElementById("hours").textContent = "00";
            document.getElementById("minutes").textContent = "00";
            document.getElementById("seconds").textContent = "00";

            return;
        }


        const days = Math.floor(
            distance / (1000 * 60 * 60 * 24)
        );

        const hours = Math.floor(
            (distance % (1000 * 60 * 60 * 24))
            / (1000 * 60 * 60)
        );

        const minutes = Math.floor(
            (distance % (1000 * 60 * 60))
            / (1000 * 60)
        );

        const seconds = Math.floor(
            (distance % (1000 * 60))
            / 1000
        );


        document.getElementById("days").textContent =
            String(days).padStart(2, "0");

        document.getElementById("hours").textContent =
            String(hours).padStart(2, "0");

        document.getElementById("minutes").textContent =
            String(minutes).padStart(2, "0");

        document.getElementById("seconds").textContent =
            String(seconds).padStart(2, "0");

    }


    updateCountdown();

    setInterval(updateCountdown, 1000);

});
