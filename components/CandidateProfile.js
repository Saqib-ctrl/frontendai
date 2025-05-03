
import React, { useState } from 'react';

function CandidateProfile() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', location: '', skills: '', experience: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:8000/candidate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      setMessage('Profile saved for ' + data.name);
    } catch (err) {
      setMessage('Error saving profile');
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "1rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
      <h2>Candidate Profile</h2>
      {Object.keys(form).map((field) => (
        <input style={{ padding: "8px", border: "1px solid #ccc", borderRadius: "4px", width: "100%" }}"
          key={field}
          name={field}
          placeholder={field}
          value={form[field]}
          onChange={handleChange}
        />
      ))}
      <button style={{ padding: "10px 16px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}" onClick={handleSubmit}>Save Profile</button>
      <p>{message}</p>
    </div>
  );
}

export default CandidateProfile;
