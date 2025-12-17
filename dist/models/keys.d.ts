import mongoose, { Document } from 'mongoose';
export interface IKeys extends Document {
    keys: string[];
    current: number;
    next: number;
}
declare const _default: mongoose.Model<IKeys, {}, {}, {}, mongoose.Document<unknown, {}, IKeys, {}, {}> & IKeys & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=keys.d.ts.map