/* =========================================
   SCROLL TO TOP + PAGE PROGRESS
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const scrollTop =
        document.getElementById("scrollTop");

    const progressBar =
        document.getElementById(
            "scrollProgressBar"
        );


    if (!scrollTop || !progressBar) {
        return;
    }


    const circumference = 2 * Math.PI * 45;


    progressBar.style.strokeDasharray =
        circumference;

    progressBar.style.strokeDashoffset =
        circumference;


    function updateScrollProgress() {

        const scrollTopPosition =
            window.scrollY;

        const documentHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;


        if (documentHeight <= 0) {
            return;
        }


        const progress =
            scrollTopPosition /
            documentHeight;


        const percentage =
            Math.min(
                Math.max(progress, 0),
                1
            );


        const offset =
            circumference -
            (percentage * circumference);


        progressBar.style.strokeDashoffset =
            offset;


        /* =====================================
           SHOW BUTTON AFTER SCROLLING
        ===================================== */

        if (scrollTopPosition > 300) {

            scrollTop.classList.add(
                "visible"
            );

        } else {

            scrollTop.classList.remove(
                "visible"
            );

        }

    }


    /* =========================================
       SCROLL EVENT
    ========================================= */

    window.addEventListener(
        "scroll",
        updateScrollProgress,
        { passive: true }
    );


    /* =========================================
       SCROLL TO TOP
    ========================================= */

    scrollTop.addEventListener(
        "click",
        function () {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );


    updateScrollProgress();

});