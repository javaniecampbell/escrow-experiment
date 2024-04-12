import ClientBilling from "@/components/platform/billing/ClientBilling";
import ClientBillingV2 from "@/components/platform/billing/ClientBillingV2";
import React from "react";

function BillingPage() {
  return (
    <div>
      <ClientBilling />
      <ClientBillingV2 />
    </div>
  );
}

export default BillingPage;
