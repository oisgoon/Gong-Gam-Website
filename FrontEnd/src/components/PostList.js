import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

// 스타일 정의
const Container = styled.div`
  background-color: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 50vw;
  margin: 0 auto;
`;

const Post = styled.div`
  background-color: #f9f9f9;
  margin-bottom: 15px;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  text-align: left;
`;

const PostTitle = styled.div`
  font-size: 1.2em;
  font-weight: bold;
  margin-bottom: 10px;
`;

const PostAuthor = styled.div`
  font-size: 0.9em;
  color: #555;
  margin-bottom: 10px;
`;

const PostContent = styled.div`
  font-size: 1em;
`;

const NoPostsMessage = styled.p`
  font-size: 1.1em;
  color: #888;
`;

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
        <Container>
            <h2>게시글 목록</h2>
            {posts.length > 0 ? (
                posts.map(post => (
                    <Post key={post.id}>
                        <PostTitle>{post.title}</PostTitle>
                        <PostAuthor>작성자: {post.author}</PostAuthor>
                        <PostContent>{post.content}</PostContent>
                    </Post>
                ))
            ) : (
                <NoPostsMessage>게시글이 없습니다.</NoPostsMessage>
            )}
        </Container>
    );
};

export default PostList;