import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ProposalDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [proposal, setProposal] = useState(location.state?.proposal);
  const [clientStatuses, setClientStatuses] = useState({});  // For tracking client status changes

  useEffect(() => {
    if (location.state?.proposal) {
      // Initialize client statuses from the proposal data
      const statuses = {};
      location.state.proposal.milestones.forEach(milestone => {
        milestone.steps.forEach((step, index) => {
          statuses[`${milestone._id}_${index}`] = step.clientStatus || 'Not Completed';
        });
      });
      setClientStatuses(statuses);
    }
  }, [location.state?.proposal]);

  const handleStatusChange = (milestoneId, stepIndex, status) => {
    setClientStatuses(prevStatus => ({
      ...prevStatus,
      [`${milestoneId}_${stepIndex}`]: status
    }));
  };

  const handleSubmit = async () => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      alert('Authentication token is missing');
      return;
    }

    const updatedMilestones = proposal.milestones.map(milestone => ({
      ...milestone,
      steps: milestone.steps.map((step, index) => ({
        ...step,
        clientStatus: clientStatuses[`${milestone._id}_${index}`]
      }))
    }));

    try {
      const response = await fetch(`https://workchain.onrender.com/api/update-client-status/${proposal._id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ milestones: updatedMilestones }),
      });

      if (!response.ok) {
        throw new Error('Failed to update client status');
      }

      alert('Client status updated successfully');
      // Optionally, you could refresh the page or navigate away
    } catch (err) {
      alert(err.message);
    }
  };

  if (!proposal) return <p>No proposal found</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto bg-white shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6">Proposal Details</h1>
        <h2 className="text-xl font-semibold mb-2">Proposal ID: {proposal._id}</h2>
        <p><strong>Job ID:</strong> {proposal.jobId}</p>
        <p><strong>Status:</strong> {proposal.status}</p>

        <div className="mt-4">
          <h3 className="font-semibold">Milestones:</h3>
          {proposal.milestones.map((milestone, milestoneIndex) => (
            <div key={milestone._id} className="mb-4 border p-4 rounded-md">
              <h4 className="text-lg font-semibold mb-2">Milestone {milestoneIndex + 1}</h4>
              <p><strong>Title:</strong> {milestone.milestoneTitle}</p>
              <p><strong>Description:</strong> {milestone.milestoneDescription}</p>
              <p><strong>Start Date:</strong> {new Date(milestone.startDate).toLocaleDateString()}</p>
              <p><strong>End Date:</strong> {new Date(milestone.endDate).toLocaleDateString()}</p>
              <p><strong>Income:</strong> {milestone.income}</p>
              <div className="mt-2">
                <h5 className="font-semibold">Steps:</h5>
                {milestone.steps.map((step, stepIndex) => (
                  <div key={stepIndex} className="mb-2 p-2 border rounded-md">
                    <p><strong>Step {stepIndex + 1}:</strong> {step.stepTitle}</p>
                    <p><strong>Developer Status:</strong> {step.developerStatus || 'Not Completed'}</p>
                    <p>
                      <strong>Client Status:</strong>
                      <select
                        value={clientStatuses[`${milestone._id}_${stepIndex}`] || 'Not Completed'}
                        onChange={(e) => handleStatusChange(milestone._id, stepIndex, e.target.value)}
                        className="ml-2 border rounded"
                      >
                        <option value="Not Completed">Not Completed</option>
                        <option value="Completed">Completed</option>


                      </select>
                                  <button
  // onClick={() => handleCompleteStep(proposalIndex, milestoneIndex, stepIndex)}
  className="bg-yellow-500 ml-5 text-white px-4 py-1 rounded mr-2 "
  onMouseDown={() => alert('This feature is coming soon. client will be able to see the  uploaded  Git commits, images, and videos by the developers. Stay tuned')}
  
>
  See proofs !
</button>
                      </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={handleSubmit}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Update Status
        </button>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 ml-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Back to Ongoing Proposals
        </button>
      </div>
    </div>
  );
};

export default ProposalDetails;
