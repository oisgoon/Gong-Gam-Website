import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import PostList from './PostList';
import CreatePost from './CreatePost';
import Login from './Login';
import Register from './Register';
import PostDetail from './PostDetail';

// 스타일 정의
const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Heading = styled.h1`
  text-align: center;
  font-size: 2.5em;
  color: #333;
  margin-bottom: 20px;
`;

const Container = styled.div`
  background-color: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 50vw;
  height: 50vh;
`;

// 게시글 작성 버튼 스타일
const CreatePostButton = styled(Link)`
  position: fixed;
  bottom: 30px;
  right: 30px;
  background-color: #28a745;
  color: white;
  padding: 10px 20px;
  border-radius: 50px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  font-size: 1.2em;
  text-decoration: none;

  &:hover {
    background-color: #218838;
  }
`;

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();  // 페이지 이동을 위한 hook

  const handleLoginSuccess = () => {
    setLoggedIn(true);
    navigate('/post-list');  // 로그인 성공 시 /post-list로 이동
  };

  return (
    <>
      {/* Heading을 Routes 밖에 배치하여 항상 보이도록 함 */}
      <Heading>Gong-Gam 게시판</Heading>
      <AppContainer>
        <Routes>
          {!loggedIn ? (
            <>
              <Route
                path="/"
                element={<Login setLoggedIn={handleLoginSuccess} />}
              />
              <Route path="/register" element={<Register />} />
            </>
          ) : (
            <>
              <Route path="/post-list" element={<PostList />} />
              <Route path="/create-post" element={<CreatePost />} />
              <Route path="/posts/:id" element={<PostDetail />} />
            </>
          )}
        </Routes>

        {/* 로그인된 상태에서 게시글 작성 버튼 표시 */}
        {loggedIn && (
          <CreatePostButton to="/create-post">+ 게시글 작성</CreatePostButton>
        )}
      </AppContainer>
    </>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;