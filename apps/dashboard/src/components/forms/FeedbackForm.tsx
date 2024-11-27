// src/components/forms/FeedbackForm.tsx

import React, { useState } from "react";

const FeedbackForm: React.FC = () => {
  // Define state variables for form inputs
  const [description, setDescription] = useState<string>("");
  const [feedbackType, setFeedbackType] = useState<string>("bug");
  const [additionalIterations, setAdditionalIterations] =
    useState<boolean>(false);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prepare the feedback data as a JSON object
    const feedbackData = {
      description,
      feedbackType,
      additionalIterations,
    };

    // Send feedback data to the backend
    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(feedbackData),
      });

      if (response.ok) {
        // Feedback submission successful
        alert("Feedback submitted successfully!");
      } else {
        // Handle error
        alert("Failed to submit feedback. Please try again later.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h1>Submit Feedback</h1>
      <form onSubmit={handleSubmit}>
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
          <label htmlFor="feedbackType">Feedback Type:</label>
          <select
            id="feedbackType"
            value={feedbackType}
            onChange={(e) => setFeedbackType(e.target.value)}
          >
            <option value="bug">Bug</option>
            <option value="enhancement">Enhancement</option>
            <option value="changeRequest">Change Request</option>
          </select>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={additionalIterations}
              onChange={() => setAdditionalIterations(!additionalIterations)}
            />
            Additional Iterations Requested
          </label>
        </div>
        <button type="submit">Submit Feedback</button>
      </form>
    </div>
  );
};

export default FeedbackForm;
