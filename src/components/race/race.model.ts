import * as mongoose from 'mongoose';

export interface Race extends mongoose.Document {
  _id: mongoose.Schema.Types.ObjectId;
  end_at: Date;
  circuit_id: mongoose.Schema.Types.ObjectId;
  nb_drivers: number;
}

const raceSchema = new mongoose.Schema(
  {
    start_at: {
      type: Date,
      required: true,
    },
    end_at: {
      type: Date,
      required: true,
    },
    circuit_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Circuit'
    },
    nb_drivers: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export const RaceRecord = mongoose.model<Race>('Race', raceSchema);