// ClientSupport.js
import React, { useState } from "react";

const ClientSupportFormV2 = () => {
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    // Implement sending the message to support
    // You can use an API call to send messages to support
    // Reset the message input field after sending
    setMessage("");
  };

  return (
    <div className="p-4 border border-gray-300 rounded">
      <h2 className="text-lg font-semibold mb-4">Contact Support</h2>
      <textarea
        className="w-full p-2 border border-gray-300 rounded mb-2"
        placeholder="Type your message here..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
        onClick={handleSendMessage}
      >
        Send Message
      </button>
    </div>
  );
};

export default ClientSupportFormV2;
