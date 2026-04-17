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
    };
}
export declare function updateNewsFromApi(): Promise<import("mongoose").MongooseBulkWriteResult[]>;
//# sourceMappingURL=newsJob.d.ts.map