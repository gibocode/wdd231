import News from "../services/news.mjs";

class Article {

    constructor(data, lazyLoad = true, index = 0, featured) {
        this.data = data;
        this.lazyLoad = lazyLoad;
        this.index = index;
        this.featured = featured;
    }

    async createItem() {

        const data = this.data;
        const card = document.createElement("div");
        const imageWrapper = document.createElement((this.featured) ? "div" : "picture");
        const image = document.createElement("img");
        const cardBody = document.createElement("div");
        const title = document.createElement("div");
        const publishedAt = document.createElement("div");
        const source = document.createElement("div");
        const content = document.createElement("p");
        const button = document.createElement("a");

        if (this.featured) {
            imageWrapper.className = "card-image-wrapper";
        }

        card.className = `card ${(this.featured) ? "featured-article" : "article"}`;
        image.className = "card-image";
        cardBody.className = "card-body";
        title.className = "article-title";
        publishedAt.className = "article-published-at";
        source.className = "article-source";
        content.className = "article-content";
        button.className = "btn btn-secondary article-button";

        image.src = `./images/cache/${this.index}.webp`;
        image.alt = `${data.title} Image`;

        if (this.lazyLoad) {
            image.loading = "lazy";
        }

        image.width = 370;
        image.height = 247;
        button.href = data.url;
        button.target = "_blank";
        button.title = data.title;

        title.textContent = data.title;
        publishedAt.textContent = `Published at ${(new Date(data.published_at)).toLocaleString() || "No publish date"}`;
        source.textContent = `Source: ${data.source.name || "Unknown source"}`;
        source.textContent = `Source: ${data.source || "Unknown source"}`;
        content.textContent = ((this.featured) ? data.snippet : data.description) || "No description available.";
        button.textContent = "Read Article";

        cardBody.appendChild(title);

        if (!this.featured) {
            cardBody.appendChild(publishedAt);
            cardBody.appendChild(source);
        }

        cardBody.appendChild(content);
        cardBody.appendChild(button);

        imageWrapper.appendChild(image);

        card.appendChild(imageWrapper);
        card.appendChild(cardBody);

        return card;
    }
}

export async function getArticles(itemCount, featured = false) {

    const selector = (featured) ? "#featured-news" : "#articles";
    const container = document.querySelector(selector);
    const news = new News();
    const articles = await news.getArticles();

    let startIndex = 0;

    if (!featured) {
        renderArticle(container, articles[0], false);
        startIndex = 1;
    }

    articles.slice(startIndex, itemCount).forEach(async (article, index) => {
        const itemIndex = index + startIndex;
        let lazyload = false;
        if (window.innerWidth < 768) {
            lazyload = (itemIndex > 0);
        } else if (window.innerWidth < 980) {
            lazyload = (itemIndex > 1);
        } else {
            lazyload = (itemIndex > 2);
        }
        renderArticle(container, article, lazyload, itemIndex, featured);
    });
}

async function renderArticle(container, article, lazyload, index = 0, featured = false) {
    const object = new Article(article, lazyload, index, featured);
    const item = await object.createItem();
    container.appendChild(item);
}
