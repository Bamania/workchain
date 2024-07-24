import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CompletedProjects = () => {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch completed projects from the API
    const fetchProjects = async () => {
      try {
        const response = await fetch('https://workchain.onrender.com/api/completedProposals');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProjects(data);
        console.log("data being set to projects that are completed !",data)
      } catch (error) {
        console.error('Error fetching completed projects:', error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto bg-white shadow-md p-6 rounded-lg">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800 transition duration-300"
        >
          Go Back to Home Page
        </button>
        <h1 className="text-3xl font-bold mb-6 text-center">Completed Projects</h1>

        {projects.length === 0 ? (
          <p className="text-center text-gray-500">No completed projects found.</p>
        ) : (
          projects.map((project) => (
            <div key={project._id} className="mb-6 border p-4 rounded-lg flex items-center bg-green-50">
              <div className="mr-4">
                <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-1">Project ID: {project._id}</h2>
                {/* <p><strong>Title:</strong> {project.title || 'No Title'}</p>
                <p><strong>Description:</strong> {project.description || 'No Description'}</p> */}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CompletedProjects;
