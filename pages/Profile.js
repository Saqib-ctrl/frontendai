function Profile() {
    try {
        const [activeTab, setActiveTab] = React.useState('about');
        const [loading, setLoading] = React.useState(false);
        const [error, setError] = React.useState('');
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));

        const tabs = [
            { id: 'about', label: 'About', icon: 'fa-user' },
            { id: 'resume', label: 'Resume', icon: 'fa-file-alt' },
            { id: 'jobs', label: 'Jobs', icon: 'fa-briefcase' },
            { id: 'messages', label: 'Messages', icon: 'fa-comments' }
        ];

        const renderTabContent = () => {
            switch (activeTab) {
                case 'about':
                    return (
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold">About Me</h2>
                            {/* About content */}
                        </div>
                    );
                case 'resume':
                    return <ResumeView />;
                case 'jobs':
                    return <MatchedJobs />;
                case 'messages':
                    return <MessagingTab recipientId={currentUser?.id} />;
                default:
                    return null;
            }
        };

        return (
            <div data-name="profile-page" className="max-w-7xl mx-auto">
                <div className="bg-white rounded-lg shadow">
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
                        {error && <ErrorMessage message={error} />}
                        {loading ? <Loading /> : renderTabContent()}
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('Profile page render error:', error);
        reportError(error);
        return <ErrorMessage message="Failed to load profile page" />;
    }
}
