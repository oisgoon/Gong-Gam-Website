// src/components/PostDetail.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

// 스타일 정의
const Container = styled.div`
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 70vw;
  margin: 0 auto;
`;

const PostDetail = () => {
    const { id } = useParams(); // URL에서 id를 가져옴
    const [post, setPost] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`/api/posts/${id}`);
                setPost(response.data);
            } catch (error) {
                console.error('Error fetching post', error);
            }
        };

        fetchPost();
    }, [id]);

    if (!post) {
        return <p>게시글을 불러오는 중입니다...</p>;
    }

    return (
        <Container>
            <h2>{post.title}</h2>
            <p>작성자: {post.author}</p>
            <p>작성 시각: {new Date(post.createdAt).toLocaleString()}</p>
            <p>최종 수정 시각: {new Date(post.updatedAt).toLocaleString()}</p>
            <p>조회수: {post.views}</p>
            <hr />
            <p>{post.content}</p>
        </Container>
    );
};

export default PostDetail;