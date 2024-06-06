import express from 'express';
import { middlewares } from './middlewares';
import { routes } from './routes';

class App {
   public app: express.Application;

   constructor() {
      this.app = express();
      this.middlewares();
      this.mountRoutes();
   }

   private middlewares(): void {
      middlewares.init(this.app);
   }

   private mountRoutes(): void {
      routes.init(this.app);
      this.app.get('/', (req, res) => {
         res.send('Hello, Welcome to Drongo Application');
      });
   }
}

export default new App().app;
