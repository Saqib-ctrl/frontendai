
import React, { useState } from 'react';

function JobDescriptionGenerator() {
  const [prompt, setPrompt] = useState('');
  const [output, setOutput] = useState('');

  const handleSubmit = async () => {
    const res = await fetch('http://127.0.0.1:8000/jobs/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    });
    const data = await res.json();
    setOutput(data.content);
  };

  return (
    <div className="max-w-xl mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-lg font-bold mb-2">Generate Job Description</h2>
      <textarea value={prompt} onChange={e => setPrompt(e.target.value)} className="mb-2 w-full border p-2" rows="4" />
      <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded">Generate</button>
      {output && <pre className="mt-4 whitespace-pre-wrap">{output}</pre>}
    </div>
  );
}

export default JobDescriptionGenerator;
