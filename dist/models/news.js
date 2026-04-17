import mongoose, { Schema } from 'mongoose';
const NewsSchema = new Schema({
    externalId: {
        type: String,
        required: true,
        index: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    url: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: false
    },
    publishedAt: {
        type: String,
        required: true
    },
    websiteName: {
        type: String,
        required: false
    },
    websiteUrl: {
        type: String,
        required: false
    },
    nextExecution: {
        type: Date,
        required: true
    },
}, {
    timestamps: true
});
export default mongoose.model('News', NewsSchema);
//# sourceMappingURL=news.js.map