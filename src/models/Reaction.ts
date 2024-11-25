import { Schema, Types, Document, ObjectId } from 'mongoose';


export interface IReaction extends Document {
  reactionId: ObjectId;
  reactionBody: String;
  username: String
  createdAt: Date;
}

// Schema to create Post model
const reactionSchema = new Schema<IReaction>(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: function() {
        new Types.ObjectId()
      }
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
     required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
   
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);
 



export default reactionSchema;
