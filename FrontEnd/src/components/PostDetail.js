import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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

const Button = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  
  &:hover {
    background-color: #45a049;
  }
`;

const PostDetail = () => {
    const { id } = useParams(); // URL에서 id를 가져옴
    const [post, setPost] = useState(null);
    const navigate = useNavigate(); // 수정 페이지로 이동을 위한 hook

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

    // 게시글이 로딩 중일 때
    if (!post) {
        return <p>게시글을 불러오는 중입니다...</p>;
    }

    // 수정 버튼 클릭 시 실행되는 함수
    const handleEditClick = () => {
        navigate(`/edit/${id}`);  // `/edit/{id}` 경로로 이동하도록 설정
    };

    return (
        <Container>
            <h2>{post.title}</h2>
            <p>작성자: {post.author}</p>
            <p>작성 시각: {new Date(post.createdAt).toLocaleString()}</p>

            {/* 수정 시각이 null이면 '-'로 표시 */}
            <p>최종 수정 시각: {post.updatedAt ? new Date(post.updatedAt).toLocaleString() : '-'}</p>

            <p>조회수: {post.views}</p>
            <hr />
            <p>{post.content}</p>

            {/* 수정 버튼 추가 */}
            <Button onClick={handleEditClick}>수정하기</Button>
        </Container>
    );
};

export default PostDetail;