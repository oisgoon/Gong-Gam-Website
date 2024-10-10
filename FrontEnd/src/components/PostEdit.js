import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

// 스타일 정의
const Container = styled.div`
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  margin: 0 auto;
  width: 50vw; /* 가로 크기 설정 */
`;

const Title = styled.h2`
  text-align: center; /* 가운데 정렬 */
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  height: 80%; /* 폼 높이를 전체 높이에 맞춤 */
  justify-content: space-between; /* 요소 간격을 균등하게 배치 */
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1em;
  box-sizing: border-box; /* 패딩과 보더를 포함한 크기 계산 */
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 180px; /* 고정된 높이 설정 */
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: none; /* 크기 조정 비활성화 */
  overflow-y: auto; /* 수직 스크롤바 사용 */
  box-sizing: border-box; /* 패딩과 보더를 포함한 크기 계산 */
`;

const Button = styled.button`
  padding: 10px 20px; /* 버튼 크기 조정 */
  background-color: #4caf50; /* 작성 버튼 색상 */
  color: white;
  border: none; /* 테두리 제거 */
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #45a049; /* 작성 버튼 hover 색상 */
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end; /* 버튼을 오른쪽 정렬 */
  margin-top: auto; /* 버튼 컨테이너를 아래쪽으로 밀어냄 */
`;

const ErrorMessage = styled.p`
  color: red;
  margin-top: 10px;
`;

const PostEdit = () => {
    const { id } = useParams();
    const [post, setPost] = useState({
        title: '',
        content: '',
        author: ''  // 작성자는 자동으로 설정될 예정
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // 로그인한 유저의 이름을 저장하는 상태
    const [username, setUsername] = useState('');

    // 유저 정보와 게시글 정보를 가져오는 useEffect
    useEffect(() => {
        // 로그인한 유저 정보 가져오기
        const fetchUserInfo = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/me`, { withCredentials: true });
                setUsername(response.data.username);  // 로그인한 유저 이름 설정
                console.log(username);
            } catch (error) {
                console.error('유저 정보를 불러오는 데 실패했습니다:', error);
            }
        };

        // 게시글 정보 가져오기
        const fetchPost = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/posts/${id}`);
                setPost(response.data);
                setLoading(false);  // 게시글 로딩 완료
            } catch (error) {
                console.error('게시글을 불러오는 데 실패했습니다:', error);
                setError('게시글을 불러오는데 실패했습니다.');
                setLoading(false);
            }
        };

        fetchUserInfo();  // 유저 정보 불러오기
        fetchPost();  // 게시글 정보 불러오기
    }, [id, username]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        // author 필드 수정 방지
        if (name !== 'author') {
            setPost((prevPost) => ({
                ...prevPost,
                [name]: value
            }));
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        // 유효성 검사: 제목과 내용이 있어야 하고, 작성자는 로그인한 유저로 설정
        if (!post.title || !post.content) {
            setError('모든 필드를 입력해주세요.');
            return;
        }

        try {
            const updatedPost = { ...post };  // 작성자는 수정하지 않음
            await axios.put(`${API_BASE_URL}/api/posts/${id}`, updatedPost, { withCredentials: true });
            alert('게시글 수정 완료!');
            navigate(`/posts/${id}`);  // 수정 후 게시글 상세 페이지로 리디렉션
        } catch (error) {
            console.error('게시글 수정에 실패했습니다:', error);
            setError('게시글 수정에 실패했습니다.');
        }
    };

    if (loading) {
        return <p>게시글을 불러오는 중입니다...</p>;
    }

    return (
        <Container>
            <Title>게시글 수정하기</Title> {/* 제목을 가운데 정렬 */}
            <Form onSubmit={handleFormSubmit}>
                <Input
                    type="text"
                    name="title"
                    value={post.title}
                    onChange={handleInputChange}
                    placeholder="제목을 입력하세요"
                />
                <TextArea
                    name="content"
                    value={post.content}
                    onChange={handleInputChange}
                    placeholder="내용을 입력하세요"
                />
                {error && <ErrorMessage>{error}</ErrorMessage>}  {/* 에러 메시지 표시 */}
                <ButtonContainer>
                    <Button type="submit">수정 완료</Button>
                </ButtonContainer>
            </Form>
        </Container>
    );
};

export default PostEdit;