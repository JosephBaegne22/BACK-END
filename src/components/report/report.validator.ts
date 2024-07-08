import { NextFunction, Request, Response } from 'express';
import { Helper } from "../../utils/helper";
import { ReportRecord } from './report.model';
import validator from './report.validator';


class ReportValidator {

    public async getReport(req: Request, res: Response, next: NextFunction) {
        const errors = {};
        const { id } = req.params;

        if (id) {
            const race = await ReportRecord.findOne({ _id: id }).lean();

            if (!race) {
                errors["report"] = "REPORT_NOT_FOUND";
            }
        }
        else {
            errors["report"] = "ID_REQUIRED";

        }

        Helper.returnErrorOrPassToNext(res, next, errors);
    }

    public async createReport(req: Request, res: Response, next: NextFunction) {
        const errors = {};
        const { max_speed, min_speed, distance_traveled, winner } = req.body;

        if (!max_speed) {
            errors["max_speed"] = "MAX_SPEED_REQUIRED";
        }
        if (!min_speed) {
            errors["min_speed"] = "MIN_SPEED_REQUIRED";
        }
        if (!distance_traveled) {
            errors["distance_traveled"] = "DISTANCE_TRAVELED_REQUIRED";
        }
        if (!winner) {
            errors["winner"] = "WINNER_REQUIRED";
        }


        Helper.returnErrorOrPassToNext(res, next, errors);
    }
}
export default new ReportValidator();