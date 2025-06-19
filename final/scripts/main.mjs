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
});
