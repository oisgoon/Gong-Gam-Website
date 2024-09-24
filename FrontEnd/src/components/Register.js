import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// 스타일 정의
const Container = styled.div`
  background-color: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 400px;
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

const Message = styled.p`
  color: ${props => (props.success ? 'green' : 'red')};
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

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setErrorMessage('비밀번호가 일치하지 않습니다.');
            return;
        }
        try {
            const response = await fetch('http://localhost:8080/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });
            if (response.ok) {
                setSuccessMessage('회원가입 성공!');
                setErrorMessage('');
            } else {
                setErrorMessage('회원가입 실패.');
            }
        } catch (error) {
            setErrorMessage('서버 오류가 발생했습니다.');
        }
    };

    return (
        <Container>
            <h2>회원가입</h2>
            <Form onSubmit={handleRegister}>
                <input
                    type="text"
                    placeholder="아이디"
                    value={username}
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
                <input
                    type="password"
                    placeholder="비밀번호 확인"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                {successMessage && <Message success>{successMessage}</Message>}
                {errorMessage && <Message>{errorMessage}</Message>}
                <button type="submit">회원가입</button>
            </Form>
            <LinkContainer>
                계정이 있으신가요?{' '}
                <Link to="/" className="login-link">
                    로그인
                </Link>
            </LinkContainer>
        </Container>
    );
};

export default Register;