// ClientBilling.js
import { BillingHistoryEntry } from "@/shared/app.types";
import useStore, { useBillingStore } from "@/shared/clientStore";
import React, { useEffect } from "react";

const ClientBillingV2 = () => {
  // const [billingHistory, setBillingHistory] = useState([]);
  const { billingHistory } = useStore();
  const clientId = 1; // Replace with the actual client ID
  const fetchBillingEntries = useBillingStore(
    (state) => state.fetchBillingEntries
  );
  const deleteBillingEntry = useBillingStore(
    (state) => state.deleteBillingEntry
  );

  const handleDeleteBillingEntry = (
    selectedBillingEntry: BillingHistoryEntry
  ) => {
    if (!selectedBillingEntry) {
      // Handle the case when no billing entry is selected
      return;
    }

    // Call the deleteBillingEntry function to delete the selected billing entry
    deleteBillingEntry(selectedBillingEntry.id);
  };

  useEffect(() => {
    // Fetch and set the client's billing history
    // You can use an API call to retrieve billing data
    fetchBillingEntries(clientId);
  }, [clientId, fetchBillingEntries]);

  return (
    <div className="p-4 border border-gray-300 rounded">
      <h2 className="text-lg font-semibold mb-4">Billing & Payment History</h2>
      <table className="w-full table-fixed">
        <thead>
          <tr>
            <th scope="col" className="relative px-7 sm:w-12 sm:px-6">
              <input
                aria-label="checkbox"
                type="checkbox"
                className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
              />
            </th>
            <th className="w-1/4 text-justify">Date</th>
            <th className="w-1/4 text-justify">Description</th>
            <th className="w-1/4 text-justify">Amount</th>
            <th className="w-1/4 text-justify">Status</th>
            <th className="w-1/4 text-justify">Actions</th>
          </tr>
        </thead>
        <tbody>
          {billingHistory.map((entry) => (
            <tr key={entry.id}>
              <td className="text-justify">
                <input type="checkbox" aria-label="checkbox" />
              </td>
              <td className="text-justify">{entry.date?.toLocaleString()}</td>
              <td className="text-justify">{entry.description}</td>
              <td className="text-justify">{entry.amount}</td>
              <td className="text-justify">{entry.status}</td>
              <td className="text-justify">
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => handleDeleteBillingEntry(entry)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClientBillingV2;
