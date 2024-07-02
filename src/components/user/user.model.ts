import * as mongoose from 'mongoose';

export interface User extends mongoose.Document {
  _id: mongoose.Schema.Types.ObjectId;
  username: string;
  password: string;
  secret_answer: string;
}

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: false
    },
    password: {
      type: String,
      required: true
    },
    secret_answer: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

export const UserRecord = mongoose.model<User>('User', userSchema);