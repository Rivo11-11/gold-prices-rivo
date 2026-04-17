import ResponseUtils from "../utils/responseUtils.js";
import News from "../models/news.js";
import { updateNewsFromApi } from "../jobs/newsJob.js";
export class NewsController {
    async getNews(req, res) {
        try {
            const page = parseInt(req.query.page) || 1;
            const perPage = parseInt(req.query.perPage) || 10;
            const latestNews = await News.findOne().sort({ updatedAt: -1 });
            if (!latestNews || !latestNews.nextExecution || latestNews.nextExecution < new Date()) {
                await updateNewsFromApi();
            }
            const skip = (page - 1) * perPage;
            const newsItems = await News.find()
                .sort({ publishedAt: -1 })
                .skip(skip)
                .limit(perPage);
            const total = await News.countDocuments();
            // mapping only interested element
            const formattedNews = newsItems.map(item => {
                return {
                    _id: item._id,
                    externalId: item.externalId,
                    title: item.title,
                    description: item.description,
                    url: item.url,
                    imageUrl: item.imageUrl,
                    publishedAt: item.publishedAt,
                    websiteName: item.websiteName,
                    websiteUrl: item.websiteUrl,
                };
            });
            return ResponseUtils.success(res, {
                articles: formattedNews,
                pagination: {
                    total,
                    page,
                    perPage,
                    totalPages: Math.ceil(total / perPage)
                }
            });
        }
        catch (error) {
            console.error("❌ Error in NewsController:", error);
            return ResponseUtils.error(res, 500, "Internal Server Error");
        }
    }
}
//# sourceMappingURL=NewsController.js.map