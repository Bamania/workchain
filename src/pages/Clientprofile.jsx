import React from 'react';

const ClientProfile = ({ client }) => {
  return (
    <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6 mt-10">
      <div className="flex items-center space-x-4">
        <img
          className="w-24 h-24 rounded-full"
          src="https://via.placeholder.com/150"
          alt="Client Profile"
        />
        <div>
          <h2 className="text-2xl font-bold">{client.displayName}</h2>
          <p className="text-gray-500">{client.username}</p>
        </div>
      </div>
      <div className="mt-6">
        <h3 className="text-xl font-semibold">Organization</h3>
        <p className="text-gray-700">{client.organizationName}</p>
      </div>
    </div>
  );
};

export default ClientProfile;
