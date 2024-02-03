import ClientFeedback from "@/components/ClientFeedback";
import ClientSupport from "@/components/ClientSupport";
import ClientSupportForm from "@/components/ClientSupportForm";
import ClientSupportFormV2 from "@/components/ClientSupportFormV2";
import React from "react";

function ClientSupportPage() {
  return (
    <div className="p-2">
      <h1 className="text-3xl font-semibold mb-4">Support</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ClientSupport />
        <ClientFeedback />
      </div>
    </div>
  );
}

export default ClientSupportPage;
