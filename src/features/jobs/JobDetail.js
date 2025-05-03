function JobDetail({ job }) {
    try {
        const [loading, setLoading] = React.useState(false);
        const [error, setError] = React.useState('');

        const handleApply = async () => {
            setLoading(true);
            setError('');
            try {
                // Mock API call
                await new Promise(resolve => setTimeout(resolve, 1000));
                alert('Application submitted successfully!');
            } catch (error) {
                setError('Failed to submit application. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        return (
            <div data-name="job-detail" className="card">
                <h2 className="text-xl font-semibold mb-4">{job.title}</h2>
                
                <div className="space-y-4">
                    <div>
                        <h3 className="font-medium text-gray-700">Company</h3>
                        <p>{job.company}</p>
                    </div>
                    
                    <div>
                        <h3 className="font-medium text-gray-700">Location</h3>
                        <p>{job.location}</p>
                    </div>
                    
                    <div>
                        <h3 className="font-medium text-gray-700">Salary Range</h3>
                        <p>{job.salary}</p>
                    </div>
                    
                    <div>
                        <h3 className="font-medium text-gray-700">Description</h3>
                        <p className="whitespace-pre-wrap">{job.description}</p>
                    </div>
                    
                    <div>
                        <h3 className="font-medium text-gray-700">Requirements</h3>
                        <ul className="list-disc list-inside">
                            {job.requirements.map((req, index) => (
                                <li key={index}>{req}</li>
                            ))}
                        </ul>
                    </div>
                </div>
                
                {error && <ErrorMessage message={error} />}
                
                <div className="mt-6">
                    <button
                        onClick={handleApply}
                        disabled={loading}
                        className="btn btn-primary w-full"
                    >
                        {loading ? 'Submitting...' : 'Apply Now'}
                    </button>
                </div>
            </div>
        );
    } catch (error) {
        console.error('JobDetail render error:', error);
        reportError(error);
        return <ErrorMessage message="Failed to load job details" />;
    }
}
