// src/components/CreatePost.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.scss';

const CreatePost = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // 게시글 작성 API 호출
            const response = await fetch('/api/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, content }),
            });
            if (response.ok) {
                navigate('/'); // 게시글 작성 후 목록으로 이동
            }
        } catch (error) {
            console.error('게시글 작성 중 오류 발생', error);
        }
    };

    return (
        <div className="container">
            <h2>게시글 작성</h2>
            <form onSubmit={handleSubmit}>
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
                <button type="button" onClick={() => navigate('/')}>뒤로가기</button>
            </form>
        </div>
    );
};

export default CreatePost;