
import React, { useState } from 'react';

function BlogGenerator() {
  const [form, setForm] = useState({ title: '', audience: '', purpose: '' });
  const [output, setOutput] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    const res = await fetch('http://127.0.0.1:8000/blogs/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    const data = await res.json();
    setOutput(data.content);
  };

  return (
    <div className="max-w-xl mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-lg font-bold mb-2">Generate Blog Post</h2>
      <input name="title" placeholder="Title" className="mb-2 w-full border p-2" onChange={handleChange} />
      <input name="audience" placeholder="Audience" className="mb-2 w-full border p-2" onChange={handleChange} />
      <input name="purpose" placeholder="Purpose" className="mb-2 w-full border p-2" onChange={handleChange} />
      <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded">Generate</button>
      {output && <pre className="mt-4 whitespace-pre-wrap">{output}</pre>}
    </div>
  );
}

export default BlogGenerator;
