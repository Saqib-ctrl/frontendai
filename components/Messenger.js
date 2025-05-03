
import React, { useState } from 'react';

function Messenger() {
  const [form, setForm] = useState({
    sender_email: '', recipient_email: '', content: ''
  });
  const [thread, setThread] = useState([]);
  const [threadUsers, setThreadUsers] = useState({ user1: '', user2: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const send = async () => {
    await fetch('http://localhost:8000/messages/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    alert('Message sent');
  };

  const loadThread = async () => {
    const res = await fetch(`http://localhost:8000/messages/thread/${threadUsers.user1}/${threadUsers.user2}`);
    const data = await res.json();
    setThread(data);
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "1rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
      <h2>Messenger</h2>
      <input style={{ padding: "8px", border: "1px solid #ccc", borderRadius: "4px", width: "100%" }}" name="sender_email" placeholder="Sender" onChange={handleChange} />
      <input style={{ padding: "8px", border: "1px solid #ccc", borderRadius: "4px", width: "100%" }}" name="recipient_email" placeholder="Recipient" onChange={handleChange} />
      <textarea style={{ padding: "8px", border: "1px solid #ccc", borderRadius: "4px", width: "100%" }}" name="content" placeholder="Message" onChange={handleChange}></textarea>
      <button style={{ padding: "10px 16px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}" onClick={send}>Send Message</button>

      <h3>Thread</h3>
      <input style={{ padding: "8px", border: "1px solid #ccc", borderRadius: "4px", width: "100%" }}" placeholder="User 1" onChange={(e) => setThreadUsers({ ...threadUsers, user1: e.target.value })} />
      <input style={{ padding: "8px", border: "1px solid #ccc", borderRadius: "4px", width: "100%" }}" placeholder="User 2" onChange={(e) => setThreadUsers({ ...threadUsers, user2: e.target.value })} />
      <button style={{ padding: "10px 16px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}" onClick={loadThread}>Load Thread</button>
      <ul>
        {thread.map((msg) => (
          <li key={msg.id}><b>{msg.sender_email}</b>: {msg.content} ({msg.timestamp})</li>
        ))}
      </ul>
    </div>
  );
}

export default Messenger;
