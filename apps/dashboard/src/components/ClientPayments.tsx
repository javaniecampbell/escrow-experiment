// ClientPayments.js
import React, { useState } from 'react';

const ClientPayments = () => {
  const [payments, setPayments] = useState([
    {
      id: 1,
      date: '2023-02-15',
      amount: 1500,
      description: 'Payment for Website Redesign',
    },
    {
      id: 2,
      date: '2023-01-10',
      amount: 2500,
      description: 'Payment for E-commerce Platform',
    },
  ]);

  return (
    <div className="p-4 border border-gray-300 rounded">
      <h2 className="text-lg font-semibold mb-4">Payments</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Date</th>
            <th className="border border-gray-300 p-2">Description</th>
            <th className="border border-gray-300 p-2">Amount</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment.id}>
              <td className="border border-gray-300 p-2">{payment.date}</td>
              <td className="border border-gray-300 p-2">{payment.description}</td>
              <td className="border border-gray-300 p-2">${payment.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClientPayments;
