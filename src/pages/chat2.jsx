// File: src/pages/ChatWithDeveloperPage.js
import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io("http://localhost:5000");

const ChatWithDeveloperPage = () => {
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");

  useEffect(() => {
    // Load initial messages
    socket.on("initial-messages", (messages) => {
      setMessages(messages);
    });

    // Listen for new messages
    socket.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off("initial-messages");
      socket.off("message");
    };
  }, []);

  const sendMessage = () => {
    const messageContent = {
      author: "YourUsername", // Replace with actual author
      message: currentMessage,
      time: new Date().toISOString()
    };

    socket.emit("message", messageContent);
    setCurrentMessage("");
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((message, index) => (
          <div key={index}>
            <span>{message.author}: </span>
            <span>{message.message}</span>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={currentMessage}
        onChange={(e) => setCurrentMessage(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ChatWithDeveloperPage;
