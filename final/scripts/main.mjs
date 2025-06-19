import "./components/collapse.js";
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
    const relatedNews = document.querySelector(".related-news");
    if (relatedNews.classList.contains("grid")) {
        relatedNews.classList.remove("grid");
    } else {
        relatedNews.classList.remove("list");
    }
    relatedNews.classList.add(view);
}
