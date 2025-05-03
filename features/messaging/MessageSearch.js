function MessageSearch() {
    try {
        return (
            <div className="p-4 border-b border-gray-200">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search messages..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
                    />
                    <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
                </div>
            </div>
        );
    } catch (error) {
        console.error('MessageSearch render error:', error);
        reportError(error);
        return null;
    }
}
