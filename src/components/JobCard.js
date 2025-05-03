function JobCard({ job, isCandidate, onApply, onDelete, onEdit }) {
    try {
        const [showDeleteConfirm, setShowDeleteConfirm] = React.useState(false);
        const [showApplications, setShowApplications] = React.useState(false);
        const [showMenu, setShowMenu] = React.useState(false);
        const [deleting, setDeleting] = React.useState(false);
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        const isOwner = currentUser?.id === job.employerId;
        const menuRef = React.useRef(null);

        React.useEffect(() => {
            const handleClickOutside = (event) => {
                if (menuRef.current && !menuRef.current.contains(event.target)) {
                    setShowMenu(false);
                }
            };

            document.addEventListener('mousedown', handleClickOutside);
            return () => document.removeEventListener('mousedown', handleClickOutside);
        }, []);

        const handleDelete = async () => {
            try {
                setDeleting(true);
                
                // Delete the job
                await trickleDeleteObject('job', job.id);

                // Delete all related applications
                const applications = await trickleListObjects(`applications:${job.id}`, 100, true);
                await Promise.all(applications.items.map(app => 
                    trickleDeleteObject(`applications:${job.id}`, app.objectId)
                ));

                // Notify candidates who applied
                await Promise.all(applications.items.map(app => 
                    createNotification(app.objectData.candidateId, {
                        type: 'job_deleted',
                        title: 'Job Post Removed',
                        message: `The job post "${job.title}" at ${job.company} has been removed`,
                        metadata: {
                            jobId: job.id,
                            employerId: job.employerId
                        }
                    })
                ));

                // Notify employer (confirmation)
                await createNotification(job.employerId, {
                    type: 'job_deleted',
                    title: 'Job Post Deleted',
                    message: `Your job post for "${job.title}" has been successfully deleted`,
                    metadata: {
                        jobId: job.id
                    }
                });

                if (onDelete) {
                    onDelete(job.id);
                }
            } catch (error) {
                console.error('Failed to delete job:', error);
            } finally {
                setDeleting(false);
                setShowDeleteConfirm(false);
                setShowMenu(false);
            }
        };

        const handleShare = () => {
            const url = `${window.location.origin}/#/jobs?id=${job.id}`;
            navigator.clipboard.writeText(url)
                .then(() => alert('Job URL copied to clipboard!'))
                .catch(() => alert('Failed to copy URL'));
            setShowMenu(false);
        };

        const handleMessageCandidate = (candidate) => {
            window.location.hash = `messages?userId=${candidate.id}`;
        };

        return (
            <div className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-start">
                    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "1rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
                        <h2 className="text-xl font-semibold text-gray-900">{job.title}</h2>
                        <p className="text-gray-600">{job.company}</p>
                        <p className="text-gray-500">{job.location}</p>
                    </div>
                    <div className="flex items-start space-x-4">
                        <div className="text-right">
                            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                                {job.type}
                            </span>
                            <p className="text-gray-600 mt-2">{job.salary}</p>
                        </div>
                        {isOwner && (
                            <div className="relative" ref={menuRef}>
                                <button style={{ padding: "10px 16px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}"
                                    onClick={() => setShowMenu(!showMenu)}
                                    className="p-2 hover:bg-gray-100 rounded-full"
                                >
                                    <i className="fas fa-ellipsis-v text-gray-500"></i>
                                </button>
                                {showMenu && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 border border-gray-200">
                                        <div className="py-1">
                                            <button style={{ padding: "10px 16px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}"
                                                onClick={() => {
                                                    setShowMenu(false);
                                                    onEdit(job);
                                                }}
                                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                                            >
                                                <i className="fas fa-edit w-5"></i>
                                                Edit Job
                                            </button>
                                            <button style={{ padding: "10px 16px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}"
                                                onClick={() => {
                                                    setShowDeleteConfirm(true);
                                                    setShowMenu(false);
                                                }}
                                                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center"
                                            >
                                                <i className="fas fa-trash-alt w-5"></i>
                                                Delete Job
                                            </button>
                                            <button style={{ padding: "10px 16px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}"
                                                onClick={handleShare}
                                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                                            >
                                                <i className="fas fa-share w-5"></i>
                                                Share Job
                                            </button>
                                            <button style={{ padding: "10px 16px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}"
                                                onClick={() => setShowApplications(true)}
                                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                                            >
                                                <i className="fas fa-users w-5"></i>
                                                View Applications
                                            </button>
                                            <button style={{ padding: "10px 16px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}"
                                                onClick={() => {
                                                    window.location.hash = `analytics?jobId=${job.id}`;
                                                    setShowMenu(false);
                                                }}
                                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                                            >
                                                <i className="fas fa-chart-line w-5"></i>
                                                View Analytics
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                <div className="mt-4">
                    <p className="text-gray-700">{job.description}</p>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                    {job.skills.map((skill, index) => (
                        <span
                            key={index}
                            className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
                        >
                            {skill}
                        </span>
                    ))}
                </div>

                <div className="mt-4 pt-4 border-t flex justify-between items-center">
                    <div className="text-sm text-gray-500">
                        Posted {new Date(job.createdAt).toLocaleDateString()}
                    </div>
                    {isCandidate && (
                        <button style={{ padding: "10px 16px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}" 
                            onClick={() => onApply(job)}
                            className="btn btn-primary"
                        >
                            Apply Now
                        </button>
                    )}
                </div>

                {/* Applications List Modal */}
                {showApplications && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-medium">Applications for {job.title}</h3>
                                <button style={{ padding: "10px 16px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}"
                                    onClick={() => setShowApplications(false)}
                                    className="text-gray-400 hover:text-gray-500"
                                >
                                    <i className="fas fa-times"></i>
                                </button>
                            </div>
                            <JobApplicationsList 
                                jobId={job.id}
                                onMessageCandidate={handleMessageCandidate}
                            />
                        </div>
                    </div>
                )}

                {/* Delete Confirmation Modal */}
                {showDeleteConfirm && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                            <h3 className="text-xl font-semibold mb-4">Delete Job Post</h3>
                            <p className="text-gray-600 mb-6">
                                Are you sure you want to delete this job post? This action cannot be undone 
                                and all applications will be removed.
                            </p>
                            <div className="flex justify-end space-x-3">
                                <button style={{ padding: "10px 16px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}"
                                    onClick={() => setShowDeleteConfirm(false)}
                                    className="btn btn-secondary"
                                    disabled={deleting}
                                >
                                    Cancel
                                </button>
                                <button style={{ padding: "10px 16px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}"
                                    onClick={handleDelete}
                                    className="btn btn-primary bg-red-500 hover:bg-red-600"
                                    disabled={deleting}
                                >
                                    {deleting ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                            Deleting...
                                        </>
                                    ) : (
                                        'Delete'
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    } catch (error) {
        console.error('JobCard render error:', error);
        reportError(error);
        return <ErrorMessage message="Failed to load job card" />;
    }
}
