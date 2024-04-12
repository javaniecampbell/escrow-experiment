import React from "react";
import ServiceAgreementForm from "./forms/ServiceAgreementForm";

function ServiceAgreementPage() {
  return (
    <div className="flex flex-col space-y-6 container">
      <h2 className="text-2xl font-semibold mb-4">Service Agreement</h2>
      <ServiceAgreementForm />
    </div>
  );
}

export default ServiceAgreementPage;
