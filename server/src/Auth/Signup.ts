const jwt = require('jsonwebtoken');
import loginSchema from '../Schema/LoginSchema';
import generateToken from '../utils/GenerateToken';

async function signupCheck(
    received: loginSchema,
    res: any,
    userCollection: any,
) {
    const userData = received.data;
    const user = await userCollection.findOne({
        user_id: userData.userId,
        password: userData.password,
    });
    if (user) {
        console.log('no');
    } else {
        console.log('yes');
        const token: string = generateToken(userData.userId);
        const result = await userCollection.insertOne({
            userId: userData.userId,
            password: userData.password,
        });
        // 秘密鍵（セキュリティのため、環境変数に保存することを推奨）
        const secretKey = 'your_secret_key';

        // ペイロード（トークンに含めるデータ）
        const payload = {
            userId: userData.userId,
        };

        const accessToken = jwt.sign(payload, secretKey, { expiresIn: '1h' });
        const sessionToken = jwt.sign(payload, secretKey, { expiresIn: '1h' });

        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            sameSite: 'strict',
            maxAge: 3600000,
        });
        res.cookie('sessionToken', sessionToken, {
            httpOnly: true,
            sameSite: 'strict',
            maxAge: 604800000,
        });
        res.status(200).json({ message: 'ユーザーが作成されました' });
    }
}

export default signupCheck;
