
import React, { useEffect, useState } from 'react';

function AuditLogViewer() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/logs/")
      .then(res => res.json())
      .then(setLogs);
  }, []);

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "1rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
      <h2>Audit Logs</h2>
      <ul>
        {logs.map(log => (
          <li key={log.id}>
            [{log.timestamp}] <b>{log.actor}</b> {log.action} <i>{log.target}</i>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AuditLogViewer;
