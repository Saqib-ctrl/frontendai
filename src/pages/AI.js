function AI() {
    try {
        return (
            <div data-name="ai-page" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">AI Features</h1>
                <AIFeatures />
            </div>
        );
    } catch (error) {
        console.error('AI page render error:', error);
        reportError(error);
        return <ErrorMessage message="Failed to load AI features page" />;
    }
}
export default AI;
