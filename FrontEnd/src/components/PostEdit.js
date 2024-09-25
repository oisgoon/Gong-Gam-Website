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
        author: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`/api/posts/${id}`);
                setPost(response.data);
                setLoading(false);  // 게시글 로딩 완료
            } catch (error) {
                console.error('Error fetching post', error);
                setError('게시글을 불러오는데 실패했습니다.');
                setLoading(false);
            }
        };

        fetchPost();
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

        // 유효성 검사: 제목, 내용, 작성자 모두 있어야 함
        if (!post.title || !post.content || !post.author) {
            setError('모든 필드를 입력해주세요.');
            return;
        }

        try {
            await axios.put(`/api/posts/${id}`, post);
            alert('게시글 수정 완료!');
            navigate(`/posts/${id}`);  // 수정 후 게시글 상세 페이지로 리디렉션
        } catch (error) {
            console.error('Error updating post', error);
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
                <Input
                    type="text"
                    name="author"
                    value={post.author}
                    onChange={handleInputChange}
                    placeholder="작성자 이름을 입력하세요"
                />
                {error && <ErrorMessage>{error}</ErrorMessage>}  {/* 에러 메시지 표시 */}
                <Button type="submit">수정 완료</Button>
            </form>
        </Container>
    );
};

export default PostEdit;