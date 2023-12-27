// ClientBilling.js
import React from 'react';
import useStore from '@/shared/store';

const ClientBilling = () => {
  const { clientBillingHistory } = useStore();

  return (
    <div className="p-4 border border-gray-300 rounded">
      <h2 className="text-lg font-semibold mb-4">Billing & Payment History</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Date</th>
            <th className="border border-gray-300 p-2">Description</th>
            <th className="border border-gray-300 p-2">Amount</th>
          </tr>
        </thead>
        <tbody>
          {clientBillingHistory.map((entry) => (
            <tr key={entry.id}>
              <td className="border border-gray-300 p-2">{entry.date}</td>
              <td className="border border-gray-300 p-2">{entry.description}</td>
              <td className="border border-gray-300 p-2">${entry.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClientBilling;
