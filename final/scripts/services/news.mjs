export default class News {

    KEY = "349cf76a5412449eab5f8a0ef2d9c969";
    ENDPOINT = "https://newsapi.org/v2/everything";

    async getFeaturedArticles() {
        const response = await fetch("./data/featured-news.json");
        if (!response.ok) {
            throw new Error("Failed to fetch news");
        }
        const data = await response.json();
        return data.articles;
    }

    async getArticles() {
        // const response = await fetch(`${this.ENDPOINT}?q=ngo&language=en&apiKey=${this.KEY}`);
        const response = await fetch("./data/news.json");
        if (!response.ok) {
            throw new Error("Failed to fetch news");
        }
        const data = await response.json();
        return data.articles;
    }
}
