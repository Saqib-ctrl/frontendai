function CandidateList({ onSelectCandidate }) {
    try {
        const [candidates, setCandidates] = React.useState([]);
        const [loading, setLoading] = React.useState(true);
        const [error, setError] = React.useState('');

        React.useEffect(() => {
            const fetchCandidates = async () => {
                try {
                    // Mock API call
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    setCandidates([
                        {
                            id: 1,
                            name: 'John Doe',
                            title: 'Senior Software Engineer',
                            experience: '8 years',
                            skills: ['JavaScript', 'React', 'Node.js', 'Python'],
                            education: 'MS in Computer Science',
                            location: 'San Francisco, CA'
                        },
                        // Add more mock candidates...
                    ]);
                } catch (error) {
                    setError('Failed to load candidates');
                } finally {
                    setLoading(false);
                }
            };

            fetchCandidates();
        }, []);

        if (loading) return <Loading />;
        if (error) return <ErrorMessage message={error} />;

        return (
            <div data-name="candidate-list" className="space-y-4">
                {candidates.map(candidate => (
                    <div
                        key={candidate.id}
                        className="card cursor-pointer hover:shadow-md transition-shadow"
                        onClick={() => onSelectCandidate(candidate)}
                    >
                        <div className="flex items-center">
                            <img
                                src={candidate.avatar || 'https://via.placeholder.com/50'}
                                alt={candidate.name}
                                className="w-12 h-12 rounded-full mr-4"
                            />
                            <div>
                                <h3 className="font-semibold">{candidate.name}</h3>
                                <p className="text-gray-600">{candidate.title}</p>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {candidate.skills.slice(0, 3).map((skill, index) => (
                                        <span
                                            key={index}
                                            className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                    {candidate.skills.length > 3 && (
                                        <span className="text-gray-500 text-sm">
                                            +{candidate.skills.length - 3} more
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    } catch (error) {
        console.error('CandidateList render error:', error);
        reportError(error);
        return <ErrorMessage message="Failed to load candidate listings" />;
    }
}
