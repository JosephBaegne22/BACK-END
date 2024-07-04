import common from "../../utils/common/common";
import { userController } from "./user.controller";
import validator from './user.validator';


export default (app) => {
   app.get(
      '/api/user',
        [
           common.authenticateToken,
        ],
      (req, res) => userController.getUser(req, res)
   );

   app.put(
      '/api/user',
        [
           common.authenticateToken,
        ],
      (req, res) => userController.updateUser(req, res)
   );

   app.post(
      '/api/signIn',
      [
         validator.signIn,
         validator.countLoginAttempt
      ],
      (req, res) => userController.signIn(req, res)
   );

   app.post(
      '/api/signOut',
      [
         common.authenticateToken,
      ],
      (req, res) => userController.signOut(req, res)
   );

   app.post(
      '/api/signUp',
      [
         validator.signUp
      ],
      (req, res) => userController.signUp(req, res)
   );

   app.post(
      '/api/resetPwd',
      [
         validator.signUp,
         validator.countLoginAttempt
      ],
      (req, res) => userController.resetPwd(req, res)
   );
};