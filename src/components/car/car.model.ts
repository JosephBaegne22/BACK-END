import * as mongoose from 'mongoose';

export interface Car extends mongoose.Document {
    _id: mongoose.Schema.Types.ObjectId;
    name: string;
    nb_races: number;
    type: string;
    damaged: boolean;
}

const carSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        nb_races: {
            type: Number,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
        damaged: {
            type: Boolean,
            required: true,
        },
    },
    { timestamps: true }
);

export const CarRecord = mongoose.model<Car>('Car', carSchema);
