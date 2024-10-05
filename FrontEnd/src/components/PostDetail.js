import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

// 스타일 정의
const Container = styled.div`
  width: 100%;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  width: 70vw;
  margin: 0 auto;
  text-align: left; /* 내용 왼쪽 정렬 */
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end; /* 버튼을 오른쪽 정렬 */
  margin-top: 20px; /* 버튼 상단 여백 추가 */
`;

const Button = styled.button`
  margin-right: 10px; /* 버튼 간의 여백 추가 */
  padding: 10px 20px;
  background-color: #4caf50; /* 기본 색상 (수정 버튼) */
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #45a049;
  }
`;

const DeleteButton = styled(Button)`
  background-color: #f44336; /* 빨간색 배경 (삭제 버튼) */

  &:hover {
    background-color: #d32f2f; /* 삭제 버튼 hover 색상 */
  }
`;

const CommentBox = styled.div`
  width: 100%;
  margin-top: 40px;
  text-align: left;
  max-height: 300px; /* 최대 높이 설정 */
  overflow-y: auto; /* 세로 스크롤바 표시 */
`;

const CommentList = styled.ul`
  width: 100%;
  list-style: none;
  padding: 0;
  margin-top: 20px;
`;

const CommentItem = styled.li`
  width: 100%;
  margin-bottom: 15px;
  padding: 10px;
  background-color: #f1f1f1;
  border-radius: 5px;
  box-sizing: border-box; /* 테두리와 패딩이 요소 크기에 포함되도록 설정 */
`;

const CommentInput = styled.textarea`
  width: 100%;
  height: 100px;
  margin-top: 10px; /* margin을 없애기 */
  margin-bottom: 10px; /* margin을 없애기 */
  padding: 10px; /* padding을 없애기 */
  border: 1px solid #ccc;
  border-radius: 5px;
  resize: none; /* 크기 조정 비활성화 */
  box-sizing: border-box; /* 테두리와 패딩이 요소 크기에 포함되도록 설정 */
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
  const [isSubmitting, setIsSubmitting] = useState(false); // 댓글 제출 중 상태
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
        setCurrentUser(response.data); // 로그인한 사용자 정보 저장
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
    // 댓글이 빈칸인지 확인
    if (!newComment.trim()) {
      alert("댓글을 입력하세요."); // 경고 메시지 표시
      return; // 빈칸일 경우 더 이상 진행하지 않음
    }

    // 중복 제출 방지
    if (isSubmitting) return; // 이미 제출 중인 경우 함수 종료

    setIsSubmitting(true); // 제출 중 상태로 설정

    try {
      // 댓글 전송 요청
      await axios.post(
        `/api/posts/${id}/comments`,
        { content: newComment },
        { withCredentials: true }
      );

      // 새 댓글 데이터 생성
      const newCommentData = {
        author: currentUser.username, // 작성자의 이름
        userId: currentUser.userid, // 작성자의 사용자 ID
        content: newComment,
        createdAt: new Date(), // 현재 시간을 사용하여 새 댓글 생성
      };

      // 댓글 목록에 새 댓글 추가
      setComments((prevComments) => [...prevComments, newCommentData]);

      // 댓글 입력란 초기화
      setNewComment("");
    } catch (error) {
      console.error("댓글 작성 중 오류가 발생했습니다.", error);
      alert("댓글 작성 중 오류가 발생했습니다."); // 오류 알림
    } finally {
      setIsSubmitting(false); // 제출 완료 상태로 설정
    }
  };

  // 수정 버튼 클릭 시 실행되는 함수
  const handleEditClick = () => {
    navigate(`/edit/${id}`); // `/edit/{id}` 경로로 이동하도록 설정
  };

  // 삭제 버튼 클릭 시 실행되는 함수
  const handleDeleteClick = async () => {
    if (window.confirm("정말로 이 게시글을 삭제하시겠습니까?")) {
      try {
        await axios.delete(`/api/posts/${id}`, { withCredentials: true });
        navigate("/post-list"); // 게시글 삭제 후 목록으로 이동
      } catch (error) {
        console.error("게시글 삭제 중 오류가 발생했습니다.", error);
        alert("게시글 삭제 중 오류가 발생했습니다."); // 오류 알림
      }
    }
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

      {/* 현재 로그인한 사용자의 id와 게시글 작성자의 id가 일치할 때만 수정 및 삭제 버튼 표시 */}
      {currentUser.userid === post.userid && (
        <ButtonContainer>
          <Button onClick={handleEditClick}>수정하기</Button>
          <DeleteButton onClick={handleDeleteClick}>삭제하기</DeleteButton>
        </ButtonContainer>
      )}

      {/* 댓글 목록 */}
      <CommentBox>
        <h3>댓글</h3>
        <CommentList>
          {comments.map((comment, index) => (
            <CommentItem key={index}>
              <strong>
                {comment.author}({comment.userId}) :{" "}
              </strong>{" "}
              {comment.content}
              <br />
              <small>{formatDate(comment.createdAt)}</small>{" "}
              {/* 작성 시간 표시 */}
            </CommentItem>
          ))}
        </CommentList>

        {/* 댓글 입력란 */}
        <CommentInput
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault(); // 기본 Enter 동작 방지 (줄바꿈)
              handleCommentSubmit(); // 댓글 제출
            }
          }}
          placeholder="댓글을 입력하세요..."
        />
        <Button onClick={handleCommentSubmit} disabled={isSubmitting}>
          댓글 작성
        </Button>
      </CommentBox>
    </Container>
  );
};

export default PostDetail;