import * as mongoose from 'mongoose';

export interface User extends mongoose.Document {
  _id: mongoose.Schema.Types.ObjectId;
  username: string;
  password: string;
}

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: false
    },
    password: {
      type: String
    }
  },
  { timestamps: true }
);

export const UserRecord = mongoose.model<User>('User', userSchema);