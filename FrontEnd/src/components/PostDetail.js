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

const CommentBox = styled.div`
  margin-top: 40px;
  text-align: left;
`;

const CommentInput = styled.textarea`
  width: 100%;
  height: 100px;
  margin-top: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  resize: none;
`;

const CommentList = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 20px;
`;

const CommentItem = styled.li`
  margin-bottom: 15px;
  padding: 10px;
  background-color: #f1f1f1;
  border-radius: 5px;
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
    const [comments, setComments] = useState([]); // 댓글 목록 상태
    const [newComment, setNewComment] = useState(""); // 새로운 댓글 상태
    const navigate = useNavigate(); // 수정 페이지로 이동을 위한 hook

    // 게시글과 현재 로그인한 사용자 정보 가져오기
    useEffect(() => {
      const fetchPost = async () => {
        try {
          const response = await axios.get(`/api/posts/${id}`);
          const postData = response.data;

          // 게시글 데이터 설정
          setPost(postData);
          console.log(postData);
        } catch (error) {
          console.error("Error fetching post", error);
        }
      };

      const fetchCurrentUser = async () => {
        try {
          const response = await axios.get("/api/me", {
            withCredentials: true,
          });
          console.log("ID : " + response.data.userid);
          console.log("NAME : " + response.data.username);
          setCurrentUser(response); // 로그인한 사용자 정보 저장
        } catch (error) {
          console.error("Error fetching current user", error);
        }
      };

      const fetchComments = async () => {
        try {
          const response = await axios.get(`/api/posts/${id}/comments`, {
            withCredentials: true,
          });
          setComments(response.data); // 댓글 데이터 설정
        } catch (error) {
          console.error("Error fetching comments", error);
        }
      };

      fetchPost();
      fetchCurrentUser();
      fetchComments();
    }, [id]);

    if (!post || !currentUser) {
        return <p>게시글을 불러오는 중입니다...</p>;
    }

    // 댓글 작성 핸들러
    const handleCommentSubmit = async () => {
      try {
        // eslint-disable-next-line no-unused-vars
        const response = await axios.post(
          `/api/posts/${id}/comments`,
          {
            content: newComment,
          },
          { withCredentials: true }
        );
        // 댓글 목록을 다시 가져와서 업데이트
        const fetchComments = async () => {
          try {
            const response = await axios.get(`/api/posts/${id}/comments`, {
              withCredentials: true,
            });
            setComments(response.data); // 댓글 데이터 설정
          } catch (error) {
            console.error("Error fetching comments", error);
          }
        };

        await fetchComments(); // 댓글 목록 갱신
        setNewComment(""); // 입력란 초기화
      } catch (error) {
        console.error("Error submitting comment", error);
      }
    };

    // 수정 버튼 클릭 시 실행되는 함수
    const handleEditClick = () => {
        navigate(`/edit/${id}`);  // `/edit/{id}` 경로로 이동하도록 설정
    };

    return (
      <Container>
        <h2>{post.title}</h2>
        <p>
          작성자: {post.author}({post.userid})
        </p>
        <p>작성 시각: {formatDate(post.createdAt)}</p>
        <p>
          최종 수정 시각: {post.updatedAt ? formatDate(post.updatedAt) : "-"}
        </p>
        <p>조회수: {post.views}</p>
        <hr />
        <p>{post.content}</p>

        {/* 현재 로그인한 사용자의 id와 게시글 작성자의 id가 일치할 때만 수정 버튼 표시 */}
        {currentUser.userid === post.userid && (
          <Button onClick={handleEditClick}>수정하기</Button>
        )}

        {/* 댓글 목록 */}
        <CommentBox>
          <h3>댓글</h3>
          <CommentList>
            {comments.map((comment, index) => (
              <CommentItem key={index}>
                <strong>{comment.author}({comment.userId}) :</strong> {comment.content}
                <br />
                <small>{formatDate(comment.createdAt)}</small>
              </CommentItem>
            ))}
          </CommentList>

          {/* 댓글 입력란 */}
          <CommentInput
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                // Shift + Enter는 줄바꿈을 허용
                e.preventDefault(); // 기본 Enter 동작 방지 (줄바꿈)
                handleCommentSubmit(); // 댓글 제출
              }
            }}
            placeholder="댓글을 입력하세요..."
          />
          <Button onClick={handleCommentSubmit}>댓글 작성</Button>
        </CommentBox>
      </Container>
    );
};

export default PostDetail;