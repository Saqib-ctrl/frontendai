function DashboardPage() {
    try {
        return (
            <div data-name="dashboard-page" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
                <DashboardContent />
            </div>
        );
    } catch (error) {
        console.error('Dashboard page render error:', error);
        reportError(error);
        return <ErrorMessage message="Failed to load dashboard page" />;
    }
}

function DashboardContent() {
    try {
        const [stats, setStats] = React.useState(null);
        const [recentActivity, setRecentActivity] = React.useState([]);
        const [loading, setLoading] = React.useState(true);
        const [error, setError] = React.useState('');
        
        // Get current user from local storage
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        const userRole = currentUser?.role || 'candidate';

        React.useEffect(() => {
            const fetchDashboardData = async () => {
                try {
                    setLoading(true);
                    // Mock API call
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    
                    // Different stats based on user role
                    if (userRole === 'candidate') {
                        setStats({
                            appliedJobs: 12,
                            savedJobs: 24,
                            interviews: 3,
                            profileViews: 45
                        });
                        setRecentActivity([
                            {
                                id: 1,
                                type: 'application',
                                title: 'Application Submitted',
                                description: 'You applied for Senior Software Engineer position at Tech Corp',
                                timestamp: '2 hours ago'
                            },
                            {
                                id: 2,
                                type: 'view',
                                title: 'Profile Viewed',
                                description: 'Your profile was viewed by Google Inc.',
                                timestamp: '1 day ago'
                            }
                        ]);
                    } else if (userRole === 'employer') {
                        setStats({
                            activeJobs: 8,
                            totalCandidates: 124,
                            pendingReviews: 18,
                            interviews: 5
                        });
                        setRecentActivity([
                            {
                                id: 1,
                                type: 'application',
                                title: 'New Application',
                                description: 'John Doe applied for Senior Software Engineer position',
                                timestamp: '2 hours ago'
                            },
                            {
                                id: 2,
                                type: 'interview',
                                title: 'Interview Scheduled',
                                description: 'Interview with Jane Smith for UX Designer position',
                                timestamp: '1 day ago'
                            }
                        ]);
                    } else {
                        // Admin role
                        setStats({
                            totalJobs: 150,
                            activeCandidates: 1200,
                            pendingApplications: 45,
                            successfulPlacements: 89
                        });
                        setRecentActivity([
                            {
                                id: 1,
                                type: 'system',
                                title: 'System Update',
                                description: 'AI matching algorithm updated to version 2.4',
                                timestamp: '1 hour ago'
                            },
                            {
                                id: 2,
                                type: 'registration',
                                title: 'New Company',
                                description: 'Microsoft Inc. registered as a new employer',
                                timestamp: '1 day ago'
                            }
                        ]);
                    }
                } catch (error) {
                    setError('Failed to load dashboard data');
                } finally {
                    setLoading(false);
                }
            };

            fetchDashboardData();
        }, [userRole]);

        if (loading) return <Loading />;
        if (error) return <ErrorMessage message={error} />;
        
        // Get stat keys and labels based on user role
        const getStatConfig = () => {
            if (userRole === 'candidate') {
                return [
                    { key: 'appliedJobs', label: 'Applied Jobs', icon: 'fa-file-alt' },
                    { key: 'savedJobs', label: 'Saved Jobs', icon: 'fa-bookmark' },
                    { key: 'interviews', label: 'Interviews', icon: 'fa-handshake' },
                    { key: 'profileViews', label: 'Profile Views', icon: 'fa-eye' }
                ];
            } else if (userRole === 'employer') {
                return [
                    { key: 'activeJobs', label: 'Active Jobs', icon: 'fa-briefcase' },
                    { key: 'totalCandidates', label: 'Total Candidates', icon: 'fa-users' },
                    { key: 'pendingReviews', label: 'Pending Reviews', icon: 'fa-clipboard-check' },
                    { key: 'interviews', label: 'Scheduled Interviews', icon: 'fa-calendar-check' }
                ];
            } else {
                return [
                    { key: 'totalJobs', label: 'Total Jobs', icon: 'fa-briefcase' },
                    { key: 'activeCandidates', label: 'Active Candidates', icon: 'fa-users' },
                    { key: 'pendingApplications', label: 'Pending Applications', icon: 'fa-clipboard-list' },
                    { key: 'successfulPlacements', label: 'Successful Placements', icon: 'fa-check-circle' }
                ];
            }
        };
        
        const statConfig = getStatConfig();
        
        // Get appropriate icon for activity type
        const getActivityIcon = (type) => {
            switch (type) {
                case 'application': return 'fa-file-alt';
                case 'view': return 'fa-eye';
                case 'interview': return 'fa-handshake';
                case 'system': return 'fa-cogs';
                case 'registration': return 'fa-user-plus';
                default: return 'fa-bell';
            }
        };
        
        // Get color for activity type
        const getActivityColor = (type) => {
            switch (type) {
                case 'application': return 'text-blue-600 bg-blue-100';
                case 'view': return 'text-green-600 bg-green-100';
                case 'interview': return 'text-purple-600 bg-purple-100';
                case 'system': return 'text-gray-600 bg-gray-100';
                case 'registration': return 'text-yellow-600 bg-yellow-100';
                default: return 'text-blue-600 bg-blue-100';
            }
        };

        return (
            <div data-name="dashboard" className="space-y-6">
                {/* Welcome message */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h2 className="text-2xl font-semibold text-gray-800">
                        Welcome back, {currentUser?.name || 'User'}!
                    </h2>
                    <p className="text-gray-600 mt-1">
                        Here's what's happening with your {userRole === 'candidate' ? 'job search' : 
                            userRole === 'employer' ? 'recruitment' : 'platform'} today.
                    </p>
                </div>
                
                {/* Stats */}
                <div data-name="stats" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {statConfig.map((stat, index) => (
                        <div key={index} className="card">
                            <div className="flex items-center mb-2">
                                <div className={`w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3`}>
                                    <i className={`fas ${stat.icon}`}></i>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-700">{stat.label}</h3>
                            </div>
                            <p className="text-3xl font-bold text-blue-600">{stats[stat.key]}</p>
                        </div>
                    ))}
                </div>
                
                {/* Recent Activity */}
                <div data-name="recent-activity" className="card">
                    <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
                    
                    {recentActivity.length > 0 ? (
                        <div className="space-y-4">
                            {recentActivity.map(activity => (
                                <div key={activity.id} className="flex items-start">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${getActivityColor(activity.type)}`}>
                                        <i className={`fas ${getActivityIcon(activity.type)}`}></i>
                                    </div>
                                    <div>
                                        <h4 className="font-medium">{activity.title}</h4>
                                        <p className="text-gray-600">{activity.description}</p>
                                        <span className="text-sm text-gray-500">{activity.timestamp}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500">No recent activity to show.</p>
                    )}
                </div>
                
                {/* Role-specific sections */}
                {userRole === 'candidate' && (
                    <div data-name="job-recommendations" className="card">
                        <h3 className="text-xl font-semibold mb-4">Recommended Jobs</h3>
                        <div className="space-y-4">
                            <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
                                <h4 className="font-medium">Senior Frontend Developer</h4>
                                <p className="text-gray-600">Google Inc. • San Francisco, CA</p>
                                <p className="text-sm text-gray-500 mt-1">Posted 2 days ago</p>
                            </div>
                            <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
                                <h4 className="font-medium">UX Designer</h4>
                                <p className="text-gray-600">Facebook • Remote</p>
                                <p className="text-sm text-gray-500 mt-1">Posted 3 days ago</p>
                            </div>
                        </div>
                    </div>
                )}
                
                {userRole === 'employer' && (
                    <div data-name="candidate-matches" className="card">
                        <h3 className="text-xl font-semibold mb-4">Top Candidate Matches</h3>
                        <div className="space-y-4">
                            <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
                                <div className="flex items-center">
                                    <img src="https://via.placeholder.com/40" alt="Candidate" className="rounded-full mr-3" />
                                    <div>
                                        <h4 className="font-medium">John Smith</h4>
                                        <p className="text-gray-600">Senior Developer • 94% match</p>
                                    </div>
                                </div>
                            </div>
                            <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
                                <div className="flex items-center">
                                    <img src="https://via.placeholder.com/40" alt="Candidate" className="rounded-full mr-3" />
                                    <div>
                                        <h4 className="font-medium">Sarah Johnson</h4>
                                        <p className="text-gray-600">UX Designer • 91% match</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                
                {userRole === 'admin' && (
                    <div data-name="platform-health" className="card">
                        <h3 className="text-xl font-semibold mb-4">Platform Health</h3>
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between mb-1">
                                    <span className="text-gray-700">System Uptime</span>
                                    <span className="text-gray-700">99.9%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '99.9%' }}></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between mb-1">
                                    <span className="text-gray-700">API Response Time</span>
                                    <span className="text-gray-700">210ms</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '92%' }}></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between mb-1">
                                    <span className="text-gray-700">AI Model Accuracy</span>
                                    <span className="text-gray-700">96.5%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '96.5%' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    } catch (error) {
        console.error('Dashboard render error:', error);
        reportError(error);
        return <ErrorMessage message="Failed to load dashboard" />;
    }
}
