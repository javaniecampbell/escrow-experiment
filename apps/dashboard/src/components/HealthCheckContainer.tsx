import React, { useEffect, useState } from "react";
import { map, catchError, switchMap } from "rxjs/operators";
import { ajax } from "rxjs/ajax";
import { of, interval } from "rxjs";
import HealthCheckDashboard from "./dashboard/HealthCheckDashboard";
import { HealthCheckData } from "@/shared/app.types";

type Props = {};

const HealthCheckContainer = (props: Props) => {
  const [healthCheckData, setHealthCheckData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [overallStatus, setOverallStatus] = useState<string | null | undefined>(
    null
  );

  useEffect(() => {
    const subscription = interval(5000) // Emit a value every 5 seconds
      .pipe(
        switchMap(() => ajax("http://localhost:3000/api/health/v3/spec")),
        map(
          (response) => response.response as HealthCheckData | null | undefined
        ),
        catchError((error) => {
          setError(error.message);
          return of(null);
        })
      )
      .subscribe({
        next: (data) => {
          const status =
            data?.status === "pass"
              ? "pass"
              : data?.status === "fail"
              ? "fail"
              : "warn";
          setOverallStatus(status);
          setHealthCheckData(data as any);
          setLoading(false);
          setError(null);
        },
        error: (error) => {
          setError(error.message);
          setLoading(false);
        },
      });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // useEffect(() => {
  //   // if (healthCheckData) {
  //   const status = healthCheckData.checks.every((check: any) =>
  //     check.details.every((detail: any) => detail.status === "pass")
  //   )
  //     ? "pass"
  //     : healthCheckData.checks.some((check: any) =>
  //         check.details.some((detail: any) => detail.status === "fail")
  //       )
  //     ? "fail"
  //     : "degraded";
  //   setOverallStatus(status ?? "degraded");
  //   // }
  // }, [healthCheckData]);
  return (
    <HealthCheckDashboard
      healthCheckData={healthCheckData}
      loading={loading}
      error={error}
      overallStatus={overallStatus}
    />
  );
};

export default HealthCheckContainer;
