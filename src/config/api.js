// Configuração da API
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

// Google OAuth Configuration
export const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    GOOGLE_LOGIN: '/api/auth/google',
    VALIDATE: '/api/auth/validate',
    LOGOUT: '/api/auth/logout',
    ME: '/api/auth/me'
  },
  USERS: {
    PROFILE: '/api/users/profile',
    UPDATE_PROFILE: '/api/users/profile',
    BY_ID: (id) => `/api/users/${id}`,
    POSTS: (id) => `/api/users/${id}/posts`,
    SEARCH: '/api/users/search'
  },
  POSTS: {
    LIST: '/api/posts',
    CREATE: '/api/posts',
    BY_ID: (id) => `/api/posts/${id}`,
    UPDATE: (id) => `/api/posts/${id}`,
    DELETE: (id) => `/api/posts/${id}`,
    FAVORITE: (id) => `/api/posts/${id}/favorite`,
    SIMILAR: (id) => `/api/posts/${id}/similar`
  },
  UPLOAD: {
    POST_IMAGES: '/api/upload/post-images',
    AVATAR: '/api/upload/avatar',
    DELETE_IMAGE: (publicId) => `/api/upload/image/${publicId}`
  }
};

// Helper para fazer requisições autenticadas
export const apiRequest = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers
    },
    ...options
  };

  const response = await fetch(`${API_URL}${endpoint}`, config);
  
  if (response.status === 401) {
    // Token expirado ou inválido
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
    return;
  }

  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.error || 'Erro na requisição');
  }

  return data;
};