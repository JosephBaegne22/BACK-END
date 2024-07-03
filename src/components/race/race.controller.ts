import HttpStatus from 'http-status-codes';
import { Helper } from '../../utils/helper';
import { logger } from '../../utils/logger';
import { Request, Response } from 'express';
import { RaceRecord } from './race.model';

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

     public async startRace(req: Request, res: Response) {
      const { start_at, circuit_id, nb_drivers = 1 } = req.body;
      try {
         const user = new RaceRecord({
            start_at: new Date(),
            circuit_id,
            nb_drivers
         });
         await user.save();
         return Helper.createResponse(res, HttpStatus.OK, 'START_RACE_SUCCESS', { });
      } catch (error) {
         logger.error(__filename, {
            method: 'getAccounts',
            //requestId: req['uuid'],
            custom_message: 'Error while start new race',
            error
         });
         return Helper.createResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, 'START_RACE_ERROR', {});
      }
   }
}
export const racesController = new RacesController();