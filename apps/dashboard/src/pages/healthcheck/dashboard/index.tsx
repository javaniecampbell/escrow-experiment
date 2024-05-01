import HealthCheckDashboard from "@/components/dashboard/HealthCheckDashboard";
import { HealthCheckData } from "@/shared/app.types";
import React, { useEffect, useState } from "react";
import { interval } from "rxjs";
import { map, catchError, switchMap } from "rxjs/operators";
import { fromFetch } from "rxjs/fetch";
import { ajax } from "rxjs/ajax";

type Props = {
  healthCheckData?: HealthCheckData | null;
};

const HealthCheckPage = ({
  healthCheckData: initialHealthCheckData,
}: Props) => {
  const [healthCheckData, setHealthCheckData] = useState(
    initialHealthCheckData
  );
  useEffect(() => {
    const subscription = interval(5000)
      .pipe(
        switchMap(() => ajax("http://localhost:3000/api/health/v3/spec")),
        map(
          (response) => response.response as HealthCheckData | null | undefined
        ),
        catchError((error) => {
          console.error("Error fetching health check data:", error);
          return [];
        })
      )
      .subscribe({
        next: (data) => {
          setHealthCheckData(data);
        },
      });

    return () => {
      subscription.unsubscribe();
    };
  }, []);
  return (
    <div>
      <HealthCheckDashboard healthCheckData={healthCheckData} />
    </div>
  );
};

export const getServerSideProps = async () => {
  try {
    const healthCheckData = await new Promise((resolve, reject) => {
      const subscription = fromFetch<HealthCheckData>(
        "http://localhost:3000/api/health/v3/spec",
        {
          selector: (response) => response.json(),
        }
      )
        .pipe(
          map((response) => response),
          catchError((error) => {
            reject(error);
            return [];
          })
        )
        .subscribe({
          next: (data) => {
            console.log("Data fetched:", data);
            resolve(data);
            subscription.unsubscribe();
          },
          error: (error) => {
            reject(error);
            subscription.unsubscribe();
          },
        });
    });

    return {
      props: {
        healthCheckData,
      },
    };
  } catch (error) {
    console.error("Error fetching health check data:", error);
    return {
      props: {
        healthCheckData: null,
      },
    };
  }
};

export default HealthCheckPage;
