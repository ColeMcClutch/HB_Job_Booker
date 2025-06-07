// /backend/controllers/jobController.js

const { Job, User } = require('../models');
const { Op } = require('sequelize');

// Create a new job (POSTERS only)
const createJob = async (req, res) => {
  try {
    const { summary, body } = req.body;

    if (!summary || !body) {
      return res.status(400).json({ message: 'Summary and body are required.' });
    }

    const job = await Job.create({
      summary,
      body,
      userId: req.user.id // comes from JWT middleware
    });

    res.status(201).json({ message: 'Job created.', job });
  } catch (error) {
    console.error('Create job error:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

const getAllActiveJobs = async (req, res) => {
  try {
    const twoMonthsAgo = new Date();
    twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);

    const jobs = await Job.findAll({
      where: {
        postedDate: {
          [Op.gte]: twoMonthsAgo
        }
      },
      order: [['postedDate', 'DESC']],
      include: [
        {
          model: User,
          as: 'poster',
          attributes: ['id', 'username', 'email']
        },
        {
          model: User,
          as: 'interestedUsers',
          attributes: ['id', 'username', 'email'],
          through: { attributes: [] }
        }
      ]
    });

    res.json(jobs);
  } catch (error) {
    console.error('Get jobs error:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};


// Delete a job (only by its poster)
const deleteJob = async (req, res) => {
  try {
    const job = await Job.findByPk(req.params.id);

    if (!job) {
      return res.status(404).json({ message: 'Job not found.' });
    }

    if (job.userId !== req.user.id) {
      return res.status(403).json({ message: 'You can only delete your own jobs.' });
    }

    await job.destroy();
    res.json({ message: 'Job deleted successfully.' });
  } catch (error) {
    console.error('Delete job error:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

// Viewer marks interest in a job
const expressInterest = async (req, res) => {
  try {
    const job = await Job.findByPk(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found.' });
    }

    const user = await User.findByPk(req.user.id);
    await job.addInterestedUser(user);

    res.json({ message: 'Interest recorded.' });
  } catch (error) {
    console.error('Express interest error:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

// Poster sees interested users for their job
const getInterestedUsers = async (req, res) => {
  try {
    const job = await Job.findByPk(req.params.id, {
      include: [{ model: User, as: 'interestedUsers', attributes: ['id', 'username', 'email'] }]
    });

    if (!job) return res.status(404).json({ message: 'Job not found.' });
    if (job.userId !== req.user.id) {
      return res.status(403).json({ message: 'Only the poster can view interested users.' });
    }

    res.json({ interestedUsers: job.interestedUsers });
  } catch (error) {
    console.error('Get interested users error:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

const getInterestedJobs = async (req, res) => {
  try {
    const userId = req.user.id;

    const jobs = await Job.findAll({
      include: [
        {
          model: User,
          as: 'interestedUsers',
          where: { id: userId },
          attributes: [],
          through: { attributes: [] }
        },
        {
          model: User,
          as: 'poster',
          attributes: ['id', 'username']
        }
      ],
      order: [['postedDate', 'DESC']]
    });

    res.json(jobs);
  } catch (err) {
    console.error('Error fetching interested jobs:', err);
    res.status(500).json({ message: 'Failed to load interested jobs.' });
  }
};

const removeInterest = async (req, res) => {
  try {
    const userId = req.user.id;
    const jobId = req.params.id;

    const job = await Job.findByPk(jobId);
    const user = await User.findByPk(userId);

    if (!job || !user) {
      return res.status(404).json({ message: 'Job or user not found' });
    }

    await job.removeInterestedUser(user); // uses `as: 'interestedUsers'` alias
    res.json({ message: 'Interest removed' });
  } catch (error) {
    console.error('Error removing interest:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



module.exports = {
  createJob,
  getAllActiveJobs,
  deleteJob,
  expressInterest,
  getInterestedUsers,
  getInterestedJobs,
  removeInterest
};
