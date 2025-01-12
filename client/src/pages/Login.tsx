import axios from 'axios';
import { useState } from 'react';
import '../styles/Login.css';

function Login() {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const responce = await axios.post(
                'http://localhost:3002/login',
                {
                    type: 'requestLogin',
                    data: {
                        userId: userId,
                        password: password,
                    }
                },
                { withCredentials: true }
            );
            console.log(responce.data.message);
        } catch (error) {
            console.log(error.response?.data?.message);
        }
        console.log(userId, password);
    }
    return (
        <div className="login-form">
            <h1>ログイン</h1>
            <span>ユーザーID</span>
            <input
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
            />
            <span>パスワード</span>
            <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>ログイン</button>
        </div>
    );
}
export default Login;
