function EmployerProfile({ employerId }) {
    try {
        const [activeTab, setActiveTab] = React.useState('about');
        const [employer, setEmployer] = React.useState(null);
        const [loading, setLoading] = React.useState(true);
        const [error, setError] = React.useState('');

        React.useEffect(() => {
            const fetchEmployer = async () => {
                try {
                    // Get employer details
                    const employerObj = await trickleGetObject('user', employerId);
                    setEmployer(employerObj.objectData);
                } catch (error) {
                    setError('Failed to load employer profile');
                } finally {
                    setLoading(false);
                }
            };

            fetchEmployer();
        }, [employerId]);

        const tabs = [
            { id: 'about', label: 'About', icon: 'fa-building' },
            { id: 'jobs', label: 'Posted Jobs', icon: 'fa-briefcase' },
            { id: 'messages', label: 'Messages', icon: 'fa-comments' }
        ];

        if (loading) return <Loading />;
        if (error) return <ErrorMessage message={error} />;

        return (
            <div data-name="employer-profile" className="max-w-7xl mx-auto">
                <div className="bg-white rounded-lg shadow">
                    <div className="p-6 border-b border-gray-200">
                        <div className="flex items-center">
                            <img
                                src={employer.logo || `https://ui-avatars.com/api/?name=${encodeURIComponent(employer.name)}&size=128`}
                                alt={employer.name}
                                className="w-24 h-24 rounded-lg object-cover"
                            />
                            <div className="ml-6">
                                <h1 className="text-3xl font-bold text-gray-900">{employer.name}</h1>
                                <p className="text-xl text-gray-600">{employer.industry}</p>
                                <p className="text-gray-500 mt-1">{employer.location}</p>
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
                                    <h3 className="text-lg font-medium">Company Overview</h3>
                                    <p className="mt-2 text-gray-600">{employer.description}</p>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <h3 className="text-lg font-medium mb-4">Company Details</h3>
                                        <dl className="space-y-2">
                                            <div className="flex">
                                                <dt className="w-32 text-gray-500">Industry</dt>
                                                <dd>{employer.industry}</dd>
                                            </div>
                                            <div className="flex">
                                                <dt className="w-32 text-gray-500">Company Size</dt>
                                                <dd>{employer.size} employees</dd>
                                            </div>
                                            <div className="flex">
                                                <dt className="w-32 text-gray-500">Founded</dt>
                                                <dd>{employer.founded}</dd>
                                            </div>
                                            <div className="flex">
                                                <dt className="w-32 text-gray-500">Website</dt>
                                                <dd>
                                                    <a href={employer.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                                        {employer.website}
                                                    </a>
                                                </dd>
                                            </div>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'jobs' && (
                            <div className="space-y-6">
                                <JobList employerId={employerId} />
                            </div>
                        )}
                        
                        {activeTab === 'messages' && <MessagingTab recipientId={employerId} />}
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('EmployerProfile render error:', error);
        reportError(error);
        return <ErrorMessage message="Failed to load employer profile" />;
    }
}
