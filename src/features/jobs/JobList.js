function JobList({ onSelectJob }) {
    try {
        const [jobs, setJobs] = React.useState([]);
        const [loading, setLoading] = React.useState(true);
        const [error, setError] = React.useState('');

        React.useEffect(() => {
            const fetchJobs = async () => {
                try {
                    // Mock API call
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    setJobs([
                        {
                            id: 1,
                            title: 'Senior Software Engineer',
                            company: 'Tech Corp',
                            location: 'San Francisco, CA',
                            salary: '$120,000 - $150,000',
                            description: 'We are looking for a senior software engineer...',
                            requirements: [
                                '5+ years of experience',
                                'Strong JavaScript skills',
                                'React expertise'
                            ]
                        },
                        // Add more mock jobs...
                    ]);
                } catch (error) {
                    setError('Failed to load jobs');
                } finally {
                    setLoading(false);
                }
            };

            fetchJobs();
        }, []);

        if (loading) return <Loading />;
        if (error) return <ErrorMessage message={error} />;

        return (
            <div data-name="job-list" className="space-y-4">
                {jobs.map(job => (
                    <div
                        key={job.id}
                        className="card cursor-pointer hover:shadow-md transition-shadow"
                        onClick={() => onSelectJob(job)}
                    >
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-lg font-semibold mb-2">{job.title}</h3>
                                <p className="text-gray-600">{job.company}</p>
                                <p className="text-gray-500 text-sm">{job.location}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-blue-600 font-medium">{job.salary}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    } catch (error) {
        console.error('JobList render error:', error);
        reportError(error);
        return <ErrorMessage message="Failed to load job listings" />;
    }
}
