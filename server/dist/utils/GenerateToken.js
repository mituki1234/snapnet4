"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// 秘密鍵
const secretKey = 'your-secret-key';
//トークンを作成
function generateToken(userId) {
    const payload = {
        userId: userId
    };
    // トークンを生成
    const token = jsonwebtoken_1.default.sign(payload, secretKey, { expiresIn: '1h' });
    return token;
}
exports.default = generateToken;
