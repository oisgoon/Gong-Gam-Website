import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles.css';

const PostForm = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');
    const navigate = useNavigate();  // 페이지 이동을 위한 hook

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/posts', { title, content, author });
            navigate('/');  // 작성 후 게시글 목록으로 돌아감
        } catch (error) {
            console.error('게시글 작성 중 오류 발생', error);
        }
    };

    return (
        <div className="post-form">
            <h2>게시글 작성</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="제목"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="작성자"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    required
                />
                <textarea
                    placeholder="내용"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                />
                <button type="submit">작성하기</button>
            </form>
            <button onClick={() => navigate('/')} className="go-back-btn">뒤로 가기</button>
        </div>
    );
};

export default PostForm;