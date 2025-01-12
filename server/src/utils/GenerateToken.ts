import jwt from 'jsonwebtoken';

// 秘密鍵
const secretKey = 'your-secret-key';

//トークンを作成
function generateToken(userId: string) {
    const payload = {
        userId: userId
    };

    // トークンを生成
    const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
    return token;
}

export default generateToken