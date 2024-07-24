import React, { useState } from 'react';
import { FaGoogle, FaApple, FaFacebook } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const DeveloperLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
const navigate=useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://workchain.onrender.com/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, userType: 'developer' }), // Specifying userType as 'developer'
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message); // Handle login success
        sessionStorage.setItem('token', data.token);
        sessionStorage.setItem('developerUsername', username);
        
        navigate("/availableJob")
        // Redirect or update UI based on response
      } else {
        alert(data.message); // Handle login failure
      }
    } catch (error) {
      alert('An error occurred. Please try again.'); // Handle network error
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-bold text-center mb-6">Developer Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter Username"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-6 text-right">
            <a href="#" className="text-sm text-blue-500 hover:text-blue-700">Forgot Password?</a>
          </div>
          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          >
            Sign In
          </button>
        </form>
        <div className="text-center mt-6">
          <p>Or Sign in with</p>
          <div className="flex justify-center space-x-4 mt-2">
            <button className="bg-gray-100 p-3 rounded-full shadow hover:bg-gray-200 transition duration-200"><FaGoogle className="text-gray-700" /></button>
            <button className="bg-gray-100 p-3 rounded-full shadow hover:bg-gray-200 transition duration-200"><FaApple className="text-gray-700" /></button>
            <button className="bg-gray-100 p-3 rounded-full shadow hover:bg-gray-200 transition duration-200"><FaFacebook className="text-gray-700" /></button>
          </div>
        </div>
        <div className="text-center mt-6">
          <p>Don't have an account? <a href="#" className="text-sm text-blue-500 hover:text-blue-700">Request Now</a></p>
        </div>
      </div>
    </div>
  );
};

export default DeveloperLogin;
