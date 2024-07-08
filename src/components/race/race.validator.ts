import { NextFunction, Request, Response } from 'express';
import { Helper } from "../../utils/helper";
import { Constants } from '../../utils/constants/constant';
import { RaceRecord } from './race.model';

class RaceValidator {
    public tokenCheck(req: Request, res: Response, next: NextFunction) {
        const errors = {};
        const { user } = req.body;

        if (!user) {
            errors["user"] = "NO_DATA";
        }
        Helper.returnErrorOrPassToNext(res, next, errors);
    }

    public async getRace(req: Request, res: Response, next: NextFunction) {
        const errors = {};
        const { id } = req.params;

        if (id) {
            const race = await RaceRecord.findOne({ _id: id }).lean();

            if (!race) {
                errors["race"] = "RACE_NOT_FOUND";
            }
        }
        else {
            errors["race"] = "ID_REQUIRED";

        }

        Helper.returnErrorOrPassToNext(res, next, errors);
    }
}
export default new RaceValidator();