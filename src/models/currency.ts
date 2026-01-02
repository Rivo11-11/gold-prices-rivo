import mongoose, { Schema, Document } from 'mongoose';


export interface ICurrency extends Document {
    base: string,
    rates: Map<string, Number>,
    timestamp: number,
    nextExecution: Date,
}

const CurrencySchema: Schema = new Schema({
    base : { type: String, required: true, uppercase: true },
    rates: { type: Map, of: Number, required: true },
    timestamp: { type: Number, required: true },
    nextExecution: { type: Date, required: true },
},{timestamps: true});

export default mongoose.model<ICurrency>('Currency', CurrencySchema);