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
io.on("connection", async (socket) => {
    console.log("A new user has connected", socket.id);
  
    // Retrieve and send all previous messages to the new user
    const messages = await Message.find().sort({ time: 1 }).exec();
    socket.emit("initial-messages", messages);
  
    // Listen for incoming messages from clients
    socket.on("message", async (messageContent) => {
      // Store the message in the database
      const message = new Message(messageContent);
      await message.save();
  
      // Broadcast the message to all connected clients
      io.emit("message", message);
    });
  
    // Handle disconnections
    socket.on("disconnect", () => {
      console.log(socket.id, " disconnected");
    });
  });
// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
