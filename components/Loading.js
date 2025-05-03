function Loading() {
    try {
        return (
            <div data-name="loading" className="flex flex-col items-center justify-center p-4">
                <div className="loading-spinner"></div>
                <p className="mt-4 text-gray-600">Loading...</p>
            </div>
        );
    } catch (error) {
        console.error('Loading render error:', error);
        reportError(error);
        return null;
    }
}
