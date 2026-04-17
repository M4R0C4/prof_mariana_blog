import api from './client';

export const authService = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  getMe: () => api.get('/auth/me'),

  register: (username, password, email) => {
  return api.post('/auth/register', { username, password, email });
},
};