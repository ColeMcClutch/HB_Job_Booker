import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import jobService from '../services/jobService';
import { Container, Typography, Button } from '@mui/material';
import { AuthContext } from '../context/AuthContext';

//Details about a job seen here
const JobDetailPage = () => {
  const { id } = useParams();
  const { user, token } = useContext(AuthContext);
  const [job, setJob] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetch = async () => {
      const data = await jobService.getOne(id);
      setJob(data);
    };
    fetch();
  }, [id]);

  const handleInterest = async () => {
    await jobService.interest(id, token);
    setMessage('You’ve marked interest.');
  };

  if (!job) return <p>Loading...</p>;

  //Visual elements
  return (
    <Container>
      <Typography variant="h4">{job.summary}</Typography>
      <Typography color="textSecondary">Posted on {new Date(job.postedDate).toLocaleDateString()}</Typography>
      <Typography sx={{ mt: 2 }}>{job.body}</Typography>

      {user?.role === 'viewer' && (
        <Button
        variant="contained"
        type="submit"
        sx={{
          mt: 2,
          backgroundColor: 'red',
          '&:hover': {
            backgroundColor: '#b30000'
          }
        }}
      >
        I'm Interested
      </Button>

      )}

      {message && <Typography color="primary" sx={{ mt: 1 }}>{message}</Typography>}
    </Container>
  );
};

export default JobDetailPage;
