// File: src/components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBell } from 'react-icons/fa';

const Navbar2 = () => {
  const navigate = useNavigate();

  const handleNotifications = () => {
    navigate('/notifications');
  };

  const handleChatWithDeveloper = () => {
    navigate('/chat');
  };

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-gray-800">YourApp</Link>
      <div className="flex items-center space-x-4">
        <button
          onClick={handleNotifications}
          className="text-gray-600 hover:text-gray-800 transition duration-300"
        >
          <FaBell size={24} />
        </button>
        <button
          onClick={handleChatWithDeveloper}
          className="text-gray-600 hover:text-gray-800 transition duration-300"
        >
          Chat with Developer
        </button>
      </div>
    </nav>
  );
};

export default Navbar2;
