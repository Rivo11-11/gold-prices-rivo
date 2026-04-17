import mongoose, { Schema, Document } from 'mongoose';


export interface INews extends Document {
  externalId : string,
  title : string,
  description? : string,
  url : string,
  imageUrl? : string,
  publishedAt : string,
  websiteName? : string,
  websiteUrl? : string,
  nextExecution : Date

}

const NewsSchema: Schema = new Schema({
    externalId : {
        type : String,
        required : true,
        index : true
    },
    title : {
        type : String ,
        required : true
    },
    description : {
        type : String,
        required : false
    },
    url : {
        type : String,
        required : true
    },
    imageUrl : {
        type : String,
        required : false
    },
    publishedAt : {
        type : String ,
        required : true
    },

    websiteName : {
        type : String ,
        required : false
    },

    websiteUrl : {
        type : String ,
        required : false
    },

    nextExecution: { 
        type: Date, 
        required: true 
    },

  }, 

  {
  timestamps: true 
  });

export default mongoose.model<INews>('News', NewsSchema);