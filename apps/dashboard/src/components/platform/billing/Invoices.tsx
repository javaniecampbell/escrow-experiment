// src/components/platform/billing/Invoices.tsx

import React, { useState, useEffect } from "react";

const Invoices: React.FC = () => {
  // Define state variables for invoices
  const [invoices, setInvoices] = useState([]);

  // Fetch invoices from the backend
  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await fetch("/api/invoices"); // Implement this API endpoint
        if (response.ok) {
          const data = await response.json();
          setInvoices(data.invoices);
        } else {
          // Handle error
          console.error("Failed to fetch invoices");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    // Fetch invoices when the component mounts
    fetchInvoices();
  }, []);

  return (
    <div>
      <h2>Invoices</h2>
      <table>
        <thead>
          <tr>
            <th>Invoice Number</th>
            <th>Total Amount</th>
            <th>Status</th>
            {/* Add more columns as needed */}
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr key={invoice.id}>
              <td>{invoice.invoiceNo}</td>
              <td>{invoice.amount}</td>
              <td>{invoice.status}</td>
              {/* Add more columns as needed */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Invoices;
