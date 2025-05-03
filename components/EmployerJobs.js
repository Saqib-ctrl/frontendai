
import React, { useState } from 'react';

function EmployerJobs() {
  const [form, setForm] = useState({
    title: '', location: '', company: '', deadline: ''
  });
  const [job, setJob] = useState(null);
  const [jobs, setJobs] = useState([]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const postJob = async () => {
    const res = await fetch('http://localhost:8000/jobs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    const data = await res.json();
    setJob(data);
  };

  const fetchJobs = async () => {
    const res = await fetch('http://localhost:8000/jobs');
    const data = await res.json();
    setJobs(data);
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "1rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
      <h2>Post a Job</h2>
      {Object.keys(form).map((field) => (
        <input style={{ padding: "8px", border: "1px solid #ccc", borderRadius: "4px", width: "100%" }}" key={field} name={field} value={form[field]} onChange={handleChange} placeholder={field} />
      ))}
      <button style={{ padding: "10px 16px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}" onClick={postJob}>Submit Job</button>
      {job && <p>Posted: {job.title} - {job.description}</p>}

      <h2>All Jobs</h2>
      <button style={{ padding: "10px 16px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}" onClick={fetchJobs}>Load Jobs</button>
      <ul>
        {jobs.map(j => <li key={j.id}>{j.title} at {j.company} - {j.description}</li>)}
      </ul>
    </div>
  );
}

export default EmployerJobs;
