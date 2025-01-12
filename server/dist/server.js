"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = __importDefault(require("ws"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const mongodb_1 = require("mongodb");
const jwt = require('jsonwebtoken');
const Login_1 = __importDefault(require("./Auth/Login"));
const Signup_1 = __importDefault(require("./Auth/Signup"));
const wsport = 3000;
const epport = 3002;
const app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: 'http://localhost:3001', // クロスオリジンリクエストを許可するオリジン
    credentials: true, // クロスオリジンリクエストでCookieを送信するための設定
}));
app.get('/ichimatu', (req, res) => {
    res.send('Hello, World!');
});
const wss = new ws_1.default.Server({ port: wsport });
const uri = 'mongodb+srv://takyuudaisukimitu:qxVbzpzE6gbiIAMC@snapnet-node.ddbsz.mongodb.net/?retryWrites=true&w=majority&appName=snapnet-node';
const client = new mongodb_1.MongoClient(uri);
const clients = new Set();
let db;
let userCollection;
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
    }
    catch (error) {
        console.error('mongodb connection error', error);
    }
}
wss.on('connection', async function connection(ws, req) {
    console.log('client connected');
    clients.add(ws);
    ws.on('message', async function incoming(message) {
        const received = JSON.parse(message);
        console.log(received);
    });
});
connectToMongoDB();
app.post('/login', (req, res) => {
    console.log(req.body);
    if (req.body.type === 'requestLogin') {
        (0, Login_1.default)(req.body, res, userCollection);
    }
    return res.status(401).json({ message: 'Invalid credentials' });
});
app.post('/signup', (req, res) => {
    console.log(req.body, 'login');
    if (req.body.type === 'requestSignup') {
        (0, Signup_1.default)(req.body, res, userCollection);
    }
});
app.get('/get-cookie', (req, res) => {
    console.log(req.cookies.sessionToken);
    return res.status(200).json({ message: 'クッキー確認⭕️' });
});
app.listen(epport, () => {
    console.log(`Example app listening on port ${epport}`);
});
