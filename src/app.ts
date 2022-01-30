import http from 'http';
import express, { Express } from 'express';

const app: Express = express();

app.get('/', (_req: any, res: any) => {
    res.send('Welcome to Edurekas REST API with Node.js Tutorial!!');
});

const httpServer = http.createServer(app);

const port = 3000;
httpServer.listen(port, () => console.log(`The server is running on port ${port}`));
