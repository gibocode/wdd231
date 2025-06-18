import News from "../services/news.mjs";

class FeaturedArticle {

    constructor(data) {
        this.data = data;
    }

    createItem() {
        const data = this.data;
        const card = document.createElement("div");
        const imageWrapper = document.createElement("div");
        const image = document.createElement("img");
        const cardBody = document.createElement("div");
        const title = document.createElement("div");
        const author = document.createElement("div");
        const content = document.createElement("p");
        const button = document.createElement("a");

        card.className = "card featured-article";
        imageWrapper.className = "card-image-wrapper";
        image.className = "card-image";
        cardBody.className = "card-body";
        title.className = "article-title";
        author.className = "article-author";
        content.className = "article-content";
        button.className = "btn btn-secondary article-button";

        image.src = data.urlToImage;
        image.alt = `${data.title} Image`;
        image.loading = "lazy";
        image.width = 600;
        image.height = 400;
        button.href = data.url;
        button.target = "_blank";
        button.title = data.title;

        title.textContent = data.title;
        author.textContent = `By ${data.author || "Unknown"}`;
        content.textContent = data.description || "No description available.";
        button.textContent = "Read Article";

        cardBody.appendChild(title);
        cardBody.appendChild(author);
        cardBody.appendChild(content);
        cardBody.appendChild(button);

        imageWrapper.appendChild(image);

        card.appendChild(imageWrapper);
        card.appendChild(cardBody);

        return card;
    }
}

export async function getFeaturedNews() {
    const news = new News();
    const articles = await news.getArticles();
    const featuredArticles = articles.slice(0, 3);
    const container = document.querySelector("#featured-news");

    featuredArticles.forEach(featuredArticle => {
        const article = new FeaturedArticle(featuredArticle);
        const item = article.createItem();
        container.appendChild(item);
    });
}
