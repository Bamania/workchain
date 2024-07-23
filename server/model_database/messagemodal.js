// models/Message.js
import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  author: String,
  message: String,
  time: { type: Date, default: Date.now }
});

const Message = mongoose.model('Message', messageSchema);

export default Message;
