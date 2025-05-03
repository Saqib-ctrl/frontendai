function CandidateDetail({ candidate }) {
    try {
        const [loading, setLoading] = React.useState(false);
        const [error, setError] = React.useState('');

        const handleContact = async () => {
            setLoading(true);
            setError('');
            try {
                // Mock API call
                await new Promise(resolve => setTimeout(resolve, 1000));
                alert('Contact request sent successfully!');
            } catch (error) {
                setError('Failed to send contact request. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        return (
            <div data-name="candidate-detail" className="card">
                <div className="flex items-center mb-6">
                    <img
                        src={candidate.avatar || 'https://via.placeholder.com/100'}
                        alt={candidate.name}
                        className="w-20 h-20 rounded-full mr-4"
                    />
                    <div>
                        <h2 className="text-xl font-semibold">{candidate.name}</h2>
                        <p className="text-gray-600">{candidate.title}</p>
                    </div>
                </div>
                
                <div className="space-y-4">
                    <div>
                        <h3 className="font-medium text-gray-700">Experience</h3>
                        <p>{candidate.experience}</p>
                    </div>
                    
                    <div>
                        <h3 className="font-medium text-gray-700">Skills</h3>
                        <div className="flex flex-wrap gap-2">
                            {candidate.skills.map((skill, index) => (
                                <span
                                    key={index}
                                    className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                    
                    <div>
                        <h3 className="font-medium text-gray-700">Education</h3>
                        <p>{candidate.education}</p>
                    </div>
                    
                    <div>
                        <h3 className="font-medium text-gray-700">Location</h3>
                        <p>{candidate.location}</p>
                    </div>
                </div>
                
                {error && <ErrorMessage message={error} />}
                
                <div className="mt-6">
                    <button
                        onClick={handleContact}
                        disabled={loading}
                        className="btn btn-primary w-full"
                    >
                        {loading ? 'Sending...' : 'Contact Candidate'}
                    </button>
                </div>
            </div>
        );
    } catch (error) {
        console.error('CandidateDetail render error:', error);
        reportError(error);
        return <ErrorMessage message="Failed to load candidate details" />;
    }
}
