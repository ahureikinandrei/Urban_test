import express, { Express } from 'express';
import { PORT } from './config/constants';

const port = Number(PORT ?? 8000);
const app: Express = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ hello: 'andrei' });
});

const start = async () => {
    try {
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
