import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

// 스타일 정의
const Container = styled.div`
  background-color: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 50vw;
  max-height: 75vh;
  overflow-y: auto;
  margin: 0 auto;
`;

const PostWrapper = styled(Link)`
  text-decoration: none;
`;

const Post = styled.div`
  background-color: #f9f9f9;
  margin-bottom: 15px;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  text-align: left;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #f1f1f1;
  }
`;

const PostTitle = styled.div`
  font-size: 1.2em;
  font-weight: bold;
  color: #333;
`;

const PostInfo = styled.div`
  font-size: 0.9em;
  color: #555;
  margin-top: 5px;
`;

const PostList = () => {
  const [posts, setPosts] = useState([]);

  // 게시글 목록 가져오기
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/posts`);
        setPosts(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error('게시글을 가져오는 중 오류가 발생했습니다.', error);
      }
    };

    fetchPosts();
  }, []);

  // 날짜 포맷팅 함수
  const formatDate = (dateArray) => {
      if (Array.isArray(dateArray)) {
        const [year, month, day, hour, minute, second] = dateArray;
        const date = new Date(year, month - 1, day, hour, minute, second);
        if (isNaN(date.getTime())) {
          return "-"; // 유효하지 않은 날짜
        }
        return date.toLocaleString("ko-KR", { timeZone: "Asia/Seoul" });
      } else {
          const date = new Date(dateArray);
          if (isNaN(date.getTime())) {
              return '-'; // 유효하지 않은 날짜
          }
          return date.toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' });
      }
  };

  return (
    <Container>
      <h2>게시글 목록</h2>
      {posts.length > 0 ? (
        posts.map((post) => (
          <PostWrapper to={`/posts/${post.id}`} key={post.id}>
            <Post>
              <PostTitle>{post.title}</PostTitle>
              <PostInfo>작성자: {post.author} ({post.userid})</PostInfo>
              <PostInfo>작성 시각: {formatDate(post.createdAt)}</PostInfo>
              <PostInfo>최종 수정 시각: {formatDate(post.updatedAt)}</PostInfo>
              <PostInfo>조회수: {post.views}</PostInfo>
            </Post>
          </PostWrapper>
        ))
      ) : (
        <p>게시글이 없습니다.</p>
      )}
    </Container>
  );
};

export default PostList;