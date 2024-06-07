import mongoose, { Schema } from "mongoose";

const circuitsSchema = new mongoose.Schema(
  {
    _id: {
      type: Schema.Types.ObjectId,
      required: true,
    },
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

module.exports = mongoose.model("Circuits", circuitsSchema);
