import mongoose, { Document } from 'mongoose';
export interface ICurrencyKeys extends Document {
    keys: string[];
    last: number;
    next: number;
}
declare const _default: mongoose.Model<ICurrencyKeys, {}, {}, {}, mongoose.Document<unknown, {}, ICurrencyKeys, {}, {}> & ICurrencyKeys & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=currencyKeys.d.ts.map