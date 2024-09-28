import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
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
  const [userid, setUserid] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');  // 메시지 상태 추가

  // 로그인 처리 함수
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/login', { userid, password }, { withCredentials: true });
      console.log('로그인 성공:', response.data);

      // 로그인 성공 시 유저 정보 요청
      const userInfoResponse = await axios.get('http://localhost:8080/api/me', { withCredentials: true });
      console.log('유저 정보:', userInfoResponse.data);
      setLoggedIn(userInfoResponse.data);  // 로그인 성공 시 유저 이름을 전달
    } catch (error) {
      console.error('로그인 실패:', error);
      setMessage('로그인 실패: 잘못된 사용자 이름이나 비밀번호');
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
          onChange={(e) => setUserid(e.target.value)}
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

      {/* "계정이 없으신가요?" 부분을 LinkContainer 안에 배치 */}
      <LinkContainer>
        계정이 없으신가요?{' '}
        <Link to="/register">회원가입</Link>
      </LinkContainer>
    </Container>
  );
};

export default Login;