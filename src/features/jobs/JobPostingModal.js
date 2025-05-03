function JobPostingModal({ onClose, onSubmit }) {
    try {
        const [formData, setFormData] = React.useState({
            title: '',
            company: '',
            location: '',
            type: 'Full-time',
            minExperience: '',
            maxExperience: '',
            salary: '',
            skills: [],
            description: '',
            requirements: '',
            responsibilities: '',
            benefits: ''
        });
        const [loading, setLoading] = React.useState(false);
        const [error, setError] = React.useState('');
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));

        const handleSubmit = async (e) => {
            e.preventDefault();
            setLoading(true);
            setError('');

            try {
                // Create job posting
                const jobData = {
                    ...formData,
                    employerId: currentUser.id,
                    createdAt: new Date().toISOString(),
                    status: 'active'
                };

                // Save job to database
                const job = await trickleCreateObject('job', jobData);

                // Notify all candidates
                const response = await trickleListObjects('user', 100, true);
                const candidates = response.items.filter(item => 
                    item.objectData.role === 'candidate' &&
                    item.objectId !== currentUser.id
                );

                // Create notifications for all candidates
                await Promise.all(candidates.map(candidate => 
                    createNotification(candidate.objectId, {
                        type: 'job_posted',
                        title: 'New Job Opportunity',
                        message: `${currentUser.name} posted a new job: ${formData.title} at ${formData.company}`,
                        link: `jobs?id=${job.objectId}`,
                        metadata: {
                            jobId: job.objectId,
                            employerId: currentUser.id
                        }
                    })
                ));

                // Create confirmation notification for employer
                await createNotification(currentUser.id, {
                    type: 'job_posted',
                    title: 'Job Posted Successfully',
                    message: `Your job posting for ${formData.title} has been published`,
                    link: `jobs?id=${job.objectId}`,
                    metadata: {
                        jobId: job.objectId
                    }
                });

                onSubmit(job);
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
                        <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
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
                                    <option value="Full-time">Full Time</option>
                                    <option value="Part-time">Part Time</option>
                                    <option value="Contract">Contract</option>
                                    <option value="Internship">Internship</option>
                                    <option value="Remote">Remote</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-gray-700 mb-2">Experience Range (Years)</label>
                                <div className="grid grid-cols-2 gap-4">
                                    <input
                                        type="number"
                                        className="input-field"
                                        value={formData.minExperience}
                                        onChange={(e) => setFormData({...formData, minExperience: e.target.value})}
                                        placeholder="Minimum"
                                        min="0"
                                        required
                                    />
                                    <input
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
                                    value={formData.skills.join(', ')}
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
                                <textarea
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
                                <textarea
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
                                <textarea
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
                                <textarea
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
                                className="btn btn-primary"
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
        console.error('JobPostingModal render error:', error);
        reportError(error);
        return null;
    }
}
