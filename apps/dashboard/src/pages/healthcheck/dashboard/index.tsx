import HealthCheckDashboard from "@/components/dashboard/HealthCheckDashboard";
import { HealthCheckData } from "@/shared/app.types";
import React, { useEffect, useState } from "react";

type Props = {
  healthCheckData: HealthCheckData;
};

const HealthCheckPage = ({ healthCheckData }: Props) => {
  return (
    <div>
      <HealthCheckDashboard healthCheckData={healthCheckData} />
    </div>
  );
};



export default HealthCheckPage;
