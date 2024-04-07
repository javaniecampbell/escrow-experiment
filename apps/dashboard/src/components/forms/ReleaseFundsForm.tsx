import React, { useState, useEffect } from "react";

const ReleaseFundsForm = () => {
  const [completedMilestoneId, setCompletedMilestoneId] = useState("");
  const [completedMilestones, setCompletedMilestones] = useState([]);

  useEffect(() => {
    // Fetch completed milestones from the API and update the completedMilestones state
    const fetchCompletedMilestones = async () => {
      try {
        const response = await fetch("/get-completed-milestones");
        const data = await response.json();
        setCompletedMilestones(data);
      } catch (error) {
        console.error("Error fetching completed milestones:", error);
      }
    };

    fetchCompletedMilestones();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to release funds for the selected completed milestone
      const response = await fetch("/release-funds", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ completedMilestoneId }),
      });

      const data = await response.json();
      console.log("Funds released:", data);
      // You can redirect the user to another page or update the UI here
    } catch (error) {
      console.error("Error releasing funds:", error);
    }
  };

  return (
    <div className="p-4 border border-gray-300 rounded">
      <h2 className="text-lg font-semibold mb-2">Release Funds</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="completedMilestoneId" className="block text-gray-700">
            Select Completed Milestone:
          </label>
          <select
            id="completedMilestoneId"
            className="w-full border border-gray-300 rounded p-2"
            required
            value={completedMilestoneId}
            onChange={(e) => setCompletedMilestoneId(e.target.value)}
          >
            <option value="" disabled>
              Select a completed milestone
            </option>
            {completedMilestones.map((milestone) => (
              <option key={milestone.id} value={milestone.id}>
                {milestone.milestoneName}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Release Funds
        </button>
      </form>
    </div>
  );
};

export default ReleaseFundsForm;
