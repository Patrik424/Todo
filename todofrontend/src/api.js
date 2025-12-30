import axios from 'axios';

// Bas-API för /todo endpoints
const api = axios.create({
  baseURL: 'http://localhost:8080/api/todo',
  headers: { 'Content-Type': 'application/json' },
});

// Extra metod för reset (använder /api/reset)
export const resetTodos = async () => {
  return axios.delete('http://localhost:8080/api/reset');
};

export default api;

