// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://34.230.14.150:8080/api/posts',  // Spring Boot 백엔드 주소
});

export default api;