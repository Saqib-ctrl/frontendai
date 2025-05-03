
import React, { useState, useEffect } from 'react';

function AdminDashboard() {
  const [candidates, setCandidates] = useState([]);
  const [report, setReport] = useState(null);
  const [statusMap, setStatusMap] = useState({});

  useEffect(() => {
    fetch("http://localhost:8000/admin/candidates")
      .then((res) => res.json())
      .then(setCandidates);

    fetch("http://localhost:8000/admin/report")
      .then((res) => res.json())
      .then(setReport);
  }, []);

  const updateStatus = async (email, status) => {
    await fetch("http://localhost:8000/admin/candidates/update-status", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, status })
    });
    alert("Status updated");
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "1rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
      <h2>Admin Dashboard</h2>
      {report && (
        <div style={{ maxWidth: "800px", margin: "0 auto", padding: "1rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
          <p>Total Candidates: {report.total_candidates}</p>
          <p>Total Jobs: {report.total_jobs}</p>
          <p>Total Applications: {report.total_applications}</p>
        </div>
      )}

      <h3>Moderate Candidates</h3>
      <ul>
        {candidates.map((c) => (
          <li key={c.email}>
            {c.name} - {c.status}
            <select
              value={statusMap[c.email] || c.status}
              onChange={(e) =>
                setStatusMap({ ...statusMap, [c.email]: e.target.value })
              }
            >
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
            <button style={{ padding: "10px 16px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}" onClick={() => updateStatus(c.email, statusMap[c.email] || c.status)}>
              Update
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminDashboard;
