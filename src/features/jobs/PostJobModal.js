function PostJobModal({ onClose, onSuccess }) {
    try {
        const [formData, setFormData] = React.useState({
            title: '',
            company: '',
            location: '',
            type: 'full-time',
            experience: '',
            salary: '',
            description: '',
            requirements: '',
            benefits: '',
            skills: ''
        });
        const [loading, setLoading] = React.useState(false);
        const [error, setError] = React.useState('');

        const handleSubmit = async (e) => {
            e.preventDefault();
            setLoading(true);
            setError('');

            try {
                // Mock API call to post job
                await new Promise(resolve => setTimeout(resolve, 1000));
                onSuccess();
            } catch (error) {
                setError('Failed to post job. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
                    <div className="border-b border-gray-200 px-6 py-4 flex justify-between items-center">
                        <h2 className="text-xl font-semibold">Post New Job</h2>
                        <button 
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-500"
                        >
                            <i className="fas fa-times"></i>
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6">
                        {error && <ErrorMessage message={error} />}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-gray-700 mb-2">Job Title</label>
                                <input
                                    type="text"
                                    className="input-field"
                                    value={formData.title}
                                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                                    placeholder="e.g. Senior Software Engineer"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 mb-2">Company Name</label>
                                <input
                                    type="text"
                                    className="input-field"
                                    value={formData.company}
                                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                                    placeholder="e.g. Tech Corp"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 mb-2">Location</label>
                                <input
                                    type="text"
                                    className="input-field"
                                    value={formData.location}
                                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                                    placeholder="e.g. San Francisco, CA (or Remote)"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 mb-2">Job Type</label>
                                <select
                                    className="input-field"
                                    value={formData.type}
                                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                                    required
                                >
                                    <option value="full-time">Full Time</option>
                                    <option value="part-time">Part Time</option>
                                    <option value="contract">Contract</option>
                                    <option value="freelance">Freelance</option>
                                    <option value="internship">Internship</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-gray-700 mb-2">Experience Level</label>
                                <input
                                    type="text"
                                    className="input-field"
                                    value={formData.experience}
                                    onChange={(e) => setFormData({...formData, experience: e.target.value})}
                                    placeholder="e.g. 3-5 years"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 mb-2">Salary Range</label>
                                <input
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
                                <input
                                    type="text"
                                    className="input-field"
                                    value={formData.skills}
                                    onChange={(e) => setFormData({...formData, skills: e.target.value})}
                                    placeholder="e.g. JavaScript, React, Node.js (comma separated)"
                                    required
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-gray-700 mb-2">Job Description</label>
                                <textarea
                                    className="input-field"
                                    rows="4"
                                    value={formData.description}
                                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                                    placeholder="Describe the role and responsibilities..."
                                    required
                                ></textarea>
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-gray-700 mb-2">Requirements</label>
                                <textarea
                                    className="input-field"
                                    rows="4"
                                    value={formData.requirements}
                                    onChange={(e) => setFormData({...formData, requirements: e.target.value})}
                                    placeholder="List the job requirements..."
                                    required
                                ></textarea>
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-gray-700 mb-2">Benefits</label>
                                <textarea
                                    className="input-field"
                                    rows="4"
                                    value={formData.benefits}
                                    onChange={(e) => setFormData({...formData, benefits: e.target.value})}
                                    placeholder="List the benefits and perks..."
                                    required
                                ></textarea>
                            </div>
                        </div>

                        <div className="mt-8 flex justify-end space-x-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="btn btn-secondary"
                                disabled={loading}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="btn btn-primary flex items-center"
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></div>
                                        Posting...
                                    </>
                                ) : (
                                    <>
                                        <i className="fas fa-paper-plane mr-2"></i>
                                        Post Job
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    } catch (error) {
        console.error('PostJobModal render error:', error);
        reportError(error);
        return null;
    }
}
