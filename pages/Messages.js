function Messages() {
    try {
        return (
            <div data-name="messages-page" className="max-w-7xl mx-auto">
                <div className="bg-white rounded-lg shadow">
                    <div className="p-6 border-b border-gray-200">
                        <h1 className="text-3xl font-bold text-gray-900">Messages</h1>
                    </div>
                    <ConversationsList />
                </div>
            </div>
        );
    } catch (error) {
        console.error('Messages page render error:', error);
        reportError(error);
        return <ErrorMessage message="Failed to load messages page" />;
    }
}
