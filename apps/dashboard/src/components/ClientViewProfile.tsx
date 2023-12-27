// ClientProfile.js
import React, { useState } from 'react';

const ClientViewProfile = () => {
  const [clientInfo, setClientInfo] = useState({
    name: 'John Doe',
    email: 'johndoe@example.com',
    phone: '+1 (123) 456-7890',
    company: 'ABC Corp',
    address: '123 Main St, City, Country',
  });

  const handleEdit = () => {
    // Implement edit functionality here
    // You can use state and form inputs to edit clientInfo
  };

  return (
    <div className="p-4 border border-gray-300 rounded">
      <h2 className="text-lg font-semibold mb-4">Profile</h2>
      <div className="mb-4">
        <p className="text-md font-semibold">Name</p>
        <p>{clientInfo.name}</p>
      </div>
      <div className="mb-4">
        <p className="text-md font-semibold">Email</p>
        <p>{clientInfo.email}</p>
      </div>
      <div className="mb-4">
        <p className="text-md font-semibold">Phone</p>
        <p>{clientInfo.phone}</p>
      </div>
      <div className="mb-4">
        <p className="text-md font-semibold">Company</p>
        <p>{clientInfo.company}</p>
      </div>
      <div className="mb-4">
        <p className="text-md font-semibold">Address</p>
        <p>{clientInfo.address}</p>
      </div>
      <button
        className="px-4 py-1 rounded bg-blue-500 text-white hover:bg-blue-600"
        onClick={handleEdit}
      >
        Edit Profile
      </button>
    </div>
  );
};

export default ClientViewProfile;
