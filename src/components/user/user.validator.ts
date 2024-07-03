import { NextFunction, Request, Response } from 'express';
import { Helper } from "../../utils/helper";
import { UserRecord } from './user.model';
import { Constants } from '../../utils/constants/constant';

class UserValidator {
    public signIn(req: Request, res: Response, next: NextFunction) {
        const errors = {};
        const { password, username = '' } = req.body;

        if (!password) {
            errors['password'] = 'PASSWORD_REQUIRED';
        }

        if (!username) {
            errors['username'] = 'USERNAME_REQUIRED';
        }
        req.body.username = username.toLowerCase();
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
        } else {
            const checkUser = await UserRecord.findOne({ username, isDeleted: false }).lean();
            if (checkUser) {
                errors['username'] = 'USERNAME_EXIST';
            }
        }

        if (!secret_answer) {
            errors['secret_answer'] = 'SECRET_ANSWER_REQUIRED';
        }

        req.body.username = username.toLowerCase();
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

        req.body.username = username.toLowerCase();
        req.body.secret_answer = secret_answer.toLowerCase();
        Helper.returnErrorOrPassToNext(res, next, errors);
    }

    public async countLoginAttempt(req: Request, res: Response, next: NextFunction) {
        const errors = {};
        const { username = '' } = req.body;
        const _user = await UserRecord.findOne({ username }).lean();
        const todayDate = new Date();
        const nowHour = todayDate.getHours();
        console.log('nowHour', nowHour);
        
        if (_user) {
            const { count_error_access, blocked, blocked_date } = _user;
            const blocked_hour = blocked_date ? blocked_date.getHours() : 0;

            if (blocked) {
                if (blocked_hour < (nowHour + 1)) {
                    errors['user'] = 'USER_BLOCKED';
                } else {
                    await UserRecord.updateOne({ _id: _user._id }, { count_error_access: 0, blocked: false, blocked_date: null });
                }
            }else{
                if (count_error_access === Constants.MAX_LOGIN_ATTEMPT) {
                    await UserRecord.updateOne({ _id: _user._id }, { blocked: true, blocked_date: todayDate });
                }
            }
        }

        req.body.username = username.toLowerCase();
        Helper.returnErrorOrPassToNext(res, next, errors);
    }

}
export default new UserValidator();