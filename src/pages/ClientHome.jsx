// File: src/components/ClientHomePage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaProjectDiagram, FaHistory, FaStore } from 'react-icons/fa';
import Navbar from '../components/Navbar2';

const ClientHomePage = () => {
  const navigate = useNavigate();

  const handleCreateProject = () => {
    navigate("/createproject");
  };

  const handlePastProject = () => {
    navigate("/allprojects");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />
      <div className="flex flex-col items-center justify-center p-4 flex-grow">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Welcome to Your Dashboard</h1>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-4xl">
          <button onClick={handleCreateProject} className="bg-blue-500 text-white rounded-lg p-6 flex flex-col items-center justify-center shadow-lg transform hover:scale-105 transition-transform">
            <FaProjectDiagram size={40} className="mb-4" />
            <span className="text-xl font-semibold">Create Projects</span>
          </button>
          <button onClick={handlePastProject} className="bg-green-500 text-white rounded-lg p-6 flex flex-col items-center justify-center shadow-lg transform hover:scale-105 transition-transform">
            <FaHistory size={40} className="mb-4" />
            <span className="text-xl font-semibold">View Past Projects</span>
          </button>
          <button className="bg-purple-500 text-white rounded-lg p-6 flex flex-col items-center justify-center shadow-lg transform hover:scale-105 transition-transform">
            <FaStore size={40} className="mb-4" />
            <span className="text-xl font-semibold">See Marketplace</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClientHomePage;
