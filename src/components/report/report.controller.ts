import HttpStatus from 'http-status-codes';
import { Helper } from '../../utils/helper';
import { logger } from '../../utils/logger';
import { Request, Response } from 'express';
import { ReportRecord } from './report.model';

class ReportController {
    public async getReport(req: Request, res: Response) {
      const { id } = req.params;
        try {
           const report = await ReportRecord.findOne({ _id: id }).lean();
           return Helper.createResponse(res, HttpStatus.OK, 'REPORT_FETCHED', { report });
        } catch (error) {
           logger.error(__filename, {
              method: 'getReport',
              requestId: req['uuid'],
              custom_message: 'Error while fetching report',
              error
           });
           return Helper.createResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, 'REPORT_FETCH_ERROR', {});
        }
     }

     public async createReport(req: Request, res: Response) {
      const { max_speed, min_speed, distance_traveled, winner, crash } = req.body;
      try {
         const report = new ReportRecord({
            max_speed, 
            min_speed, 
            distance_traveled, 
            winner, 
            crash
         });
         await report.save();
         return Helper.createResponse(res, HttpStatus.OK, 'REPORT_CREATE_SUCCESS', { });
      } catch (error) {
         logger.error(__filename, {
            method: 'createReport',
            requestId: req['uuid'],
            custom_message: 'Error while create new report',
            error
         });
         return Helper.createResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, 'REPORTS_CREATE_ERROR', {});
      }
   }
}
export const reportController = new ReportController();