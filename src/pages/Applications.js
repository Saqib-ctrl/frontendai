function Applications() {
    try {
        const [applications, setApplications] = React.useState([]);
        const [loading, setLoading] = React.useState(true);
        const [error, setError] = React.useState('');

        React.useEffect(() => {
            const fetchApplications = async () => {
                try {
                    // Mock API call to fetch applications
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    setApplications([
                        {
                            id: 1,
                            jobTitle: 'Senior Software Engineer',
                            company: 'Tech Corp',
                            status: 'pending',
                            appliedDate: '2024-01-15',
                            lastUpdate: '2024-01-15'
                        },
                        // Add more mock applications...
                    ]);
                } catch (error) {
                    setError('Failed to load applications');
                } finally {
                    setLoading(false);
                }
            };

            fetchApplications();
        }, []);

        if (loading) return <Loading />;
        if (error) return <ErrorMessage message={error} />;

        return (
            <div data-name="applications-page" className="max-w-7xl mx-auto">
                <div className="bg-white rounded-lg shadow">
                    <div className="p-6">
                        <h1 className="text-3xl font-bold text-gray-900 mb-6">My Applications</h1>

                        {applications.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Job
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Company
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Status
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Applied Date
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Last Update
                                            </th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {applications.map((application) => (
                                            <tr key={application.id}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {application.jobTitle}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-500">
                                                        {application.company}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                        application.status === 'pending'
                                                            ? 'bg-yellow-100 text-yellow-800'
                                                            : application.status === 'accepted'
                                                            ? 'bg-green-100 text-green-800'
                                                            : 'bg-red-100 text-red-800'
                                                    }`}>
                                                        {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {new Date(application.appliedDate).toLocaleDateString()}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {new Date(application.lastUpdate).toLocaleDateString()}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <button className="text-blue-600 hover:text-blue-900">
                                                        View Details
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <i className="fas fa-clipboard-list text-4xl text-gray-400 mb-4"></i>
                                <h2 className="text-xl font-medium text-gray-900 mb-2">
                                    No applications yet
                                </h2>
                                <p className="text-gray-600 mb-4">
                                    Start applying to jobs to track your applications here
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
            </div>
        );
    } catch (error) {
        console.error('Applications page render error:', error);
        reportError(error);
        return <ErrorMessage message="Failed to load applications page" />;
    }
}
export default Applications;
