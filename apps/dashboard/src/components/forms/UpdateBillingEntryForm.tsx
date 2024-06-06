// YourComponent.js

import React, { useState } from "react";
import { useBillingStore } from "@/shared/clientStore"; // Import the billing store

const UpdateBillingEntryForm = () => {
  const [updatedBillingDescription, setUpdatedBillingDescription] =
    useState("");
  const [updatedBillingAmount, setUpdatedBillingAmount] = useState(0);
  const selectedBillingEntry = useBillingStore(
    (state) => state.selectedBillingEntry
  );
  const updateBillingEntry = useBillingStore(
    (state) => state.updateBillingEntry
  );

  const handleUpdateBillingEntry = () => {
    if (!selectedBillingEntry) {
      // Handle the case when no billing entry is selected
      return;
    }

    // Create an updated billing entry object
    const updatedBillingEntry = {
      ...selectedBillingEntry, // Keep existing properties
      description:
        updatedBillingDescription || selectedBillingEntry.description, // Update description if provided
      amount: updatedBillingAmount || selectedBillingEntry.amount, // Update amount if provided
    };

    // Call the updateBillingEntry function to update the selected billing entry
    updateBillingEntry(updatedBillingEntry);

    // Clear the input fields
    setUpdatedBillingDescription("");
    setUpdatedBillingAmount(0);
  };

  return (
    <div>
      <h2>Update Billing Entry</h2>
      {selectedBillingEntry ? (
        <div>
          <h3>Selected Billing Entry:</h3>
          <p>{selectedBillingEntry.description}</p>
          <p>Amount: ${selectedBillingEntry.amount}</p>
          <input
            type="text"
            placeholder="Enter updated description (optional)"
            value={updatedBillingDescription}
            onChange={(e) => setUpdatedBillingDescription(e.target.value)}
          />
          <input
            type="number"
            placeholder="Enter updated amount (optional)"
            value={updatedBillingAmount}
            onChange={(e) =>
              setUpdatedBillingAmount(parseFloat(e.target.value))
            }
          />
          <button onClick={handleUpdateBillingEntry}>
            Update Billing Entry
          </button>
        </div>
      ) : (
        <p>No billing entry selected.</p>
      )}
    </div>
  );
};

export default UpdateBillingEntryForm;
