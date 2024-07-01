import * as mongoose from 'mongoose';

export interface Report extends mongoose.Document {
  _id: mongoose.Schema.Types.ObjectId;
  max_speed: number;
  min_speed: number;
  distance_traveled: number;
  winner: boolean;
  car_id: mongoose.Schema.Types.ObjectId;
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
    car_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Car'
    },
    accident: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

export const ReportRecord = mongoose.model<Report>('Report', reportSchema);