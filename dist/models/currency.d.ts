import mongoose, { Document } from 'mongoose';
export interface ICurrency extends Document {
    base: string;
    rates: Map<string, Number>;
    timestamp: number;
    nextExecution: Date;
}
declare const _default: mongoose.Model<ICurrency, {}, {}, {}, mongoose.Document<unknown, {}, ICurrency, {}, {}> & ICurrency & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=currency.d.ts.map