// ClientFeedback.js
import React, { useState } from "react";

type ClientFeedbackProps = {
  projectId: string;

};

const ClientFeedback = ({ projectId }:ClientFeedbackProps) => {
  const [feedback, setFeedback] = useState("");

  const handleSubmitFeedback = () => {
    // Implement submitting feedback functionality here
    // You can use state and form inputs to submit the feedback
  };

  return (
    <div className="p-4 border border-gray-300 rounded">
      <h2 className="text-lg font-semibold mb-4">Provide Feedback</h2>
      <textarea
        placeholder="Type your feedback here..."
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        className="border border-gray-300 p-2 rounded w-full h-32"
      />
      <button
        className="px-4 py-1 rounded bg-blue-500 text-white hover:bg-blue-600 mt-2"
        onClick={handleSubmitFeedback}
      >
        Submit Feedback
      </button>
    </div>
  );
};

export default ClientFeedback;
