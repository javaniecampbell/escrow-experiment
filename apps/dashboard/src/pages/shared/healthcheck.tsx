import React, { useEffect, useState } from "react";

type Props = {};

const HealthCheckPage = (props: Props) => {
  const [data, setData] = useState(null);
  const [isBackendHealthy, setIsBackendHealthy] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/health");
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error("Error fetching data", { error });
        setIsBackendHealthy(false);
      }
    };

    fetchData();
  }, []);
  return (
    <div>
      {isBackendHealthy ? (
        <div>
          {/* Render data */}
          {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
        </div>
      ) : (
        <div>
          <p>The backend is not healthy. Please try again later.</p>
        </div>
      )}
    </div>
  );
};

export default HealthCheckPage;
