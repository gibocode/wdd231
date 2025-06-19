import News from "../services/news.mjs";

class Article {

    constructor(data) {
        this.data = data;
    }

    async createItem() {
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

        let url = data.urlToImage;

        // try {
        //     const response = await fetch(data.urlToImage, {
        //         credentials: "omit",
        //         mode: "cors",
        //     });
        //     const blob = await response.blob();
        //     url = URL.createObjectURL(blob);
        // } catch (error) {}

        image.src = url;

        image.alt = `${data.title} Image`;
        image.loading = "lazy";
        image.referrerpolicy = "no-referrer";
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

export async function getArticles() {
    const news = new News();
    const items = await news.getArticles();
    const articles = items.slice(0, 15);
    const container = document.querySelector("#articles");

    articles.forEach(async article => {
        const object = new Article(article);
        const item = await object.createItem();
        container.appendChild(item);
    });
}
