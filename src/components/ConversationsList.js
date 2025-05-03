function ConversationsList() {
    try {
        const [conversations, setConversations] = React.useState([]);
        const [loading, setLoading] = React.useState(true);
        const [error, setError] = React.useState('');
        const [selectedConversation, setSelectedConversation] = React.useState(null);
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));

        React.useEffect(() => {
            fetchConversations();
            const interval = setInterval(fetchConversations, 10000); // Poll for new conversations
            return () => clearInterval(interval);
        }, []);

        const fetchConversations = async () => {
            try {
                setLoading(true);
                // Fetch all conversations where current user is involved
                const response = await trickleListObjects(`conversations:${currentUser.id}`, 100, true);
                
                // Get user details for each conversation
                const conversationsWithDetails = await Promise.all(
                    response.items.map(async (item) => {
                        const otherUserId = item.objectData.participants.find(id => id !== currentUser.id);
                        const userObj = await trickleGetObject('user', otherUserId);
                        
                        // Get last message
                        const conversationId = [currentUser.id, otherUserId].sort().join('-');
                        const messagesResponse = await trickleListObjects(`messages:${conversationId}`, 1, true);
                        const lastMessage = messagesResponse.items[0]?.objectData;

                        return {
                            id: item.objectId,
                            user: userObj.objectData,
                            lastMessage,
                            unreadCount: item.objectData.unreadCount || 0
                        };
                    })
                );

                setConversations(conversationsWithDetails);
            } catch (error) {
                setError('Failed to load conversations');
            } finally {
                setLoading(false);
            }
        };

        if (loading) return <Loading />;
        if (error) return <ErrorMessage message={error} />;

        return (
            <div className="h-[600px] bg-white rounded-lg shadow-sm border border-gray-200 flex">
                {/* Conversations List */}
                <div className="w-1/3 border-r">
                    <div className="p-4 border-b">
                        <h2 className="font-medium">Messages</h2>
                    </div>
                    <div className="overflow-y-auto h-[calc(100%-65px)]">
                        {conversations.map((conversation) => (
                            <div
                                key={conversation.id}
                                onClick={() => setSelectedConversation(conversation)}
                                className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${
                                    selectedConversation?.id === conversation.id ? 'bg-blue-50' : ''
                                }`}
                            >
                                <div className="flex items-center">
                                    <img
                                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(conversation.user.name)}`}
                                        alt={conversation.user.name}
                                        className="w-10 h-10 rounded-full"
                                    />
                                    <div className="ml-3 flex-1">
                                        <div className="flex justify-between items-baseline">
                                            <h3 className="font-medium">{conversation.user.name}</h3>
                                            {conversation.lastMessage && (
                                                <span className="text-xs text-gray-500">
                                                    {new Date(conversation.lastMessage.timestamp).toLocaleTimeString()}
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-sm text-gray-500 truncate">
                                            {conversation.lastMessage?.content || 'No messages yet'}
                                        </p>
                                    </div>
                                    {conversation.unreadCount > 0 && (
                                        <span className="ml-2 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                            {conversation.unreadCount}
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Messages Area */}
                <div className="flex-1">
                    {selectedConversation ? (
                        <MessagingTab recipientId={selectedConversation.user.id} />
                    ) : (
                        <div className="h-full flex items-center justify-center text-gray-500">
                            <div className="text-center">
                                <i className="fas fa-comments text-4xl mb-2"></i>
                                <p>Select a conversation to start messaging</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    } catch (error) {
        console.error('ConversationsList render error:', error);
        reportError(error);
        return <ErrorMessage message="Failed to load conversations" />;
    }
}
