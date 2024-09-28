import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

// 스타일 정의
const Container = styled.div`
  background-color: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 50vw;
  height: 50vh;
  margin: 0 auto;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;

  input, textarea {
    width: 100%;
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1em;
  }

  button {
    padding: 10px;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1em;
    margin-bottom: 10px;

    &:hover {
      background-color: #218838;
    }

    &:nth-of-type(2) {
      background-color: #007bff;

      &:hover {
        background-color: #0056b3;
      }
    }
  }
`;

const CreatePost = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');  // 로그인한 사용자의 이름
    const navigate = useNavigate();

    // 로그인한 유저 정보 가져오기
    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await axios.get('/api/me', { withCredentials: true });
                setAuthor(response.data.username);  // 유저 이름을 상태에 저장
            } catch (error) {
                console.error('유저 정보를 불러오는 데 실패했습니다.', error);
            }
        };

        fetchUserInfo();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // 게시글 작성 API 호출
            const response = await axios.post('/api/posts', 
                { title, content, author },
                { withCredentials: true }
            );
            if (response.status === 200) {
                navigate('/post-list'); // 게시글 작성 후 목록으로 이동
            }
        } catch (error) {
            console.error('게시글 작성 중 오류 발생', error);
        }
    };

    return (
        <Container>
            <h2>게시글 작성</h2>
            <Form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="제목"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <textarea
                    placeholder="내용"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                ></textarea>
                <button type="submit">작성</button>
                <button type="button" onClick={() => navigate('/post-list')}>뒤로가기</button>
            </Form>
        </Container>
    );
};

export default CreatePost;