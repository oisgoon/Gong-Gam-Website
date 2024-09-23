// src/components/Register.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setErrorMessage('비밀번호가 일치하지 않습니다.');
            return;
        }
        try {
            const response = await fetch('http://localhost:8080/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });
            if (response.ok) {
                setSuccessMessage('회원가입 성공!');
                setErrorMessage('');
            } else {
                setErrorMessage('회원가입 실패.');
            }
        } catch (error) {
            setErrorMessage('서버 오류가 발생했습니다.');
        }
    };

    return (
        <div className="container">
            <h2>회원가입</h2>
            <form onSubmit={handleRegister}>
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
                <input
                    type="password"
                    placeholder="비밀번호 확인"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                {successMessage && <p className="success-message">{successMessage}</p>}
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <button type="submit">회원가입</button>
            </form>
            {/* 아래 링크 부분만 남김 */}
            <div className="link">
                계정이 있으신가요?{' '}
                <Link to="/" className="login-link">
                    로그인
                </Link>
            </div>
        </div>
    );
};

export default Register;