import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMetaMask } from '../components/MetaMaskProvider';

const JobForm = () => {
  const [title, setTitle] = useState('');
  const [skills, setSkills] = useState('');
  const [estimation, setEstimation] = useState('');
  const [budget, setBudget] = useState('');
  const [description, setDescription] = useState('');
  const { account } = useMetaMask();
  const [milestones, setMilestones] = useState([{ description: '', payment: '' }]);
const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();

    const jobData = {
      title,
      skills,
      estimation,
      budget,
      description,
      milestones,
     
    };
    const token = sessionStorage.getItem('token') //getting back the token ! after clicking posting the job
    console.log("Jo login krte waqt saved hua",token);
    try {
      const response = await fetch('http://localhost:5000/api/job', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(jobData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Job posted successfully:', data);
        navigate("/allprojects")
        // Optionally reset the form or give user feedback
      } else {
        console.error('Failed to post job');
      }
    } catch (error) {
      console.error('Error posting job:', error);
    }
  };

  const handleMilestoneChange = (index, event) => {
    const { name, value } = event.target;
    const newMilestones = [...milestones];
    newMilestones[index][name] = value;
    setMilestones(newMilestones);
  };

  const addMilestone = () => {
    setMilestones([...milestones, { description: '', payment: '' }]);
  };

  const removeMilestone = (index) => {
    const newMilestones = milestones.filter((_, i) => i !== index);
    setMilestones(newMilestones);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-white p-8 rounded shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Post a Job</h2>
      <div className="mb-4">
        <label className="block text-gray-700">Job Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mt-2"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Skills Required</label>
        <input
          type="text"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mt-2"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Estimation of the Work (Optional)</label>
        <input
          type="text"
          value={estimation}
          onChange={(e) => setEstimation(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mt-2"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Budget</label>
        <input
          type="text"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mt-2"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Job Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mt-2"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Milestones</label>
        {milestones.map((milestone, index) => (
          <div key={index} className="mb-4">
            <input
              type="text"
              name="description"
              placeholder="Milestone Description"
              value={milestone.description}
              onChange={(e) => handleMilestoneChange(index, e)}
              className="w-full p-2 border border-gray-300 rounded mt-2"
              required
            />
            <input
              type="text"
              name="payment"
              placeholder="Milestone Payment"
              value={milestone.payment}
              onChange={(e) => handleMilestoneChange(index, e)}
              className="w-full p-2 border border-gray-300 rounded mt-2"
              required
            />
            <button
              type="button"
              onClick={() => removeMilestone(index)}
              className="mt-2 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700"
            >
              Remove Milestone
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addMilestone}
          className="mt-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Add Milestone
        </button>
      </div>
      <button type="submit" className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700">
        Submit
      </button>
    </form>
  );
};

export default JobForm;
