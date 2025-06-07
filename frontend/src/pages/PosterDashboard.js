import React, { useState, useEffect, useContext } from 'react';
import { Container, Typography, TextField, Button } from '@mui/material';
import jobService from '../services/jobService';
import JobCard from '../components/JobCard';
import { AuthContext } from '../context/AuthContext';

const PosterDashboard = () => {
  const { token } = useContext(AuthContext);
  const [form, setForm] = useState({ summary: '', body: '' });
  const [jobs, setJobs] = useState([]);

  const loadJobs = async () => {
    const all = await jobService.getAll();
    setJobs(all.filter(j => j.poster?.id === JSON.parse(atob(token.split('.')[1])).id));
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await jobService.create(form, token);
    setForm({ summary: '', body: '' });
    loadJobs();
  };

  const handleDelete = async (id) => {
    await jobService.delete(id, token);
    loadJobs();
  };

  useEffect(() => { loadJobs(); }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Your Posted Jobs</Typography>

      <form onSubmit={handleSubmit}>
        <TextField label="Job Summary" fullWidth margin="normal" name="summary" value={form.summary} onChange={handleChange} />
        <TextField label="Job Description" multiline rows={4} fullWidth margin="normal" name="body" value={form.body} onChange={handleChange} />
        <Button type="submit" variant="contained">Post Job</Button>
      </form>

      {jobs.map(job => (
        <JobCard key={job.id} job={job}>
          <Button color="error" onClick={() => handleDelete(job.id)}>Delete</Button>
        </JobCard>
      ))}
    </Container>
  );
};

export default PosterDashboard;
