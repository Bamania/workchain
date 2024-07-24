import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ChatButton from '../components/Chatbutton';

const OngoingForClient = () => {
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleChatClick=()=>{
    // navigate('/chat');
    console.log("handleChatClick")
  }
  useEffect(() => {
    const fetchOngoingProposals = async () => {
      const token = sessionStorage.getItem('token');

      if (!token) {
        setError('Authentication token is missing');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('http://localhost:5000/api/get-ongoing-proposals-forclient', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch proposals');
        }

        const data = await response.json();
        setProposals(data.proposals);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOngoingProposals();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto bg-white shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6">Ongoing Proposals</h1>
        <button
          onClick={() => navigate("/clienthome")}
          className="mb-6 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Go Back to Home Page
        </button>
        {proposals.length === 0 ? (
          <p>No ongoing proposals found.</p>
        ) : (
          proposals.map((proposal) => (
            <div key={proposal._id} className="mb-6 border p-4 rounded-md">
              <h2 className="text-xl font-semibold mb-2">Proposal ID: {proposal._id}</h2>
              <p><strong>Job ID:</strong> {proposal.jobId}</p>
              <p><strong>Status:</strong> {proposal.status}</p>
              <button
                onClick={() => navigate("/viewdetails", { state: { proposal } })}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                View Details
              </button>
              <button 
                onClick={() => handleChatClick()}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Chat with Developer
              </button>
              <ChatButton/>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default OngoingForClient;
