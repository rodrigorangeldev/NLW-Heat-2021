import "dotenv/config";
import express from 'express';
import { router } from './routes';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.use(router);

const httpServer = http.createServer(app);
const io = new Server(httpServer, {
    cors:{
        origin: "*"
    }
});

io.on("connection", socket => {console.log(socket.id)});



app.get('/github', (req, res) => {
    res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.clientID}`)
});

app.get('/signin/callback', (req, res) => {
    const { code } = req.query;

    return res.json({ code });
});

export {httpServer, io}