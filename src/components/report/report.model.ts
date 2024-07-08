import * as mongoose from 'mongoose';

export interface Report extends mongoose.Document {
  _id: mongoose.Schema.Types.ObjectId;
  max_speed: number;
  min_speed: number;
  distance_traveled: number;
  winner: boolean;
  accident: boolean;
}

const reportSchema = new mongoose.Schema(
  {
    max_speed: {
      type: Number,
      required: true,
    },
    min_speed: {
      type: Number,
      required: true,
    },
    distance_traveled: {
      type: Number,
      required: true,
    },
    winner: {
      type: Boolean,
      required: true,
    },
    accident: {
      type: Boolean,
      required: true,
      default: false
    },
  },
  { timestamps: true }
);

export const ReportRecord = mongoose.model<Report>('Report', reportSchema);