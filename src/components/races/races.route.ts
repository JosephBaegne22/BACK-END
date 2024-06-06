import { racesController } from "./races.controller";

export default (app: any) => {
    app.get(
        '/api/races/list',
        // [
        //    Common.authenticateToken,
        //    Common.authenticateAccount,
        // ],
        (req: Request, res: Response) => racesController.getRacesList(req, res)
     );
};