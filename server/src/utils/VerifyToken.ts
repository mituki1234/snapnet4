import jwt from 'jsonwebtoken';

const secretKey = 'your-secret-key';

// トークンを検証する
function verifyToken(token: string) {
    try {
        const decoded = jwt.verify(token, secretKey);
        return decoded;
    } catch (error) {
        return null;
    }
}