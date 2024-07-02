import * as _ from 'lodash';
import HttpStatus from 'http-status-codes';
import { Helper } from '../../utils/helper';
import { logger } from '../../utils/logger';
import userHelper from './user.helper';
import { UserRecord } from './user.model';
import * as bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { Constants } from '../../utils/constants/constant';


class UsersController {
   public async getUser(req: Request, res: Response) {
      const { user } = req.body;
      try {
         const _user = await UserRecord.findOne({ username: user.username }).lean();
         return Helper.createResponse(res, HttpStatus.OK, 'USER_FETCHED', {_user});
      } catch (error) {
         logger.error(__filename, {
            method: 'getUser',
            requestId: req['uuid'],
            custom_message: 'Error while fetching user datas',
            error
         });
         return Helper.createResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, 'USER_FETCH_ERROR', {});
      }
   }

   public async signUp(req: Request, res: Response) {
      const { username, password, secret_answer } = req.body;

      try {
         const encryptedPassword = await bcrypt.hash(password, Constants.SALT_VALUE);
         const user = new UserRecord({
            username,
            password: encryptedPassword,
            secret_answer
         });
         await user.save();

         return Helper.createResponse(res, HttpStatus.OK, 'USER_CREATED', {});
      } catch (error) {
         logger.error(__filename, {
            method: 'signUp',
            requestId: req['uuid'],
            custom_message: 'Error while create user',
            error
         });
         return Helper.createResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, 'USER_SIGNUP_ERROR', {});
      }
   }

   public async signIn(req: Request, res: Response) {
      const { username, password } = req.body;
      try {
         const _user = await UserRecord.findOne({username}).lean();         

         if (_user) {

            const isPwdMatching = await bcrypt.compare(password, _user.password);

            if (isPwdMatching) {

               let { user: userDetail, tokenData } = await userHelper.userSignIn(_user);

               userDetail = _.omit(userDetail, ['password']);
               
               res.setHeader('Set-Cookie', [Helper.createCookie(tokenData)]);

               return Helper.createResponse(res, HttpStatus.OK, 'SIGNIN_SUCCESS', {
                  user: userDetail,
                  token: tokenData?.token,
               });
            } else {
               logger.error(__filename, {
                  method: 'signIn',
                  requestId: req['uuid'],
                  custom_message: 'Invalid credentials passed',
                  username
               });
               Helper.createResponse(res, HttpStatus.UNAUTHORIZED, 'INVALID_CREDENTIALS', {});
               return;
            }
         } else {
            logger.error(__filename, {
               method: 'signIn',
               requestId: req['uuid'],
               custom_message: 'User does not exist in system',
               username
            });
            Helper.createResponse(res, HttpStatus.NOT_FOUND, 'USER_NOT_FOUND', {});
            return;
         }
      } catch (error) {
         logger.error(__filename, {
            method: 'signIn',
            requestId: req['uuid'],
            custom_message: 'Error while signin',
            error
         });
         return Helper.createResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, 'USER_SIGNIN_ERROR', {});
      }
   }

   public async signOut(req: Request, res: Response) {
      const { user } = req.body
      try {
         await userHelper.removeUserSession({
            userId: user?._id,
            sessionId: req['session']?._id
         });
         return Helper.createResponse(res, HttpStatus.OK, 'USER_OUT', {});
      } catch (error) {
         logger.error(__filename, {
            method: 'signOut',
            requestId: req['uuid'],
            custom_message: 'Error while signout',
            error
         });
         return Helper.createResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, 'USER_SIGNOUT_ERROR', {});
      }
   }

   public async resetPwd(req: Request, res: Response) {
      const { username, secret_answer, password } = req.body
      try {

         const _user = await UserRecord.findOne({ username, secret_answer }).lean();
         
         if (_user) {
            await UserRecord.updateOne({ _id: _user._id }, {
               password: await bcrypt.hash(password, Constants.SALT_VALUE)
            })
            return Helper.createResponse(res, HttpStatus.OK, 'USER_RESET_SUCCESS', {});
         }

         return Helper.createResponse(res, HttpStatus.NOT_FOUND, 'USER_NOT_FOUND', {});
      } catch (error) {
         logger.error(__filename, {
            method: 'resetPwd',
            requestId: req['uuid'],
            custom_message: 'Error while reset password',
            error
         });
         return Helper.createResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, 'PWD_RESET_ERROR', {});
      }
   }
}
export const usersController = new UsersController();