function JobPostingModal({ job, onClose, onSubmit, isEditing = false }) {
    try {
        const [formData, setFormData] = React.useState({
            title: job?.title || '',
            company: job?.company || '',
            location: job?.location || '',
            type: job?.type || 'Full-time',
            minExperience: job?.minExperience || '',
            maxExperience: job?.maxExperience || '',
            salary: job?.salary || '',
            skills: job?.skills || [],
            description: job?.description || '',
            requirements: job?.requirements || '',
            responsibilities: job?.responsibilities || '',
            benefits: job?.benefits || ''
        });
        const [loading, setLoading] = React.useState(false);
        const [error, setError] = React.useState('');

        const handleSubmit = async (e) => {
            e.preventDefault();
            setLoading(true);
            setError('');

            try {
                // Validate form data
                if (!formData.title || !formData.company || !formData.location) {
                    throw new Error('Please fill in all required fields');
                }

                if (!formData.skills.length) {
                    throw new Error('Please add at least one required skill');
                }

                // Convert skills from string to array if needed
                const processedData = {
                    ...formData,
                    skills: typeof formData.skills === 'string' 
                        ? formData.skills.split(',').map(s => s.trim()) 
                        : formData.skills,
                    createdAt: new Date().toISOString(),
                    status: 'active'
                };

                await onSubmit(processedData);
                onClose();
            } catch (error) {
                setError(error.message || 'Failed to save job posting');
            } finally {
                setLoading(false);
            }
        };

        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
                    <div className="border-b border-gray-200 px-6 py-4 flex justify-between items-center">
                        <h2 className="text-xl font-semibold">
                            {isEditing ? 'Edit Job Post' : 'Post New Job'}
                        </h2>
                        <button style={{ padding: "10px 16px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}" onClick={onClose} className="text-gray-400 hover:text-gray-500">
                            <i className="fas fa-times"></i>
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6">
                        {error && <ErrorMessage message={error} />}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div style={{ maxWidth: "800px", margin: "0 auto", padding: "1rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
                                <label className="block text-gray-700 mb-2">Job Title</label>
                                <input style={{ padding: "8px", border: "1px solid #ccc", borderRadius: "4px", width: "100%" }}"
                                    type="text"
                                    className="input-field"
                                    value={formData.title}
                                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                                    placeholder="e.g. Senior Software Engineer"
                                    required
                                />
                            </div>

                            <div style={{ maxWidth: "800px", margin: "0 auto", padding: "1rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
                                <label className="block text-gray-700 mb-2">Company Name</label>
                                <input style={{ padding: "8px", border: "1px solid #ccc", borderRadius: "4px", width: "100%" }}"
                                    type="text"
                                    className="input-field"
                                    value={formData.company}
                                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                                    placeholder="e.g. Tech Corp"
                                    required
                                />
                            </div>

                            <div style={{ maxWidth: "800px", margin: "0 auto", padding: "1rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
                                <label className="block text-gray-700 mb-2">Location</label>
                                <input style={{ padding: "8px", border: "1px solid #ccc", borderRadius: "4px", width: "100%" }}"
                                    type="text"
                                    className="input-field"
                                    value={formData.location}
                                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                                    placeholder="e.g. San Francisco, CA (or Remote)"
                                    required
                                />
                            </div>

                            <div style={{ maxWidth: "800px", margin: "0 auto", padding: "1rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
                                <label className="block text-gray-700 mb-2">Job Type</label>
                                <select
                                    className="input-field"
                                    value={formData.type}
                                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                                    required
                                >
                                    <option value="Full-time">Full Time</option>
                                    <option value="Part-time">Part Time</option>
                                    <option value="Contract">Contract</option>
                                    <option value="Internship">Internship</option>
                                    <option value="Remote">Remote</option>
                                </select>
                            </div>

                            <div style={{ maxWidth: "800px", margin: "0 auto", padding: "1rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
                                <label className="block text-gray-700 mb-2">Experience Range (Years)</label>
                                <div className="grid grid-cols-2 gap-4">
                                    <input style={{ padding: "8px", border: "1px solid #ccc", borderRadius: "4px", width: "100%" }}"
                                        type="number"
                                        className="input-field"
                                        value={formData.minExperience}
                                        onChange={(e) => setFormData({...formData, minExperience: e.target.value})}
                                        placeholder="Minimum"
                                        min="0"
                                        required
                                    />
                                    <input style={{ padding: "8px", border: "1px solid #ccc", borderRadius: "4px", width: "100%" }}"
                                        type="number"
                                        className="input-field"
                                        value={formData.maxExperience}
                                        onChange={(e) => setFormData({...formData, maxExperience: e.target.value})}
                                        placeholder="Maximum"
                                        min="0"
                                        required
                                    />
                                </div>
                            </div>

                            <div style={{ maxWidth: "800px", margin: "0 auto", padding: "1rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
                                <label className="block text-gray-700 mb-2">Salary Range</label>
                                <input style={{ padding: "8px", border: "1px solid #ccc", borderRadius: "4px", width: "100%" }}"
                                    type="text"
                                    className="input-field"
                                    value={formData.salary}
                                    onChange={(e) => setFormData({...formData, salary: e.target.value})}
                                    placeholder="e.g. $80,000 - $100,000"
                                    required
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-gray-700 mb-2">Required Skills</label>
                                <input style={{ padding: "8px", border: "1px solid #ccc", borderRadius: "4px", width: "100%" }}"
                                    type="text"
                                    className="input-field"
                                    value={Array.isArray(formData.skills) ? formData.skills.join(', ') : formData.skills}
                                    onChange={(e) => setFormData({
                                        ...formData,
                                        skills: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                                    })}
                                    placeholder="e.g. JavaScript, React, Node.js (comma separated)"
                                    required
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-gray-700 mb-2">Job Description</label>
                                <textarea style={{ padding: "8px", border: "1px solid #ccc", borderRadius: "4px", width: "100%" }}"
                                    className="input-field"
                                    rows="4"
                                    value={formData.description}
                                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                                    placeholder="Describe the role and responsibilities..."
                                    required
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-gray-700 mb-2">Requirements</label>
                                <textarea style={{ padding: "8px", border: "1px solid #ccc", borderRadius: "4px", width: "100%" }}"
                                    className="input-field"
                                    rows="4"
                                    value={formData.requirements}
                                    onChange={(e) => setFormData({...formData, requirements: e.target.value})}
                                    placeholder="List the job requirements..."
                                    required
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-gray-700 mb-2">Responsibilities</label>
                                <textarea style={{ padding: "8px", border: "1px solid #ccc", borderRadius: "4px", width: "100%" }}"
                                    className="input-field"
                                    rows="4"
                                    value={formData.responsibilities}
                                    onChange={(e) => setFormData({...formData, responsibilities: e.target.value})}
                                    placeholder="List the key responsibilities..."
                                    required
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-gray-700 mb-2">Benefits</label>
                                <textarea style={{ padding: "8px", border: "1px solid #ccc", borderRadius: "4px", width: "100%" }}"
                                    className="input-field"
                                    rows="4"
                                    value={formData.benefits}
                                    onChange={(e) => setFormData({...formData, benefits: e.target.value})}
                                    placeholder="List the benefits and perks..."
                                    required
                                />
                            </div>
                        </div>

                        <div className="mt-8 flex justify-end space-x-4">
                            <button style={{ padding: "10px 16px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}"
                                type="button"
                                onClick={onClose}
                                className="btn btn-secondary"
                                disabled={loading}
                            >
                                Cancel
                            </button>
                            <button style={{ padding: "10px 16px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}"
                                type="submit"
                                className="btn btn-primary"
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></div>
                                        {isEditing ? 'Updating...' : 'Posting...'}
                                    </>
                                ) : (
                                    <>
                                        <i className="fas fa-paper-plane mr-2"></i>
                                        {isEditing ? 'Update Job' : 'Post Job'}
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    } catch (error) {
        console.error('JobPostingModal render error:', error);
        reportError(error);
        return null;
    }
}
