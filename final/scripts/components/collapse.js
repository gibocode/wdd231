document.addEventListener("DOMContentLoaded", () => {

    const elements = document.querySelectorAll(".collapse");
    const buttons = document.querySelectorAll("[data-toggle=\"collapse\"]");

    elements.forEach(element => {
        const parent = element.parentNode;
        parent.style.position = "relative";
        element.style.top = `${parent.parentNode.offsetHeight}px`;
        element.style.display = "none";
    });

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const target = button.dataset.target;
            const element = document.querySelector(`#${target}`);
            element.classList.toggle("open");
            if (element.classList.contains("open")) {
                slideDown(element);
            } else {
                slideUp(element);
            }
        });
    });

    // Expand all collapsible elements
    function slideDown(element, duration = 300) {

        console.log(element);

        const display = window.getComputedStyle(element).display;
        const height = `${element.scrollHeight}px`;

        console.log(height);

        element.style.removeProperty("display");

        if (display === "none") element.style.display = "flex";

        element.style.overflow = "hidden";
        element.style.height = "0";
        element.offsetHeight;
        element.style.transition = `height ${duration}ms ease`;
        element.style.height = height;

        setTimeout(() => {
            element.style.removeProperty("height");
            element.style.removeProperty("overflow");
            element.style.removeProperty("transition");
        }, duration);
    }

    // Collapse all collapsible elements
    function slideUp(element, duration = 300) {

        element.style.height = element.scrollHeight + "px";
        element.offsetHeight;
        element.style.transition = `height ${duration}ms ease`;
        element.style.overflow = "hidden";
        element.style.height = "0";

        setTimeout(() => {
            element.style.display = "none";
            element.style.removeProperty("height");
            element.style.removeProperty("overflow");
            element.style.removeProperty("transition");
        }, duration);
    }
});
