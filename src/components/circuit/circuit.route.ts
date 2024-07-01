import { circuitsController } from "./circuit.controller";

export default (app: any) => {
    app.get(
        '/api/circuits/list',
        // [
        //    Common.authenticateToken,
        //    Common.authenticateAccount,
        // ],
        (req: Request, res: Response) => circuitsController.getCircuitsList(req, res)
     );
};