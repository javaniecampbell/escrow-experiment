import React, { useEffect, useState } from "react";
import { map, catchError, switchMap } from "rxjs/operators";
import { ajax } from "rxjs/ajax";
import { of, interval } from "rxjs";
import HealthCheckDashboard from "./dashboard/HealthCheckDashboard";

type Props = {};

const HealthCheckContainer = (props: Props) => {
  const [healthCheckData, setHealthCheckData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const subscription = interval(5000) // Emit a value every 5 seconds
      .pipe(
        switchMap(() => ajax("http://localhost:3000/api/health/v3/spec")),
        map((response) => response.response),
        catchError((error) => {
          setError(error.message);
          return of(null);
        })
      )
      .subscribe({
        next: (data) => {
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
  return (
    <HealthCheckDashboard
      healthCheckData={healthCheckData}
      loading={loading}
      error={error}
    />
  );
};

export default HealthCheckContainer;
