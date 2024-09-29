import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import PostList from './PostList';
import CreatePost from './CreatePost';
import Login from './Login';
import Register from './Register';
import PostDetail from './PostDetail';
import PostEdit from './PostEdit';
import axios from 'axios';

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

const Header = styled.div`
  position: absolute;
  top: 10px;
  right: 20px;
  font-size: 1.2em;
  color: #333;
`;

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
  const [username, setUsername] = useState('');  // 유저 이름 상태
  const [userid, setUserid] = useState('');      // 유저 ID 상태

  const navigate = useNavigate();  // 페이지 이동을 위한 hook

  // 로그아웃 처리 함수
  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:8080/api/logout', {}, {
        withCredentials: true  // 쿠키를 포함하여 로그아웃 요청
      });

      // 로그아웃 성공 시 상태를 초기화하고 로그인 페이지로 이동
      setLoggedIn(false);  
      setUsername('');     
      setUserid('');       
      navigate('/');       // 로그인 페이지로 이동
    } catch (error) {
      console.error('로그아웃 중 오류 발생:', error);
    }
  };

  // 로그인 성공 시 userid와 username을 받아서 상태에 저장
  const handleLoginSuccess = ({ userid, username }) => {
    setLoggedIn(true);
    setUsername(username);  // 로그인된 사용자 이름 저장
    setUserid(userid);      // 로그인된 사용자 ID 저장
    navigate('/post-list');  // 로그인 성공 시 /post-list로 이동
  };
  
  return (
    <>
      {/* 로그인된 상태에서 유저 이름을 항상 표시 */}
      {loggedIn && (
        <Header>
          <span>
            {username && userid
              ? `${username} (${userid})님 반갑습니다!`
              : "로그인을 해주세요"}
          </span>
            {" | "} 
          <Link onClick={handleLogout}>로그아웃</Link> {/* 로그아웃 버튼 */}
        </Header>
      )}

      <Heading>Gong-Gam 게시판</Heading>
      <AppContainer>
        <Routes>
          {!loggedIn ? (
            <>
              <Route
                path="/"
                element={<Login setLoggedIn={handleLoginSuccess} />} // 로그인 성공 시 userid와 username을 전달받음
              />
              <Route path="/register" element={<Register />} />
            </>
          ) : (
            <>
              <Route
                path="/post-list"
                element={<PostList username={username} userid={userid} />}
              />{" "}
              {/* userid와 username을 PostList로 전달 */}
              <Route
                path="/create-post"
                element={<CreatePost userid={userid} />}
              />{" "}
              {/* userid를 CreatePost로 전달 */}
              <Route
                path="/posts/:id"
                element={<PostDetail userid={userid} />}
              />{" "}
              {/* userid를 PostDetail로 전달 */}
              <Route
                path="/edit/:id"
                element={<PostEdit userid={userid} />}
              />{" "}
              {/* userid를 PostEdit로 전달 */}
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