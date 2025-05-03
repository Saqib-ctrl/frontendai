function JobApplicationsList({ jobId, onMessageCandidate }) {
    try {
        const [applications, setApplications] = React.useState([]);
        const [loading, setLoading] = React.useState(true);
        const [error, setError] = React.useState('');

        React.useEffect(() => {
            fetchApplications();
        }, [jobId]);

        const fetchApplications = async () => {
            try {
                setLoading(true);
                const response = await trickleListObjects(`applications:${jobId}`, 100, true);
                
                // Get candidate details for each application
                const applicationsWithDetails = await Promise.all(
                    response.items.map(async (item) => {
                        const candidate = await trickleGetObject('user', item.objectData.candidateId);
                        return {
                            ...item.objectData,
                            id: item.objectId,
                            candidate: candidate.objectData
                        };
                    })
                );

                setApplications(applicationsWithDetails);
            } catch (error) {
                setError('Failed to load applications');
            } finally {
                setLoading(false);
            }
        };

        const updateApplicationStatus = async (applicationId, newStatus) => {
            try {
                await trickleUpdateObject(`applications:${jobId}`, applicationId, { status: newStatus });
                
                // Update local state
                setApplications(prev => 
                    prev.map(app => 
                        app.id === applicationId ? { ...app, status: newStatus } : app
                    )
                );

                // Notify candidate
                const application = applications.find(app => app.id === applicationId);
                if (application) {
                    await createNotification(application.candidateId, {
                        type: 'application_status',
                        title: 'Application Status Updated',
                        message: `Your application status has been updated to ${newStatus}`,
                        metadata: {
                            applicationId,
                            jobId,
                            status: newStatus
                        }
                    });
                }
            } catch (error) {
                console.error('Failed to update application status:', error);
            }
        };

        if (loading) return <Loading />;
        if (error) return <ErrorMessage message={error} />;

        return (
            <div className="space-y-4">
                <h3 className="text-lg font-medium">Applications ({applications.length})</h3>
                
                {applications.length === 0 ? (
                    <div className="text-center py-8 bg-gray-50 rounded-lg">
                        <i className="fas fa-inbox text-4xl text-gray-400 mb-2"></i>
                        <p className="text-gray-500">No applications yet</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Candidate
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Applied Date
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Resume
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {applications.map((application) => (
                                    <tr key={application.id}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <img
                                                    src={application.candidate.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(application.candidate.name)}`}
                                                    alt={application.candidate.name}
                                                    className="h-10 w-10 rounded-full"
                                                />
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {application.candidate.name}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        {application.candidate.email}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">
                                                {new Date(application.appliedAt).toLocaleDateString()}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                {new Date(application.appliedAt).toLocaleTimeString()}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <select
                                                value={application.status}
                                                onChange={(e) => updateApplicationStatus(application.id, e.target.value)}
                                                className={`rounded-full text-sm font-medium px-3 py-1 ${
                                                    application.status === 'pending' 
                                                        ? 'bg-yellow-100 text-yellow-800'
                                                        : application.status === 'accepted'
                                                        ? 'bg-green-100 text-green-800'
                                                        : application.status === 'rejected'
                                                        ? 'bg-red-100 text-red-800'
                                                        : 'bg-gray-100 text-gray-800'
                                                }`}
                                            >
                                                <option value="pending">Pending</option>
                                                <option value="reviewing">Reviewing</option>
                                                <option value="shortlisted">Shortlisted</option>
                                                <option value="interviewing">Interviewing</option>
                                                <option value="accepted">Accepted</option>
                                                <option value="rejected">Rejected</option>
                                            </select>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {application.resume ? (
                                                <button style={{ padding: "10px 16px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}"
                                                    onClick={() => window.open(application.resume, '_blank')}
                                                    className="text-blue-600 hover:text-blue-800"
                                                >
                                                    <i className="fas fa-file-pdf mr-2"></i>
                                                    View Resume
                                                </button>
                                            ) : (
                                                <span className="text-gray-500">No resume</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button style={{ padding: "10px 16px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}"
                                                onClick={() => onMessageCandidate(application.candidate)}
                                                className="text-blue-600 hover:text-blue-900 mr-4"
                                            >
                                                <i className="fas fa-comment-alt mr-1"></i>
                                                Message
                                            </button>
                                            <button style={{ padding: "10px 16px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}"
                                                onClick={() => window.location.hash = `candidates?id=${application.candidateId}`}
                                                className="text-green-600 hover:text-green-900"
                                            >
                                                <i className="fas fa-user mr-1"></i>
                                                View Profile
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        );
    } catch (error) {
        console.error('JobApplicationsList render error:', error);
        reportError(error);
        return <ErrorMessage message="Failed to load applications" />;
    }
}
