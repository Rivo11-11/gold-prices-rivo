import mongoose, { Document } from 'mongoose';
export interface IGold extends Document {
    prices: [
        {
            type: String;
            sell: Number;
            buy: Number;
        }
    ];
    nextExecution: Date;
}
declare const _default: mongoose.Model<IGold, {}, {}, {}, mongoose.Document<unknown, {}, IGold, {}, {}> & IGold & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=gold.d.ts.map