import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import PostList from './PostList';
import CreatePost from './CreatePost';
import Login from './Login';
import Register from './Register';
import './styles.scss';

const App = () => {
    const [loggedIn, setLoggedIn] = useState(false);

    return (
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

            {/* 로그인된 상태에서 게시글 작성 버튼 표시 */}
            {loggedIn && (
                <Link to="/create-post" className="create-post-button">
                    + 게시글 작성
                </Link>
            )}
        </div>
    );
};

const AppWrapper = () => (
    <Router>
        <App />
    </Router>
);

export default AppWrapper;