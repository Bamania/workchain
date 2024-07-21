import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useHistory if you're using react-router

const FreelancherJobList = () => {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate(); // Initialize useHistory

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/allprojects'); // Replace with your API endpoint
        const data = await response.json();
        console.log(data);
        setJobs(data);
      } catch (error) {
        console.error('Failed to fetch jobs:', error);
      }
    };

    fetchJobs();
  }, []);

  const handleChatClick = (jobId) => {
    // Replace with actual chat page or modal
    navigate(`/chat/${jobId}`);
  };

  const handleApplyClick = (jobId) => {
    // Replace with actual application page or modal
    navigate(`/apply/${jobId}`);
  };

  return (
    <div className="max-w-6xl mx-auto p-8 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6">Available Jobs</h2>
      {jobs.length > 0 ? (
        <div className="grid grid-cols-1 gap-6">
          {jobs.map((job) => (
            <div key={job._id} className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-xl font-semibold">{job.title}</h3>
                  {/* <div className="text-gray-600">{job.location}</div> */}
                </div>
                <div className="text-right">
                  {/* <div className="text-sm text-gray-500">{job.date}</div> */}
                  <div className="text-gray-600">{job.budget}</div>
                </div>
              </div>
              <p className="text-gray-700 mb-4">{job.description}</p>
              <div className="flex flex-wrap gap-2">
                {/* {job.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-200 text-gray-800 text-sm rounded"
                  >
                    {skill}
                  </span>
                ))} */}
              </div>
              <div className="flex justify-between items-center mt-4">
                {/* <div className="text-gray-600">
                  {job.proposals.length} proposals
                </div> */}
                <div className="text-right">
                  {job.paymentVerified && (
                    <span className="text-green-500 font-semibold">Payment verified</span>
                  )}
                </div>
              </div>
              <div className="flex justify-end mt-4 space-x-4">
                <button 
                  onClick={() => handleChatClick(job._id)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Chat with the Client
                </button>
                <button 
                  onClick={() => handleApplyClick(job._id)}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                  Apply for It
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-700">No jobs available yet.</p>
      )}
    </div>
  );
};

export default FreelancherJobList;
