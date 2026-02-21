import mongoose, { Schema } from 'mongoose';
const GoldPriceSchema = new Schema({
    type: String,
    sell: Number,
    buy: Number
}, { _id: false });
const GoldSchema = new Schema({
    prices: [GoldPriceSchema],
    nextExecution: { type: Date, required: true },
}, {
    timestamps: true
});
export default mongoose.model('Gold', GoldSchema);
//# sourceMappingURL=gold.js.map