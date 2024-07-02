import { NextFunction, Request, Response } from 'express';
import { Helper } from "../../utils/helper";
import { UserRecord } from './user.model';

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
        }else{
            if(password.length < 8) {
                errors['password'] = 'PASSWORD_MIN_LENGTH';
            }else if(password.toLowerCase().includes(username.toLowerCase())) {
                errors['password'] = 'PASSWORD_CONTAIN_USERNAME';
            }else if(password.toLowerCase() === password){
                errors['password'] = 'CAPITAL_LETTER_MISSING';
            }else if(password.toUpperCase() === password){
                errors['password'] = 'SMALL_LETTER_MISSING';
            }
        }

        if (!username) {
            errors['username'] = 'USERNAME_REQUIRED';
        }else{
            const checkUser = await UserRecord.findOne({ username, isDeleted: false }).lean();
            if(checkUser) {
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

    public async resetPwd(req: Request, res: Response, next: NextFunction) {
        const errors = {};
        const { password, username = '', secret_answer = '' } = req.body;        

        if (!password) {
            errors['password'] = 'PASSWORD_REQUIRED';
        }else{
            if(password.length < 8) {
                errors['password'] = 'PASSWORD_MIN_LENGTH';
            }else if(password.toLowerCase().includes(username.toLowerCase())) {
                errors['password'] = 'PASSWORD_CONTAIN_USERNAME';
            }else if(password.toLowerCase() === password){
                errors['password'] = 'CAPITAL_LETTER_MISSING';
            }else if(password.toUpperCase() === password){
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
}
export default new UserValidator();