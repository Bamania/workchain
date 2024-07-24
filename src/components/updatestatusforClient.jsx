import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const UpdateStatus = () => {
  const location = useLocation();
  const proposal = location.state?.proposal;
  const navigate = useNavigate();
  const [updatedProposal, setUpdatedProposal] = useState(proposal);

  const handleStatusChange = (milestoneIndex, stepIndex, status) => {
    const newProposal = { ...updatedProposal };
    newProposal.milestones[milestoneIndex].steps[stepIndex].clientStatus = status;
    setUpdatedProposal(newProposal);
  };

  const handleSubmit = async () => {
    // Save the updated proposal back to the server (you would need to implement this API)
    try {
      const response = await fetch(`http://localhost:5000/api/update-proposal/${updatedProposal._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ milestones: updatedProposal.milestones }),
      });

      if (!response.ok) {
        throw new Error('Failed to update proposal');
      }

      navigate("/viewdetails", { state: { proposal: updatedProposal } });
    } catch (error) {
      console.error(error);
    }
  };

  if (!updatedProposal) return <p>No proposal found</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto bg-white shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6">Update Status</h1>
        <h2 className="text-xl font-semibold mb-2">Proposal ID: {updatedProposal._id}</h2>

        <div className="mt-4">
          <h3 className="font-semibold">Milestones:</h3>
          {updatedProposal.milestones.map((milestone, milestoneIndex) => (
            <div key={milestoneIndex} className="mb-4 border p-4 rounded-md">
              <h4 className="text-lg font-semibold mb-2">Milestone {milestoneIndex + 1}</h4>
              <div className="mt-2">
                <h5 className="font-semibold">Steps:</h5>
                {milestone.steps.map((step, stepIndex) => (
                  <div key={stepIndex} className="mb-2 p-2 border rounded-md">
                    <p><strong>Step {stepIndex + 1}:</strong> {step.stepTitle}</p>
                    <p><strong>Developer Status:</strong> {step.developerStatus || 'Not Completed'}</p>
                    <div>
                      <label htmlFor={`clientStatus-${milestoneIndex}-${stepIndex}`} className="font-semibold">Client Status: </label>
                      <select
                        id={`clientStatus-${milestoneIndex}-${stepIndex}`}
                        value={step.clientStatus || ''}
                        onChange={(e) => handleStatusChange(milestoneIndex, stepIndex, e.target.value)}
                        className="ml-2 border rounded p-1"
                      >
                        <option value="">Select Status</option>
                        <option value="Not Started">Not Started</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={handleSubmit}
          className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Save Status
        </button>
      </div>
    </div>
  );
};

export default UpdateStatus;
