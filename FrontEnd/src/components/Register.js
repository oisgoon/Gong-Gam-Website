import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

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
  }
  a:hover {
    text-decoration: underline;
  }
`;

const Register = () => {
    const [userid, setUserid] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState({ text: '', success: false });

    // 영어 소문자 및 숫자만 허용하는 정규식
    const useridRegex = /^[a-z0-9]+$/;

    // 비밀번호는 8자 이상, 특수문자 포함하는 정규식
    const passwordRegex = /^(?=.*[!@#$%^&*]).{8,}$/;

    const handleRegister = async (e) => {
        e.preventDefault();

        // 유효성 검사: userid 형식 확인
        if (!useridRegex.test(userid)) {
            setMessage({ text: '아이디는 영어 소문자와 숫자만 가능합니다.', success: false });
            return;
        }

        // 비밀번호 규칙 확인
        if (!passwordRegex.test(password)) {
            setMessage({ text: '비밀번호는 8자 이상이어야 하며, 특수문자를 포함해야 합니다.', success: false });
            return;
        }

        // 비밀번호 확인 일치 여부
        if (password !== confirmPassword) {
            setMessage({ text: '비밀번호가 일치하지 않습니다.', success: false });
            return;
        }

        try {
            // 서버로 회원가입 요청
            const response = await fetch(`${API_BASE_URL}/api/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userid, username, password }),
            });

            if (response.ok) {
                setMessage({ text: '회원가입 성공!', success: true });
            } else if (response.status === 409) {
                // 409 상태 코드: 중복된 아이디
                setMessage({ text: '이미 사용 중인 아이디입니다.', success: false });
            } else {
                setMessage({ text: '회원가입 실패.', success: false });
            }
        } catch (error) {
            setMessage({ text: '서버 오류가 발생했습니다.', success: false });
        }
    };

    return (
        <Container>
            <h2>회원가입</h2>
            <Form onSubmit={handleRegister}>
                <input
                    type="text"
                    placeholder="아이디 (영어 소문자와 숫자만)"
                    value={userid}
                    onChange={(e) => setUserid(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="사용자 이름"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="비밀번호 (8자 이상, 특수문자 포함)"
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
                
                {message.text && <Message success={message.success}>{message.text}</Message>}
                
                <button type="submit">회원가입</button>
            </Form>
            <LinkContainer>
                계정이 있으신가요? <Link to="/">로그인</Link>
            </LinkContainer>
        </Container>
    );
};

export default Register;