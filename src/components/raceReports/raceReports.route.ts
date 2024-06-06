import { racesReportsController } from "./raceReports.controller";

export default (app: any) => {
    app.get(
        '/api/raceReports/list',
        // [
        //    Common.authenticateToken,
        //    Common.authenticateAccount,
        // ],
        (req: Request, res: Response) => racesReportsController.getRaceReportsList(req, res)
     );
};