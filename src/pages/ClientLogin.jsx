import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ClientLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate=useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, userType: 'client' }), // Specifying userType as 'client'
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message); // Handle login success
        // Redirect or update UI based on response
        console.log("token generated upon client login success",data.token);
        sessionStorage.setItem('token', data.token);
        sessionStorage.setItem('clientUsername',username);
        navigate("/clientHome")
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
      <h2 className="text-2xl font-bold text-center mb-4">Client Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
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
        <div className="mb-4">
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
        <div className="mb-4 text-right">
          <a href="#" className="text-sm text-blue-500 hover:text-blue-700">Forgot Password?</a>
        </div>
        <button
          type="submit"
          className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
        >
          Sign In
        </button>
      </form>
      <div className="text-center mt-4">
        <p>Or Sign in with</p>
        <div className="flex justify-center space-x-4 mt-2">
          <button className="bg-gray-100 p-2 rounded-full"><img src="google-icon.png" alt="Google" /></button>
          <button className="bg-gray-100 p-2 rounded-full"><img src="apple-icon.png" alt="Apple ID" /></button>
          <button className="bg-gray-100 p-2 rounded-full"><img src="facebook-icon.png" alt="Facebook" /></button>
        </div>
      </div>
      <div className="text-center mt-4">
        <p>Don't have an account? 
          <a href="/clientSignup" className="text-sm text-blue-500 hover:text-blue-700"> Register Now</a>
        </p>
      </div>
    </div>
  </div>
  );
};

export default ClientLogin;
