import express from 'express';
import Client from '../model_database/ClientSignupModal.js';
import bcrypt from 'bcryptjs';
import Developer from '../model_database/DeveloperSignupModel.js';
import jwt from 'jsonwebtoken';
import Job from "../model_database/modal.js";
import Proposal from "../model_database/proposalModel.js";

const router = express.Router();

// JWT Secret
const JWT_SECRET = 'IknowYourMom'; 

//creating middlleware to check the jwt token
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  // console.log('Token received:', token);

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error('JWT verification error:', err.message);
      return res.status(500).json({ error: 'Failed to authenticate token' });
    }

    // console.log('Token verified. Decoded:', decoded);
    req.userId = decoded.id;
    next();
  });
};



// Client Registration
router.post('/client-signup', async (req, res) => {
  try {
    const { username, password, displayName, organizationName } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newClient = new Client({ username, password: hashedPassword, displayName, organizationName });
    await newClient.save();
    res.status(201).json({ message: 'Client created successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Developer Signup
router.post('/developer-signup', async (req, res) => {
  try {
    const { username, password, displayName, skills } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newDeveloper = new Developer({ username, password: hashedPassword, displayName, skills: skills.split(',') });
    await newDeveloper.save();
    res.status(201).json({ message: 'Developer created successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login route for both
router.post('/login', async (req, res) => {
  const { username, password, userType } = req.body;

  if (!username || !password || !userType) {
    return res.status(400).json({ message: 'Username, password, and userType are required' });
  }

  try {
    let user;

    if (userType === 'client') {
      user = await Client.findOne({ username });
    } else if (userType === 'developer') {
      user = await Developer.findOne({ username });
    } else {
      return res.status(400).json({ message: 'Invalid userType' });
    }

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT Token
    const token = jwt.sign({ id: user._id, userType }, JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful', token, userType });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// for posting the job by the client
router.post('/job', async (req, res) => {
  const { title, skills, estimation, budget, description, milestones } = req.body;
console.log("from jobfrom",req.body)
  try {

    const newJob = new Job({
    
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

router.get('/allprojects', authenticateToken, async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).json(jobs);
  } catch (error) {
    res.status(400).json({ message: 'Failed to fetch jobs', error });
  }
});

// router.post('/approve/:notificationId', authenticateToken, async (req, res) => {
//   const { notificationId } = req.params;

//   try {
//     const notification = await Notification.findById(notificationId);
//     if (!notification) {
//       return res.status(404).json({ message: 'Notification not found' });
//     }

//     const job = await Job.findById(notification.jobId);
//     job.assignedTo = notification.developerId;
//     await job.save();

//     notification.status = 'approved';
//     await notification.save();

//     res.status(200).json({ message: 'Application approved' });
//   } catch (error) {
//     res.status{500).json({ message: 'Server error', error });
//   }
// });

router.get('/developers/:username', authenticateToken, async (req, res) => {
  const { username } = req.params;

  try {
    const developer = await Developer.findOne({ username });
    if (!developer) {
      return res.status(404).json({ message: 'Developer not found' });
    }

    res.status(200).json(developer);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

//for fetching the job  of specefic job id
router.post('/apply/:jobId', authenticateToken, async (req, res) => {
  console.log("post called !")
  const { jobId } = req.params;
  console.log("job id jo bheji",jobId);

  try {
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
//sending the job of the given job._id to the frontend
  console.log("job recived from the backend",job)
    res.status(200).json({ job});
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

//to send the proposal to the database !
router.post('/submit-proposal',authenticateToken, async (req, res) => {
  try {
    const { developerUsername, jobId, milestones } = req.body;
    // console.log("proposal data from frontend", proposalData);

 
    const proposal = new Proposal({
      developerUsername: developerUsername,
      jobId: jobId,
      milestones: milestones 
    });
    
    await proposal.save();

 
    res.status(201).json({ message: 'Proposal successfully saved', proposal });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to save the proposal', error });
  }
});

//to fetch the proposal from the database !
router.get('/get-proposals', authenticateToken, async (req, res) => {
  try {
    const developerUsername = req.query.developerUsername; // Fetch developerUsername from query parameters
    console.log("data from the frontend", developerUsername);

    if (!developerUsername) {
      return res.status(400).json({ message: 'Developer username is required' });
    }

    // Fetch proposals for the specified developer
    const proposals = await Proposal.find({ developerUsername: developerUsername });

    res.status(200).json({
      proposals: proposals
    });
  } catch (error) {
    console.error('Error fetching proposals:', error);
    res.status(500).json({
      message: 'Failed to fetch proposals',
      error: error
    });
  }
});

//fething the recived proposal for the client !

router.get('/get-received-proposals', authenticateToken, async (req, res) => {
  try {
    // Fetch all proposals with status 'incomplete'
    const proposals = await Proposal.find({ status: 'incomplete' }).populate('jobId', 'jobTitle'); // Adjust fields to populate based on your Job model

    res.status(200).json({
      proposals: proposals
    });
  } catch (error) {
    console.error('Error fetching proposals:', error);
    res.status(500).json({
      message: 'Failed to fetch proposals',
      error: error
    });
  }
});


//for changing the status to the ! ongoing
// Backend: Update proposal status
router.patch('/update-proposal/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: 'Status is required' });
    }

    // Update the proposal status
    const updatedProposal = await Proposal.findByIdAndUpdate(id, { status }, { new: true });

    if (!updatedProposal) {
      return res.status(404).json({ message: 'Proposal not found' });
    }

    res.status(200).json({
      message: 'Proposal status updated successfully',
      proposal: updatedProposal
    });
  } catch (error) {
    console.error('Error updating proposal status:', error);
    res.status(500).json({
      message: 'Failed to update proposal status',
      error: error
    });
  }
});

//to fetch teh ongoing proposal for the developer !
router.post('/get-ongoing-proposals', authenticateToken, async (req, res) => {
  try {
    const { developerUsername } = req.body; // Extract developerUsername from request body

    if (!developerUsername) {
      return res.status(400).json({ message: 'Developer username is required' });
    }

    // Fetch ongoing proposals for the specified developer
    const proposals = await Proposal.find({ 
      developerUsername: developerUsername, 
      status: 'ongoing' 
    });

    res.status(200).json({
      proposals: proposals
    });
  } catch (error) {
    console.error('Error fetching ongoing proposals:', error);
    res.status(500).json({
      message: 'Failed to fetch ongoing proposals',
      error: error
    });
  }
});
//get ongoing proposals for the client !
router.get('/get-ongoing-proposals-forclient',  authenticateToken, async (req, res) => {
  try {
    // Find all proposals with status 'ongoing'
    const ongoingProposals = await Proposal.find({ status: 'ongoing' });
    console.log(ongoingProposals);
    // Respond with the found proposals
    res.json({ proposals: ongoingProposals });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch ongoing proposals' });
  }
});

//to fetch only those proposals for the developer those are completed successfully!
router.get('/get-completed-proposals', authenticateToken, async (req, res) => {
  try {
    const developerUsername = req.user.username; // Extracted from token payload
    const proposals = await Proposal.find({ developerUsername, status: 'completed' });
    res.status(200).json({ proposals });
  } catch (error) {
    console.error('Error fetching completed proposals:', error);
    res.status(500).json({ message: 'Failed to fetch completed proposals', error });
  }
});

//updating the proposal after being accepted by the developer!
router.post('/get-proposals', async (req, res) => {
  const { proposalIds } = req.body;
  console.log("proposalIds jiski chahte h modify krna ",proposalIds);

  if (!Array.isArray(proposalIds) || proposalIds.length === 0) {
    return res.status(400).json({ message: 'Invalid proposal IDs' });
  }

  try {
    // Fetch proposals by IDs
    const proposals = await Proposal.find({ '_id': { $in: proposalIds } });

    if (proposals.length === 0) {
      return res.status(404).json({ message: 'No proposals found' });
    }

    res.json({ proposals });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
//for updating the inputs of the proposal for the dveloeper proposal
router.put('/updateproposal', async (req, res) => {
  console.log("route called for updation");
  const { proposals } = req.body; 
  console.log(proposals);
  
  const flattenedProposals = proposals.flat();
  
  try {
    for (const proposal of flattenedProposals) {
      const { _id, milestones } = proposal;
      console.log(_id, milestones);
      
      const existingProposal = await Proposal.findOne({ _id: _id });
      console.log("jo select kre ho uska status ! change krne ja rhe ho wo ",existingProposal);
      
      if (!existingProposal) {
        return res.status(404).json({ message: `Proposal with ID ${_id} not found` });
      }

      // Validate and normalize milestone data
      const normalizedMilestones = milestones.map(milestone => ({
        ...milestone,
        steps: milestone.steps.map(step => ({
          ...step,
          // clientStatus: step.clientStatus.toLowerCase(), // Ensure lowercase
          developerStatus: step.developerStatus.toLowerCase(), // Ensure lowercase
        }))
      }));

      existingProposal.milestones = normalizedMilestones;
      await existingProposal.save();
    }

    res.status(200).json({ message: 'Proposals updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update proposals' });
  }
});


//when clients click on the view detals button ! 
router.get('/get-proposal/:id', authenticateToken, async (req, res) => {
  try {
    const proposalId = req.params.id;
    const proposal = await Proposal.findById(proposalId);

    if (!proposal) {
      return res.status(404).json({ message: 'Proposal not found' });
    }

    // Respond with the proposal data
    res.json({ proposal });
  } catch (error) {
    console.error('Error fetching proposal:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


 // Contains updated milestones with clientStatus
 router.put('/update-client-status/:id', async (req, res) => {
  const { id } = req.params;
  const { milestones } = req.body; // Contains updated milestones with clientStatus

  try {
    // Find the proposal by ID and update its milestones
    const updatedProposal = await Proposal.findByIdAndUpdate(
      id,
      { $set: { milestones: milestones } },
      { new: true, useFindAndModify: false }
    );

    if (!updatedProposal) {
      return res.status(404).json({ error: 'Proposal not found' });
    }

    res.json({ proposal: updatedProposal });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/updateCompletedStatus', async (req, res) => {
  try {
    // Update proposals only if all steps within all milestones have clientStatus as 'Completed'
    const updatedProposals = await Proposal.updateMany(
      {
        status: 'ongoing', // Only update ongoing proposals
        milestones: {
          $not: {
            $elemMatch: {
              steps: {
                $elemMatch: {
                  clientStatus: { $ne: 'Completed' }
                }
              }
            }
          }
        }
      },
      {
        $set: { status: 'completed' }
      }
    );

    res.json({ message: 'Proposals updated successfully', result: updatedProposals });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



router.get('/completedProposals', async (req, res) => {
  try {
    // Find all proposals where the status is 'completed'
    const completedProposals = await Proposal.find({ status: 'completed' });

    res.json(completedProposals);
    console.log(completedProposals);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
