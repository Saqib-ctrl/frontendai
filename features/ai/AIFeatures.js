function AIFeatures() {
    try {
        const [loading, setLoading] = React.useState(false);
        const [result, setResult] = React.useState('');
        const [error, setError] = React.useState('');
        const [activeFeature, setActiveFeature] = React.useState('');
        const [formData, setFormData] = React.useState({});
        const [recommendedCandidates, setRecommendedCandidates] = React.useState([]);
        const [showCandidateResults, setShowCandidateResults] = React.useState(false);

        // Get current user from local storage
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        const userRole = currentUser?.role || 'candidate';

        // Define features available for each role
        const roleFeatures = {
            candidate: {
                bio: {
                    title: 'Professional Bio Generator',
                    fields: ['experience', 'skills', 'education', 'achievements'],
                    generate: generateCandidateBio,
                    icon: 'fa-user-tie'
                },
                coverLetter: {
                    title: 'Cover Letter Generator',
                    fields: ['jobTitle', 'company', 'keySkills', 'experience'],
                    generate: generateCoverLetter,
                    icon: 'fa-file-lines'
                },
                resumeEnhancer: {
                    title: 'Resume Enhancement',
                    fields: ['currentResume', 'targetRole', 'desiredSkills'],
                    generate: enhanceResume,
                    icon: 'fa-file-word'
                }
            },
            employer: {
                job: {
                    title: 'Job Posting Generator',
                    fields: ['title', 'requirements', 'responsibilities', 'qualifications'],
                    generate: generateJobPosting,
                    icon: 'fa-briefcase'
                },
                screening: {
                    title: 'Candidate Screening Assistant',
                    fields: ['jobRequirements', 'candidateProfile', 'desiredSkills'],
                    generate: screenCandidate,
                    icon: 'fa-user-check'
                },
                recommend: {
                    title: 'Candidate Search & Recommendations',
                    specialComponent: true, // Flag for special handling
                    icon: 'fa-users'
                },
                contract: {
                    title: 'Contract Generator',
                    fields: ['employerName', 'employeeName', 'position', 'salary', 'startDate'],
                    generate: generateContract,
                    icon: 'fa-file-contract'
                }
            },
            admin: {
                analytics: {
                    title: 'Recruitment Analytics',
                    fields: ['timeframe', 'department', 'metrics'],
                    generate: generateAnalytics,
                    icon: 'fa-chart-line'
                },
                policy: {
                    title: 'Policy Generator',
                    fields: ['policyType', 'department', 'requirements'],
                    generate: generatePolicy,
                    icon: 'fa-book'
                },
                report: {
                    title: 'Performance Report Generator',
                    fields: ['reportType', 'period', 'metrics'],
                    generate: generateReport,
                    icon: 'fa-file-lines'
                },
                email: {
                    title: 'Email Template Generator',
                    fields: ['templateType', 'audience', 'purpose'],
                    generate: generateEmailTemplate,
                    icon: 'fa-envelope'
                }
            }
        };

        // Set initial active feature
        React.useEffect(() => {
            const features = roleFeatures[userRole];
            if (features) {
                setActiveFeature(Object.keys(features)[0]);
            }
        }, [userRole]);

        const features = roleFeatures[userRole] || {};

        const handleSubmit = async (e) => {
            e.preventDefault();
            setLoading(true);
            setError('');
            try {
                const result = await features[activeFeature].generate(formData);
                setResult(result);
            } catch (error) {
                setError('Failed to generate content. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        const handleCandidateSearch = async (e) => {
            e.preventDefault();
            setLoading(true);
            setError('');
            setShowCandidateResults(false);
            
            try {
                // Mock API call to search for candidates
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                // Generate mock candidates based on search criteria
                const mockCandidates = generateMockCandidates(formData);
                setRecommendedCandidates(mockCandidates);
                setShowCandidateResults(true);
            } catch (error) {
                setError('Failed to search for candidates. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        // Helper function to generate mock candidates based on search criteria
        const generateMockCandidates = (criteria) => {
            // Create a base pool of candidates
            const candidatePool = [
                {
                    id: 1,
                    name: 'John Smith',
                    age: 32,
                    gender: 'Male',
                    title: 'Senior Software Engineer',
                    experience: '8 years',
                    skills: ['JavaScript', 'React', 'Node.js', 'Python'],
                    education: 'MS in Computer Science',
                    location: 'San Francisco, CA',
                    salary: '$120,000 - $150,000',
                    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
                    match: 92
                },
                {
                    id: 2,
                    name: 'Sarah Johnson',
                    age: 28,
                    gender: 'Female',
                    title: 'UX Designer',
                    experience: '5 years',
                    skills: ['UI Design', 'User Research', 'Figma', 'Sketch'],
                    education: 'BFA in Graphic Design',
                    location: 'New York, NY',
                    salary: '$90,000 - $110,000',
                    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
                    match: 88
                },
                {
                    id: 3,
                    name: 'Michael Chen',
                    age: 35,
                    gender: 'Male',
                    title: 'Product Manager',
                    experience: '10 years',
                    skills: ['Product Strategy', 'Agile', 'Market Research', 'User Stories'],
                    education: 'MBA',
                    location: 'Seattle, WA',
                    salary: '$130,000 - $160,000',
                    avatar: 'https://randomuser.me/api/portraits/men/67.jpg',
                    match: 85
                },
                {
                    id: 4,
                    name: 'Emily Rodriguez',
                    age: 26,
                    gender: 'Female',
                    title: 'Frontend Developer',
                    experience: '3 years',
                    skills: ['HTML', 'CSS', 'JavaScript', 'React'],
                    education: 'BS in Computer Science',
                    location: 'Austin, TX',
                    salary: '$80,000 - $95,000',
                    avatar: 'https://randomuser.me/api/portraits/women/33.jpg',
                    match: 78
                },
                {
                    id: 5,
                    name: 'David Wilson',
                    age: 41,
                    gender: 'Male',
                    title: 'DevOps Engineer',
                    experience: '12 years',
                    skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD'],
                    education: 'BS in Information Technology',
                    location: 'Chicago, IL',
                    salary: '$140,000 - $170,000',
                    avatar: 'https://randomuser.me/api/portraits/men/52.jpg',
                    match: 76
                },
                {
                    id: 6,
                    name: 'Jessica Lee',
                    age: 31,
                    gender: 'Female',
                    title: 'Data Scientist',
                    experience: '6 years',
                    skills: ['Python', 'R', 'SQL', 'Machine Learning', 'TensorFlow'],
                    education: 'PhD in Statistics',
                    location: 'Boston, MA',
                    salary: '$130,000 - $150,000',
                    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
                    match: 73
                },
                {
                    id: 7,
                    name: 'Robert Taylor',
                    age: 29,
                    gender: 'Male',
                    title: 'Backend Developer',
                    experience: '4 years',
                    skills: ['Java', 'Spring', 'SQL', 'MongoDB'],
                    education: 'BS in Software Engineering',
                    location: 'Denver, CO',
                    salary: '$95,000 - $115,000',
                    avatar: 'https://randomuser.me/api/portraits/men/43.jpg',
                    match: 71
                },
                {
                    id: 8,
                    name: 'Amanda Parker',
                    age: 33,
                    gender: 'Female',
                    title: 'Project Manager',
                    experience: '7 years',
                    skills: ['Agile', 'Scrum', 'JIRA', 'Risk Management'],
                    education: 'MBA in Project Management',
                    location: 'Portland, OR',
                    salary: '$100,000 - $120,000',
                    avatar: 'https://randomuser.me/api/portraits/women/24.jpg',
                    match: 68
                }
            ];

            // Filter candidates based on criteria
            return candidatePool
                .filter(candidate => {
                    // Filter by job title if specified
                    if (criteria.jobTitle && !candidate.title.toLowerCase().includes(criteria.jobTitle.toLowerCase())) {
                        return false;
                    }
                    
                    // Filter by min age if specified
                    if (criteria.minAge && candidate.age < parseInt(criteria.minAge)) {
                        return false;
                    }
                    
                    // Filter by max age if specified
                    if (criteria.maxAge && candidate.age > parseInt(criteria.maxAge)) {
                        return false;
                    }
                    
                    // Filter by gender if specified
                    if (criteria.gender && criteria.gender !== 'Any' && candidate.gender !== criteria.gender) {
                        return false;
                    }
                    
                    // Filter by min experience if specified
                    if (criteria.minExperience) {
                        const candidateYears = parseInt(candidate.experience);
                        if (candidateYears < parseInt(criteria.minExperience)) {
                            return false;
                        }
                    }
                    
                    // Filter by skills if specified
                    if (criteria.requiredSkills) {
                        const requiredSkills = criteria.requiredSkills.split(',').map(skill => skill.trim().toLowerCase());
                        const candidateSkills = candidate.skills.map(skill => skill.toLowerCase());
                        
                        // Check if candidate has at least one of the required skills
                        const hasRequiredSkill = requiredSkills.some(skill => 
                            candidateSkills.some(candidateSkill => candidateSkill.includes(skill))
                        );
                        
                        if (!hasRequiredSkill) {
                            return false;
                        }
                    }
                    
                    // Filter by location if specified
                    if (criteria.location && !candidate.location.toLowerCase().includes(criteria.location.toLowerCase())) {
                        return false;
                    }
                    
                    return true;
                })
                // Sort by match score
                .sort((a, b) => b.match - a.match);
        };

        const renderCandidateSearchForm = () => {
            return (
                <form onSubmit={handleCandidateSearch} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-700 mb-2">Job Title</label>
                            <input
                                type="text"
                                className="input-field"
                                placeholder="e.g. Software Engineer, UX Designer"
                                value={formData.jobTitle || ''}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    jobTitle: e.target.value
                                })}
                            />
                        </div>
                        
                        <div>
                            <label className="block text-gray-700 mb-2">Required Skills</label>
                            <input
                                type="text"
                                className="input-field"
                                placeholder="e.g. JavaScript, Python, React (comma separated)"
                                value={formData.requiredSkills || ''}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    requiredSkills: e.target.value
                                })}
                            />
                        </div>
                        
                        <div>
                            <label className="block text-gray-700 mb-2">Location</label>
                            <input
                                type="text"
                                className="input-field"
                                placeholder="e.g. San Francisco, Remote"
                                value={formData.location || ''}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    location: e.target.value
                                })}
                            />
                        </div>
                        
                        <div>
                            <label className="block text-gray-700 mb-2">Minimum Experience (years)</label>
                            <input
                                type="number"
                                min="0"
                                max="50"
                                className="input-field"
                                value={formData.minExperience || ''}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    minExperience: e.target.value
                                })}
                            />
                        </div>
                        
                        <div>
                            <label className="block text-gray-700 mb-2">Age Range</label>
                            <div className="flex space-x-2">
                                <input
                                    type="number"
                                    min="18"
                                    max="100"
                                    className="input-field w-1/2"
                                    placeholder="Min"
                                    value={formData.minAge || ''}
                                    onChange={(e) => setFormData({
                                        ...formData,
                                        minAge: e.target.value
                                    })}
                                />
                                <input
                                    type="number"
                                    min="18"
                                    max="100"
                                    className="input-field w-1/2"
                                    placeholder="Max"
                                    value={formData.maxAge || ''}
                                    onChange={(e) => setFormData({
                                        ...formData,
                                        maxAge: e.target.value
                                    })}
                                />
                            </div>
                        </div>
                        
                        <div>
                            <label className="block text-gray-700 mb-2">Gender</label>
                            <select
                                className="input-field"
                                value={formData.gender || 'Any'}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    gender: e.target.value
                                })}
                            >
                                <option value="Any">Any</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Non-binary">Non-binary</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </div>
                    
                    <div className="space-y-2">
                        <label className="block text-gray-700">Additional Requirements</label>
                        <textarea
                            className="input-field min-h-[100px]"
                            placeholder="Describe any additional requirements or preferences..."
                            value={formData.additionalRequirements || ''}
                            onChange={(e) => setFormData({
                                ...formData,
                                additionalRequirements: e.target.value
                            })}
                        />
                    </div>
                    
                    <button
                        type="submit"
                        disabled={loading}
                        className="btn btn-primary w-full flex items-center justify-center"
                    >
                        {loading ? (
                            <div className="flex items-center">
                                <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></div>
                                Searching...
                            </div>
                        ) : (
                            <div className="flex items-center">
                                <i className="fas fa-search mr-2"></i>
                                Find Matching Candidates
                            </div>
                        )}
                    </button>
                </form>
            );
        };

        const renderCandidateResults = () => {
            if (!showCandidateResults) return null;
            
            return (
                <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-4">Matching Candidates ({recommendedCandidates.length})</h3>
                    
                    {recommendedCandidates.length === 0 ? (
                        <div className="bg-gray-50 p-6 rounded-lg text-center">
                            <i className="fas fa-user-slash text-gray-400 text-4xl mb-2"></i>
                            <p className="text-gray-600">No candidates match your search criteria.</p>
                            <p className="text-gray-500 text-sm mt-1">Try broadening your search parameters.</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {recommendedCandidates.map(candidate => (
                                <div key={candidate.id} className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                                    <div className="flex items-start">
                                        <img
                                            src={candidate.avatar}
                                            alt={candidate.name}
                                            className="w-16 h-16 rounded-full mr-4"
                                        />
                                        <div className="flex-grow">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h4 className="text-lg font-semibold">{candidate.name}</h4>
                                                    <p className="text-gray-600">{candidate.title}</p>
                                                </div>
                                                <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                                                    {candidate.match}% Match
                                                </div>
                                            </div>
                                            
                                            <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-3">
                                                <div className="flex items-center text-sm">
                                                    <i className="fas fa-map-marker-alt text-gray-500 w-5"></i>
                                                    <span>{candidate.location}</span>
                                                </div>
                                                <div className="flex items-center text-sm">
                                                    <i className="fas fa-briefcase text-gray-500 w-5"></i>
                                                    <span>{candidate.experience}</span>
                                                </div>
                                                <div className="flex items-center text-sm">
                                                    <i className="fas fa-user text-gray-500 w-5"></i>
                                                    <span>{candidate.age} years, {candidate.gender}</span>
                                                </div>
                                                <div className="flex items-center text-sm">
                                                    <i className="fas fa-graduation-cap text-gray-500 w-5"></i>
                                                    <span>{candidate.education}</span>
                                                </div>
                                            </div>
                                            
                                            <div className="mt-3">
                                                <div className="text-sm text-gray-500 mb-1">Skills:</div>
                                                <div className="flex flex-wrap gap-2">
                                                    {candidate.skills.map((skill, index) => (
                                                        <span
                                                            key={index}
                                                            className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs"
                                                        >
                                                            {skill}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                            
                                            <div className="mt-4 flex space-x-3">
                                                <button className="btn bg-blue-600 text-white hover:bg-blue-700 px-4 py-1 rounded text-sm">
                                                    View Profile
                                                </button>
                                                <button className="btn bg-green-600 text-white hover:bg-green-700 px-4 py-1 rounded text-sm">
                                                    Contact
                                                </button>
                                                <button className="btn bg-gray-200 text-gray-800 hover:bg-gray-300 px-4 py-1 rounded text-sm">
                                                    Save
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            );
        };

        return (
            <div data-name="ai-features" className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div data-name="feature-selector" className="md:col-span-1">
                    <div className="card">
                        <h3 className="text-lg font-semibold mb-4">AI Features</h3>
                        <nav className="space-y-2">
                            {Object.entries(features).map(([key, feature]) => (
                                <button
                                    key={key}
                                    onClick={() => {
                                        setActiveFeature(key);
                                        setFormData({});
                                        setResult('');
                                        setShowCandidateResults(false);
                                    }}
                                    className={`w-full text-left px-4 py-3 rounded flex items-center ${
                                        activeFeature === key
                                            ? 'bg-blue-50 text-blue-600'
                                            : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                                >
                                    <i className={`fas ${feature.icon} w-6`}></i>
                                    <span className="ml-2">{feature.title}</span>
                                </button>
                            ))}
                        </nav>
                    </div>
                </div>

                <div data-name="feature-content" className="md:col-span-3">
                    {activeFeature && features[activeFeature] && (
                        <div className="card">
                            <div className="flex items-center mb-6">
                                <i className={`fas ${features[activeFeature].icon} text-2xl text-blue-600 mr-3`}></i>
                                <h3 className="text-xl font-semibold">{features[activeFeature].title}</h3>
                            </div>
                            
                            {error && <ErrorMessage message={error} />}
                            
                            {features[activeFeature].specialComponent ? (
                                <div>
                                    {activeFeature === 'recommend' && (
                                        <div>
                                            {renderCandidateSearchForm()}
                                            {renderCandidateResults()}
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    {features[activeFeature].fields.map(field => (
                                        <div key={field}>
                                            <label className="block text-gray-700 mb-2 capitalize">
                                                {field.replace(/([A-Z])/g, ' $1').trim()}
                                            </label>
                                            {field.includes('resume') || field.includes('description') ? (
                                                <textarea
                                                    className="input-field min-h-[100px]"
                                                    value={formData[field] || ''}
                                                    onChange={(e) => setFormData({
                                                        ...formData,
                                                        [field]: e.target.value
                                                    })}
                                                    required
                                                />
                                            ) : (
                                                <input
                                                    type="text"
                                                    className="input-field"
                                                    value={formData[field] || ''}
                                                    onChange={(e) => setFormData({
                                                        ...formData,
                                                        [field]: e.target.value
                                                    })}
                                                    required
                                                />
                                            )}
                                        </div>
                                    ))}
                                    
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="btn btn-primary w-full flex items-center justify-center"
                                    >
                                        {loading ? (
                                            <div className="flex items-center">
                                                <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></div>
                                                Generating...
                                            </div>
                                        ) : (
                                            <div className="flex items-center">
                                                <i className="fas fa-wand-magic-sparkles mr-2"></i>
                                                Generate
                                            </div>
                                        )}
                                    </button>
                                </form>
                            )}
                            
                            {result && !features[activeFeature].specialComponent && (
                                <div className="mt-6">
                                    <div className="flex items-center justify-between mb-2">
                                        <h4 className="font-semibold">Generated Content:</h4>
                                        <button
                                            onClick={() => {
                                                navigator.clipboard.writeText(result);
                                                alert('Content copied to clipboard!');
                                            }}
                                            className="text-blue-600 hover:text-blue-700 flex items-center"
                                        >
                                            <i className="fas fa-copy mr-1"></i>
                                            Copy
                                        </button>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-lg whitespace-pre-wrap">
                                        {result}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        );
    } catch (error) {
        console.error('AIFeatures render error:', error);
        reportError(error);
        return <ErrorMessage message="Failed to load AI features" />;
    }
}
