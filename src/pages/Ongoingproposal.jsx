import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ChatButton from '../components/Chatbutton';

const OngoingProposals = () => {
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProposals, setSelectedProposals] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProposals = async () => {
      const username = sessionStorage.getItem('developerUsername');
      const token = sessionStorage.getItem('token');

      if (!username) {
        setError('Developer username is not available');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('https://workchain.onrender.com/api/get-ongoing-proposals', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ developerUsername: username }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch ongoing proposals');
        }

        const data = await response.json();
        setProposals(data.proposals);
        console.log("jisme job id",data.proposals);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProposals();
  }, []);

  const handleCheckboxChange = (proposalId) => {
    setSelectedProposals((prev) =>
      prev.includes(proposalId)
        ? prev.filter((id) => id !== proposalId)
        : [...prev, proposalId]
    );
  };

  const handleModifyClick = () => {
    if (selectedProposals.length === 0) {
      alert('No proposals selected for modification');
      return;
    }
    navigate('/modify', { state: { jobid: selectedProposals[0], proposalIds: selectedProposals } });
  };
  const handleAvailable = () => {
 
    navigate('/availableJob');
  };

  const handleChatClick = (clientUsername) => {
    // Redirect or open chat interface
    console.log(`Initiate chat with client: ${clientUsername}`);
    // navigate to the chat page or open a chat interface
    // navigate(`/chat/${clientUsername}`);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto bg-white shadow-md p-6 rounded-lg">
        <h1 className="text-2xl font-bold mb-6">Ongoing Proposals</h1>

        {proposals.length === 0 ? (
          <p>No ongoing proposals found.</p>
        ) : (
          proposals.map((proposal) => (
            <div key={proposal._id} className="mb-6 border p-4 rounded-lg">
              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  checked={selectedProposals.includes(proposal._id)}
                  onChange={() => handleCheckboxChange(proposal._id)}
                  className="mr-4"
                />
                <h2 className="text-xl font-semibold">Proposal for Proposal id: {proposal._id}</h2>
              </div>
              <p className="font-medium">Client: {proposal.clientUsername}</p>
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
                          <p><strong>Developer Status:</strong> {step.developerStatus}</p>
                          <p><strong>Client Status:</strong> {step.clientStatus}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              {/* <button 
                onClick={() => handleChatClick(proposal.clientUsername)}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Chat with Client
              </button> */}
              <ChatButton  />
            </div>
          ))
        )}

        <button 
          onClick={handleModifyClick}
          className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Modify Proposal
        </button>
        <button 
          onClick={handleAvailable}
          className="mt-4 ml-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Go back to available  jobs 
        </button>
      </div>
    </div>
  );
};

export default OngoingProposals;
