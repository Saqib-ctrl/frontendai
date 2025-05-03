function ApplyJobModal({ job, onClose, onSubmit }) {
    try {
        const [formData, setFormData] = React.useState({
            coverLetter: '',
            resume: null
        });
        const [loading, setLoading] = React.useState(false);
        const [error, setError] = React.useState('');
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));

        const handleSubmit = async (e) => {
            e.preventDefault();
            setLoading(true);
            setError('');

            try {
                // Create application
                const applicationData = {
                    jobId: job.id,
                    candidateId: currentUser.id,
                    employerId: job.employerId,
                    coverLetter: formData.coverLetter,
                    resume: formData.resume,
                    status: 'pending',
                    appliedAt: new Date().toISOString()
                };

                // Save application to database
                const application = await trickleCreateObject('application', applicationData);

                // Create initial conversation
                const conversationId = [currentUser.id, job.employerId].sort().join('-');
                await trickleCreateObject(`conversations:${conversationId}`, {
                    participants: [currentUser.id, job.employerId],
                    lastMessage: null,
                    createdAt: new Date().toISOString()
                });

                // Send initial message
                const initialMessage = {
                    senderId: currentUser.id,
                    recipientId: job.employerId,
                    content: `Hi, I've applied for the ${job.title} position. Please let me know if you need any additional information.`,
                    timestamp: new Date().toISOString(),
                    read: false,
                    applicationId: application.objectId
                };

                await trickleCreateObject(`messages:${conversationId}`, initialMessage);

                // Notify employer
                await createNotification(job.employerId, {
                    type: 'job_application',
                    title: 'New Job Application',
                    message: `${currentUser.name} has applied for ${job.title}`,
                    link: `applications?id=${application.objectId}`,
                    metadata: {
                        applicationId: application.objectId,
                        candidateId: currentUser.id,
                        jobId: job.id,
                        conversationId: conversationId
                    }
                });

                // Notify candidate
                await createNotification(currentUser.id, {
                    type: 'application_submitted',
                    title: 'Application Submitted',
                    message: `Your application for ${job.title} at ${job.company} has been submitted successfully`,
                    link: `applications?id=${application.objectId}`,
                    metadata: {
                        applicationId: application.objectId,
                        jobId: job.id,
                        conversationId: conversationId
                    }
                });

                onSubmit(application);
            } catch (error) {
                setError('Failed to submit application. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4">
                    <div className="border-b border-gray-200 px-6 py-4 flex justify-between items-center">
                        <h2 className="text-xl font-semibold">Apply for {job.title}</h2>
                        <button style={{ padding: "10px 16px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}" onClick={onClose} className="text-gray-400 hover:text-gray-500">
                            <i className="fas fa-times"></i>
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6">
                        {error && <ErrorMessage message={error} />}

                        <div className="space-y-6">
                            <div style={{ maxWidth: "800px", margin: "0 auto", padding: "1rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
                                <label className="block text-gray-700 mb-2">Cover Letter</label>
                                <textarea style={{ padding: "8px", border: "1px solid #ccc", borderRadius: "4px", width: "100%" }}"
                                    className="input-field"
                                    rows="6"
                                    value={formData.coverLetter}
                                    onChange={(e) => setFormData({...formData, coverLetter: e.target.value})}
                                    placeholder="Write your cover letter..."
                                    required
                                />
                            </div>

                            <div style={{ maxWidth: "800px", margin: "0 auto", padding: "1rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
                                <label className="block text-gray-700 mb-2">Resume</label>
                                <ResumeUploader 
                                    onUpload={(resumeData) => setFormData({...formData, resume: resumeData})}
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
                                        Submitting...
                                    </>
                                ) : (
                                    'Submit Application'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    } catch (error) {
        console.error('ApplyJobModal render error:', error);
        reportError(error);
        return null;
    }
}
