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
  height: 70vh; /* 높이를 늘려서 모든 요소가 들어갈 수 있게 조정 */
  margin: 0 auto;
  overflow: hidden; /* 내용이 넘치면 숨김 */
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  height: 90%; /* 폼 높이를 전체 높이에 맞춤 */
  justify-content: space-between; /* 요소 간격을 균등하게 배치 */

  input {
    width: 100%;
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1em;
    box-sizing: border-box; /* 패딩과 보더를 포함한 크기 계산 */
  }

  textarea {
    width: 100%;
    height: calc(100% - 120px); /* 폼 높이에서 버튼과 제목의 높이를 고려 */
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1em;
    resize: none; /* 크기 조정 비활성화 */
    overflow-y: scroll; /* 스크롤 항상 표시 */
    box-sizing: border-box; /* 패딩과 보더를 포함한 크기 계산 */
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end; /* 버튼을 오른쪽 정렬 */
  margin-top: auto; /* 버튼 컨테이너를 아래쪽으로 밀어냄 */
`;

const Button = styled.button`
  padding: 10px;
  background-color: #28a745; /* 작성 버튼 색상 */
  color: white;
  border: none; /* 테두리 제거 */
  border-radius: 5px;
  cursor: pointer;
  font-size: 1em;
  margin-left: 10px; /* 버튼 사이의 여백 */

  &:hover {
    background-color: #218838; /* 작성 버튼 hover 색상 */
  }

  &:nth-of-type(2) {
    background-color: #007bff; /* 뒤로가기 버튼 색상 */

    &:hover {
      background-color: #0056b3; /* 뒤로가기 버튼 hover 색상 */
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
                <ButtonContainer>
                    <Button type="submit">작성</Button>
                    <Button type="button" onClick={() => navigate('/post-list')}>뒤로가기</Button>
                </ButtonContainer>
            </Form>
        </Container>
    );
};

export default CreatePost;