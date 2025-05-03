function MatchedJobs({ jobs }) {
    try {
        return (
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium text-gray-900">Matched Jobs ({jobs.length})</h3>
                    <div className="text-sm text-gray-500">
                        Sorted by match percentage
                    </div>
                </div>

                {jobs.map((job) => (
                    <div key={job.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start">
                            <div style={{ maxWidth: "800px", margin: "0 auto", padding: "1rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
                                <h4 className="text-lg font-medium text-gray-900">{job.title}</h4>
                                <p className="text-gray-600">{job.company}</p>
                                <p className="text-gray-500 text-sm">{job.location}</p>
                            </div>
                            <div className="text-right">
                                <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                                    {job.matchScore}% Match
                                </div>
                                <p className="text-gray-600 mt-1">{job.salary}</p>
                            </div>
                        </div>

                        <div className="mt-4">
                            <div className="text-sm text-gray-700 space-y-2">
                                <div className="flex items-center">
                                    <div className="w-24 text-gray-500">Skills Match:</div>
                                    <div className="flex-1">
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div
                                                className="bg-blue-500 h-2 rounded-full"
                                                style={{ width: `${job.skillsMatch}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                    <div className="ml-2 w-12 text-right">{job.skillsMatch}%</div>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-24 text-gray-500">Experience:</div>
                                    <div className="flex-1">
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div
                                                className="bg-purple-500 h-2 rounded-full"
                                                style={{ width: `${job.experienceMatch}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                    <div className="ml-2 w-12 text-right">{job.experienceMatch}%</div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 flex items-center justify-between">
                            <div className="flex flex-wrap gap-2">
                                {job.requiredSkills.slice(0, 3).map((skill, index) => (
                                    <span
                                        key={index}
                                        className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm"
                                    >
                                        {skill}
                                    </span>
                                ))}
                                {job.requiredSkills.length > 3 && (
                                    <span className="text-gray-500 text-sm">
                                        +{job.requiredSkills.length - 3} more
                                    </span>
                                )}
                            </div>
                            <button style={{ padding: "10px 16px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}" className="btn btn-primary">
                                Apply Now
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        );
    } catch (error) {
        console.error('MatchedJobs render error:', error);
        reportError(error);
        return <ErrorMessage message="Failed to load matched jobs" />;
    }
}
