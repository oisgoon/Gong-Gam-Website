import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

// 스타일 정의
const Container = styled.div`
  background-color: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 50vw;
  max-height: 80vh;
  overflow-y: auto;
  margin: 0 auto;
`;

const Post = styled.div`
  background-color: #f9f9f9;
  margin-bottom: 15px;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  text-align: left;
`;

const PostTitle = styled(Link)`
  font-size: 1.2em;
  font-weight: bold;
  color: #333;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const PostInfo = styled.div`
  font-size: 0.9em;
  color: #555;
  margin-top: 5px;
`;

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [, setUsername] = useState('');   // 유저 이름 상태 추가
  const [, setUserid] = useState('');     // 유저 아이디 상태 추가

  // 게시글 목록 가져오기
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('/api/posts');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts', error);
      }
    };

    fetchPosts();
  }, []);

  // 로그인된 유저 정보 가져오기
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get('/api/me', { withCredentials: true });
        if (response.data.userid && response.data.username) {
          setUsername(response.data.username);
          setUserid(response.data.userid);
          console.log("유저 정보 :" + response.data.username);
          console.log("유저 정보 :" + response.data.userid);
        }
      } catch (error) {
        console.error('Error fetching user info', error);
        setUsername('');
        setUserid('');
      }
    };

    fetchUserInfo();
  }, []);

  // 날짜 포맷팅 함수
  const formatDate = (dateArray) => {
      if (Array.isArray(dateArray)) {
        // 배열을 전달받았을 경우: [year, month, day, hour, minute, second, nanosecond]
        // JavaScript의 Date 객체는 month가 0부터 시작하므로, month에서 -1을 해야 함
        const [year, month, day, hour, minute, second] = dateArray;
        const date = new Date(year, month - 1, day, hour, minute, second);
        if (isNaN(date.getTime())) {
          return "-"; // 유효하지 않은 날짜
        }
        return date.toLocaleString("ko-KR", { timeZone: "Asia/Seoul" });
      } else {
          // 배열이 아닌 경우 기존 처리
          const date = new Date(dateArray);
          if (isNaN(date.getTime())) {
              return '-'; // 유효하지 않은 날짜
          }
          return date.toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' });
      }
  };
  
  return (
    <Container>
      {/* 우측 상단에 유저 이름과 아이디 표시 */}

      <h2>게시글 목록</h2>
      {posts.length > 0 ? (
        posts.map(post => (
          <Post key={post.id}>
            <PostTitle to={`/posts/${post.id}`}>{post.title}</PostTitle>
            <PostInfo>작성자: {post.author}({post.userid})</PostInfo>
            <PostInfo>작성 시각: {formatDate(post.createdAt)}</PostInfo>
            <PostInfo>최종 수정 시각: {formatDate(post.updatedAt)}</PostInfo>
            <PostInfo>조회수: {post.views}</PostInfo>
          </Post>
        ))
      ) : (
        <p>게시글이 없습니다.</p>
      )}
    </Container>
  );
};

export default PostList;