import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ModifyProposal = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [jobnewid, setJobnewid] = useState("");
  const [modifiedMilestones, setModifiedMilestones] = useState([]);

  useEffect(() => {
    const fetchProposalData = async () => {
      const token = sessionStorage.getItem('token');
      const proposalIds = location.state?.proposalIds;
     
      const jobid = location.state?.jobid;
      setJobnewid(proposalIds)
      console.log("jobid jo proposal id h actual mai id",jobid) 

        console.log("jo ongoing page se aai,ise use nahi krna h",proposalIds)
      if (!proposalIds || !token) {
        setError('No proposal IDs provided or token missing');
        alert('No proposal IDs provided or token missing');
        setLoading(false);
        return;
      }
//to get the proposal
      try {
        const token = sessionStorage.getItem('token');
        const response = await fetch('https://workchain.onrender.com/api/get-proposals', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({proposalIds}), // Send the selected proposal IDs
        });

        if (!response.ok) {
          throw new Error('Failed to fetch proposal data');
        }

        const data = await response.json();
        setProposals(data.proposals);
        setModifiedMilestones(data.proposals.map(proposal => proposal.milestones));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProposalData();
  }, [location.state]);

  const handleMilestoneChange = (proposalIndex, milestoneIndex, field, value) => {
    const newMilestones = [...modifiedMilestones];
    newMilestones[proposalIndex][milestoneIndex][field] = value;
    setModifiedMilestones(newMilestones);
  };

  const handleStepStatusChange = (proposalIndex, milestoneIndex, stepIndex, status) => {
    const newMilestones = [...modifiedMilestones];
    newMilestones[proposalIndex][milestoneIndex].steps[stepIndex].developerStatus = status;
    setModifiedMilestones(newMilestones);
  };

//   const handleCompleteStep = (proposalIndex, milestoneIndex, stepIndex) => {
//     handleStepStatusChange(proposalIndex, milestoneIndex, stepIndex, 'completed');
//   };

//   const handleIncompleteStep = (proposalIndex, milestoneIndex, stepIndex) => {
//     handleStepStatusChange(proposalIndex, milestoneIndex, stepIndex, 'incomplete');
//   };
  const handleStatusupdate=()=>{
    navigate("/statusupdate",{ state: { jobid: jobnewid } });
  }

//sent the jobid to the status update page

  const handleSubmit = async () => {
    const token = sessionStorage.getItem('token');
    
    console.log("Submitting modified milestones:", modifiedMilestones);
    try {
      const response = await fetch('https://workchain.onrender.com/api/updateproposal', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ proposals: proposals.map((proposal, index) => ({
          _id: proposal._id,
          milestones: modifiedMilestones[index]
        })) }), // Send modified milestones with their respective proposal IDs
      });

      if (!response.ok) {
        throw new Error('Failed to update proposal');
      }

      navigate('/ongoing-projects'); // Redirect to ongoing proposals page
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto bg-white shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6">Modify Proposals</h1>

        {proposals.length === 0 ? (
          <p>No proposals to modify.</p>
        ) : (
          proposals.map((proposal, proposalIndex) => (
            <div key={proposal._id} className="mb-6 border p-4 rounded-md">
              <h2 className="text-xl font-semibold mb-4">Proposal for Job ID: {proposal._id}</h2>
              {modifiedMilestones[proposalIndex].map((milestone, milestoneIndex) => (
                <div key={milestoneIndex} className="mb-6 p-4 border rounded-md">
                  <h3 className="text-lg font-semibold mb-2">Milestone {milestoneIndex + 1}</h3>
                  <input
                    type="text"
                    value={milestone.milestoneTitle}
                    onChange={(e) => handleMilestoneChange(proposalIndex, milestoneIndex, 'milestoneTitle', e.target.value)}
                    placeholder="Milestone Title"
                    className="block w-full mb-2 p-2 border rounded"
                  />
                  <textarea
                    value={milestone.milestoneDescription}
                    onChange={(e) => handleMilestoneChange(proposalIndex, milestoneIndex, 'milestoneDescription', e.target.value)}
                    placeholder="Milestone Description"
                    className="block w-full mb-2 p-2 border rounded"
                  />
                  <input
                    type="date"
                    value={milestone.startDate.substring(0, 10)}
                    onChange={(e) => handleMilestoneChange(proposalIndex, milestoneIndex, 'startDate', e.target.value)}
                    className="block w-full mb-2 p-2 border rounded"
                  />
                  <input
                    type="date"
                    value={milestone.endDate.substring(0, 10)}
                    onChange={(e) => handleMilestoneChange(proposalIndex, milestoneIndex, 'endDate', e.target.value)}
                    className="block w-full mb-2 p-2 border rounded"
                  />
                  <input
                    type="number"
                    value={milestone.income}
                    onChange={(e) => handleMilestoneChange(proposalIndex, milestoneIndex, 'income', e.target.value)}
                    placeholder="Income"
                    className="block w-full mb-2 p-2 border rounded"
                  />
                  {/* <div className="mt-4">
                    <h4 className="font-semibold">Steps:</h4>
                    {milestone.steps.map((step, stepIndex) => (
                      <div key={stepIndex} className="mb-2 p-2 border rounded-md">
                        <p><strong>Step {stepIndex + 1}:</strong> {step.stepTitle}</p>
                        <p><strong>Developer Status:</strong> {step.developerStatus || 'Not Completed'}</p>
                        <div className="mt-2">
                          <button
                            onClick={() => handleCompleteStep(proposalIndex, milestoneIndex, stepIndex)}
                            className="bg-green-500 text-white px-4 py-1 rounded mr-2 hover:bg-green-600"
                          >
                            Mark Step as Completed
                          </button>
                          <button
                            onClick={() => handleIncompleteStep(proposalIndex, milestoneIndex, stepIndex)}
                            className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                          >
                            Mark Step as Incomplete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div> */}
                </div>
              ))}
            </div>
          ))
        )}

        <button
          onClick={handleSubmit}
          className="mt-4 bg-blue-500 text-white px-4 py-2  hover:bg-blue-600"
        >
          Modify Proposals
        </button>
             <button  onClick={handleStatusupdate}
                  className="bg-green-500 text-white px-4 py-1 ml-2 hover:bg-green-600"
                 
                >
                  Upgrade Chain
                </button>
      </div>
    </div>
  );
};

export default ModifyProposal;
