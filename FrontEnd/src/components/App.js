// src/components/App.js
import React, { useState } from 'react';
import PostList from './PostList';
import Login from './Login';
import Register from './Register';
import './styles.css'; // CSS 파일 임포트

function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [isRegistering, setIsRegistering] = useState(false);

    // 회원가입/로그인 화면 전환 함수
    const handleRegisterToggle = () => {
        setIsRegistering(!isRegistering);
    };

    return (
        <div className="App">
            <h1>Gong-Gam 게시판</h1>
            {loggedIn ? (
                <PostList />
            ) : isRegistering ? (
                <>
                    <Register />
                    <p className="link">
                        이미 계정이 있으신가요?{' '}
                        <button onClick={handleRegisterToggle}>로그인</button>
                    </p>
                </>
            ) : (
                <>
                    <Login setLoggedIn={setLoggedIn} />
                    <p className="link">
                        계정이 없으신가요?{' '}
                        <button onClick={handleRegisterToggle}>회원가입</button>
                    </p>
                </>
            )}
        </div>
    );
}

export default App;