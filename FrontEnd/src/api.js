// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api/posts',  // Spring Boot 백엔드 주소
});

export default api;