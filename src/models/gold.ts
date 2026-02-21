import mongoose, { Schema, Document } from 'mongoose';


export interface IGold extends Document {
  prices  : [{
    type : String , 
    sell : Number , 
    buy : Number
  }]
  nextExecution: Date
}

const GoldPriceSchema = new Schema({
    type : String , 
    sell : Number , 
    buy : Number
},{_id : false})

const GoldSchema: Schema = new Schema({
  prices : [GoldPriceSchema] , 
  nextExecution: { type: Date, required: true },
  }, 
  {
  timestamps: true 
  });

export default mongoose.model<IGold>('Gold', GoldSchema);