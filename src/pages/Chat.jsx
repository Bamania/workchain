import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
// import './Chat.css'; // Ensure you have Tailwind CSS setup in your project

const socket = io('http://localhost:5000');

const Chat = ({ roomId, username }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.emit('joinRoom', { roomId });

    socket.on('previousMessages', (messages) => {
      setMessages(messages);
    });

    socket.on('receiveMessage', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off('previousMessages');
      socket.off('receiveMessage');
    };
  }, [roomId]);

  const sendMessage = () => {
    if (message.trim() !== '') {
      socket.emit('sendMessage', { roomId, sender: username, message });
      setMessage('');
    }
  };

  const getMessageStyle = (sender) => {
    const colors = ['bg-green-500', 'bg-yellow-500', 'bg-red-500', 'bg-purple-500'];
    const colorIndex = username === sender ? 0 : (sender.charCodeAt(0) % colors.length);
    return colors[colorIndex];
  };

  return (
    <div className="flex flex-col h-screen max-w-sm mx-auto bg-gradient-to-br from-gray-100 to-gray-200 shadow-lg rounded-lg overflow-hidden">
      <div className="flex-1 p-4 overflow-auto space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg text-white ${msg.sender === username ? 'self-end' : 'self-start'} ${getMessageStyle(msg.sender)}`}
          >
            <strong>{msg.sender}:</strong> {msg.message}
          </div>
        ))}
      </div>
      <div className="p-4 bg-white border-t flex items-center">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={sendMessage}
          className="ml-3 bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
