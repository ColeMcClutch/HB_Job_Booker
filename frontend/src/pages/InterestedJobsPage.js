//Establishing the interested in job page
import React, { useEffect, useState, useContext } from 'react';
import { Container, Typography, Button } from '@mui/material';
import jobService from '../services/jobService';
import { AuthContext } from '../context/AuthContext';
import JobCard from '../components/JobCard';


const InterestedJobsPage = () => {
  const { token } = useContext(AuthContext);
  const [jobs, setJobs] = useState([]);

  const loadJobs = async () => {
    const data = await jobService.getInterested(token);
    setJobs(data);
  };

  useEffect(() => { loadJobs(); }, [token]);

  //Removing jobs if uninterested
  const handleUnmarkInterest = async (jobId) => {
    try {
      await jobService.uninterest(jobId, token);
      loadJobs();
    } catch (error) {
      console.error('Failed to remove interest:', error);
    }
  };

  //Visual elements
  return (
    <Container>
      <Typography variant="h4" gutterBottom>Your Interested Jobs</Typography>
      {jobs.length > 0 ? (
        jobs.map(job => (
          <JobCard key={job.id} job={job}>
            <Button
              variant="outlined"
              color="error"
              sx={{ mt: 1 }}
              onClick={() => handleUnmarkInterest(job.id)}
            >
              Remove Interest
            </Button>
          </JobCard>
        ))
      ) : (
        <Typography>No jobs marked as interested yet.</Typography>
      )}
    </Container>
  );
};

export default InterestedJobsPage;
