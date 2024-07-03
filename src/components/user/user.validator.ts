import { NextFunction, Request, Response } from 'express';
import { Helper } from "../../utils/helper";
import { UserRecord } from './user.model';
import { Constants } from '../../utils/constants/constant';

class UserValidator {
    public signIn(req: Request, res: Response, next: NextFunction) {
        const errors = {};
        const { password, username = '' } = req.body;


        // if (!password) {
        //     errors['password'] = 'PASSWORD_REQUIRED';
        // }

        if (!username) {
            errors['username'] = 'USERNAME_REQUIRED';
        }
        Helper.returnErrorOrPassToNext(res, next, errors);
    }

    public async signUp(req: Request, res: Response, next: NextFunction) {
        const errors = {};
        const { password, username = '', secret_answer = '' } = req.body;

        if (!password) {
            errors['password'] = 'PASSWORD_REQUIRED';
        } else {
            if (password.length < 8) {
                errors['password'] = 'PASSWORD_MIN_LENGTH';
            } else if (password.includes(username)) {
                errors['password'] = 'PASSWORD_CONTAIN_USERNAME';
            } else if (password.toLowerCase() === password) {
                errors['password'] = 'CAPITAL_LETTER_MISSING';
            } else if (password.toUpperCase() === password) {
                errors['password'] = 'SMALL_LETTER_MISSING';
            }
        }

        if (!username) {
            errors['username'] = 'USERNAME_REQUIRED';
        }

        if (!secret_answer) {
            errors['secret_answer'] = 'SECRET_ANSWER_REQUIRED';
        }

        req.body.secret_answer = secret_answer.toLowerCase();
        Helper.returnErrorOrPassToNext(res, next, errors);
    }

    public resetPwd(req: Request, res: Response, next: NextFunction) {
        const errors = {};
        const { password, username = '', secret_answer = '' } = req.body;

        if (!password) {
            errors['password'] = 'PASSWORD_REQUIRED';
        } else {
            if (password.length < 8) {
                errors['password'] = 'PASSWORD_MIN_LENGTH';
            } else if (password.toLowerCase().includes(username.toLowerCase())) {
                errors['password'] = 'PASSWORD_CONTAIN_USERNAME';
            } else if (password.toLowerCase() === password) {
                errors['password'] = 'CAPITAL_LETTER_MISSING';
            } else if (password.toUpperCase() === password) {
                errors['password'] = 'SMALL_LETTER_MISSING';
            }
        }

        if (!username) {
            errors['username'] = 'USERNAME_REQUIRED';
        }

        if (!secret_answer) {
            errors['secret_answer'] = 'SECRET_ANSWER_REQUIRED';
        }

        req.body.secret_answer = secret_answer.toLowerCase();
        Helper.returnErrorOrPassToNext(res, next, errors);
    }

    public async countLoginAttempt(req: Request, res: Response, next: NextFunction) {
        const errors = {};
        const { username = '' } = req.body;
        const _user = await UserRecord.findOne({ username }).lean();
        const todayDate = new Date();

        if (_user) {
            let { count_error_access, blocked, blocked_date } = _user;
            blocked_date = new Date(blocked_date);
            const _blocked_date = new Date(blocked_date.getTime() + 5 * 60000)

            if (blocked) {
                if (_blocked_date >= todayDate) {
                    errors['user'] = 'USER_BLOCKED';
                } else {
                    await UserRecord.updateOne({ _id: _user._id }, { count_error_access: 0, blocked: false, blocked_date: null });
                }
            } else {
                if (count_error_access === Constants.MAX_LOGIN_ATTEMPT) {
                    await UserRecord.updateOne({ _id: _user._id }, { blocked: true, blocked_date: todayDate });
                }
            }
        }

        Helper.returnErrorOrPassToNext(res, next, errors);
    }

}
export default new UserValidator();