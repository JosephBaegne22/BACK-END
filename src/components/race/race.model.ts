import * as mongoose from 'mongoose';

export interface Race extends mongoose.Document {
  _id: mongoose.Schema.Types.ObjectId;
  start_at: Date;
  end_at: Date;
  nb_drivers: number;
  user_id?: mongoose.Schema.Types.ObjectId;
}

const raceSchema = new mongoose.Schema(
  {
    start_at: {
      type: Date,
      required: true,
    },
    end_at: {
      type: Date,
    },
    nb_drivers: {
      type: Number,
      required: true,
      default: 1
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  { timestamps: true }
);

export const RaceRecord = mongoose.model<Race>('Race', raceSchema);