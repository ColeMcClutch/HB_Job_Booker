import React, { useState } from 'react';
import { TextField, Button, Container, Typography, MenuItem } from '@mui/material';
import authService from '../services/authService';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '', role: 'viewer' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await authService.register(form);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>Register</Typography>
      <form onSubmit={handleSubmit}>
        <TextField label="Username" fullWidth margin="normal" name="username" value={form.username} onChange={handleChange} />
        <TextField label="Email" fullWidth margin="normal" name="email" value={form.email} onChange={handleChange} />
        <TextField label="Password" type="password" fullWidth margin="normal" name="password" value={form.password} onChange={handleChange} />
        <TextField select label="Role" fullWidth margin="normal" name="role" value={form.role} onChange={handleChange}>
          <MenuItem value="viewer">Viewer</MenuItem>
          <MenuItem value="poster">Poster</MenuItem>
        </TextField>
        {error && <Typography color="error">{error}</Typography>}
        <Button variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>Register</Button>
      </form>
    </Container>
  );
};

export default RegisterPage;
