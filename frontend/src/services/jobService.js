import axios from 'axios';

//Begin building API
const API = process.env.REACT_APP_API_URL;

//Async commands
const getAll = async () => {
  const res = await axios.get(`${API}/jobs`);
  return res.data;
};

const getOne = async (id) => {
  const res = await axios.get(`${API}/jobs`);
  return res.data.find(job => job.id === parseInt(id));
};

const create = async (jobData, token) => {
  return axios.post(`${API}/jobs`, jobData, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

const deleteJob = async (id, token) => {
  return axios.delete(`${API}/jobs/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

const interest = async (id, token) => {
  return axios.post(`${API}/jobs/${id}/interest`, {}, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

const getInterested = async (token) => {
  const res = await axios.get(`${API}/interested`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

const uninterest = async (id, token) => {
  const res = await axios.delete(`${API}/jobs/${id}/interest`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

//Export

export default {
  getAll,
  getOne,
  create,
  delete: deleteJob,
  interest,
  getInterested,
  uninterest
};
