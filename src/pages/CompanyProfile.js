function CompanyProfile({ companyId }) {
    try {
        const [activeTab, setActiveTab] = React.useState('about');
        const [company, setCompany] = React.useState(null);
        const [loading, setLoading] = React.useState(true);
        const [error, setError] = React.useState('');

        React.useEffect(() => {
            const fetchCompany = async () => {
                try {
                    // Mock API call
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    setCompany({
                        id: companyId,
                        name: 'Tech Corp',
                        logo: 'https://via.placeholder.com/128',
                        industry: 'Technology',
                        size: '1000-5000',
                        location: 'San Francisco, CA',
                        description: 'Leading technology company specializing in cloud solutions',
                        website: 'www.techcorp.com',
                        founded: '2010'
                    });
                } catch (error) {
                    setError('Failed to load company profile');
                } finally {
                    setLoading(false);
                }
            };

            fetchCompany();
        }, [companyId]);

        const tabs = [
            { id: 'about', label: 'About', icon: 'fa-building' },
            { id: 'jobs', label: 'Jobs', icon: 'fa-briefcase' },
            { id: 'messages', label: 'Messages', icon: 'fa-comments' }
        ];

        const renderTabContent = () => {
            if (!company) return null;

            switch (activeTab) {
                case 'about':
                    return (
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-medium">Company Overview</h3>
                                <p className="mt-2 text-gray-600">{company.description}</p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="text-lg font-medium mb-4">Company Details</h3>
                                    <dl className="space-y-2">
                                        <div className="flex">
                                            <dt className="w-32 text-gray-500">Industry</dt>
                                            <dd>{company.industry}</dd>
                                        </div>
                                        <div className="flex">
                                            <dt className="w-32 text-gray-500">Company Size</dt>
                                            <dd>{company.size} employees</dd>
                                        </div>
                                        <div className="flex">
                                            <dt className="w-32 text-gray-500">Founded</dt>
                                            <dd>{company.founded}</dd>
                                        </div>
                                        <div className="flex">
                                            <dt className="w-32 text-gray-500">Website</dt>
                                            <dd>
                                                <a href={`https://${company.website}`} className="text-blue-600 hover:underline">
                                                    {company.website}
                                                </a>
                                            </dd>
                                        </div>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    );
                case 'jobs':
                    return <JobList companyId={companyId} />;
                case 'messages':
                    return <MessagingTab recipientId={companyId} />;
                default:
                    return null;
            }
        };

        if (loading) return <Loading />;
        if (error) return <ErrorMessage message={error} />;

        return (
            <div data-name="company-profile" className="max-w-7xl mx-auto">
                <div className="bg-white rounded-lg shadow">
                    <div className="p-6 border-b border-gray-200">
                        <div className="flex items-center">
                            <img
                                src={company.logo}
                                alt={company.name}
                                className="w-24 h-24 rounded-lg"
                            />
                            <div className="ml-6">
                                <h1 className="text-3xl font-bold text-gray-900">{company.name}</h1>
                                <p className="text-xl text-gray-600">{company.industry}</p>
                                <p className="text-gray-500 mt-1">{company.location}</p>
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
                        {renderTabContent()}
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('CompanyProfile render error:', error);
        reportError(error);
        return <ErrorMessage message="Failed to load company profile" />;
    }
}
export default CompanyProfile;
