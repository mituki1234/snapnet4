import WebSocket from 'ws';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { MongoClient } from 'mongodb';
const jwt = require('jsonwebtoken');
import loginCheck from './Auth/Login';
import signupCheck from './Auth/Signup';

const wsport = 3000;
const epport = 3002;

const app = express();
app.use(cookieParser());
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:3001', // クロスオリジンリクエストを許可するオリジン
    credentials: true, // クロスオリジンリクエストでCookieを送信するための設定
}));
app.get('/ichimatu', (req, res) => {
    res.send('Hello, World!');
});

const wss = new WebSocket.Server({ port: wsport });

const uri =
    'mongodb+srv://takyuudaisukimitu:qxVbzpzE6gbiIAMC@snapnet-node.ddbsz.mongodb.net/?retryWrites=true&w=majority&appName=snapnet-node';
const client = new MongoClient(uri);
const clients = new Set();
let db;
let userCollection: any;
let messageCollection;
wss.on('listening', () => {
    console.log('server is started and listening on port', wsport);
});
async function connectToMongoDB() {
    try {
        // MongoDB サーバーに接続
        await client.connect();
        console.log('mongodb is connected');

        // snapnetデータベースを取得
        db = client.db('snapnet');
        // user_infoコレクションを取得
        userCollection = db.collection('users_data');

        messageCollection = db.collection('messages');
        // インデックスを作成（ユーザー名の重複を防ぐ）
        await userCollection.createIndex({ userId: 1 }, { unique: true });
        await messageCollection.createIndex({ date: -1 }, { unique: false });
    } catch (error) {
        console.error('mongodb connection error', error);
    }
}

wss.on('connection', async function connection(ws, req) {
    console.log('client connected');
    clients.add(ws);
    ws.on('message', async function incoming(message: any) {
        const received = JSON.parse(message);
        console.log(received);
    });
});

connectToMongoDB();

app.post('/login', (req, res): any => {
    console.log(req.body);

    if (req.body.type === 'requestLogin') {
        loginCheck(req.body, res, userCollection);
    }

    return res.status(401).json({ message: 'Invalid credentials' });
});
app.post('/signup', (req, res): any => {
    console.log(req.body, 'login');
    if (req.body.type === 'requestSignup') {
        signupCheck(req.body, res, userCollection);
    }
})
app.get('/get-cookie',(req, res): any => {
    console.log(req.cookies.sessionToken);
    return res.status(200).json({ message: 'クッキー確認⭕️' });
})
app.listen(epport, () => {
    console.log(`Example app listening on port ${epport}`);
});
