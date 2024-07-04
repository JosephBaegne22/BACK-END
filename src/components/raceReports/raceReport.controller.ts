import HttpStatus from 'http-status-codes';
import { Helper } from '../../utils/helper';
import { logger } from '../../utils/logger';

class RaceReportController {
    public async getRaceReportsList(req: Request, res: Response) {
        try {
           
           return Helper.createResponse(res, HttpStatus.OK, 'RACE_REPORTS_LIST_FETCHED', { });
        } catch (error) {
           logger.error(__filename, {
              method: 'getAccounts',
              //requestId: req['uuid'],
              custom_message: 'Error while fetching race reports list',
              error
           });
           return Helper.createResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, 'RACE_REPORTS_LIST_FETCH_ERROR', {});
        }
     }
}
export const raceReportController = new RaceReportController();