import axios from 'axios';

// Cria a instância com a URL base do seu Flask
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000',
});

// INTERCEPTOR DE REQUISIÇÃO: Envia o token se ele existir no localStorage
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// INTERCEPTOR DE RESPOSTA: Se a API retornar 401 (Não autorizado), limpa o login
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login'; // Redirecionamento forçado em caso de token inválido
    }
    return Promise.reject(error);
  }
);

export default api;