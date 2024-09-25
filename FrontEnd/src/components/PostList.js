// src/components/PostList.js
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

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('/api/posts'); // API 호출
                setPosts(response.data);
            } catch (error) {
                console.error('Error fetching posts', error);
            }
        };

        fetchPosts();
    }, []);

    return (
        <Container>
            <h2>게시글 목록</h2>
            {posts.length > 0 ? (
                posts.map(post => (
                    <Post key={post.id}>
                        <PostTitle to={`/posts/${post.id}`}>{post.title}</PostTitle>
                        <PostInfo>작성자: {post.author}</PostInfo>
                        <PostInfo>작성 시각: {new Date(post.createdAt).toLocaleString()}</PostInfo>
                        <PostInfo>최종 수정 시각: {new Date(post.updatedAt).toLocaleString()}</PostInfo>
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