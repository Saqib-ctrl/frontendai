function ResumeView({ data, onEdit }) {
    try {
        // If no data is provided, show empty state
        if (!data) {
            return (
                <div className="text-center p-6 bg-gray-50 rounded-lg">
                    <i className="fas fa-file-alt text-4xl text-gray-400 mb-4"></i>
                    <h3 className="text-lg font-medium text-gray-900">No Resume Data</h3>
                    <p className="text-gray-500 mt-2">Please upload your resume to view details</p>
                    {onEdit && (
                        <button style={{ padding: "10px 16px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}"
                            onClick={onEdit}
                            className="mt-4 btn btn-primary"
                        >
                            <i className="fas fa-upload mr-2"></i>
                            Upload Resume
                        </button>
                    )}
                </div>
            );
        }

        // Default values for resume sections
        const defaultData = {
            personal: {
                name: 'Not Provided',
                email: 'Not Provided',
                phone: 'Not Provided',
                location: 'Not Provided',
                summary: 'No summary available'
            },
            experience: [],
            education: [],
            skills: []
        };

        // Merge provided data with default values
        const resumeData = {
            personal: { ...defaultData.personal, ...(data.personal || {}) },
            experience: data.experience || defaultData.experience,
            education: data.education || defaultData.education,
            skills: data.skills || defaultData.skills
        };

        return (
            <div className="space-y-6">
                <div className="flex justify-between items-start">
                    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "1rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
                        <h2 className="text-2xl font-bold text-gray-900">{resumeData.personal.name}</h2>
                        <div className="mt-2 text-gray-600">
                            <p>{resumeData.personal.email} • {resumeData.personal.phone}</p>
                            <p>{resumeData.personal.location}</p>
                        </div>
                    </div>
                    {onEdit && (
                        <button style={{ padding: "10px 16px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}"
                            onClick={onEdit}
                            className="btn btn-secondary"
                        >
                            <i className="fas fa-edit mr-2"></i>
                            Edit Resume
                        </button>
                    )}
                </div>

                <div className="prose max-w-none">
                    {resumeData.personal.summary && (
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <p>{resumeData.personal.summary}</p>
                        </div>
                    )}

                    <h3 className="text-lg font-semibold mt-6 mb-4">Experience</h3>
                    {resumeData.experience.length > 0 ? (
                        resumeData.experience.map((exp, index) => (
                            <div key={index} className="mb-4">
                                <div className="flex justify-between">
                                    <h4 className="font-medium">{exp.title}</h4>
                                    <span className="text-gray-500">
                                        {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                                    </span>
                                </div>
                                <p className="text-gray-600">{exp.company} • {exp.location}</p>
                                <p className="mt-2">{exp.description}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">No experience listed</p>
                    )}

                    <h3 className="text-lg font-semibold mt-6 mb-4">Education</h3>
                    {resumeData.education.length > 0 ? (
                        resumeData.education.map((edu, index) => (
                            <div key={index} className="mb-4">
                                <div className="flex justify-between">
                                    <h4 className="font-medium">{edu.degree}</h4>
                                    <span className="text-gray-500">{edu.graduationDate}</span>
                                </div>
                                <p className="text-gray-600">{edu.school}</p>
                                {edu.field && <p className="text-gray-600">{edu.field}</p>}
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">No education listed</p>
                    )}

                    <h3 className="text-lg font-semibold mt-6 mb-4">Skills</h3>
                    {resumeData.skills.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                            {resumeData.skills.map((skill, index) => (
                                <span
                                    key={index}
                                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500">No skills listed</p>
                    )}
                </div>
            </div>
        );
    } catch (error) {
        console.error('ResumeView render error:', error);
        reportError(error);
        return <ErrorMessage message="Failed to display resume" />;
    }
}
