import axios from 'axios';

const API = process.env.REACT_APP_API_URL;

const register = async (userData) => {
  return axios.post(`${API}/register`, userData);
};

const login = async (email, password) => {
  const res = await axios.post(`${API}/login`, { email, password });
  return res.data;
};

export default {
  register,
  login
};
