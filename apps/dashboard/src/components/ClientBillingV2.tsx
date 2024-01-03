// ClientBilling.js
import React, { useState, useEffect } from "react";

const ClientBillingV2 = () => {
  const [billingHistory, setBillingHistory] = useState([]);

  useEffect(() => {
    // Fetch and set the client's billing history
    // You can use an API call to retrieve billing data
  }, []);

  return (
    <div className="p-4 border border-gray-300 rounded">
      <h2 className="text-lg font-semibold mb-4">Billing & Payment History</h2>
      <table className="w-full table-fixed">
        <thead>
          <tr>
            <th className="w-1/4">Date</th>
            <th className="w-1/4">Description</th>
            <th className="w-1/4">Amount</th>
            <th className="w-1/4">Status</th>
          </tr>
        </thead>
        <tbody>
          {billingHistory.map((entry) => (
            <tr key={entry.id}>
              <td>{entry.date}</td>
              <td>{entry.description}</td>
              <td>{entry.amount}</td>
              <td>{entry.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClientBillingV2;
