export default class News {

    async getArticles(featured = false) {
        const file = (featured) ? "featured-news.json" : "news.json";
        try {
            const response = await fetch(`./data/${file}`);
            if (!response.ok) {
                throw new Error("Failed to fetch news");
            }
            const data = await response.json();
            return data.data;
        } catch (error) {
            console.log(`Error: ${error}`);
        }
    }
}
