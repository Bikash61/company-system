import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000/auth', // Base URL for your NestJS backend
});

export const registerUser = async (userData: any) => {
  const response = await API.post('/register', userData);
  return response.data;
};

export const loginUser = async (credentials: any) => {
  const response = await API.post('/login', credentials);
  return response.data;
};
