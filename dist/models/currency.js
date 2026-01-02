import mongoose, { Schema } from 'mongoose';
const CurrencySchema = new Schema({
    base: { type: String, required: true, uppercase: true },
    rates: { type: Map, of: Number, required: true },
    timestamp: { type: Number, required: true },
    nextExecution: { type: Date, required: true },
}, { timestamps: true });
export default mongoose.model('Currency', CurrencySchema);
//# sourceMappingURL=currency.js.map