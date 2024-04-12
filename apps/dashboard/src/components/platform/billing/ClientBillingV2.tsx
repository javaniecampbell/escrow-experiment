// ClientBilling.js
import useStore from "@/shared/clientStore";
import React, { useState, useEffect } from "react";

const ClientBillingV2 = () => {
  // const [billingHistory, setBillingHistory] = useState([]);
  const { billingHistory } = useStore();

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
            <th className="w-1/4 text-justify">Date</th>
            <th className="w-1/4 text-justify">Description</th>
            <th className="w-1/4 text-justify">Amount</th>
            <th className="w-1/4 text-justify">Status</th>
          </tr>
        </thead>
        <tbody>
          {billingHistory.map((entry) => (
            <tr key={entry.id}>
              <td className="text-justify">{entry.date}</td>
              <td className="text-justify">{entry.description}</td>
              <td className="text-justify">{entry.amount}</td>
              <td className="text-justify">{entry.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClientBillingV2;
