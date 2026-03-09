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

export const createPost = async (postData: any, token: string) => {
  const response = await API.post('/blog', postData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const updatePost = async (id: string, postData: any, token: string) => {
  const response = await API.put(`/blog/${id}`, postData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const deletePost = async (id: string, token: string) => {
  const response = await API.delete(`/blog/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// --- Portfolio ---
export const getPortfolioItems = async () => {
  const response = await API.get('/portfolio');
  return response.data;
};

export const getPortfolioItemById = async (id: string) => {
  const response = await API.get(`/portfolio/${id}`);
  return response.data;
};

export const createPortfolioItem = async (itemData: any, token: string) => {
  const response = await API.post('/portfolio', itemData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const updatePortfolioItem = async (id: string, itemData: any, token: string) => {
  const response = await API.put(`/portfolio/${id}`, itemData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const deletePortfolioItem = async (id: string, token: string) => {
  const response = await API.delete(`/portfolio/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// --- Leads ---
export const submitLead = async (leadData: any) => {
  const response = await API.post('/leads', leadData);
  return response.data;
};

export const getLeads = async (token: string) => {
  const response = await API.get('/leads', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const updateLeadStatus = async (id: string, status: string, token: string) => {
  const response = await API.put(`/leads/${id}/status`, { status }, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const deleteLead = async (id: string, token: string) => {
  const response = await API.delete(`/leads/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};



