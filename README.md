## 설치 및 실행 방법

### 1. 백엔드 (Spring Boot)

1. **프로젝트 클론**:
    ```bash
    git clone https://github.com/yourusername/Gong-Gam-Website.git
    cd Gong-Gam-Website/BackEnd
    ```

2. **의존성 설치**:
    ```bash
    ./gradlew build
    ```

3. **MySQL 데이터베이스 설정**:
    - MySQL에 `gonggam_db` 데이터베이스를 생성합니다.
    - `src/main/resources/application.properties`에서 데이터베이스 사용자명과 비밀번호를 설정합니다.

4. **서버 실행**:
    ```bash
    ./gradlew bootRun
    ```

### 2. 프론트엔드 (React)

1. **프로젝트 클론**:
    ```bash
    git clone https://github.com/yourusername/Gong-Gam-Website.git
    cd Gong-Gam-Website/FrontEnd
    ```

2. **의존성 설치**:
    ```bash
    npm install
    ```

3. **서버 실행**:
    ```bash
    npm start
    ```

4. **애플리케이션 접속**:
    - 브라우저에서 `http://localhost:3000`으로 접속합니다.

## API 명세

### POST `/api/register`
- **회원가입** API
- **Request Body**:
    ```json
    {
        "username": "사용자 이름",
        "password": "비밀번호"
    }
    ```
- **Response**:
    - 성공: `회원가입 성공`
    - 실패: `회원가입 실패`

### POST `/api/login`
- **로그인** API
- **Request Body**:
    ```json
    {
        "username": "사용자 이름",
        "password": "비밀번호"
    }
    ```
- **Response**:
    - 성공: `로그인 성공`
    - 실패: `로그인 실패`

### POST `/api/posts`
- **게시글 작성** API
- **Request Body**:
    ```json
    {
        "title": "게시글 제목",
        "content": "게시글 내용"
    }
    ```
- **Response**:
    - 성공: `게시글 작성 성공`
    - 실패: `게시글 작성 실패`

### GET `/api/posts`
- **모든 게시글 조회** API
- **Response**:
    ```json
    [
        {
            "id": 1,
            "title": "게시글 제목",
            "content": "게시글 내용",
            "author": "작성자"
        },
        ...
    ]
    ```

## 기술 스택

- **프론트엔드**: React, React Router, Axios
- **백엔드**: Spring Boot, JPA, MySQL
- **빌드 도구**: Gradle (백엔드), npm (프론트엔드)
- **데이터베이스**: MySQL

## 기여 방법

1. 이 저장소를 **포크**합니다.
2. 새로운 브랜치를 생성합니다 (`git checkout -b feature-branch`).
3. 변경 사항을 **커밋**합니다 (`git commit -m 'Add some feature'`).
4. 브랜치에 **푸시**합니다 (`git push origin feature-branch`).
5. **Pull Request**를 작성합니다.

## 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.