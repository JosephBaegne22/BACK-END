import common from "../../utils/common/common";
import { logger } from "../../utils/logger";
import { SessionRecord } from "./session.model";

class UserHelper {

    public async removeUserSession({
        sessionId,
        userId,
        transactionSession
     }: {
        sessionId?;
        userId;
        transactionSession?;
     }) {
        try {
           let removeSessionCondition: any = {
              _id: sessionId,
              userId
           };
  
           if (userId) {
              removeSessionCondition.userId = userId;
           }
  
           /** remove session */
           await SessionRecord.deleteOne({
              _id: sessionId,
              userId
           }).session(transactionSession);
        } catch (error) {
           logger.error(__filename, {
              method: 'removeUserSession',
              requestId: '',
              custom_message: 'Error while removing user session',
              error
           });
           throw error;
        }
     }

     public async userSignIn(userDetail) {
      try {

         /** create user session */
         let sessionData;

         await SessionRecord.create({
            userId: userDetail._id,
         });

         const tokenData = common.createToken({ user: userDetail, session: sessionData });

         return {
            user: { ...userDetail },
            tokenData,
         };
      } catch (error) {
         logger.error(__filename, {
            method: 'userSignIn',
            requestId: '',
            custom_message: 'Error while signing user',
            error
         });
         throw error;
      }
   }

}
export default new UserHelper();