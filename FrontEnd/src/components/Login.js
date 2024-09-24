import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './styles.scss';

const Login = ({ setLoggedIn }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // 로그인 로직 처리
        setLoggedIn(true);  // 로그인 성공 시 상태 변경
    };

    return (
        <div className="container">
            <h2>로그인</h2>
            <form onSubmit={handleSubmit}>
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