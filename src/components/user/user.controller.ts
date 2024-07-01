import HttpStatus from 'http-status-codes';
import { Helper } from '../../utils/helper';
import { logger } from '../../utils/logger';

class UsersController {
    public async getUser(req: Request, res: Response) {
        try {
           
           return Helper.createResponse(res, HttpStatus.OK, 'USER_FETCHED', { });
        } catch (error) {
           logger.error(__filename, {
              method: 'getAccounts',
              //requestId: req['uuid'],
              custom_message: 'Error while fetching user datas',
              error
           });
           return Helper.createResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, 'USER_FETCH_ERROR', {});
        }
     }
}
export const usersController = new UsersController();