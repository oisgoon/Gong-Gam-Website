import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ setLoggedIn }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/login', { username, password });
            console.log(response.data);
            setLoggedIn(true);  // 로그인 성공 시 상태 업데이트
        } catch (error) {
            setMessage('로그인 실패: 잘못된 사용자 이름이나 비밀번호');
        }
    };

    return (
        <div className="container">
            <h2>로그인</h2>
            <form onSubmit={handleLogin}>
                <input 
                    type="text" 
                    placeholder="사용자 이름" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    required 
                />
                <input 
                    type="password" 
                    placeholder="비밀번호" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />
                <button type="submit">로그인</button>
                {message && <div className="error-message">{message}</div>}
            </form>
        </div>
    );
};

export default Login;