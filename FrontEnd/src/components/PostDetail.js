import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

// 스타일 정의
const Container = styled.div`
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 70vw;
  margin: 0 auto;
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

const CommentContainer = styled.div`
  margin-top: 40px;
  text-align: left;
`;

const Comment = styled.div`
  padding: 10px;
  border-bottom: 1px solid #ccc;
  margin-bottom: 10px;
`;

const CommentForm = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 20px;

  textarea {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
    resize: none;
  }

  button {
    margin-top: 10px;
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;

    &:hover {
      background-color: #0056b3;
    }
  }
`;

// 날짜 포맷팅 함수
const formatDate = (dateArray) => {
  if (Array.isArray(dateArray)) {
    const [year, month, day, hour, minute, second] = dateArray;
    const date = new Date(year, month - 1, day, hour, minute, second);
    if (isNaN(date.getTime())) {
      return "-";
    }
    return date.toLocaleString("ko-KR", { timeZone: "Asia/Seoul" });
  } else {
    const date = new Date(dateArray);
    if (isNaN(date.getTime())) {
      return "-";
    }
    return date.toLocaleString("ko-KR", { timeZone: "Asia/Seoul" });
  }
};

const PostDetail = () => {
  const { id } = useParams(); // URL에서 id를 가져옴
  const [post, setPost] = useState(null);
  const [currentUser, setCurrentUser] = useState(null); // 로그인한 사용자 정보
  const [comments, setComments] = useState([]); // 댓글 목록 상태 추가
  const [newComment, setNewComment] = useState(""); // 새 댓글 입력 상태 추가
  const navigate = useNavigate(); // 수정 페이지로 이동을 위한 hook

  // 게시글과 현재 로그인한 사용자 정보, 댓글 목록 가져오기
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`/api/posts/${id}`);
        setPost(response.data);
      } catch (error) {
        console.error('게시글을 불러오는 중 오류 발생:', error);
      }
    };

    const fetchCurrentUser = async () => {
      try {
        const response = await axios.get('/api/me', { withCredentials: true });
        setCurrentUser(response.data); // 로그인한 사용자 정보 저장
      } catch (error) {
        console.error('사용자 정보를 불러오는 중 오류 발생:', error);
      }
    };

    const fetchComments = async () => {
      try {
        const response = await axios.get(`/api/posts/${id}/comments`);
        setComments(response.data);
      } catch (error) {
        console.error('댓글을 불러오는 중 오류 발생:', error);
      }
    };

    fetchPost();
    fetchCurrentUser();
    fetchComments();
  }, [id]);

  if (!post || !currentUser) {
    return <p>게시글을 불러오는 중입니다...</p>;
  }

  // 댓글 입력 시 상태 업데이트
  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  // 댓글 제출 함수
  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    // 로그인 여부 확인
    if (!currentUser) {
      alert("로그인이 필요합니다. 로그인 페이지로 이동합니다.");
      navigate("/login"); // 로그인 페이지로 리디렉션
      return;
    }

    if (!newComment.trim()) {
      return; // 빈 댓글은 제출하지 않음
    }

    try {
      const response = await axios.post(
        `/api/posts/${id}/comments`,
        {
          content: newComment,
          author: id, // 사용자 이름을 전달
        },
        { withCredentials: true }
      );
      setComments([...comments, response.data]); // 댓글 목록 업데이트
      setNewComment(""); // 입력 필드 초기화
    } catch (error) {
      console.error("댓글 작성 중 오류 발생:", error);
    }
  };

  // 수정 버튼 클릭 시 실행되는 함수
  const handleEditClick = () => {
    navigate(`/edit/${id}`); // `/edit/{id}` 경로로 이동하도록 설정
  };

  return (
    <Container>
      <h2>{post.title}</h2>
      <p>작성자: {post.author}</p>
      <p>작성 시각: {formatDate(post.createdAt)}</p>
      <p>최종 수정 시각: {post.updatedAt ? formatDate(post.updatedAt) : '-'}</p>
      <p>조회수: {post.views}</p>
      <hr />
      <p>{post.content}</p>

      {/* 현재 로그인한 사용자의 id와 게시글 작성자의 id가 일치할 때만 수정 버튼 표시 */}
      {currentUser && currentUser.userid === post.userid && (
        <Button onClick={handleEditClick}>수정하기</Button>
      )}

      {/* 댓글 리스트 */}
      <CommentContainer>
        <h3>댓글</h3>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <Comment key={comment.id}>
              <p>{comment.author}: {comment.content}</p>
              <p>작성 시각: {formatDate(comment.createdAt)}</p>
            </Comment>
          ))
        ) : (
          <p>댓글이 없습니다.</p>
        )}
      </CommentContainer>

      {/* 댓글 작성 폼 */}
      <CommentForm onSubmit={handleCommentSubmit}>
        <textarea
          value={newComment}
          onChange={handleCommentChange}
          placeholder="댓글을 입력하세요"
          rows="3"
        />
        <button type="submit">댓글 작성</button>
      </CommentForm>
    </Container>
  );
};

export default PostDetail;