import common from "../../utils/common/common";
import { usersController } from "./user.controller";
import validator from './user.validator';


export default (app) => {
   app.get(
      '/api/user',
        [
           common.authenticateToken,
        ],
      (req, res) => usersController.getUser(req, res)
   );

   app.post(
      '/api/signin',
      [
         validator.signIn
      ],
      (req, res) => usersController.signIn(req, res)
   );

   app.post(
      '/api/signout',
      [
         common.authenticateToken,
      ],
      (req, res) => usersController.signOut(req, res)
   );

   app.post(
      '/api/signup',
      [
         validator.signUp
      ],
      (req, res) => usersController.signUp(req, res)
   );
};