//Job cards
import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const JobCard = ({ job, showInterestButton, onExpressInterest, children }) => {
  return (
    <Card sx={{ marginBottom: 2 }}>
      <CardContent>
        <Typography variant="h6">{job.summary}</Typography>
        <Typography variant="body2" color="text.secondary">
          Posted by: {job.poster?.username || 'Unknown'} on {new Date(job.postedDate).toLocaleDateString()}
        </Typography>
        <Typography sx={{ marginTop: 1 }}>{job.body}</Typography>

        {showInterestButton && (
          <Button
            variant="contained"
            sx={{ marginTop: 2 }}
            onClick={() => onExpressInterest(job.id)}
          >
            I'm Interested
          </Button>
        )}

        <Button
          component={Link}
          to={`/jobs/${job.id}`}
          sx={{ marginTop: 2, marginLeft: 1 }}
        >
          View Details
        </Button>

        {/* Render the Delete button  */}
        {children}
      </CardContent>
    </Card>
  );
};

export default JobCard;
