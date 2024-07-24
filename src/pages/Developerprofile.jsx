import React, { useEffect, useState } from 'react';

const DeveloperProfile = ({ username }) => {
  const [developer, setDeveloper] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDeveloper = async () => {
      try {
        const response = await fetch(`http:localhost:5000/api/developers/${username}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setDeveloper(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchDeveloper();
  }, [username]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!developer) {
    return <div>No developer data found</div>;
  }

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6 mt-10">
      <div className="flex items-center space-x-4">
        <img
          className="w-24 h-24 rounded-full"
          src="https://via.placeholder.com/150"
          alt="Developer Profile"
        />
        <div>
          <h2 className="text-2xl font-bold">{developer.displayName}</h2>
          <p className="text-gray-500">{developer.username}</p>
        </div>
      </div>
      <div className="mt-6">
        <h3 className="text-xl font-semibold">Skills</h3>
        <ul className="list-disc list-inside text-gray-700">
          {developer.skills.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DeveloperProfile;
