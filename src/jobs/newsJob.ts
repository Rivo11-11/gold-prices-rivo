import axios from "axios";
import News from "../models/news.js";
import dotenv from "dotenv";

dotenv.config();

export interface INewsResponse {
    data: {
    articles: {
        id: string;
        title: string;
        description: string;
        url: string;
        image: string;
        publishedAt: string;
        source: {
            name: string;
            url: string;
        };
    }[];
}
}

export async function updateNewsFromApi() {
    const NEWS_API_URL = process.env.NEWS_API_URL;
    const NEWS_API_KEY = process.env.NEWS_API_KEY;

    if (!NEWS_API_URL || !NEWS_API_KEY) {
        throw new Error("NEWS_API_URL or NEWS_API_KEY is not defined in environment variables");
    }

    try {
        const response = await axios.get(NEWS_API_URL, {
            params: {
                'q': "الذهب",
                'apikey': NEWS_API_KEY,
                'lang': "ar",
                'country': "eg"
            }
        }) as INewsResponse;
        console.log(response);

        const articles = response.data.articles || [];
        const nextExecution = new Date(Date.now() + 60 * 60 * 1000);
        const savedArticles = [];
        const bulkOperations = articles.map((article) => ({
            updateOne: {
                filter: { externalId: article.id },
                update: {
                    $set: {
                        externalId: article.id,
                        title: article.title,
                        description: article.description,
                        url: article.url,
                        imageUrl: article.image,
                        publishedAt: new Date(article.publishedAt),
                        websiteName: article.source?.name,
                        websiteUrl: article.source?.url,
                        nextExecution: nextExecution
                    }
                },
                upsert: true
            }
        }));
        const result = await News.bulkWrite(bulkOperations);
        savedArticles.push(result);
        console.log("✅ News updated successfully");
        return savedArticles;
    } catch (error) {
        console.error("❌ Error updating news:", error);
        throw error;
    }
}
