import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ReceivedProposals = () => {
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        const token = sessionStorage.getItem('token');
        const response = await fetch('http://localhost:5000/api/get-received-proposals', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
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

    fetchProposals();
  }, []);

  const handleAccept = async (proposalId) => {
    try {
      const token = sessionStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/update-proposal/${proposalId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: 'ongoing' })
      });

      if (!response.ok) {
        throw new Error('Failed to update proposal');
      }

      // Redirect to progress page after successful update
      navigate('/progress');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleReject = async (proposalId) => {
    try {
      const token = sessionStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/update-proposal/${proposalId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: 'rejected' })
      });

      if (!response.ok) {
        throw new Error('Failed to update proposal');
      }

      // Fetch updated proposals list
      const responseUpdated = await fetch('http://localhost:5000/api/get-received-proposals', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!responseUpdated.ok) {
        throw new Error('Failed to fetch updated proposals');
      }

      const data = await responseUpdated.json();
      setProposals(data.proposals);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto bg-white shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6">Received Proposals</h1>

        {proposals.length === 0 ? (
          <p>No proposals found.</p>
        ) : (
          proposals.map((proposal) => (
            <div key={proposal._id} className="mb-6 border p-4 rounded-md">
              <h2 className="text-xl font-semibold mb-4">Proposal for Job ID: {proposal.jobId._id}</h2>
              <p className="font-medium">Developer: {proposal.developerUsername}</p>
              <p className="font-medium">Status: {proposal.status}</p>
              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2">Milestones:</h3>
                {proposal.milestones.map((milestone, index) => (
                  <div key={index} className="mb-4 p-2 border rounded-md">
                    <h4 className="font-semibold">Milestone {index + 1}</h4>
                    <p><strong>Title:</strong> {milestone.milestoneTitle}</p>
                    <p><strong>Description:</strong> {milestone.milestoneDescription}</p>
                    <p><strong>Start Date:</strong> {new Date(milestone.startDate).toLocaleDateString()}</p>
                    <p><strong>End Date:</strong> {new Date(milestone.endDate).toLocaleDateString()}</p>
                    <p><strong>Income:</strong> {milestone.income} ETH</p>
                    <div>
                      <h5 className="font-semibold">Steps:</h5>
                      {milestone.steps.map((step, stepIndex) => (
                        <div key={stepIndex} className="mb-2">
                          <p><strong>Step {stepIndex + 1}:</strong> {step.stepTitle}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex justify-between">
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                  onClick={() => handleAccept(proposal._id)}
                >
                  Accept
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  onClick={() => handleReject(proposal._id)}
                >
                  Reject
                </button>
              </div>
            </div>
          ))
        )}

        <button 
          onClick={() => navigate('/all-projects')}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Go Back to All Projects
        </button>
      </div>
    </div>
  );
};

export default ReceivedProposals;
