import ClientProfile from "@/components/ClientProfile";
import ClientEditProfile from "@/components/ClientEditProfile";
import React from "react";
import ClientSettings from "@/components/ClientSettings";

function ClientProfilePage() {
  return (
    <div className="p-2">
      <h1 className="text-3xl font-semibold mb-4">Client Profile</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ClientProfile />
        <ClientEditProfile />
        <ClientSettings />
      </div>
    </div>
  );
}

export default ClientProfilePage;
