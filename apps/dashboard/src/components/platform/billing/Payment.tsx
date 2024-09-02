// src/components/platform/billing/Payment.tsx

import React, { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

const Payment = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  const handlePayment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Implement payment processing logic here
    // This could involve integrating with a payment gateway or wallet system
    try {
      // Make a payment request and handle the response
      if (!stripe || !elements) {
        // Stripe.js hasn't yet loaded.
        // Make sure to disable form submission until Stripe.js has loaded.
        return;
      }
      const result = await stripe.confirmPayment({
        //`Elements` instance that was used to create the Payment Element
        elements,
        confirmParams: {
          return_url: "https://example.com/order/123/complete",
        },
      });
      if (result.error) {
        // Show error to your customer (for example, insufficient funds)
        setPaymentError(result?.error?.message! ?? "Payment failed");
      } else {
        // Your customer will be redirected to your `return_url`. For some payment
        // methods like iDEAL, your customer will be redirected to an intermediate
        // site first to authorize the payment, then redirected to the `return_url`.
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment failed. Please try again later.");
    }
  };

  return (
    <div>
      <h1>Make a Payment</h1>
      <form onSubmit={handlePayment}>
        <div>
          <input
            type="number"
            placeholder="Enter payment amount"
            value={paymentAmount}
            onChange={(e) => setPaymentAmount(parseFloat(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor="card-element">Card Details:</label>
          <CardElement id="card-element" />
        </div>
        <button type="submit" disabled={!stripe}>
          Pay Now
        </button>
      </form>
      {paymentError && <div>Error: {paymentError}</div>}
    </div>
  );
};

export default Payment;
