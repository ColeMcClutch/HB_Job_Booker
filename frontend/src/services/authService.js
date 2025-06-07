import axios from 'axios';
//Services for authentication
const API = process.env.REACT_APP_API_URL;

//Register
const register = async (userData) => {
  return axios.post(`${API}/register`, userData);
};

//Login
const login = async (email, password) => {
  const res = await axios.post(`${API}/login`, { email, password });
  return res.data;
};

export default {
  register,
  login
};
