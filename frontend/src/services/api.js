
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
baseURL: API_URL,
headers: {
    'Content-Type': 'application/json',
},
});

// Records API
export const recordsAPI = {
// Get all records
getAll: (params = {}) => api.get('/records', { params }),

// Get single record
getById: (id) => api.get(`/records/${id}`),

// Create record
create: (data) => api.post('/records', data),

// Update record
update: (id, data) => api.put(`/records/${id}`, data),

// Delete record
delete: (id) => api.delete(`/records/${id}`),

// Get statistics
getStats: () => api.get('/records/stats/summary'),
};

export default api;