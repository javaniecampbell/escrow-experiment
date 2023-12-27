import React, { useState } from 'react';

const AddMilestoneForm = () => {
  const [milestoneName, setMilestoneName] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to add a new milestone
      const response = await fetch('/add-milestone', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ milestoneName, amount }),
      });

      const data = await response.json();
      console.log('Milestone added:', data);
      // You can redirect the user to another page or update the UI here
    } catch (error) {
      console.error('Error adding milestone:', error);
    }
  };

  return (
    <div className="p-4 border border-gray-300 rounded">
      <h2 className="text-lg font-semibold mb-2">Add a Milestone</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="milestoneName" className="block text-gray-700">Milestone Name:</label>
          <input
            type="text"
            id="milestoneName"
            className="w-full border border-gray-300 rounded p-2"
            required
            value={milestoneName}
            onChange={(e) => setMilestoneName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="amount" className="block text-gray-700">Amount:</label>
          <input
            type="number"
            id="amount"
            className="w-full border border-gray-300 rounded p-2"
            required
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Add Milestone
        </button>
      </form>
    </div>
  );
};

export default AddMilestoneForm;
