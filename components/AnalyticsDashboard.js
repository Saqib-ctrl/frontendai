
import React, { useEffect, useState } from 'react';

function AnalyticsDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/analytics/summary")
      .then((res) => res.json())
      .then(setStats);
  }, []);

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "1rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
      <h2>System Analytics</h2>
      {stats ? (
        <ul>
          <li>Total Candidates: {stats.total_candidates}</li>
          <li>Total Jobs: {stats.total_jobs}</li>
          <li>Total Applications: {stats.total_applications}</li>
          <li>Total Messages: {stats.total_messages}</li>
        </ul>
      ) : (
        <p>Loading stats...</p>
      )}
    </div>
  );
}

export default AnalyticsDashboard;
