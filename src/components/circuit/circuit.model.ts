import * as mongoose from 'mongoose';

export interface Circuit extends mongoose.Document {
  _id: mongoose.Schema.Types.ObjectId;
  width: string;
  name: string;
  location: number;
  indoor: boolean;
}

const circuitSchema = new mongoose.Schema(
  {
    width: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    location: {
      type: Number,
      required: true,
    },
    indoor: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

export const CircuitRecord = mongoose.model<Circuit>('Circuit', circuitSchema);
