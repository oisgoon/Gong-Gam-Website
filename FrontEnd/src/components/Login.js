import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
  height: 50vh;
  margin: 0 auto;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;

  input {
    width: 100%;
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1em;
  }

  button {
    padding: 10px;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1em;
    margin-bottom: 10px;

    &:hover {
      background-color: #218838;
    }
  }
`;

const LinkContainer = styled.div`
  margin-top: 15px;
  font-size: 0.9em;

  a {
    color: #007bff;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const ErrorMessage = styled.div`
  color: red;
  margin-top: 10px;
`;

const Login = ({ setLoggedIn }) => {
  const [userid, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(''); // 메시지 상태 추가

  // 유저 정보를 요청하는 함수 추가
  const fetchUserInfo = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/me', { withCredentials: true });
      console.log('유저 이름:', response.data);  // 콘솔에 유저 정보 출력
      return response.data;  // 유저 이름을 반환
    } catch (error) {
      console.error('유저 정보를 불러오는 데 실패했습니다:', error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/login",
        { userid, password },
        { withCredentials: true } // 세션 쿠키 전송을 위해 설정
      );
      console.log(response);

      // 로그인 후 유저 정보 요청 및 로그인 성공 처리
      const username = await fetchUserInfo();
      setLoggedIn(username); // 로그인 성공 상태 업데이트 및 유저 이름 전달

    } catch (error) {
      setMessage("로그인 실패: 잘못된 사용자 이름이나 비밀번호");
    }
  };

  return (
    <Container>
      <h2>로그인</h2>
      <Form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="아이디"
          value={userid}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">로그인</button>
      </Form>

      {/* 에러 메시지 출력 */}
      {message && <ErrorMessage>{message}</ErrorMessage>}

      {/* "계정이 없으신가요?" 부분을 LinkContainer 안에 배치 */}
      <LinkContainer>
        계정이 없으신가요?{' '}
        <Link to="/register">회원가입</Link>
      </LinkContainer>
    </Container>
  );
};

export default Login;