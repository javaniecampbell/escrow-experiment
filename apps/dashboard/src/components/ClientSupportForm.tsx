// ClientSupport.js
import React, { useState } from 'react';

const ClientSupportForm = () => {
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    // Implement sending a support message functionality here
    // You can use state and form inputs to send the message
  };

  return (
    <div className="p-4 border border-gray-300 rounded">
      <h2 className="text-lg font-semibold mb-4">Contact Support</h2>
      <textarea
        placeholder="Type your message here..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="border border-gray-300 p-2 rounded w-full h-32"
      />
      <button
        className="px-4 py-1 rounded bg-blue-500 text-white hover:bg-blue-600 mt-2"
        onClick={handleSendMessage}
      >
        Send Message
      </button>
    </div>
  );
};

export default ClientSupportForm;
