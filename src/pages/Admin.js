function Admin() {
    try {
        const [activeTab, setActiveTab] = React.useState('overview');
        const [loading, setLoading] = React.useState(true);
        const [stats, setStats] = React.useState(null);
        const [error, setError] = React.useState('');

        React.useEffect(() => {
            const fetchAdminData = async () => {
                try {
                    // Mock API call
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    setStats({
                        totalUsers: 1450,
                        activeJobs: 342,
                        applications: 2876,
                        revenue: 125000,
                        growth: 18.5,
                        conversionRate: 12.4,
                        activeEmployers: 87,
                        premiumUsers: 34,
                        systemHealth: 99.9
                    });
                } catch (error) {
                    setError('Failed to load admin data');
                } finally {
                    setLoading(false);
                }
            };

            fetchAdminData();
        }, []);

        if (loading) return <Loading />;
        if (error) return <ErrorMessage message={error} />;

        const tabs = [
            { id: 'overview', label: 'Overview', icon: 'fa-chart-line' },
            { id: 'users', label: 'Users', icon: 'fa-users' },
            { id: 'jobs', label: 'Jobs', icon: 'fa-briefcase' },
            { id: 'companies', label: 'Companies', icon: 'fa-building' },
            { id: 'analytics', label: 'Analytics', icon: 'fa-chart-pie' },
            { id: 'settings', label: 'Settings', icon: 'fa-cog' },
        ];

        const renderTabContent = () => {
            switch (activeTab) {
                case 'overview':
                    return (
                        <div data-name="admin-overview" className="space-y-6">
                            <div data-name="stats-cards" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                <div className="card bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="text-blue-100">Total Users</p>
                                            <h3 className="text-3xl font-bold mt-2">{stats.totalUsers}</h3>
                                        </div>
                                        <div className="w-10 h-10 rounded-full bg-blue-400 bg-opacity-30 flex items-center justify-center">
                                            <i className="fas fa-users"></i>
                                        </div>
                                    </div>
                                    <div className="mt-4 text-blue-100 text-sm flex items-center">
                                        <i className="fas fa-arrow-up mr-1"></i>
                                        <span>{stats.growth}% from last month</span>
                                    </div>
                                </div>
                                
                                <div className="card bg-gradient-to-br from-green-500 to-green-600 text-white">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="text-green-100">Active Jobs</p>
                                            <h3 className="text-3xl font-bold mt-2">{stats.activeJobs}</h3>
                                        </div>
                                        <div className="w-10 h-10 rounded-full bg-green-400 bg-opacity-30 flex items-center justify-center">
                                            <i className="fas fa-briefcase"></i>
                                        </div>
                                    </div>
                                    <div className="mt-4 text-green-100 text-sm">
                                        <span>{Math.round(stats.activeJobs / stats.activeEmployers)} jobs per employer avg.</span>
                                    </div>
                                </div>
                                
                                <div className="card bg-gradient-to-br from-purple-500 to-purple-600 text-white">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="text-purple-100">Applications</p>
                                            <h3 className="text-3xl font-bold mt-2">{stats.applications}</h3>
                                        </div>
                                        <div className="w-10 h-10 rounded-full bg-purple-400 bg-opacity-30 flex items-center justify-center">
                                            <i className="fas fa-file-alt"></i>
                                        </div>
                                    </div>
                                    <div className="mt-4 text-purple-100 text-sm">
                                        <span>Conversion rate: {stats.conversionRate}%</span>
                                    </div>
                                </div>
                                
                                <div className="card bg-gradient-to-br from-yellow-500 to-yellow-600 text-white">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="text-yellow-100">Revenue</p>
                                            <h3 className="text-3xl font-bold mt-2">${stats.revenue.toLocaleString()}</h3>
                                        </div>
                                        <div className="w-10 h-10 rounded-full bg-yellow-400 bg-opacity-30 flex items-center justify-center">
                                            <i className="fas fa-dollar-sign"></i>
                                        </div>
                                    </div>
                                    <div className="mt-4 text-yellow-100 text-sm">
                                        <span>${Math.round(stats.revenue / stats.premiumUsers).toLocaleString()} per premium user</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div data-name="system-status" className="card">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-semibold">System Status</h3>
                                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Operational</span>
                                </div>
                                
                                <div className="space-y-4">
                                    <div>
                                        <div className="flex justify-between mb-1">
                                            <span className="text-gray-700">System Health</span>
                                            <span className="text-gray-700">{stats.systemHealth}%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div 
                                                className="bg-green-600 h-2 rounded-full" 
                                                style={{ width: `${stats.systemHealth}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                    
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="flex items-center">
                                            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                                            <span className="text-gray-700">API Services</span>
                                        </div>
                                        <div className="flex items-center">
                                            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                                            <span className="text-gray-700">Database</span>
                                        </div>
                                        <div className="flex items-center">
                                            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                                            <span className="text-gray-700">AI Services</span>
                                        </div>
                                        <div className="flex items-center">
                                            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                                            <span className="text-gray-700">Authentication</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div data-name="recent-activities" className="card">
                                <h3 className="text-lg font-semibold mb-4">Recent Activities</h3>
                                
                                <div className="space-y-4">
                                    <div className="flex items-start">
                                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
                                            <i className="fas fa-user-plus"></i>
                                        </div>
                                        <div>
                                            <p className="font-medium">New User Registration</p>
                                            <p className="text-gray-600">John Smith registered as a candidate</p>
                                            <p className="text-sm text-gray-500">10 minutes ago</p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-start">
                                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-3">
                                            <i className="fas fa-briefcase"></i>
                                        </div>
                                        <div>
                                            <p className="font-medium">New Job Posted</p>
                                            <p className="text-gray-600">Google Inc. posted "Senior Software Engineer"</p>
                                            <p className="text-sm text-gray-500">1 hour ago</p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-start">
                                        <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mr-3">
                                            <i className="fas fa-building"></i>
                                        </div>
                                        <div>
                                            <p className="font-medium">New Company Registered</p>
                                            <p className="text-gray-600">Microsoft Inc. joined as an employer</p>
                                            <p className="text-sm text-gray-500">2 hours ago</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                case 'users':
                    return (
                        <div data-name="admin-users" className="card">
                            <h3 className="text-lg font-semibold mb-4">User Management</h3>
                            <p className="text-gray-600">User management interface would be displayed here.</p>
                        </div>
                    );
                case 'jobs':
                    return (
                        <div data-name="admin-jobs" className="card">
                            <h3 className="text-lg font-semibold mb-4">Job Management</h3>
                            <p className="text-gray-600">Job management interface would be displayed here.</p>
                        </div>
                    );
                case 'companies':
                    return (
                        <div data-name="admin-companies" className="card">
                            <h3 className="text-lg font-semibold mb-4">Company Management</h3>
                            <p className="text-gray-600">Company management interface would be displayed here.</p>
                        </div>
                    );
                case 'analytics':
                    return (
                        <div data-name="admin-analytics" className="card">
                            <h3 className="text-lg font-semibold mb-4">Analytics Dashboard</h3>
                            <p className="text-gray-600">Advanced analytics and reporting would be displayed here.</p>
                        </div>
                    );
                case 'settings':
                    return (
                        <div data-name="admin-settings" className="card">
                            <h3 className="text-lg font-semibold mb-4">System Settings</h3>
                            <p className="text-gray-600">System configuration options would be displayed here.</p>
                        </div>
                    );
                default:
                    return null;
            }
        };

        return (
            <div data-name="admin-page">
                <div data-name="admin-header" className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                    <p className="text-gray-600 mt-1">Manage your platform and monitor system performance</p>
                </div>
                
                <div data-name="admin-tabs" className="mb-6 bg-white rounded-lg shadow-sm border border-gray-200">
                    <div className="flex overflow-x-auto">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-4 py-3 flex items-center whitespace-nowrap ${
                                    activeTab === tab.id 
                                        ? 'border-b-2 border-blue-600 text-blue-600 font-medium' 
                                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                }`}
                            >
                                <i className={`fas ${tab.icon} mr-2`}></i>
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>
                
                {renderTabContent()}
            </div>
        );
    } catch (error) {
        console.error('Admin page render error:', error);
        reportError(error);
        return <ErrorMessage message="Failed to load admin page" />;
    }
}
export default Admin;
