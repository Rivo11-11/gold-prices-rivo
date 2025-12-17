import mongoose, { Schema, Document } from 'mongoose';


export interface IKeys extends Document {
  keys: string[] , 
  current : number ,
  next : number
}

const KeysSchema: Schema = new Schema({
  keys: { type: [String], required: true },
  current : { type: Number, required: true ,default: 0},
  next : { type: Number, required: true ,default: 1}
  }, 
  {
  timestamps: true 
  });

export default mongoose.model<IKeys>('Keys', KeysSchema);