import React, { useState, useEffect, useContext } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box
} from '@mui/material';
import jobService from '../services/jobService';
import JobCard from '../components/JobCard';
import { AuthContext } from '../context/AuthContext';

const PosterDashboard = () => {
  const { token } = useContext(AuthContext);
  const [form, setForm] = useState({ summary: '', body: '' });
  const [jobs, setJobs] = useState([]);

  const loadJobs = async () => {
    const all = await jobService.getAll();
    const currentUserId = JSON.parse(atob(token.split('.')[1])).id;
    setJobs(all.filter(j => j.poster?.id === currentUserId));
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await jobService.create(form, token);
    setForm({ summary: '', body: '' });
    loadJobs();
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm('Are you sure you want to delete this job?');
    if (confirm) {
      await jobService.delete(id, token);
      loadJobs();
    }
  };

  useEffect(() => {
    loadJobs();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Your Posted Jobs</Typography>

      {/* Job creation form */}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Job Summary"
          fullWidth
          margin="normal"
          name="summary"
          value={form.summary}
          onChange={handleChange}
        />
        <TextField
          label="Job Description"
          multiline
          rows={4}
          fullWidth
          margin="normal"
          name="body"
          value={form.body}
          onChange={handleChange}
        />
        <Button type="submit" variant="contained">
          Post Job
        </Button>
      </form>

      {/* Job list with interested users and delete buttons */}
      {jobs.map(job => (
        <div key={job.id}>
          <JobCard job={job}>
            <Button
              color="error"
              variant="outlined"
              sx={{ mt: 1 }}
              onClick={() => handleDelete(job.id)}
            >
              Delete
            </Button>
          </JobCard>

          {job.interestedUsers?.length > 0 && (
            <Box sx={{ ml: 3, mt: -1, mb: 2 }}>
              <Typography variant="subtitle1">Interested Users:</Typography>
              {job.interestedUsers.map(user => (
                <Typography key={user.id} variant="body2" sx={{ pl: 1 }}>
                  • {user.username} ({user.email})
                </Typography>
              ))}
            </Box>
          )}
        </div>
      ))}
    </Container>
  );
};

export default PosterDashboard;
