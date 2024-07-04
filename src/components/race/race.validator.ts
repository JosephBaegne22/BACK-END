import { NextFunction, Request, Response } from 'express';
import { Helper } from "../../utils/helper";
import { Constants } from '../../utils/constants/constant';

class RaceValidator {
    public tokenCheck(req: Request, res: Response, next: NextFunction) {
        const errors = {};
        const { user } = req.body;

        if (!user) {
            errors["user"] = "NO_DATA";
        }
        Helper.returnErrorOrPassToNext(res, next, errors);
    }

    public getRace(req: Request, res: Response, next: NextFunction) {
        const errors = {};
        const { id } = req.params;

        if (!id) {
            errors["race"] = "ID_REQUIRED";
        }

        Helper.returnErrorOrPassToNext(res, next, errors);
    }
}
export default new RaceValidator();