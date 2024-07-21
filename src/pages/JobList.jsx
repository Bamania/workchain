import React, { useEffect, useState } from 'react';
import { FaCheckCircle, FaDollarSign, FaMapMarkerAlt, FaRegClock } from 'react-icons/fa';

const JobList = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/allprojects');
        const data = await response.json();
        setJobs(data);
      } catch (error) {
        console.error('Failed to fetch jobs:', error);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h2 className="text-3xl font-bold mb-6">Your Posted Jobs</h2>
      {jobs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <div key={job._id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold mb-2 text-green-600">{job.title}</h3>
                <span className="flex items-center text-gray-500 text-sm">
                  <FaRegClock className="mr-1" /> {new Date(job.createdAt).toLocaleString()}
                </span>
              </div>
              <p className="text-gray-700 mb-2"><strong>Skills Required:</strong> {job.skills}</p>
              <p className="text-gray-700 mb-2"><strong>Estimation:</strong> {job.estimation || 'N/A'}</p>
              <p className="text-gray-700 mb-2"><strong>Budget:</strong> {job.budget}</p>
              <p className="text-gray-700 mb-4"><strong>Description:</strong> {job.description}</p>
              <div>
                <h4 className="font-semibold mb-2 text-gray-800">Milestones:</h4>
                {job.milestones.map((milestone, index) => (
                  <div key={index} className="border-t border-gray-200 pt-2 mt-2">
                    <p className="text-gray-700"><strong>Description:</strong> {milestone.description}</p>
                    <p className="text-gray-700"><strong>Payment:</strong> {milestone.payment}</p>
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-center mt-4">
                <span className="flex items-center text-gray-500 text-sm">
                  <FaDollarSign className="mr-1" /> {job.budget}
                </span>
                <span className="flex items-center text-gray-500 text-sm">
                  <FaMapMarkerAlt className="mr-1" /> {job.location || 'N/A'}
                </span>
              </div>
              <div className="flex justify-between items-center mt-4">
                <span className="flex items-center text-gray-500 text-sm">
                  <FaCheckCircle className="mr-1" /> Payment verified
                </span>
                <span className="flex items-center text-gray-500 text-sm">
                  Proposals: {job.proposals || 'N/A'}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-700">You have not posted any jobs yet.</p>
      )}
    </div>
  );
};

export default JobList;
