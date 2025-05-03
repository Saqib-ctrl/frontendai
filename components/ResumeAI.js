
import React, { useState } from 'react';

function ResumeAI() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);
    setLoading(true);

    try {
      const response = await fetch('http://localhost:8000/analyze-resume-ai', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "1rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
      <h2>Resume Analysis</h2>
      <input style={{ padding: "8px", border: "1px solid #ccc", borderRadius: "4px", width: "100%" }}" type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button style={{ padding: "10px 16px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}" onClick={handleUpload} disabled={loading}>
        {loading ? 'Analyzing...' : 'Analyze Resume'}
      </button>

      {result && (
        <div style={{ maxWidth: "800px", margin: "0 auto", padding: "1rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
          <h3>Generated Bio:</h3>
          <p>{result.generated_bio}</p>
          <h4>Text Snippet:</h4>
          <pre>{result.extracted_text}</pre>
        </div>
      )}
    </div>
  );
}

export default ResumeAI;
