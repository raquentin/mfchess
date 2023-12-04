//* import third-party
import 'dotenv/config'; //* less lines + a one-time import across modules
import cors from 'cors';
import express, { Express, Request, Response } from 'express';
import morgan from 'morgan';
import login from "./routes/login"
import { WebSocket } from 'ws';

const https = require('https');
const fs = require('fs');


const app: Express = express();

//* import local
import db from './db';
import onConnection from './webSocketServer';

//* server init
db.connect();

//* configure middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.use("/login", login)

//* index route
app.get("/", (req: Request, res: Response) => {
    res.status(200).send("Root")
});

const PORT_HTTP = process.env.port ? process.env.port : "3000";
const PORT_WS = "3001";

const options = {
  cert: fs.readFileSync('./cert.pem'),
  key: fs.readFileSync('./key.pem')
};

const server = https.createServer(options);
const wss = new WebSocket.Server({ server });
// const wss = new WebSocket.Server({ 
//   host: '0.0.0.0',
//   port: 4000 
// });
// start HTTP server
app.listen(PORT_HTTP, () => {
  console.log(`listening on port ${PORT_HTTP}`);
});

wss.on('connection', onConnection);
setInterval(() => {
  console.log("Client num:", wss.clients.size)
}, 6000);
