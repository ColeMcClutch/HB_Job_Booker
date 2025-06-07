// /backend/routes/jobRoutes.js
const express = require('express');
const router = express.Router();
const {
  createJob,
  getAllActiveJobs,
  deleteJob,
  expressInterest,
  getInterestedUsers,
  getInterestedJobs,
  removeInterest,
} = require('../controllers/jobController');

const { authenticate, authorize } = require('../middleware/auth');

// Public: Anyone can view jobs
router.get('/jobs', getAllActiveJobs);

// Poster: Create a job
router.post('/jobs', authenticate, authorize('poster'), createJob);

// Poster: Delete their own job
router.delete('/jobs/:id', authenticate, authorize('poster'), deleteJob);

// Viewer: Mark interest
router.post('/jobs/:id/interest', authenticate, authorize('viewer'), expressInterest);

// Poster: See interested users
router.get('/jobs/:id/interested', authenticate, authorize('poster'), getInterestedUsers);

// Poster: See Interested Jobs
router.get('/interested', authenticate, getInterestedJobs);

//Delete Jobs from Interested Tab
router.delete('/jobs/:id/interest', authenticate, removeInterest);


module.exports = router;
