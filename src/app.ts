import http from 'http';
import express, { Express } from 'express';
import {test} from "./server";

const app: Express = express();

app.get('/', async (_req: any, res: any) => {
    await test(res);
});

const httpServer = http.createServer(app);

const port = 3000;
httpServer.listen(port, () => console.log(`The server is running on port ${port}`));
