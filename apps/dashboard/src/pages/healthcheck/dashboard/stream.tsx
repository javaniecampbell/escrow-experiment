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

const HealthCheckStream = ({healthCheckData: serverHealthCheckData}:Props) => {
  const [healthCheckData, setHealthCheckData] =
    useState<HealthCheckData | null | undefined>(serverHealthCheckData);
  const [overallStatus, setOverallStatus] = useState<string | null | undefined>(
    null
  );

  useEffect(() => {
    const eventSource = new EventSource(
      "http://localhost:3000/api/health/v3/spec/stream"
    );

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("Data received:", data);
      setHealthCheckData(data.data);

      if (event.type === "HEALTHY") {
        setOverallStatus("pass");
      } else if (event.type === "UNHEALTHY") {
        setOverallStatus("fail");
      } else {
        setOverallStatus("degraded");
      }
    };

    eventSource.addEventListener("error", (event) => {
      console.error("Error occurred:", event);
    });

    return () => {
      eventSource.close();
    };
  }, []);
  return (
    <div>
      <HealthCheckDashboard
        healthCheckData={healthCheckData}
        overallStatus={overallStatus}
      />
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

export default HealthCheckStream;
