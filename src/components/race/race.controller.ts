import HttpStatus from 'http-status-codes';
import { Helper } from '../../utils/helper';
import { logger } from '../../utils/logger';
import { Request, Response } from 'express';
import { RaceRecord } from './race.model';

class RaceController {
    public async getRacesList(req: Request, res: Response) {
      const { user } = req.body;
        try {
           if (!user) {
              return Helper.createResponse(res, HttpStatus.NO_CONTENT, 'USER_DATA_NOT_FOUND', { });
           }
           const races = await RaceRecord.find({ user_id: user._id }).lean();
           return Helper.createResponse(res, HttpStatus.OK, 'RACES_LIST_FETCHED', { races });
        } catch (error) {
           logger.error(__filename, {
              method: 'getRacesList',
              requestId: req['uuid'],
              custom_message: 'Error while fetching races list',
              error
           });
           return Helper.createResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, 'RACES_LIST_FETCH_ERROR', {});
        }
     }

     public async getRace(req: Request, res: Response) {
      const { id } = req.params;
        try {
           const race = await RaceRecord.findOne({ _id: id }).lean();

           return Helper.createResponse(res, HttpStatus.OK, 'RACE_FETCHED', { race });
        } catch (error) {
           logger.error(__filename, {
              method: 'getRace',
              requestId: req['uuid'],
              custom_message: 'Error while fetching race',
              error
           });
           return Helper.createResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, 'RACE_FETCH_ERROR', {});
        }
     }

     public async startRace(req: Request, res: Response) {
      const { nb_drivers = 1, user } = req.body;
      try {         
         const race = new RaceRecord({
            start_at: new Date(),
            nb_drivers,
            user_id: user._id || '',
         });
         await race.save();
         return Helper.createResponse(res, HttpStatus.OK, 'START_RACE_SUCCESS', { });
      } catch (error) {
         logger.error(__filename, {
            method: 'startRace',
            requestId: req['uuid'],
            custom_message: 'Error while start new race',
            error
         });
         return Helper.createResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, 'START_RACE_ERROR', {});
      }
   }

   public async endRace(req: Request, res: Response) {
      const { id } = req.params;
      try {
         const race = await RaceRecord.findOne({ _id: id }).lean();

         if (race?.end_at) {
            return Helper.createResponse(res, HttpStatus.BAD_REQUEST, 'RACE_ALREADY_END', { });
         }

         await RaceRecord.updateOne({_id: id}, {$set: {end_at: new Date()}});

         return Helper.createResponse(res, HttpStatus.OK, 'END_RACE_SUCCESS', { });
      } catch (error) {
         logger.error(__filename, {
            method: 'endRace',
            requestId: req['uuid'],
            custom_message: 'Error while end new race',
            error
         });
         return Helper.createResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, 'END_RACE_ERROR', {});
      }
   }
}
export const raceController = new RaceController();