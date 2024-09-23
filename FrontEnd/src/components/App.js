import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import PostList from './PostList';
import CreatePost from './CreatePost';
import Login from './Login';
import Register from './Register';
import './styles.css';

const App = () => {
    const [loggedIn, setLoggedIn] = useState(false);

    return (
        <Router>
            <div className="App">
                <h1>Gong-Gam 게시판</h1>
                <Routes>
                    {!loggedIn ? (
                        <>
                            <Route path="/" element={<Login setLoggedIn={setLoggedIn} />} />
                            <Route path="/register" element={<Register />} />
                        </>
                    ) : (
                        <>
                            <Route path="/" element={<PostList />} />
                            <Route path="/create-post" element={<CreatePost />} />
                        </>
                    )}
                </Routes>
                {!loggedIn && (
                    <div className="link">
                        계정이 없으신가요?{' '}
                        <Link to="/register" className="register-link">
                            회원가입
                        </Link>
                    </div>
                )}
                {loggedIn && (
                    <Link to="/create-post" className="create-post-button">
                        + 게시글 작성
                    </Link>
                )}
            </div>
        </Router>
    );
};

export default App;