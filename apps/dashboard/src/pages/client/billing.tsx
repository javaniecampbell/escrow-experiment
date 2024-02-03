import ClientBilling from "@/components/ClientBilling";
import ClientBillingV2 from "@/components/ClientBillingV2";
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
