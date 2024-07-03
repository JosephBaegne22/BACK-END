import * as mongoose from 'mongoose';

export interface User extends mongoose.Document {
  _id: mongoose.Schema.Types.ObjectId;
  username: string;
  password: string;
  secret_answer: string;
  count_error_access: number;
  blocked_date: Date;
  blocked: boolean;
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
    },
    count_error_access: {
      type: Number,
      default: 0
    },
    blocked_date: {
      type: Date
    },
    blocked: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

export const UserRecord = mongoose.model<User>('User', userSchema);