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