import React, { useState } from 'react';

const FreelancerForm = () => {
  const [profile, setProfile] = useState({
    workType: '',
    skillSet: '',
    title: '',
    education: '',
    languages: '',
    workExperience: '',
    bio: '',
    rate: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., send data to server or blockchain
    console.log(profile);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Freelancer Profile</h2>
      <div className="mb-6">
        <label className="block text-gray-600 text-sm font-medium mb-2">Kind of Work</label>
        <input
          type="text"
          name="workType"
          value={profile.workType}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:border-blue-500"
          required
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-600 text-sm font-medium mb-2">Skill Set</label>
        <input
          type="text"
          name="skillSet"
          value={profile.skillSet}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:border-blue-500"
          required
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-600 text-sm font-medium mb-2">Title of Work</label>
        <input
          type="text"
          name="title"
          value={profile.title}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:border-blue-500"
          required
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-600 text-sm font-medium mb-2">Education</label>
        <input
          type="text"
          name="education"
          value={profile.education}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:border-blue-500"
          required
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-600 text-sm font-medium mb-2">Languages</label>
        <input
          type="text"
          name="languages"
          value={profile.languages}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:border-blue-500"
          required
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-600 text-sm font-medium mb-2">Work Experience</label>
        <textarea
          name="workExperience"
          value={profile.workExperience}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:border-blue-500"
          rows="4"
          required
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-600 text-sm font-medium mb-2">Bio</label>
        <textarea
          name="bio"
          value={profile.bio}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:border-blue-500"
          rows="4"
          required
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-600 text-sm font-medium mb-2">Rate (per hour)</label>
        <input
          type="number"
          name="rate"
          value={profile.rate}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:border-blue-500"
          required
        />
      </div>
      <button type="submit" className="w-full py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300">
        Submit
      </button>
    </form>
  );
};

export default FreelancerForm;
