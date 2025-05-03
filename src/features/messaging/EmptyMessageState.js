function EmptyMessageState() {
    try {
        return (
            <div className="flex-1 flex items-center justify-center text-gray-500">
                <div className="text-center">
                    <i className="fas fa-comments text-6xl mb-4 text-gray-300"></i>
                    <p>Select a conversation to start messaging</p>
                </div>
            </div>
        );
    } catch (error) {
        console.error('EmptyMessageState render error:', error);
        reportError(error);
        return null;
    }
}
