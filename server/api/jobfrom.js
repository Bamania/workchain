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


router.post('/approve/:notificationId', async (req, res) => {
  const { notificationId } = req.params;

  try {
    // Find the notification
    const notification = await Notification.findById(notificationId);
    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    // Mark the job as assigned to the developer
    const job = await Job.findById(notification.jobId);
    job.assignedTo = notification.developerId;
    await job.save();

    // Update the notification status
    notification.status = 'approved';
    await notification.save();

    res.status(200).json({ message: 'Application approved' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

router.post('/apply/:jobId', async (req, res) => {
  const { developerId } = req.body;
  const { jobId } = req.params;

  try {
    // Find the job and client
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Create a new notification for the client
    // const notification = new Notification({
    //   clientId: job.clientId,
    //   developerId,
    //   jobId,
    //   message: `Developer ${developerId} has applied for your job: ${job.title}`,
    //   type: 'application'
    // });

    // await notification.save();

    res.status(200).json({ message: 'work completed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});


  export default router;