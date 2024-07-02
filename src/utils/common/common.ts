import { Constants } from "../constants/constant";
import jwt from 'jsonwebtoken';
import { logger } from "../logger";
import { NextFunction, Request, Response } from 'express';
import { Helper } from "../helper";
import HttpStatus from 'http-status-codes';
import { SessionRecord } from "../../components/user/session.model";
import { UserRecord } from "../../components/user/user.model";

interface TokenData {
   token: string;
   expiresIn: number | string;
}

interface DataStoredInToken {
   username: string;
   id: string;
   sessionId?: string;
}

export class Common {
    public createSetPasswordToken({ data, expiresIn = Constants.OTHER_TOKEN_EXPIRE_IN }: { data: any; expiresIn?}) {
        try {
           const secret = Constants.TOKEN_SECRET.KEY;
  
           return {
              expiresIn,
              token: jwt.sign(data, secret, { expiresIn })
           };
        } catch (error) {
           logger.error(__filename, { custom_message: 'An error occurred while generate JWT token', error });
           throw error;
        }
     }

     public createToken({ user, session }: { user;  session?}): TokenData {
      try {
         const expiresIn = Constants.JWT_TOKEN_EXPIRE_IN;
         const secret = Constants.TOKEN_SECRET.KEY;
         let dataStoredInToken: DataStoredInToken = {
            username: user.username,
            id: user._id,
            sessionId: session?._id
         };
         return {
            expiresIn,
            token: jwt.sign(dataStoredInToken, secret, { expiresIn })
         };
      } catch (error) {
         logger.error(__filename, { custom_message: 'An error occurred while generate JWT token', error });
         throw error;
      }
   }

   public async authenticateToken(req: Request, res: Response, next: NextFunction) {
      try {
         const token = req.headers.authorization;
         if (token) {
            jwt.verify(token, Constants.TOKEN_SECRET.KEY, async (err, decoded) => {
               if (err) {
                  return Helper.createResponse(res, HttpStatus.UNAUTHORIZED, `Unauthorized access`, {});
               }
               let sessionDetail;

               /** verify session */
               if (decoded?.sessionId) {
                  sessionDetail = await SessionRecord.findOne({ _id: decoded.sessionId }, '_id userId');

                  if (!sessionDetail) {
                     return Helper.createResponse(res, HttpStatus.UNAUTHORIZED, `Unauthorized access`, {});
                  }

                  req['session'] = sessionDetail;
               }

               const [user] = await Promise.all([
                  /** get user detail */
                  UserRecord.findOne({ _id: decoded.id }),
                  /** update session detail */
                  new Promise(async (resolve, reject) => {
                     if (!sessionDetail) return resolve(true);

                     await SessionRecord.updateOne({ _id: sessionDetail._id }, { $set: { expireOn: new Date() } });
                     return resolve(true);
                  })
               ]);
               if (!user) {
                  return Helper.createResponse(res, HttpStatus.UNAUTHORIZED, `Unauthorized access`, {});
               }
               req['user'] = user;
               req['tokenData'] = decoded;

               req.body.user = user;
               req.body.tokenData = decoded;
               next();
            });
         } else {
            Helper.createResponse(res, HttpStatus.UNAUTHORIZED, `Token required`, {});
            return;
         }
      } catch (error) { }
   }

}

export default new Common();