import React, { useEffect, useState } from 'react';
import jobService from '../services/jobService';
import JobCard from '../components/JobCard';
import { Container, Typography } from '@mui/material';

//Build the available jobs bars
const JobBoardPage = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      const data = await jobService.getAll();
      setJobs(data);
    };
    fetchJobs();
  }, []);

  //Visual elements
  return (
    <Container>
      <Typography variant="h4" gutterBottom>Available Jobs</Typography>
      {jobs.map(job => (
        <JobCard key={job.id} job={job} />
      ))}
    </Container>
  );
};

export default JobBoardPage;
