import mongoose from 'mongoose';
const { Schema } = mongoose;

// Define the Step schema
const StepSchema = new Schema({
  stepTitle: {
    type: String,
    required: true
  },developerStatus: {
    type: String,
    enum: ['not completed', 'completed'],
    default: 'not completed'
  },
  clientStatus: {
    type: String,
    enum: ['not completed', 'completed'],
    default: 'not completed'
  }
 
});

// Define the Milestone schema
const MilestoneSchema = new Schema({
  milestoneTitle: {
    type: String,
    required: true
  },
  milestoneDescription: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  income: {
    type: Number,
    required: true
  },
  steps: [StepSchema]
});

// Define the Proposal schema
const ProposalSchema = new Schema({
  developerUsername: {
    type: String,
    required: true
  },
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true
  },
  milestones: [MilestoneSchema],
  status: {
    type: String,
    enum: ['incomplete','ongoing', 'complete'],
    default: 'incomplete'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});


const Proposal = mongoose.model('Proposal', ProposalSchema);
export default Proposal;
