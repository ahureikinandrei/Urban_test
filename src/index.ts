import express, { Express, Request, Response } from 'express';
import { createClient } from 'redis';
import { PORT, REDIS_URL } from './config/constants';

const port = Number(PORT ?? 8000);
const app: Express = express();
app.use(express.json());

const redisClient = createClient({ url: REDIS_URL });

app.get('/', async (req: Request, res: Response) => {
    res.json({ status: 'success' });
});

const start = async () => {
    try {
        await redisClient.connect();

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
