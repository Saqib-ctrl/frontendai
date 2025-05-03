function MessageTabs({ activeTab, onTabChange }) {
    try {
        const tabs = [
            { id: 'direct', label: 'Direct Messages', icon: 'fa-comment' },
            { id: 'group', label: 'Group Chats', icon: 'fa-users' },
            { id: 'ai', label: 'AI Chatbot', icon: 'fa-robot' },
            { id: 'scheduled', label: 'Scheduled', icon: 'fa-clock' }
        ];

        return (
            <div data-name="messages-header" className="border-b border-gray-200">
                <div className="flex">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => onTabChange(tab.id)}
                            className={`px-4 py-3 flex items-center ${
                                activeTab === tab.id 
                                    ? 'border-b-2 border-blue-500 text-blue-600' 
                                    : 'text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            <i className={`fas ${tab.icon} mr-2`}></i>
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>
        );
    } catch (error) {
        console.error('MessageTabs render error:', error);
        reportError(error);
        return null;
    }
}
