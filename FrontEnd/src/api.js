// src/api.js
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const api = axios.create({
  baseURL: `${API_BASE_URL}/api/posts`,  // Spring Boot 백엔드 주소
});

export default api;