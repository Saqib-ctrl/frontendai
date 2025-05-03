
import React, { useState } from 'react';

function EmailTemplateGen() {
  const [form, setForm] = useState({
    recipient_type: '', purpose: '', key_points: ''
  });
  const [emailContent, setEmailContent] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const generate = async () => {
    const res = await fetch("http://localhost:8000/emails/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    const data = await res.json();
    setEmailContent(data.content);
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "1rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
      <h2>AI Email Template Generator</h2>
      {Object.keys(form).map((field) => (
        <input style={{ padding: "8px", border: "1px solid #ccc", borderRadius: "4px", width: "100%" }}"
          key={field}
          name={field}
          value={form[field]}
          onChange={handleChange}
          placeholder={field}
        />
      ))}
      <button style={{ padding: "10px 16px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}" onClick={generate}>Generate Email</button>
      {emailContent && (
        <div style={{ maxWidth: "800px", margin: "0 auto", padding: "1rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
          <h3>Generated Email:</h3>
          <pre>{emailContent}</pre>
        </div>
      )}
    </div>
  );
}

export default EmailTemplateGen;
