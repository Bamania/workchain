import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useHistory if you're using react-router

const FreelancherJobList = () => {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate(); // Initialize useHistory

  useEffect(() => {
    const fetchJobs = async () => {
      const token = sessionStorage.getItem('token'); // Retrieve the token from session storage

      try {
        const response = await fetch('https://workchain.onrender.com/api/allprojects', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Pass the token in the Authorization header
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

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

  const handleApply = async (job) => {
    console.log("handleApply mai jo passs hua",job)
    const token = sessionStorage.getItem('token');

    try {
      const response = await fetch(`https://workchain.onrender.com/api/apply/${job._id}`, { // developer applying for job 1 ! can be distinguished using job Id
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ job }) // ASSUMING THE ID of the developer here
      });
      const data = await response.json();
     
      console.log('data from the backend',data);

      // Navigate to /createProposal and pass job data as state
      navigate('/createProposal', { state: { job } });

    } catch (error) {
      console.error('Failed to apply for job:', error);
    }
  };
  const handleViewOngoingProjects = () => {
    navigate('/ongoing-projects');
  };

  const handleViewCompletedProjects = () => {
    navigate('/completed-projects');
    
  };
  const handleViewAllProjects = () => {
    navigate('/getProposal');
    
  };
  return (
    <div className="max-w-6xl mx-auto p-8 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6">Available Jobs</h2>
      
      {/* Buttons for Ongoing and Completed Projects */}
      <div className="mb-6 flex gap-4 justify-end">
        <button
          onClick={handleViewOngoingProjects}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300"
        >
          See Ongoing Projects
        </button>
        <button
          onClick={handleViewCompletedProjects}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-300"
        >
          See Completed Projects
        </button>
        <button
          onClick={handleViewAllProjects}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-300"
        >
          see all proposals
        </button>
      </div>

      {jobs.length > 0 ? (
        <div className="grid grid-cols-1 gap-6">
          {jobs.map((job) => (
            <div key={job._id} className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-xl font-semibold">{job.title}</h3>
                </div>
                <div className="text-right">
                  <div className="text-gray-600">{job.budget}</div>
                </div>
              </div>
              <p className="text-gray-700 mb-4">{job.description}</p>
              <div className="flex flex-wrap gap-2">
                {/* Optional skills display */}
              </div>
              <div className="flex justify-between items-center mt-4">
                <div className="text-right">
                  {job.paymentVerified && (
                    <span className="text-green-500 font-semibold">Payment verified</span>
                  )}
                </div>
              </div>
              <div className="flex justify-end mt-4 space-x-4">
                <button
                  onClick={() => handleChatClick(job._id)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300"
                >
                  Chat with the Client
                </button>
                <button
                  onClick={() => handleApply(job)}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-300"
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
