import mongoose, { Schema, Document } from 'mongoose';


export interface IMetal extends Document {
  timestamp: number,
  metal: string,
  currency: string,
  exchange: string,
  symbol: string, // GOLDAPI:XAUEGP
  open_time: number,
  price: number,
  ch: number,
  ask: number,
  bid: number,
  price_gram_24k: number,
  price_gram_22k: number,
  price_gram_21k: number,
  price_gram_20k: number,
  price_gram_18k: number,
  price_gram_16k: number,
  price_gram_14k: number,
  price_gram_10k: number,
  nextExecution: Date,
}

const MetalSchema: Schema = new Schema({
  timestamp: { type: Number, required: true },
  metal: { type: String, required: true },
  currency: { type: String, required: true },
  exchange: { type: String, required: true },
  symbol: { type: String, required: true },
  open_time: { type: Number, required: true },
  price: { type: Number, required: true },
  ch: { type: Number, required: true },
  ask: { type: Number, required: true },
  bid: { type: Number, required: true },
  price_gram_24k: { type: Number, required: true },
  price_gram_22k: { type: Number, required: true },
  price_gram_21k: { type: Number, required: true },
  price_gram_20k: { type: Number, required: true },
  price_gram_18k: { type: Number, required: true },
  price_gram_16k: { type: Number, required: true },
  price_gram_14k: { type: Number, required: true },
  price_gram_10k: { type: Number, required: true },
  nextExecution: { type: Date, required: true },
  }, 
  {
  timestamps: true 
  });

export default mongoose.model<IMetal>('Metal', MetalSchema);