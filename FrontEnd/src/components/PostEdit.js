import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

// 스타일 정의
const Container = styled.div`
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  width: 70vw;
  margin: 0 auto;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 150px;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
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
                const response = await axios.get('/api/me', { withCredentials: true });
                setUsername(response.data);  // 로그인한 유저 이름 설정
            } catch (error) {
                console.error('유저 정보를 불러오는 데 실패했습니다:', error);
            }
        };

        // 게시글 정보 가져오기
        const fetchPost = async () => {
            try {
                const response = await axios.get(`/api/posts/${id}`);
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
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPost((prevPost) => ({
            ...prevPost,
            [name]: value
        }));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        // 유효성 검사: 제목과 내용이 있어야 하고, 작성자는 로그인한 유저로 설정
        if (!post.title || !post.content) {
            setError('모든 필드를 입력해주세요.');
            return;
        }

        try {
            const updatedPost = { ...post, author: username };  // 작성자는 로그인한 유저로 설정
            await axios.put(`/api/posts/${id}`, updatedPost);
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
            <h2>게시글 수정하기</h2>
            <form onSubmit={handleFormSubmit}>
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
                {/* 작성자 필드는 로그인한 유저의 이름으로 설정 */}
                <Input
                    type="text"
                    name="author"
                    value={username}
                    readOnly
                />
                {error && <ErrorMessage>{error}</ErrorMessage>}  {/* 에러 메시지 표시 */}
                <Button type="submit">수정 완료</Button>
            </form>
        </Container>
    );
};

export default PostEdit;