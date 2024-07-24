// models/Developer.js
import mongoose from 'mongoose';

const DeveloperSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  displayName: { type: String, required: true },
  skills: { type: [String], required: true },
});

const Developer = mongoose.model('Developer', DeveloperSchema);
export default Developer;