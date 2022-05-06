import express, { Express } from 'express';
import errorHandler from './error/ErrorHandling.middleware';
import router from './common/routes';

const app: Express = express();

app.use(express.urlencoded({ parameterLimit: 10 }));
app.use(express.json());
app.use(errorHandler);
app.use(router);

export default app;
