function AutoRepliesSettings() {
    try {
        const [autoReplies, setAutoReplies] = React.useState([
            {
                id: 1,
                trigger: 'job application',
                message: 'Thank you for your interest! We will review your application and get back to you soon.',
                active: true
            },
            {
                id: 2,
                trigger: 'interview request',
                message: 'Thanks for reaching out! I am available for interviews. Please let me know your preferred time slots.',
                active: true
            }
        ]);
        const [newReply, setNewReply] = React.useState({ trigger: '', message: '', active: true });
        const [editing, setEditing] = React.useState(null);
        const [loading, setLoading] = React.useState(false);
        const [error, setError] = React.useState('');

        const handleSave = async (reply) => {
            setLoading(true);
            try {
                // Mock API call
                await new Promise(resolve => setTimeout(resolve, 500));
                
                if (editing) {
                    setAutoReplies(prev => prev.map(r => 
                        r.id === editing.id ? { ...reply, id: editing.id } : r
                    ));
                    setEditing(null);
                } else {
                    setAutoReplies(prev => [...prev, { ...reply, id: Date.now() }]);
                }
                setNewReply({ trigger: '', message: '', active: true });
            } catch (error) {
                setError('Failed to save auto-reply');
            } finally {
                setLoading(false);
            }
        };

        const handleDelete = async (id) => {
            try {
                // Mock API call
                await new Promise(resolve => setTimeout(resolve, 500));
                setAutoReplies(prev => prev.filter(r => r.id !== id));
            } catch (error) {
                setError('Failed to delete auto-reply');
            }
        };

        const handleToggle = async (id) => {
            try {
                setAutoReplies(prev => prev.map(r => 
                    r.id === id ? { ...r, active: !r.active } : r
                ));
            } catch (error) {
                setError('Failed to toggle auto-reply');
            }
        };

        return (
            <div data-name="auto-replies-settings" className="space-y-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-lg font-medium">Auto-Replies</h2>
                    <button style={{ padding: "10px 16px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}"
                        onClick={() => setEditing({})}
                        className="btn btn-primary"
                        disabled={editing !== null}
                    >
                        <i className="fas fa-plus mr-2"></i>
                        Add New
                    </button>
                </div>

                {error && <ErrorMessage message={error} />}

                {editing && (
                    <div className="bg-gray-50 p-4 rounded-lg border">
                        <h3 className="text-lg font-medium mb-4">
                            {editing.id ? 'Edit Auto-Reply' : 'New Auto-Reply'}
                        </h3>
                        <div className="space-y-4">
                            <div style={{ maxWidth: "800px", margin: "0 auto", padding: "1rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
                                <label className="block text-sm font-medium text-gray-700">Trigger Words/Phrases</label>
                                <input style={{ padding: "8px", border: "1px solid #ccc", borderRadius: "4px", width: "100%" }}"
                                    type="text"
                                    className="input-field mt-1"
                                    placeholder="e.g., job application, interview request"
                                    value={newReply.trigger}
                                    onChange={(e) => setNewReply({ ...newReply, trigger: e.target.value })}
                                />
                            </div>
                            <div style={{ maxWidth: "800px", margin: "0 auto", padding: "1rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
                                <label className="block text-sm font-medium text-gray-700">Auto-Reply Message</label>
                                <textarea style={{ padding: "8px", border: "1px solid #ccc", borderRadius: "4px", width: "100%" }}"
                                    className="input-field mt-1"
                                    rows="3"
                                    placeholder="Enter your auto-reply message..."
                                    value={newReply.message}
                                    onChange={(e) => setNewReply({ ...newReply, message: e.target.value })}
                                />
                            </div>
                            <div className="flex items-center">
                                <input style={{ padding: "8px", border: "1px solid #ccc", borderRadius: "4px", width: "100%" }}"
                                    type="checkbox"
                                    checked={newReply.active}
                                    onChange={(e) => setNewReply({ ...newReply, active: e.target.checked })}
                                    className="h-4 w-4 text-blue-600 rounded border-gray-300"
                                />
                                <label className="ml-2 text-sm text-gray-700">Active</label>
                            </div>
                            <div className="flex justify-end space-x-3">
                                <button style={{ padding: "10px 16px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}"
                                    onClick={() => {
                                        setEditing(null);
                                        setNewReply({ trigger: '', message: '', active: true });
                                    }}
                                    className="btn btn-secondary"
                                >
                                    Cancel
                                </button>
                                <button style={{ padding: "10px 16px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}"
                                    onClick={() => handleSave(newReply)}
                                    className="btn btn-primary"
                                    disabled={!newReply.trigger || !newReply.message}
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                <div className="space-y-4">
                    {autoReplies.map(reply => (
                        <div key={reply.id} className="bg-white p-4 rounded-lg border">
                            <div className="flex justify-between items-start">
                                <div className="flex-grow">
                                    <div className="flex items-center">
                                        <h4 className="font-medium">{reply.trigger}</h4>
                                        <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                                            reply.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                        }`}>
                                            {reply.active ? 'Active' : 'Inactive'}
                                        </span>
                                    </div>
                                    <p className="text-gray-600 mt-1">{reply.message}</p>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <button style={{ padding: "10px 16px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}"
                                        onClick={() => handleToggle(reply.id)}
                                        className={`text-sm ${reply.active ? 'text-green-600' : 'text-gray-600'}`}
                                    >
                                        <i className={`fas fa-toggle-${reply.active ? 'on' : 'off'}`}></i>
                                    </button>
                                    <button style={{ padding: "10px 16px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}"
                                        onClick={() => {
                                            setEditing(reply);
                                            setNewReply(reply);
                                        }}
                                        className="text-blue-600 hover:text-blue-800"
                                    >
                                        <i className="fas fa-edit"></i>
                                    </button>
                                    <button style={{ padding: "10px 16px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}"
                                        onClick={() => handleDelete(reply.id)}
                                        className="text-red-600 hover:text-red-800"
                                    >
                                        <i className="fas fa-trash"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    } catch (error) {
        console.error('AutoRepliesSettings render error:', error);
        reportError(error);
        return <ErrorMessage message="Failed to load auto-replies settings" />;
    }
}
