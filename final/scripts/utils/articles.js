import News from "../services/news.mjs";

class Article {

    constructor(data, lazyLoad = true) {
        this.data = data;
        this.lazyLoad = lazyLoad;
    }

    async createItem() {
        const data = this.data;
        const card = document.createElement("div");
        const imageWrapper = document.createElement("picture");
        const imageLarge = document.createElement("source");
        const image = document.createElement("img");
        const cardBody = document.createElement("div");
        const title = document.createElement("div");
        const author = document.createElement("div");
        const publishedAt = document.createElement("div");
        const source = document.createElement("div");
        const content = document.createElement("p");
        const button = document.createElement("a");

        card.className = "card article";
        image.className = "card-image";
        cardBody.className = "card-body";
        title.className = "article-title";
        author.className = "article-author";
        publishedAt.className = "article-published-at";
        source.className = "article-source";
        content.className = "article-content";
        button.className = "btn btn-secondary article-button";

        const imageFile = stringToHex(data.author + " " + data.publishedAt);

        imageLarge.type = "image/webp";
        imageLarge.media = "(min-width: 768px)";
        imageLarge.srcset = `./images/cache/${imageFile}.webp`;
        image.src = `./images/cache/${imageFile}_small.webp`;
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
        author.textContent = `By ${data.author || "Unknown"}`;
        publishedAt.textContent = `Published at ${(new Date(data.publishedAt)).toLocaleString() || "No publish date"}`;
        source.textContent = `Source: ${data.source.name || "Unknown source"}`;
        content.textContent = data.description || "No description available.";
        button.textContent = "Read Article";

        cardBody.appendChild(title);
        cardBody.appendChild(author);
        cardBody.appendChild(publishedAt);
        cardBody.appendChild(source);
        cardBody.appendChild(content);
        cardBody.appendChild(button);

        imageWrapper.appendChild(imageLarge);
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
    const container = document.querySelector(".articles");
    const object = new Article(articles[0], false);
    const item = await object.createItem();

    container.appendChild(item);

    articles.forEach(async (article, index) => {
        if (index > 0) {
            let lazyload = false;
            if (window.innerWidth < 768) {
                lazyload = (index > 0);
            } else if (window.innerWidth < 980) {
                lazyload = (index > 3);
            } else {
                lazyload = (index > 5);
            }
            const object = new Article(article, lazyload);
            const item = await object.createItem();
            container.appendChild(item);
        }
    });
}

function stringToHex(str) {
    return Array.from(str)
        .map(char => char.charCodeAt(0).toString(16).padStart(2, "0"))
        .join("");
}

function hexToString(hex) {
    let result = "";
    for (let i = 0; i < hex.length; i += 2) {
        result += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    }
    return result;
}
