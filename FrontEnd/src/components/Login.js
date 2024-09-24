import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './styles.scss';

const Login = ({ setLoggedIn }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');  // 메시지 상태 추가

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/login', { username, password });
            console.log(response.data);
            setLoggedIn(true);  // 로그인 성공 시 상태 업데이트
        } catch (error) {
            setMessage('로그인 실패: 잘못된 사용자 이름이나 비밀번호');
        }
    };

    return (
        <div className="container">
            <h2>로그인</h2>
            <form onSubmit={handleLogin}>  {/* 여기서 handleSubmit을 handleLogin으로 수정 */}
                <input
                    type="text"
                    placeholder="아이디"
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
            </form>

            {/* 에러 메시지 출력 */}
            {message && <div className="error-message">{message}</div>}

            {/* "계정이 없으신가요?" 부분을 container 안에 배치 */}
            <div className="link">
                계정이 없으신가요?{' '}
                <Link to="/register" className="register-link">
                    회원가입
                </Link>
            </div>
        </div>
    );
};

export default Login;