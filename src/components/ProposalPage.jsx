import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ProposalPage = () => {
    const navigate=useNavigate();
    const location = useLocation();
  const { job } = location.state || {}; //state passed while navigating to this page!

  console.log(job);
  const [milestones, setMilestones] = useState([
    { title: '', description: '', startDate: '', endDate: '', income: '', steps: [''] },
  ]);

  const addMilestone = () => {
    setMilestones([...milestones, { title: '', description: '', startDate: '', endDate: '', income: '', steps: [''] }]);
  };

  const removeMilestone = (index) => {
    const newMilestones = milestones.filter((_, i) => i !== index);
    setMilestones(newMilestones);
  };

  const handleMilestoneChange = (index, field, value) => {
    const newMilestones = [...milestones];
    newMilestones[index][field] = value;
    setMilestones(newMilestones);
  };

  const handleStepChange = (milestoneIndex, stepIndex, value) => {
    const newMilestones = [...milestones];
    newMilestones[milestoneIndex].steps[stepIndex] = value;
    setMilestones(newMilestones);
  };

  const addStep = (milestoneIndex) => {
    const newMilestones = [...milestones];
    newMilestones[milestoneIndex].steps.push('');
    setMilestones(newMilestones);
  };

  const removeStep = (milestoneIndex, stepIndex) => {
    const newMilestones = [...milestones];
    newMilestones[milestoneIndex].steps.splice(stepIndex, 1);
    setMilestones(newMilestones);

 
  
  };

  //to send the data to the backend server

  const handleSendProposal = async () => {
    const token = sessionStorage.getItem('token') 
    const username=sessionStorage.getItem('developerUsername')
    console.log("username",username)

    const proposalData = {
        developerUsername: username|| 'defaultUsername', // Use a default or fetched value
        jobId: job._id,
        milestones: milestones.map(milestone => ({
        milestoneTitle: milestone.title,
          milestoneDescription: milestone.description,
          startDate: milestone.startDate,
          endDate: milestone.endDate,
          income: parseFloat(milestone.income), // Ensure income is a number
          steps: milestone.steps.map(step => ({
            stepTitle: step,
          
          }))
        }))
      };
      console.log(proposalData)

    try {
      const response = await fetch('http://localhost:5000/api/submit-proposal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(proposalData),
      });
  
      const result = await response.json();
      if (response.ok) {
          console.log('Proposal sent successfully:', result);
          navigate("/getProposal")
      
      } else {
        console.error('Failed to send proposal:', result);
      }
    } catch (error) {
      console.error('Error sending proposal:', error);
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto bg-white shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6">Proposal Page</h1>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Original Project</h2>
          <div className="border p-4 rounded-md bg-gray-50">
          {job.description}
          </div>
        </div>

        {milestones.map((milestone, milestoneIndex) => (
          <div key={milestoneIndex} className="mb-6 border p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Milestone {milestoneIndex + 1}</h2>
              <div>
                <button
                  className="bg-blue-500 text-white px-3 py-1 ml-2 hover:bg-blue-600"
                  onClick={() => removeMilestone(milestoneIndex)}
                >
                  Remove Milestone
                </button>
                
              </div>
            </div>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Milestone Title"
                value={milestone.title}
                onChange={(e) => handleMilestoneChange(milestoneIndex, 'title', e.target.value)}
                className="w-full p-2 border mb-2"
              />
              <textarea
                placeholder="Milestone Description"
                value={milestone.description}
                onChange={(e) => handleMilestoneChange(milestoneIndex, 'description', e.target.value)}
                className="w-full p-2 border mb-2"
              />
              <div className="grid grid-cols-2 gap-4 mb-2">
                <input
                  type="date"
                  placeholder="Start Date"
                  value={milestone.startDate}
                  onChange={(e) => handleMilestoneChange(milestoneIndex, 'startDate', e.target.value)}
                  className="w-full p-2 border"
                />
                <input
                  type="date"
                  placeholder="End Date"
                  value={milestone.endDate}
                  onChange={(e) => handleMilestoneChange(milestoneIndex, 'endDate', e.target.value)}
                  className="w-full p-2 border"
                />
              </div>
              <div className="relative">
                <input
                  type="number"
                  placeholder="Income (ETH)"
                  value={milestone.income}
                  onChange={(e) => handleMilestoneChange(milestoneIndex, 'income', e.target.value)}
                  className="w-full p-2 border pr-12"
                />
                <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500">ETH</span>
              </div>
            </div>

            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Steps</h3>
              {milestone.steps.map((step, stepIndex) => (
                <div key={stepIndex} className="flex items-center mb-2">
                  <input
                    type="text"
                    placeholder="Step Description"
                    value={step}
                    onChange={(e) => handleStepChange(milestoneIndex, stepIndex, e.target.value)}
                    className="w-full p-2 border"
                  />
                  <button
                    className="bg-red-500 text-white px-3 py-1 ml-2 hover:bg-red-600"
                    onClick={() => removeStep(milestoneIndex, stepIndex)}
                  >
                    Remove Step
                  </button>
                </div>
              ))}
              <button
                className="bg-blue-500 text-white px-3 py-1 hover:bg-blue-600"
                onClick={() => addStep(milestoneIndex)}
              >
                Add Step
              </button>
            </div>
          </div>
        ))}

        <button
          className="bg-green-500 text-white px-4 py-2 hover:bg-green-600"
          onClick={addMilestone}
        >
          Add Milestone
        </button>
      </div>
      <button 
        onClick={handleSendProposal} 
        className="mt-4 bg-blue-500 text-white px-4 py-2  rounded hover:bg-blue-600"
      >
        Send Proposal
      </button>
    </div>
  );
};

export default ProposalPage;
