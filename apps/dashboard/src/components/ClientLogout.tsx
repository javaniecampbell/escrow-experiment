// ClientLogout.js
import React from 'react';

const ClientLogout = () => {
  const handleLogout = () => {
    // Implement logout functionality here
    // You can clear client session and redirect to the login page
  };

  return (
    <div className="p-4 border border-gray-300 rounded">
      <button
        className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default ClientLogout;
