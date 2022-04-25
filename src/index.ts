import express, { Express } from 'express';
import { PORT } from './config/constants';
import errorHandler from './error/ErrorHandling.middleware';
import router from './common/routes';
import cashService from './cash/cash.service';

import DistrictService from './district/district.service';

const port = Number(PORT ?? 8000);
const app: Express = express();

app.use(express.json());
app.use(errorHandler);
app.use(router);

const start = async () => {
    try {
        await DistrictService.init();
        const cashServiceStatus = await cashService.connect();
        console.log(cashServiceStatus);

        app.listen(port, '0.0.0.0', () => {
            console.log(
                `[server]: Server is running at https://localhost:${port}`
            );
        });
    } catch (e) {
        console.log(e);
    }
};

start();
