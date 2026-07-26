import axios from 'axios';
import { API_URL } from '../config/constants';

const BASE_API_URL = API_URL;

const api = axios.create({
  baseURL: BASE_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Intercepteur pour ajouter le token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('admin-token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// API Gammes
export const gammeService = {
  getAll: (params) => api.get('/gammes', { params }),
  getBySlug: (slug) => api.get(`/gammes/${slug}`),
  create: (data) => api.post('/gammes', data),
  update: (id, data) => api.put(`/gammes/${id}`, data),
  delete: (id) => api.delete(`/gammes/${id}`),
  togglePromo: (id) => api.patch(`/gammes/${id}/toggle-promo`),
  toggleGlobalPromo: (isActive) => api.patch('/gammes/toggle-global-promo', { isActive })
};

// API Orders
export const orderService = {
  create: (data) => api.post('/orders', data),
  getAll: (params) => api.get('/orders', { params }),
  getById: (id) => api.get(`/orders/${id}`),
  updateStatus: (id, data) => api.patch(`/orders/${id}/status`, data),
  getStats: () => api.get('/orders/stats')
};

// API Auth
export const authService = {
  login: (credentials) => api.post('/auth/login', credentials),
  getMe: () => api.get('/auth/me')
};

// API Settings
export const settingsService = {
  get: () => api.get('/settings'),
  update: (data) => api.put('/settings', data)
};

export default api;

// API Testimonials
export const testimonialService = {
  create: (data) => api.post('/testimonials', data),
  getApproved: (params) => api.get('/testimonials', { params }),
  getAll: () => api.get('/testimonials/admin/all'),
  approve: (id) => api.patch(`/testimonials/${id}/approve`),
  toggleFeatured: (id) => api.patch(`/testimonials/${id}/feature`),
  delete: (id) => api.delete(`/testimonials/${id}`)
};

// API Newsletter
export const newsletterService = {
  subscribe: (email) => api.post('/newsletter/subscribe', { email }),
  unsubscribe: (email) => api.post('/newsletter/unsubscribe', { email }),
  getSubscribers: (params) => api.get('/newsletter/subscribers', { params }),
  deleteSubscriber: (id) => api.delete(`/newsletter/${id}`)
};

// API Before/After
export const beforeAfterService = {
  getApproved: (params) => api.get('/before-after', { params }),
  getAll: () => api.get('/before-after/admin/all'),
  create: (data) => api.post('/before-after', data),
  update: (id, data) => api.put(`/before-after/${id}`, data),
  approve: (id) => api.patch(`/before-after/${id}/approve`),
  toggleFeatured: (id) => api.patch(`/before-after/${id}/feature`),
  delete: (id) => api.delete(`/before-after/${id}`)
};
