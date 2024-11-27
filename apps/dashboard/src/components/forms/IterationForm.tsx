// src/components/forms/IterationForm.tsx

import React, { useState } from "react";

const IterationForm: React.FC = () => {
  // Define state variables for form inputs
  const [feedbackId, setFeedbackId] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [status, setStatus] = useState<string>("pending");

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prepare the iteration data as a JSON object
    const iterationData = {
      feedbackId,
      description,
      status,
    };

    // Send iteration data to the backend
    try {
      const response = await fetch("/api/iteration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(iterationData),
      });

      if (response.ok) {
        // Iteration submission successful
        alert("Iteration submitted successfully!");
      } else {
        // Handle error
        alert("Failed to submit iteration. Please try again later.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h2>Submit Iteration</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="feedbackId">Feedback ID:</label>
          <input
            type="text"
            id="feedbackId"
            value={feedbackId}
            onChange={(e) => setFeedbackId(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="status">Status:</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <button type="submit">Submit Iteration</button>
      </form>
    </div>
  );
};

export default IterationForm;
