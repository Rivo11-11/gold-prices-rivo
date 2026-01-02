import mongoose, { Schema } from 'mongoose';
const CurrencyKeysSchema = new Schema({
    keys: { type: [String], required: true },
    last: { type: Number, required: true, default: -1 },
    next: { type: Number, required: true, default: 0 }
}, {
    timestamps: true
});
export default mongoose.model('CurrencyKeys', CurrencyKeysSchema);
//# sourceMappingURL=currencyKeys.js.map