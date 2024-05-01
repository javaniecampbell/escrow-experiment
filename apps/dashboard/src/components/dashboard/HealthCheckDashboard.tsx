import React, { useEffect, useState } from "react";
import { map, catchError, switchMap } from "rxjs/operators";
import { ajax } from "rxjs/ajax";
import { of, interval } from "rxjs";
import moment from "moment";

const HealthCheckDashboard = () => {
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

  const renderHealthCheckCard = (checkDetails: any) => {
    const { componentName, measurementName, details } = checkDetails;
    const title = `${componentName}${
      measurementName ? `: ${measurementName}` : ""
    }`;

    return (
      <div
        key={title}
        className="bg-white rounded-lg shadow-md p-6 text-gray-700"
      >
        <h3 className="text-lg font-semibold mb-2">{title}</h3>

        {Array.isArray(details) ? (
          details?.map((result: any, index: number) => {
            const key = Object.keys(result)[0];
            const detail = result[key][0].details;

            return (
              <div
                key={index}
                className={`p-4 rounded-md ${
                  detail.status === "pass"
                    ? "bg-green-100"
                    : detail.status === "warn"
                    ? "bg-yellow-100"
                    : "bg-red-100"
                }`}
              >
                {/* <pre>{JSON.stringify(detail)}</pre> */}
                <p>
                  Status:{" "}
                  <span
                    className={`font-semibold ${
                      detail.status === "pass"
                        ? "text-green-600"
                        : detail.status === "warn"
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                  >
                    {detail.status}
                  </span>
                </p>
                {detail.observedValue !== undefined && (
                  <p>
                    Observed Value: <span>{String(detail.observedValue)}</span>{" "}
                    - {detail.observedUnit}
                  </p>
                )}
                {detail.time && (
                  <p>
                    Time: {moment(detail.time).format("YYYY-MM-DD HH:mm:ss")}
                  </p>
                )}
                {detail.output && <p>Output: {detail.output}</p>}
              </div>
            );
          })
        ) : (
          <p>No checks performed</p>
        )}
      </div>
    );
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Health Check Dashboard</h1>
      {loading && <div className="text-center">Loading...</div>}
      {error && <div className="text-center text-red-600">{error}</div>}
      {healthCheckData && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Object.entries(healthCheckData.checks)
            .filter(Boolean)
            .map(([key, details]) => {
              const cards = [];
              for (const keyVal in details as any) {
                const data = [];
                data.push({ [keyVal]: (details as any)[keyVal] });
                const checkDetails = {
                  componentName: keyVal.split(":")[0],
                  measurementName: keyVal.split(":")[1] || null,
                  details: [...(data ?? [])],
                };
                cards.push(renderHealthCheckCard(checkDetails));
              }
              return cards;
            })}
        </div>
      )}
    </div>
  );
};

export default HealthCheckDashboard;
