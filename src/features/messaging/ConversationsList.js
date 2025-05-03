function ConversationsList({ activeTab, onSelectConversation }) {
    try {
        switch (activeTab) {
            case 'direct':
                return <DirectMessageList onSelectConversation={onSelectConversation} />;
            case 'group':
                return <GroupChatList onSelectConversation={onSelectConversation} />;
            case 'ai':
                return <AIChatList onSelectConversation={onSelectConversation} />;
            case 'scheduled':
                return <ScheduledMessageList onSelectConversation={onSelectConversation} />;
            default:
                return null;
        }
    } catch (error) {
        console.error('ConversationsList render error:', error);
        reportError(error);
        return <ErrorMessage message="Failed to load conversations" />;
    }
}
