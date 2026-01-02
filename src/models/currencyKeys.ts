import mongoose, { Schema, Document } from 'mongoose';


export interface ICurrencyKeys extends Document {
  keys: string[] , 
  last : number ,
  next : number
}

const CurrencyKeysSchema: Schema = new Schema({
  keys: { type: [String], required: true },
  last : { type: Number, required: true ,default: -1},
  next : { type: Number, required: true ,default: 0}
  }, 
  {
  timestamps: true 
  });

export default mongoose.model<ICurrencyKeys>('CurrencyKeys', CurrencyKeysSchema);