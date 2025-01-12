import { useState } from 'react';
import axios from 'axios';
import '../styles/Login.css';

const sendToken = async () => {
  try {
    const responce = await axios.get(
        'http://localhost:3002/get-cookie',
        {
            withCredentials: true,
        },
    );
    console.log(responce.data.message);
} catch (error) {
    console.log(error.response?.data?.message);
}
};

window.onload = () => {
  alert("ページ読み込み完了");
 sendToken();
};
function Signup() {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = async () => {
        try {
            const responce = await axios.post(
                'http://localhost:3002/signup',
                {
                    type: 'requestSignup',
                    data: {
                        userId: userId,
                        password: password,
                    },
                },
                { withCredentials: true },
            );
            console.log(responce.data.message);
        } catch (error) {
            console.log(error.response?.data?.message);
        }
        console.log(userId, password);
    };
    return (
        <div className="login-form">
            <h1>サインアップ</h1>
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
            <button onClick={handleSignup}>ログイン</button>
        </div>
    );
}
export default Signup;
