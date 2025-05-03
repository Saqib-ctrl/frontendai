function RecommendedJobs() {
    try {
        const [jobs, setJobs] = React.useState([]);
        const [loading, setLoading] = React.useState(true);
        const [error, setError] = React.useState('');

        React.useEffect(() => {
            const fetchRecommendedJobs = async () => {
                try {
                    // Get current user's resume
                    const resume = JSON.parse(localStorage.getItem('userResume'));
                    if (!resume) {
                        setError('Please create your resume first to see job recommendations');
                        setLoading(false);
                        return;
                    }

                    // Get matched jobs
                    const response = await trickleListObjects('job', 100, true);
                    const allJobs = response.items.map(item => item.objectData);

                    // Filter jobs based on skills match
                    const matchedJobs = allJobs.map(job => {
                        const skillsMatch = calculateSkillsMatch(job.skills, resume.skills);
                        return {
                            ...job,
                            matchScore: skillsMatch,
                            skillsMatch: skillsMatch,
                            experienceMatch: calculateExperienceMatch(job.minExperience, resume.experience),
                            educationMatch: calculateEducationMatch(job.requirements, resume.education)
                        };
                    }).sort((a, b) => b.matchScore - a.matchScore);

                    setJobs(matchedJobs);
                } catch (error) {
                    setError('Failed to load recommended jobs');
                } finally {
                    setLoading(false);
                }
            };

            fetchRecommendedJobs();
        }, []);

        const calculateSkillsMatch = (jobSkills, userSkills) => {
            if (!userSkills || !jobSkills) return 0;
            const matchedSkills = jobSkills.filter(skill => 
                userSkills.some(userSkill => 
                    userSkill.toLowerCase().includes(skill.toLowerCase())
                )
            );
            return Math.round((matchedSkills.length / jobSkills.length) * 100);
        };

        const calculateExperienceMatch = (requiredExperience, userExperience) => {
            if (!userExperience || !requiredExperience) return 0;
            const userYears = userExperience.reduce((total, exp) => {
                const duration = exp.endDate ? 
                    new Date(exp.endDate).getFullYear() - new Date(exp.startDate).getFullYear() : 
                    new Date().getFullYear() - new Date(exp.startDate).getFullYear();
                return total + duration;
            }, 0);
            return Math.min(Math.round((userYears / requiredExperience) * 100), 100);
        };

        const calculateEducationMatch = (requirements, userEducation) => {
            if (!userEducation || !requirements) return 0;
            const educationLevels = {
                'phd': 4,
                'master': 3,
                'bachelor': 2,
                'associate': 1
            };

            const userHighestLevel = userEducation.reduce((highest, edu) => {
                const level = Object.entries(educationLevels).find(([key]) => 
                    edu.degree.toLowerCase().includes(key)
                );
                return level ? Math.max(highest, level[1]) : highest;
            }, 0);

            const requiredLevel = Object.entries(educationLevels).reduce((required, [key, value]) => {
                return requirements.toLowerCase().includes(key) ? Math.max(required, value) : required;
            }, 0);

            return Math.min(Math.round((userHighestLevel / requiredLevel) * 100), 100);
        };

        if (loading) return <Loading />;

        if (error) {
            return (
                <div className="max-w-7xl mx-auto">
                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="text-center py-12">
                            <i className="fas fa-exclamation-circle text-4xl text-red-500 mb-4"></i>
                            <h2 className="text-xl font-medium text-gray-900 mb-2">{error}</h2>
                            <button
                                onClick={() => window.location.hash = 'resume'}
                                className="btn btn-primary mt-4"
                            >
                                Create Resume
                            </button>
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div data-name="recommended-jobs-page" className="max-w-7xl mx-auto">
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-3xl font-bold text-gray-900">Recommended Jobs</h1>
                        <button
                            onClick={() => window.location.hash = 'jobs'}
                            className="btn btn-secondary flex items-center"
                        >
                            <i className="fas fa-search mr-2"></i>
                            Browse All Jobs
                        </button>
                    </div>

                    {jobs.length > 0 ? (
                        <div className="space-y-6">
                            {jobs.map(job => (
                                <div key={job.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h2 className="text-xl font-semibold text-gray-900">{job.title}</h2>
                                            <p className="text-gray-600">{job.company}</p>
                                            <p className="text-gray-500">{job.location}</p>
                                        </div>
                                        <div className="text-right">
                                            <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                                                {job.matchScore}% Match
                                            </div>
                                            <p className="text-gray-600 mt-2">{job.salary}</p>
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <div className="text-sm text-gray-700 space-y-2">
                                            <div className="flex items-center">
                                                <span className="w-24 text-gray-500">Skills Match:</span>
                                                <div className="flex-1">
                                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                                        <div
                                                            className="bg-blue-500 h-2 rounded-full"
                                                            style={{ width: `${job.skillsMatch}%` }}
                                                        ></div>
                                                    </div>
                                                </div>
                                                <span className="ml-2 w-12 text-right">{job.skillsMatch}%</span>
                                            </div>
                                            <div className="flex items-center">
                                                <span className="w-24 text-gray-500">Experience:</span>
                                                <div className="flex-1">
                                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                                        <div
                                                            className="bg-purple-500 h-2 rounded-full"
                                                            style={{ width: `${job.experienceMatch}%` }}
                                                        ></div>
                                                    </div>
                                                </div>
                                                <span className="ml-2 w-12 text-right">{job.experienceMatch}%</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-4 flex flex-wrap gap-2">
                                        {job.skills.map((skill, index) => (
                                            <span
                                                key={index}
                                                className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="mt-4 pt-4 border-t flex justify-between items-center">
                                        <div className="text-sm text-gray-500">
                                            Posted {new Date(job.createdAt).toLocaleDateString()}
                                        </div>
                                        <button className="btn btn-primary">
                                            Apply Now
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <i className="fas fa-briefcase text-4xl text-gray-400 mb-4"></i>
                            <h2 className="text-xl font-medium text-gray-900 mb-2">
                                No matches found
                            </h2>
                            <p className="text-gray-600 mb-4">
                                We couldn't find any jobs matching your profile at the moment.
                                Please check back later or update your resume.
                            </p>
                            <button
                                onClick={() => window.location.hash = 'jobs'}
                                className="btn btn-primary"
                            >
                                Browse Jobs
                            </button>
                        </div>
                    )}
                </div>
            </div>
        );
    } catch (error) {
        console.error('RecommendedJobs page render error:', error);
        reportError(error);
        return <ErrorMessage message="Failed to load recommended jobs" />;
    }
}
export default RecommendedJobs;
