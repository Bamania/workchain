import express from 'express';
import Job from '../model_database/modal.js';

const router = express.Router();

router.post('/job', async (req, res) => {
  const { title, skills, estimation, budget, description, milestones,ethAdress } = req.body;

  try {
    const newJob = new Job({
      ethAdress,
      title,
      skills,
      estimation,
      budget,
      description,
      milestones
    });

    await newJob.save();
     console.log("success", newJob.title, newJob.skills);
    res.status(201).json(newJob);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create job', error });
  }
});

router.get('/allprojects', async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).json(jobs);
  } catch (error) {
    res.status(400).json({ message: 'Failed to fetch jobs', error });
  }
});





  export default router;