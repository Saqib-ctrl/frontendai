
import React, { useState } from 'react';

function ContractGenerator() {
  const [form, setForm] = useState({
    candidate_name: '',
    job_title: '',
    company: '',
    salary: '',
    duration: ''
  });
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    const res = await fetch('http://127.0.0.1:8000/contracts/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    const data = await res.json();
    setResult(data.content);
    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto p-4 bg-white shadow rounded">
      <h2 className="text-lg font-bold mb-2">Generate Contract</h2>
      {Object.entries(form).map(([key, val]) => (
        <input
          key={key}
          className="mb-2 p-2 w-full border rounded"
          placeholder={key.replace('_', ' ')}
          name={key}
          value={val}
          onChange={handleChange}
        />
      ))}
      <button onClick={handleSubmit} disabled={loading} className="bg-blue-500 text-white px-4 py-2 rounded">
        {loading ? 'Generating...' : 'Generate'}
      </button>
      {result && <pre className="mt-4 whitespace-pre-wrap">{result}</pre>}
    </div>
  );
}

export default ContractGenerator;
