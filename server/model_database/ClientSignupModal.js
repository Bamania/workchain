// models/Client.js
import mongoose from 'mongoose';

const ClientSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  displayName: { type: String, required: true },
  organizationName: { type: String, required: true },
});

const Client = mongoose.model('Client', ClientSchema);
export default Client;
