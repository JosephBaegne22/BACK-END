import * as mongoose from 'mongoose';

export interface Race extends mongoose.Document {
  _id: mongoose.Schema.Types.ObjectId;
  start_at: Date;
  end_at: Date;
  duration: number;
  v_min: number;
  v_max: number;
  v_moyen: number;
  distance : number;
  mode: string;
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
    duration: {
      type: Number,
    },
    v_min: { 
      type: Number,
    },
    v_max: { 
      type: Number,
    },
    v_moyen: { 
      type: Number,
    },
    distance: {
      type: Number,
    },
    mode: {
      type: String,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  { timestamps: true }
);

export const RaceRecord = mongoose.model<Race>('Race', raceSchema);