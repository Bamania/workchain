import express from 'express';
import mongoDb from "../server/model_database/index.js";
import jobform from "./api/jobfrom.js";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import Message from "../server/model_database/messagemodal.js"
const PORT = process.env.PORT || 5000;

// Essentials
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.use('/api', jobform);

// Create HTTP server
const server = http.createServer(app);

// Attach Socket.IO server to HTTP server
const io = new Server(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
});

// Connect to MongoDB
mongoDb();

// Handle WebSocket connections
io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('joinRoom', async ({ roomId }) => {
    socket.join(roomId);
    const messages = await Message.find({ roomId }).sort({ timestamp: 1 });
    socket.emit('previousMessages', messages);
  });

  socket.on('sendMessage', async ({ roomId, sender, message }) => {
    const newMessage = new Message({ roomId, sender, message });
    await newMessage.save();
    io.to(roomId).emit('receiveMessage', newMessage);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});
// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
