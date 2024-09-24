// src/components/PostList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles.scss';

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
            <h2>게시글 목록</h2>
            {posts.length > 0 ? (
                posts.map(post => (
                    <div key={post.id} className="post">
                        <div className="post-title">{post.title}</div>
                        <div className="post-author">작성자: {post.author}</div>
                        <div className="post-content">{post.content}</div>
                    </div>
                ))
            ) : (
                <p>게시글이 없습니다.</p>
            )}
        </div>
    );
};

export default PostList;