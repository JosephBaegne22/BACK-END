import HttpStatus from 'http-status-codes';
import { Helper } from '../../utils/helper';
import { logger } from '../../utils/logger';


class CarsController {
    public async getCarsList(req: Request, res: Response) {
        try {
           
           return Helper.createResponse(res, HttpStatus.OK, 'CARS_LIST_FETCHED', { });
        } catch (error) {
           logger.error(__filename, {
              method: 'getAccounts',
              //requestId: req['uuid'],
              custom_message: 'Error while fetching cars list',
              error
           });
           return Helper.createResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, 'CARS_LIST_FETCH_ERROR', {});
        }
     }
}
export const carsController = new CarsController();