import bodyParser from 'body-parser';
import express, { NextFunction, Request, Response } from 'express';
import { corsObj } from './cors';

class Middlewares {
   public init(app: express.Application) {

      // Eanble CORS support
      corsObj.init(app);

      // Enable request body parsing
      app.use(
         bodyParser.urlencoded({
            extended: true,
            limit: '20mb'
         })
      );
   }
}

export const middlewares = new Middlewares();
