import * as mongoose from 'mongoose';

export interface User extends mongoose.Document {
   _id: mongoose.Schema.Types.ObjectId;
   username: string;
   email: string;
   age: number;
   password: string;
}

const userSchema = new mongoose.Schema(
   {
      username: { 
        type: String, 
        required: false 
    },
      email: { 
        type: String, 
        required: false 
    },
      age: { 
        type: Number, 
        required: true 
    },
      password: { 
        type: String 
    }
   },
   { timestamps: true }
);

export const UserRecord = mongoose.model<User>('User', userSchema);
