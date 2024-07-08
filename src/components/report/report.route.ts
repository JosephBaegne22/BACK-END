import { reportController } from "./report.controller";
import validator from './report.validator';


export default (app: any) => {

        app.get(
            '/api/report/:id',
            [   
                validator.getReport
            ],
            (req, res) => reportController.getReport(req, res)
        );

        app.post(
            '/api/report',
            [  
            
            ],
            (req, res) => reportController.createReport(req, res)
        );
    
};