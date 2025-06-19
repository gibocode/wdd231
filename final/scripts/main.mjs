import "./components/menu.js";
import { getArticles } from "./utils/articles.js";
import { getGalleryImages } from "./utils/gallery.js";

document.addEventListener("DOMContentLoaded", async () => {
    const path = window.location.pathname;
    if (path) {
        if (path.includes("index.html")) {
            getArticles(3, true);
            getGalleryImages();
        } else if (path.includes("news.html")) {
            getArticles(15);
            loadView(localStorage.getItem("display-view"));
        } else if (path.includes("newsletter.html")) {
            checkSubscription();
        }
    }

    const viewButtons = document.querySelectorAll(".view-button");

    if (viewButtons) {
        viewButtons.forEach(viewButton => {
            viewButton.addEventListener("click", () => {
                const view = viewButton.dataset.view;
                loadView(view);
            });
        });
    }

    const donationsButtons = document.querySelectorAll(".donations button");

    donationsButtons.forEach(button => {
        button.addEventListener("click", () => {
            showModal(button);
        });
    });

    const closeModalButton = document.querySelector(".modal button");

    closeModalButton.addEventListener("click", () => {
        closeModal();
    });
});

function loadView(view) {
    let displayView = localStorage.getItem("display-view");
    if (!displayView || displayView != view) {
        displayView = view || "grid";
        localStorage.setItem("display-view", displayView);
    }
    const relatedNews = document.querySelector("main > div:nth-child(2)");
    if (relatedNews) {
        if (relatedNews.classList.contains("grid")) {
            relatedNews.classList.remove("grid");
        } else {
            relatedNews.classList.remove("list");
        }
        relatedNews.classList.add(displayView);
    }
}

function checkSubscription() {
    const params = new URLSearchParams(window.location.search);
    const email = params.get("email");
    if (email) {
        const newsletterMessage = document.querySelector("#newsletter-message");
        if (newsletterMessage) {
            const message = attemptSubscription(email);
            newsletterMessage.innerHTML = message;
        }
    }
}

function attemptSubscription(email) {
    const newsletterData = localStorage.getItem("newsletter-data") || [];
    let emails = [];
    let message = "";
    if (!newsletterData || newsletterData.length == 0) {
        message = subscribe(emails, email);
    } else {
        emails = JSON.parse(newsletterData);
        if (emails.includes(email)) {
            message = "You are already subcribed.";
        } else {
            message = subscribe(emails, email);
        }
    }
    return message;
}

function subscribe(emails, email) {
    emails.push(email);
    localStorage.setItem("newsletter-data", JSON.stringify(emails));
    let message = `<svg fill="currentColor" width="50" height="50" viewBox="0 0 512 512" xml:space="preserve" xmlns="http://www.w3.org/2000/svg">
        <g><polygon points="434.8,49 174.2,309.7 76.8,212.3 0,289.2 174.1,463.3 196.6,440.9 196.6,440.9 511.7,125.8 434.8,49"/></g>
        </svg> <strong>Success!</strong> You are now subscribed to our newsletter!`;
    return message;
}

function showModal(button) {
    const modal = document.querySelector(".modal");

    modal.style.flexDirection = "column";
    modal.style.justifySelf = "center";
    modal.style.top = "200px";
    modal.style.minWidth = "320px";
    modal.style.width = "500px";

    const header = button.parentNode.querySelector("div").textContent;
    const icon = button.parentNode.parentNode.querySelector("span").cloneNode(true);
    const description = button.parentNode.querySelector("p").cloneNode(true);

    modal.querySelector(".modal-header").textContent = header;

    const modalBody = modal.querySelector(".modal-body");

    modalBody.style.padding = "40px";
    modalBody.style.display = "flex";
    modalBody.style.gap = "20px";

    modalBody.innerHTML = "";
    modalBody.appendChild(icon);
    modalBody.appendChild(description);

    modal.showModal();
}

function closeModal() {
    const modal = document.querySelector(".modal");
    modal.close();
}
