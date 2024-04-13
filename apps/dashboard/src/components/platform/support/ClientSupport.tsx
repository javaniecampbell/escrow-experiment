// ClientSupport.js
import React from "react";

const ClientSupport = () => {
  const supportEmail = "support@example.com";
  const supportPhone = "+1 (123) 456-7890";

  return (
    <div className="p-4 border border-gray-300 rounded">
      <h2 className="text-lg font-semibold mb-4">Support</h2>
      <div className="mb-4">
        <p className="text-md font-semibold">Email</p>
        <p className="text-blue-500 hover:underline">{supportEmail}</p>
      </div>
      <div className="mb-4">
        <p className="text-md font-semibold">Phone</p>
        <p className="text-blue-500 hover:underline">{supportPhone}</p>
      </div>
    </div>
  );
};

export default ClientSupport;
