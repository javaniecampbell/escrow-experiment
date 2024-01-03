import React, { useState, useEffect } from "react";

const InitiatePaymentForm = () => {
  const [milestoneId, setMilestoneId] = useState("");
  const [milestones, setMilestones] = useState([]);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // Fetch milestones from the API and update the milestones state
    const fetchMilestones = async () => {
      try {
        const response = await fetch("/get-milestones"); // Replace with your API endpoint
        if (response.ok) {
          const data = await response.json();
          setMilestones(data.milestones);
        } else {
          console.error("Failed to fetch milestones");
        }
      } catch (error) {
        console.error("Error fetching milestones:", error);
      }
    };

    fetchMilestones();
  }, []);

  const handleMilestoneChange = (e) => {
    setMilestoneId(e.target.value);
  };

  const initiatePayment = async (e) => {
    e.preventDefault();

    try {
      // Call the payment initiation endpoint with the selected milestoneId
      const response = await fetch("/initiate-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ milestoneId }),
      });

      if (response.ok) {
        const data = await response.json();
        setClientSecret(data.clientSecret);
      } else {
        console.error("Failed to initiate payment");
      }
    } catch (error) {
      console.error("Error initiating payment:", error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Initiate Payment</h2>
      <form id="initiatePaymentForm" onSubmit={initiatePayment}>
        <div className="mb-4">
          <label
            htmlFor="milestoneId"
            className="block text-sm font-medium text-gray-700"
          >
            Select Milestone:
          </label>
          <select
            id="milestoneId"
            name="milestoneId"
            value={milestoneId}
            onChange={handleMilestoneChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          >
            <option value="">Select a Milestone</option>
            {milestones.map((milestone) => (
              <option key={milestone.id} value={milestone.id}>
                {milestone.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 border border-transparent rounded-md text-white font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Initiate Payment
          </button>
        </div>
      </form>
      {clientSecret && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded-md mt-4">
          Payment initiated successfully! Client Secret: {clientSecret}
        </div>
      )}
    </div>
  );
};

export default InitiatePaymentForm;
