import HttpStatus from 'http-status-codes';
import { Helper } from '../../utils/helper';
import { logger } from '../../utils/logger';

class RacesController {
    public async getRacesList(req: Request, res: Response) {
        try {
           
           return Helper.createResponse(res, HttpStatus.OK, 'RACES_LIST_FETCHED', { });
        } catch (error) {
           logger.error(__filename, {
              method: 'getAccounts',
              //requestId: req['uuid'],
              custom_message: 'Error while fetching races list',
              error
           });
           return Helper.createResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, 'RACES_LIST_FETCH_ERROR', {});
        }
     }
}
export const racesController = new RacesController();