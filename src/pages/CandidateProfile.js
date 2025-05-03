function CandidateProfile({ candidateId }) {
    try {
        const [activeTab, setActiveTab] = React.useState('about');
        const [candidate, setCandidate] = React.useState(null);
        const [loading, setLoading] = React.useState(true);
        const [error, setError] = React.useState('');

        React.useEffect(() => {
            const fetchCandidate = async () => {
                try {
                    // Get candidate details
                    const candidateObj = await trickleGetObject('user', candidateId);
                    setCandidate(candidateObj.objectData);
                } catch (error) {
                    setError('Failed to load candidate profile');
                } finally {
                    setLoading(false);
                }
            };

            fetchCandidate();
        }, [candidateId]);

        const tabs = [
            { id: 'about', label: 'About', icon: 'fa-user' },
            { id: 'resume', label: 'Resume', icon: 'fa-file-alt' },
            { id: 'messages', label: 'Messages', icon: 'fa-comments' }
        ];

        if (loading) return <Loading />;
        if (error) return <ErrorMessage message={error} />;

        return (
            <div data-name="candidate-profile" className="max-w-7xl mx-auto">
                <div className="bg-white rounded-lg shadow">
                    <div className="p-6 border-b border-gray-200">
                        <div className="flex items-center">
                            <img
                                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(candidate.name)}&size=128`}
                                alt={candidate.name}
                                className="w-24 h-24 rounded-full"
                            />
                            <div className="ml-6">
                                <h1 className="text-3xl font-bold text-gray-900">{candidate.name}</h1>
                                <p className="text-xl text-gray-600">{candidate.title}</p>
                                <p className="text-gray-500 mt-1">{candidate.location}</p>
                            </div>
                        </div>
                    </div>

                    <div className="border-b border-gray-200">
                        <nav className="flex">
                            {tabs.map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`px-6 py-4 text-sm font-medium flex items-center ${
                                        activeTab === tab.id
                                            ? 'border-b-2 border-blue-500 text-blue-600'
                                            : 'text-gray-500 hover:text-gray-700'
                                    }`}
                                >
                                    <i className={`fas ${tab.icon} mr-2`}></i>
                                    {tab.label}
                                </button>
                            ))}
                        </nav>
                    </div>

                    <div className="p-6">
                        {activeTab === 'about' && (
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-lg font-medium mb-4">Professional Summary</h3>
                                    <p className="text-gray-600">
                                        {candidate.summary || 'No summary available'}
                                    </p>
                                </div>
                                <div>
                                    <h3 className="text-lg font-medium mb-4">Skills</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {candidate.skills?.map((skill, index) => (
                                            <span
                                                key={index}
                                                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'resume' && <ResumeView data={candidate.resume} />}
                        
                        {activeTab === 'messages' && <MessagingTab recipientId={candidateId} />}
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('CandidateProfile render error:', error);
        reportError(error);
        return <ErrorMessage message="Failed to load candidate profile" />;
    }
}
export default CandidateProfile;
