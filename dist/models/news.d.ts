import mongoose, { Document } from 'mongoose';
export interface INews extends Document {
    externalId: string;
    title: string;
    description?: string;
    url: string;
    imageUrl?: string;
    publishedAt: string;
    websiteName?: string;
    websiteUrl?: string;
    nextExecution: Date;
}
declare const _default: mongoose.Model<INews, {}, {}, {}, mongoose.Document<unknown, {}, INews, {}, {}> & INews & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=news.d.ts.map