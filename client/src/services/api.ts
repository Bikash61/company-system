import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

const API = axios.create({
  baseURL: API_BASE_URL,
});

// Attach token to every request if present
API.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// --- Auth ---
export const registerUser = async (userData: Record<string, unknown>) => {
  const response = await API.post('/auth/register', userData);
  return response.data;
};

export const loginUser = async (credentials: Record<string, unknown>) => {
  const response = await API.post('/auth/login', credentials);
  return response.data;
};

// --- Blog ---
export const getPosts = async (page = 1, limit = 6) => {
  const response = await API.get('/blog', { params: { page, limit } });
  return response.data;
};

export const getPostBySlug = async (slug: string) => {
  const response = await API.get(`/blog/${slug}`);
  return response.data;
};

export const createPost = async (postData: Record<string, unknown>) => {
  const response = await API.post('/blog', postData);
  return response.data;
};

export const updatePost = async (id: string, postData: Record<string, unknown>) => {
  const response = await API.put(`/blog/${id}`, postData);
  return response.data;
};

export const deletePost = async (id: string) => {
  const response = await API.delete(`/blog/${id}`);
  return response.data;
};

// --- Portfolio ---
export const getPortfolioItems = async (page = 1, limit = 6) => {
  const response = await API.get('/portfolio', { params: { page, limit } });
  return response.data;
};

export const getPortfolioItemById = async (id: string) => {
  const response = await API.get(`/portfolio/${id}`);
  return response.data;
};

export const createPortfolioItem = async (itemData: Record<string, unknown>) => {
  const response = await API.post('/portfolio', itemData);
  return response.data;
};

export const updatePortfolioItem = async (id: string, itemData: Record<string, unknown>) => {
  const response = await API.put(`/portfolio/${id}`, itemData);
  return response.data;
};

export const deletePortfolioItem = async (id: string) => {
  const response = await API.delete(`/portfolio/${id}`);
  return response.data;
};

// --- Leads ---
export const submitLead = async (leadData: Record<string, unknown>) => {
  const response = await API.post('/leads', leadData);
  return response.data;
};

export const getLeads = async () => {
  const response = await API.get('/leads');
  return response.data;
};

export const updateLeadStatus = async (id: string, status: string) => {
  const response = await API.put(`/leads/${id}/status`, { status });
  return response.data;
};

export const deleteLead = async (id: string) => {
  const response = await API.delete(`/leads/${id}`);
  return response.data;
};

// --- Resources ---
export const getResources = async () => {
  const response = await API.get('/resources');
  return response.data;
};

export const createResource = async (data: {
  title: string;
  description: string;
  fileUrl: string;
  coverImageUrl?: string;
}) => {
  const response = await API.post('/resources', data);
  return response.data;
};

export const deleteResource = async (id: string) => {
  const response = await API.delete(`/resources/${id}`);
  return response.data;
};

export const downloadResource = async (
  id: string,
  name: string,
  email: string,
): Promise<{ fileUrl: string }> => {
  const response = await API.post(`/resources/${id}/download`, { name, email });
  return response.data;
};

// --- Newsletter ---
export const subscribeToNewsletter = async (email: string): Promise<{ message: string }> => {
  const response = await API.post('/newsletter/subscribe', { email });
  return response.data;
};

export const getSubscribers = async () => {
  const response = await API.get('/newsletter/subscribers');
  return response.data;
};

export const deleteSubscriber = async (id: string) => {
  const response = await API.delete(`/newsletter/subscribers/${id}`);
  return response.data;
};

// --- AI Service ---
const AI_BASE_URL = 'http://localhost:8000';

export const analyzeText = async (text: string) => {
  const response = await axios.post(`${AI_BASE_URL}/analyze`, { text });
  return response.data;
};

export const summarizeText = async (text: string, sentences = 3) => {
  const response = await axios.post(`${AI_BASE_URL}/summarize`, { text, sentences });
  return response.data;
};

// --- Chatbot ---
export interface ChatHistoryMessage {
  role: 'user' | 'bot';
  content: string;
}

export const sendChatMessage = async (message: string, history: ChatHistoryMessage[]) => {
  const response = await API.post('/ai/chat', { message, history });
  return response.data as { reply: string; action: string | null };
};
