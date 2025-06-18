import "./components/collapse.js";
import { getFeaturedNews } from "./utils/featured-news.js";
import { getGalleryImages } from "./utils/gallery.js";

document.addEventListener("DOMContentLoaded", () => {

    const menu = document.querySelector("#menu");

    if (menu.querySelector("a.active").textContent == "Home") {
        getFeaturedNews();
        getGalleryImages();
    }
})
