function Candidates() {
    try {
        const [selectedCandidate, setSelectedCandidate] = React.useState(null);

        return (
            <div data-name="candidates-page" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Candidates</h1>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                        <CandidateList onSelectCandidate={setSelectedCandidate} />
                    </div>
                    <div>
                        {selectedCandidate && <CandidateDetail candidate={selectedCandidate} />}
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('Candidates page render error:', error);
        reportError(error);
        return <ErrorMessage message="Failed to load candidates page" />;
    }
}
