// YourComponent.js

import React, { useState } from "react";
import {useBillingStore} from "@/shared/clientStore"; // Import the billing store

const AddBillingEntryForm = () => {
  const [newBillingDescription, setNewBillingDescription] = useState("");
  const [newBillingAmount, setNewBillingAmount] = useState(0);
  const addBillingEntry = useBillingStore((state) => state.addBillingEntry);

  const handleAddBillingEntry = () => {
    // Create a new billing entry object with a unique ID
    const newBillingEntry = {
      id: Math.floor(Math.random() * 1000), // Generate a unique ID
      description: newBillingDescription,
      amount: newBillingAmount,
      clientId: 1, // Replace with the actual client ID
    };

    // Add the new billing entry to the store
    addBillingEntry(newBillingEntry);

    // Clear the input fields
    setNewBillingDescription("");
    setNewBillingAmount(0);
  };

  return (
    <div>
      <h2>Add Billing Entry</h2>
      <form>
        <input
          type="text"
          placeholder="Enter billing description"
          value={newBillingDescription}
          onChange={(e) => setNewBillingDescription(e.target.value)}
        />
        <input
          type="number"
          placeholder="Enter billing amount"
          value={newBillingAmount}
          onChange={(e) => setNewBillingAmount(parseFloat(e.target.value))}
        />
        <button onClick={handleAddBillingEntry}>Add Billing Entry</button>
      </form>
    </div>
  );
};

export default AddBillingEntryForm;
