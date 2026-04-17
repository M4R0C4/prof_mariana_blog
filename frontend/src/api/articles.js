import api from './client'
export const articleService = {
 getAll: () => api.get('/articles/'),
 getBySlug: (slug) => api.get(`/articles/${slug}`),
 create: (data) => api.post('/articles/', data),
 update: (id, data) => api.patch(`/articles/${id}`, data),
 delete: (id) => api.delete(`/articles/${id}`),
}