import "./components/menu.js";
import { getArticles } from "./utils/articles.js";
import { getFeaturedNews } from "./utils/featured-news.js";
import { getGalleryImages } from "./utils/gallery.js";

document.addEventListener("DOMContentLoaded", async () => {
    const menu = document.querySelector("#menu");
    if (menu) {
        const currentPage = menu.querySelector("a.active").textContent;
        if (currentPage == "Home") {
            getFeaturedNews();
            getGalleryImages();
        } else if (currentPage == "News") {
            getArticles();
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
});

function loadView(view) {
    let displayView = localStorage.getItem("display-view");
    if (!displayView || displayView != view) {
        displayView = view || "grid";
        localStorage.setItem("display-view", displayView);
    }
    const relatedNews = document.querySelector("main > div:nth-child(2)");
    if (relatedNews.classList.contains("grid")) {
        relatedNews.classList.remove("grid");
    } else {
        relatedNews.classList.remove("list");
    }
    relatedNews.classList.add(displayView);
}

loadView(localStorage.getItem("display-view"));
