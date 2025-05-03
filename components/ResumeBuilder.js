function ResumeBuilder({ onSave }) {
    try {
        const [formData, setFormData] = React.useState({
            personal: {
                name: '',
                email: '',
                phone: '',
                location: '',
                summary: ''
            },
            experience: [
                {
                    title: '',
                    company: '',
                    location: '',
                    startDate: '',
                    endDate: '',
                    current: false,
                    description: ''
                }
            ],
            education: [
                {
                    degree: '',
                    school: '',
                    location: '',
                    graduationDate: '',
                    field: ''
                }
            ],
            skills: ['']
        });
        const [loading, setLoading] = React.useState(false);

        const handleSubmit = async (e) => {
            e.preventDefault();
            setLoading(true);
            try {
                await onSave(formData);
            } catch (error) {
                console.error('Resume save error:', error);
            } finally {
                setLoading(false);
            }
        };

        const addExperience = () => {
            setFormData({
                ...formData,
                experience: [
                    ...formData.experience,
                    {
                        title: '',
                        company: '',
                        location: '',
                        startDate: '',
                        endDate: '',
                        current: false,
                        description: ''
                    }
                ]
            });
        };

        const addEducation = () => {
            setFormData({
                ...formData,
                education: [
                    ...formData.education,
                    {
                        degree: '',
                        school: '',
                        location: '',
                        graduationDate: '',
                        field: ''
                    }
                ]
            });
        };

        const addSkill = () => {
            setFormData({
                ...formData,
                skills: [...formData.skills, '']
            });
        };

        const updateExperience = (index, field, value) => {
            const newExperience = [...formData.experience];
            newExperience[index] = {
                ...newExperience[index],
                [field]: value
            };
            setFormData({
                ...formData,
                experience: newExperience
            });
        };

        const updateEducation = (index, field, value) => {
            const newEducation = [...formData.education];
            newEducation[index] = {
                ...newEducation[index],
                [field]: value
            };
            setFormData({
                ...formData,
                education: newEducation
            });
        };

        const updateSkill = (index, value) => {
            const newSkills = [...formData.skills];
            newSkills[index] = value;
            setFormData({
                ...formData,
                skills: newSkills
            });
        };

        return (
            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Personal Information */}
                <div style={{ maxWidth: "800px", margin: "0 auto", padding: "1rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div style={{ maxWidth: "800px", margin: "0 auto", padding: "1rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
                            <label className="block text-sm font-medium text-gray-700">Full Name</label>
                            <input style={{ padding: "8px", border: "1px solid #ccc", borderRadius: "4px", width: "100%" }}"
                                type="text"
                                className="input-field mt-1"
                                value={formData.personal.name}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    personal: { ...formData.personal, name: e.target.value }
                                })}
                                required
                            />
                        </div>
                        <div style={{ maxWidth: "800px", margin: "0 auto", padding: "1rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input style={{ padding: "8px", border: "1px solid #ccc", borderRadius: "4px", width: "100%" }}"
                                type="email"
                                className="input-field mt-1"
                                value={formData.personal.email}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    personal: { ...formData.personal, email: e.target.value }
                                })}
                                required
                            />
                        </div>
                        <div style={{ maxWidth: "800px", margin: "0 auto", padding: "1rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
                            <label className="block text-sm font-medium text-gray-700">Phone</label>
                            <input style={{ padding: "8px", border: "1px solid #ccc", borderRadius: "4px", width: "100%" }}"
                                type="tel"
                                className="input-field mt-1"
                                value={formData.personal.phone}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    personal: { ...formData.personal, phone: e.target.value }
                                })}
                                required
                            />
                        </div>
                        <div style={{ maxWidth: "800px", margin: "0 auto", padding: "1rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
                            <label className="block text-sm font-medium text-gray-700">Location</label>
                            <input style={{ padding: "8px", border: "1px solid #ccc", borderRadius: "4px", width: "100%" }}"
                                type="text"
                                className="input-field mt-1"
                                value={formData.personal.location}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    personal: { ...formData.personal, location: e.target.value }
                                })}
                                required
                            />
                        </div>
                    </div>
                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700">Professional Summary</label>
                        <textarea style={{ padding: "8px", border: "1px solid #ccc", borderRadius: "4px", width: "100%" }}"
                            className="input-field mt-1"
                            rows="4"
                            value={formData.personal.summary}
                            onChange={(e) => setFormData({
                                ...formData,
                                personal: { ...formData.personal, summary: e.target.value }
                            })}
                            required
                        ></textarea>
                    </div>
                </div>

                {/* Experience */}
                <div style={{ maxWidth: "800px", margin: "0 auto", padding: "1rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-medium text-gray-900">Experience</h3>
                        <button style={{ padding: "10px 16px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}"
                            type="button"
                            onClick={addExperience}
                            className="btn btn-secondary"
                        >
                            <i className="fas fa-plus mr-2"></i>
                            Add Experience
                        </button>
                    </div>
                    {formData.experience.map((exp, index) => (
                        <div key={index} className="border rounded-lg p-4 mb-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div style={{ maxWidth: "800px", margin: "0 auto", padding: "1rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
                                    <label className="block text-sm font-medium text-gray-700">Job Title</label>
                                    <input style={{ padding: "8px", border: "1px solid #ccc", borderRadius: "4px", width: "100%" }}"
                                        type="text"
                                        className="input-field mt-1"
                                        value={exp.title}
                                        onChange={(e) => updateExperience(index, 'title', e.target.value)}
                                        required
                                    />
                                </div>
                                <div style={{ maxWidth: "800px", margin: "0 auto", padding: "1rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
                                    <label className="block text-sm font-medium text-gray-700">Company</label>
                                    <input style={{ padding: "8px", border: "1px solid #ccc", borderRadius: "4px", width: "100%" }}"
                                        type="text"
                                        className="input-field mt-1"
                                        value={exp.company}
                                        onChange={(e) => updateExperience(index, 'company', e.target.value)}
                                        required
                                    />
                                </div>
                                <div style={{ maxWidth: "800px", margin: "0 auto", padding: "1rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
                                    <label className="block text-sm font-medium text-gray-700">Location</label>
                                    <input style={{ padding: "8px", border: "1px solid #ccc", borderRadius: "4px", width: "100%" }}"
                                        type="text"
                                        className="input-field mt-1"
                                        value={exp.location}
                                        onChange={(e) => updateExperience(index, 'location', e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "1rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
                                        <label className="block text-sm font-medium text-gray-700">Start Date</label>
                                        <input style={{ padding: "8px", border: "1px solid #ccc", borderRadius: "4px", width: "100%" }}"
                                            type="date"
                                            className="input-field mt-1"
                                            value={exp.startDate}
                                            onChange={(e) => updateExperience(index, 'startDate', e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "1rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
                                        <label className="block text-sm font-medium text-gray-700">End Date</label>
                                        <input style={{ padding: "8px", border: "1px solid #ccc", borderRadius: "4px", width: "100%" }}"
                                            type="date"
                                            className="input-field mt-1"
                                            value={exp.endDate}
                                            onChange={(e) => updateExperience(index, 'endDate', e.target.value)}
                                            disabled={exp.current}
                                            required={!exp.current}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4">
                                <label className="block text-sm font-medium text-gray-700">Description</label>
                                <textarea style={{ padding: "8px", border: "1px solid #ccc", borderRadius: "4px", width: "100%" }}"
                                    className="input-field mt-1"
                                    rows="3"
                                    value={exp.description}
                                    onChange={(e) => updateExperience(index, 'description', e.target.value)}
                                    required
                                ></textarea>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Education */}
                <div style={{ maxWidth: "800px", margin: "0 auto", padding: "1rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-medium text-gray-900">Education</h3>
                        <button style={{ padding: "10px 16px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}"
                            type="button"
                            onClick={addEducation}
                            className="btn btn-secondary"
                        >
                            <i className="fas fa-plus mr-2"></i>
                            Add Education
                        </button>
                    </div>
                    {formData.education.map((edu, index) => (
                        <div key={index} className="border rounded-lg p-4 mb-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div style={{ maxWidth: "800px", margin: "0 auto", padding: "1rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
                                    <label className="block text-sm font-medium text-gray-700">Degree</label>
                                    <input style={{ padding: "8px", border: "1px solid #ccc", borderRadius: "4px", width: "100%" }}"
                                        type="text"
                                        className="input-field mt-1"
                                        value={edu.degree}
                                        onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                                        required
                                    />
                                </div>
                                <div style={{ maxWidth: "800px", margin: "0 auto", padding: "1rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
                                    <label className="block text-sm font-medium text-gray-700">School</label>
                                    <input style={{ padding: "8px", border: "1px solid #ccc", borderRadius: "4px", width: "100%" }}"
                                        type="text"
                                        className="input-field mt-1"
                                        value={edu.school}
                                        onChange={(e) => updateEducation(index, 'school', e.target.value)}
                                        required
                                    />
                                </div>
                                <div style={{ maxWidth: "800px", margin: "0 auto", padding: "1rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
                                    <label className="block text-sm font-medium text-gray-700">Field of Study</label>
                                    <input style={{ padding: "8px", border: "1px solid #ccc", borderRadius: "4px", width: "100%" }}"
                                        type="text"
                                        className="input-field mt-1"
                                        value={edu.field}
                                        onChange={(e) => updateEducation(index, 'field', e.target.value)}
                                        required
                                    />
                                </div>
                                <div style={{ maxWidth: "800px", margin: "0 auto", padding: "1rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
                                    <label className="block text-sm font-medium text-gray-700">Graduation Date</label>
                                    <input style={{ padding: "8px", border: "1px solid #ccc", borderRadius: "4px", width: "100%" }}"
                                        type="date"
                                        className="input-field mt-1"
                                        value={edu.graduationDate}
                                        onChange={(e) => updateEducation(index, 'graduationDate', e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Skills */}
                <div style={{ maxWidth: "800px", margin: "0 auto", padding: "1rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-medium text-gray-900">Skills</h3>
                        <button style={{ padding: "10px 16px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}"
                            type="button"
                            onClick={addSkill}
                            className="btn btn-secondary"
                        >
                            <i className="fas fa-plus mr-2"></i>
                            Add Skill
                        </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {formData.skills.map((skill, index) => (
                            <div key={index}>
                                <input style={{ padding: "8px", border: "1px solid #ccc", borderRadius: "4px", width: "100%" }}"
                                    type="text"
                                    className="input-field"
                                    value={skill}
                                    onChange={(e) => updateSkill(index, e.target.value)}
                                    placeholder="Enter a skill"
                                    required
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex justify-end">
                    <button style={{ padding: "10px 16px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}"
                        type="submit"
                        className="btn btn-primary"
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></div>
                                Saving...
                            </>
                        ) : (
                            <>
                                <i className="fas fa-save mr-2"></i>
                                Save Resume
                            </>
                        )}
                    </button>
                </div>
            </form>
        );
    } catch (error) {
        console.error('ResumeBuilder render error:', error);
        reportError(error);
        return <ErrorMessage message="Failed to load resume builder" />;
    }
}
