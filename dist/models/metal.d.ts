import mongoose, { Document } from 'mongoose';
export interface IMetal extends Document {
    timestamp: number;
    metal: string;
    currency: string;
    exchange: string;
    symbol: string;
    open_time: number;
    price: number;
    ch: number;
    ask: number;
    bid: number;
    price_gram_24k: number;
    price_gram_22k: number;
    price_gram_21k: number;
    price_gram_20k: number;
    price_gram_18k: number;
    price_gram_16k: number;
    price_gram_14k: number;
    price_gram_10k: number;
}
declare const _default: mongoose.Model<IMetal, {}, {}, {}, mongoose.Document<unknown, {}, IMetal, {}, {}> & IMetal & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=metal.d.ts.map