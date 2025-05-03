function Jobs() {
    try {
        const [jobs, setJobs] = React.useState([]);
        const [loading, setLoading] = React.useState(true);
        const [error, setError] = React.useState('');
        const [showPostJob, setShowPostJob] = React.useState(false);
        const [showEditJob, setShowEditJob] = React.useState(null);
        const [showDeleteConfirm, setShowDeleteConfirm] = React.useState(null);
        const [showApplications, setShowApplications] = React.useState(null);
        const [showJobDetails, setShowJobDetails] = React.useState(null);
        const [selectedJob, setSelectedJob] = React.useState(null);
        const [userResume, setUserResume] = React.useState(null);
        const [menuOpen, setMenuOpen] = React.useState(null);
        const [searchTerm, setSearchTerm] = React.useState('');
        const [filterType, setFilterType] = React.useState('all');
        const [sortBy, setSortBy] = React.useState('recent');
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        const isEmployer = currentUser?.role === 'employer';
        const isCandidate = currentUser?.role === 'candidate';
        const menuRef = React.useRef(null);

        React.useEffect(() => {
            if (isCandidate) {
                fetchUserResume();
            }
            fetchJobs();

            const handleClickOutside = (event) => {
                if (menuRef.current && !menuRef.current.contains(event.target)) {
                    setMenuOpen(null);
                }
            };
            document.addEventListener('mousedown', handleClickOutside);
            return () => document.removeEventListener('mousedown', handleClickOutside);
        }, [isCandidate]);

        const fetchUserResume = async () => {
            try {
                const response = await trickleListObjects(`resume:${currentUser.id}`, 1, true);
                if (response.items.length > 0) {
                    setUserResume(response.items[0].objectData);
                }
            } catch (error) {
                console.error('Failed to fetch resume:', error);
            }
        };

        const fetchJobs = async () => {
            try {
                setLoading(true);
                const response = await trickleListObjects('job', 100, true);
                let jobsList = response.items.map(item => ({
                    ...item.objectData,
                    id: item.objectId
                }));

                // If user is a candidate with a resume, filter and rank jobs
                if (isCandidate && userResume) {
                    jobsList = jobsList.map(job => {
                        const matchScore = calculateJobMatch(job, userResume);
                        return {
                            ...job,
                            matchScore,
                            skillsMatch: calculateSkillsMatch(job.skills, userResume.skills),
                            experienceMatch: calculateExperienceMatch(job.minExperience, userResume.experience),
                            educationMatch: calculateEducationMatch(job.requirements, userResume.education)
                        };
                    }).filter(job => job.matchScore >= 50); // Only show jobs with at least 50% match

                    // Sort by match score by default for candidates
                    jobsList.sort((a, b) => b.matchScore - a.matchScore);
                }

                // Apply search filter
                if (searchTerm) {
                    jobsList = jobsList.filter(job => 
                        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        job.description.toLowerCase().includes(searchTerm.toLowerCase())
                    );
                }

                // Apply job type filter
                if (filterType !== 'all') {
                    jobsList = jobsList.filter(job => job.type === filterType);
                }

                // Apply sorting
                if (sortBy !== 'match' || !isCandidate) {
                    jobsList.sort((a, b) => {
                        switch (sortBy) {
                            case 'recent':
                                return new Date(b.createdAt) - new Date(a.createdAt);
                            case 'salary':
                                return extractSalary(b.salary) - extractSalary(a.salary);
                            case 'experience':
                                return b.minExperience - a.minExperience;
                            default:
                                return 0;
                        }
                    });
                }

                setJobs(jobsList);
            } catch (error) {
                setError('Failed to load jobs');
            } finally {
                setLoading(false);
            }
        };

        const calculateJobMatch = (job, resume) => {
            const skillsMatch = calculateSkillsMatch(job.skills, resume.skills);
            const experienceMatch = calculateExperienceMatch(job.minExperience, resume.experience);
            const educationMatch = calculateEducationMatch(job.requirements, resume.education);

            // Weighted average
            return Math.round((skillsMatch * 0.5) + (experienceMatch * 0.3) + (educationMatch * 0.2));
        };

        const calculateSkillsMatch = (jobSkills, resumeSkills) => {
            const matchedSkills = jobSkills.filter(skill => 
                resumeSkills.some(resumeSkill => 
                    resumeSkill.toLowerCase().includes(skill.toLowerCase())
                )
            );
            return (matchedSkills.length / jobSkills.length) * 100;
        };

        const calculateExperienceMatch = (requiredYears, experience) => {
            const totalYears = experience.reduce((total, exp) => {
                const start = new Date(exp.startDate);
                const end = exp.endDate ? new Date(exp.endDate) : new Date();
                return total + (end.getFullYear() - start.getFullYear());
            }, 0);
            return Math.min((totalYears / requiredYears) * 100, 100);
        };

        const calculateEducationMatch = (requirements, education) => {
            const educationLevels = {
                'phd': 4,
                'master': 3,
                'bachelor': 2,
                'associate': 1
            };

            const requiredLevel = Object.entries(educationLevels).find(([key]) => 
                requirements.toLowerCase().includes(key)
            )?.[1] || 1;

            const userLevel = Math.max(...education.map(edu => {
                const level = Object.entries(educationLevels).find(([key]) => 
                    edu.degree.toLowerCase().includes(key)
                );
                return level ? level[1] : 1;
            }));

            return Math.min((userLevel / requiredLevel) * 100, 100);
        };

        const extractSalary = (salaryString) => {
            const numbers = salaryString.match(/\d+/g);
            return numbers ? Math.max(...numbers.map(Number)) : 0;
        };

        if (loading) return <Loading />;
        if (error) return <ErrorMessage message={error} />;

        if (isCandidate && !userResume) {
            return (
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Create Your Resume First</h2>
                        <p className="text-gray-600 mb-6">
                            To view jobs that match your skills and experience, 
                            please create or upload your resume first.
                        </p>
                        <button
                            onClick={() => window.location.hash = 'resume'}
                            className="btn btn-primary"
                        >
                            Create Resume
                        </button>
                    </div>
                </div>
            );
        }

        return (
            <div data-name="jobs-page" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                {/* Rest of the existing Jobs component code remains the same */}
            </div>
        );
    } catch (error) {
        console.error('Jobs page render error:', error);
        reportError(error);
        return <ErrorMessage message="Failed to load jobs page" />;
    }
}
