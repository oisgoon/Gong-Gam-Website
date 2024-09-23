// src/components/Register.js
import React, { useState } from 'react';

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState(''); // 성공 메시지 상태 추가

    // 폼 제출 핸들러
    const handleSubmit = async (event) => {
        event.preventDefault();
        
        if (password !== confirmPassword) {
            setErrorMessage('비밀번호가 일치하지 않습니다.');
            return;
        }

        // 회원가입 API 요청
        try {
            const response = await fetch('http://localhost:8080/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                setSuccessMessage('회원가입 성공!'); // 성공 메시지 설정
                setErrorMessage(''); // 에러 메시지 초기화
                // 성공 후 추가 행동 (예: 로그인 페이지로 리다이렉트) 필요 시 추가
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.message || '회원가입 실패.'); // 서버에서 반환한 오류 메시지 사용
            }
        } catch (error) {
            setErrorMessage('서버 오류가 발생했습니다.');
        }
    };

    return (
        <div className="container">
            <h2>회원가입</h2>
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
                <input
                    type="password"
                    placeholder="비밀번호 확인"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                {successMessage && <p className="success-message">{successMessage}</p>} {/* 성공 메시지 표시 */}
                <button type="submit">회원가입</button>
            </form>
        </div>
    );
}

export default Register;