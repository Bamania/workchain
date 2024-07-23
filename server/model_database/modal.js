// File: models/job.model.js
import mongoose from 'mongoose';

const milestoneSchema = new mongoose.Schema({
  description: { type: String, required: true },
  payment: { type: String, required: true }
});

const jobSchema = new mongoose.Schema({

  ethAdress: { type: String, required: true },
  title: { type: String, required: true },
  skills: { type: String, required: true },
  estimation: { type: String },
  budget: { type: String, required: true },
  description: { type: String, required: true },
  milestones: [milestoneSchema]
});

const Job = mongoose.model('Job', jobSchema,"test01");

export default Job;







// import mongoose from 'mongoose';
// const Schema = mongoose.Schema;

// // Milestone Schema
// const MilestoneSchema = new Schema({
//   description: {
//     type: String,
//     required: true
//   },
//   payment: {
//     type: Number,
//     required: true
//   }
// });

// // Job Schema
// const JobSchema = new Schema({
//   title: {
//     type: String,
//     required: true
//   },
//   skills: {
//     type: String,
//     required: true
//   },
//   estimation: {
//     type: String
//   },
//   budget: {
//     type: Number,
//     required: true
//   },
//   description: {
//     type: String,
//     required: true
//   },
//   milestones: [MilestoneSchema]
// }, {
//   timestamps: true
// });

// const Job = mongoose.model('Job', JobSchema);

// module.exports = Job;
