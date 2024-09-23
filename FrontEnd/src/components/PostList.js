// src/components/PostList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles.css'; // CSS 파일 임포트

const PostList = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('/api/posts');
                setPosts(response.data);
            } catch (error) {
                console.error('Error fetching posts', error);
            }
        };

        fetchPosts();
    }, []);

    return (
        <div className="container">
            <h1>게시글 목록</h1>
            {posts.map(post => (
                <div key={post.id} className="post">
                    <div className="post-title">{post.title}</div>
                    <div className="post-author">작성자: {post.author}</div>
                    <div className="post-content">{post.content}</div>
                </div>
            ))}
        </div>
    );
};

export default PostList;