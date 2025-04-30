// src/components/platform/billing/AccountTopUp.tsx

import React, { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
const AccountTopUp = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [topUpAmount, setTopUpAmount] = useState(0);
  const [topUpError, setTopUpError] = useState<string | null>(null);

  const handleTopUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Implement account top-up logic here
    // This could involve updating the client's account balance
    try {
      // Make an API request to update the account balance
      // Example: Call an API endpoint to add funds to the client's account
      if (!stripe || !elements) {
        // Stripe.js hasn't yet loaded.
        // Make sure to disable form submission until Stripe.js has loaded.
        return;
      }

      const result = await stripe.confirmPayment({
        //`Elements` instance that was used to create the Payment Element
        elements,

        confirmParams: {
          payment_method_data: {
            metadata:{
              action: "topup",
            }
          },
          return_url: "https://example.com/order/123/complete",
        },
      });
      if (result.error) {
        // Show error to your customer (for example, insufficient funds)
        setTopUpError(result?.error?.message! ?? "Payment failed");
      } else {
        // Your customer will be redirected to your `return_url`. For some payment
        // methods like iDEAL, your customer will be redirected to an intermediate
        // site first to authorize the payment, then redirected to the `return_url`.
      }
      const response = await fetch("/api/topup", {
        method: "POST",
        body: JSON.stringify({ amount: topUpAmount }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        // Top-up successful, display a success message
        alert("Account top-up successful!");
      } else {
        // Top-up failed, display an error message
        alert("Account top-up failed. Please try again.");
      }
    } catch (error) {
      console.error("Top-up error:", error);
      alert("Account top-up failed. Please try again later.");
    }
  };

  return (
    <div>
      <h1>Account Top-Up</h1>
      <form onSubmit={handleTopUp}>
        <div>
          <input
            type="number"
            placeholder="Enter top-up amount"
            value={topUpAmount}
            onChange={(e) => setTopUpAmount(parseFloat(e.target.value))}
          />
        </div>
        
        <button type="submit">Top-Up Now</button>
      </form>
      {topUpError && <div>Error: {topUpError}</div>}
    </div>
  );
};

export default AccountTopUp;
