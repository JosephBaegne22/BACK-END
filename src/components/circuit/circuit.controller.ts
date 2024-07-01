import HttpStatus from 'http-status-codes';
import { Helper } from '../../utils/helper';
import { logger } from '../../utils/logger';

class CircuitsController {
    public async getCircuitsList(req: Request, res: Response) {
        try {
           
           return Helper.createResponse(res, HttpStatus.OK, 'CIRCUITS_LIST_FETCHED', { });
        } catch (error) {
           logger.error(__filename, {
              method: 'getAccounts',
              //requestId: req['uuid'],
              custom_message: 'Error while fetching circuits list',
              error
           });
           return Helper.createResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, 'CIRCUITS_LIST_FETCH_ERROR', {});
        }
     }
}
export const circuitsController = new CircuitsController();