document.addEventListener("DOMContentLoaded", () => {

    const menu = document.querySelector("#menu");
    const button = document.querySelector("#menu-button");

    const parent = menu.parentNode;
    parent.style.position = "relative";
    menu.style.top = `${parent.parentNode.offsetHeight}px`;
    menu.style.display = "none";

    button.addEventListener("click", () => {
        menu.classList.toggle("open");
        if (menu.classList.contains("open")) {
            slideDown(menu);
        } else {
            slideUp(menu);
        }
    });

    // Expand all collapsible elements
    function slideDown(element, duration = 300) {

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
