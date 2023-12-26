import React from "react";

function ServiceAgreementPage() {
  return (
    <form
      action="http://localhost:3000/api/create-checkout-session"
      method="POST"
    >
      <input type="checkbox" id="agree" name="agree" required />
      <label htmlFor="agree">I agree to the Terms and Conditions</label>
      <button type="submit" className="bg-blue-500 text-white p-2">
        Proceed to Payment
      </button>
    </form>
  );
}

export default ServiceAgreementPage;
