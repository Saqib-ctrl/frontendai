function MessagesContainer({ activeTab, onTabChange, selectedConversation, onSelectConversation }) {
    try {
        return (
            <div data-name="messages-container" className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
                {/* Message Tabs */}
                <MessageTabs activeTab={activeTab} onTabChange={onTabChange} />
                
                {/* Messages Content */}
                <div data-name="messages-content" className="flex h-[calc(100vh-250px)]">
                    {/* Conversation List */}
                    <div data-name="conversations-list" className="w-1/3 border-r border-gray-200 overflow-y-auto">
                        <MessageSearch />
                        <ConversationsList 
                            activeTab={activeTab} 
                            onSelectConversation={onSelectConversation} 
                        />
                    </div>
                    
                    {/* Chat Window */}
                    <div data-name="message-area" className="w-2/3 flex flex-col">
                        {selectedConversation ? (
                            <ChatWindow conversation={selectedConversation} />
                        ) : (
                            <EmptyMessageState />
                        )}
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('MessagesContainer render error:', error);
        reportError(error);
        return <ErrorMessage message="Failed to load messages container" />;
    }
}
