import { usersController } from "./user.controller";

export default (app: any) => {
    app.get(
        '/api/user',
        // [
        //    Common.authenticateToken,
        //    Common.authenticateAccount,
        // ],
        (req: Request, res: Response) => usersController.getUser(req, res)
     );
};