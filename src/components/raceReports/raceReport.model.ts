import * as mongoose from 'mongoose';

export interface RaceReport extends mongoose.Document {
    _id: mongoose.Schema.Types.ObjectId;
    race_id: mongoose.Schema.Types.ObjectId;
    user_id: mongoose.Schema.Types.ObjectId;
    report_id: mongoose.Schema.Types.ObjectId;
}

const raceReportSchema = new mongoose.Schema(
    {
        race_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Race'
        },
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        report_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Report'
        },
    },
    { timestamps: true }
);

export const RaceReportRecord = mongoose.model<RaceReport>('RaceReport', raceReportSchema);
