function MessagesSettings({ activeTab, onTabChange }) {
    try {
        return (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
                <div className="border-b border-gray-200">
                    <div className="flex">
                        <button
                            className={`px-4 py-3 ${activeTab === 'email' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                            onClick={() => onTabChange('email')}
                        >
                            <i className="fas fa-envelope mr-2"></i>
                            Email Integration
                        </button>
                        <button
                            className={`px-4 py-3 ${activeTab === 'sms' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                            onClick={() => onTabChange('sms')}
                        >
                            <i className="fas fa-sms mr-2"></i>
                            SMS Integration
                        </button>
                    </div>
                </div>
                
                <div className="p-6">
                    {activeTab === 'email' ? (
                        <EmailIntegration />
                    ) : (
                        <SMSIntegration />
                    )}
                </div>
            </div>
        );
    } catch (error) {
        console.error('MessagesSettings render error:', error);
        reportError(error);
        return <ErrorMessage message="Failed to load settings" />;
    }
}
