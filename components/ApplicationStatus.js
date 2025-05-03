
import React, { useState } from 'react';

function ApplicationStatus() {
  const [email, setEmail] = useState('');
  const [apps, setApps] = useState([]);

  const fetchStatus = async () => {
    const res = await fetch('http://localhost:8000/applications/' + email);
    const data = await res.json();
    setApps(data);
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "1rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
      <h2>Check Application Status</h2>
      <input style={{ padding: "8px", border: "1px solid #ccc", borderRadius: "4px", width: "100%" }}" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email" />
      <button style={{ padding: "10px 16px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}" onClick={fetchStatus}>Check</button>
      <ul>
        {apps.map((a) => (
          <li key={a.id}>Job #{a.job_id} — {a.status}</li>
        ))}
      </ul>
    </div>
  );
}

export default ApplicationStatus;
