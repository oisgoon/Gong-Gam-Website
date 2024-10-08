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

## 기술 스택

- **프론트엔드**: React, React Router, Axios
- **백엔드**: Spring Boot, JPA, MySQL
- **빌드 도구**: Gradle (백엔드), npm (프론트엔드)
- **데이터베이스**: MySQL
