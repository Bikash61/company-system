import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000', // Base URL for your NestJS backend
});

// --- Auth ---
export const registerUser = async (userData: any) => {
  const response = await API.post('/auth/register', userData);
  return response.data;
};

export const loginUser = async (credentials: any) => {
  const response = await API.post('/auth/login', credentials);
  return response.data;
};

// --- Blog ---
export const getPosts = async () => {
  const response = await API.get('/blog');
  return response.data;
};

export const getPostBySlug = async (slug: string) => {
  const response = await API.get(`/blog/${slug}`);
  return response.data;
};

