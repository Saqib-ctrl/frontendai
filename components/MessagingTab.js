function MessagingTab({ recipientId }) {
    try {
        const [messages, setMessages] = React.useState([]);
        const [newMessage, setNewMessage] = React.useState('');
        const [loading, setLoading] = React.useState(true);
        const [error, setError] = React.useState('');
        const [recipient, setRecipient] = React.useState(null);
        const [showEmojiPicker, setShowEmojiPicker] = React.useState(false);
        const messagesEndRef = React.useRef(null);
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        const conversationId = [currentUser.id, recipientId].sort().join('-');

        React.useEffect(() => {
            fetchMessagesAndRecipient();
            const interval = setInterval(fetchMessagesAndRecipient, 5000); // Poll for new messages
            return () => clearInterval(interval);
        }, [recipientId]);

        React.useEffect(() => {
            scrollToBottom();
        }, [messages]);

        const fetchMessagesAndRecipient = async () => {
            try {
                setLoading(true);
                
                // Fetch recipient details
                const recipientObj = await trickleGetObject('user', recipientId);
                setRecipient(recipientObj.objectData);

                // Fetch messages
                const response = await trickleListObjects(`messages:${conversationId}`, 100, true);
                const newMessages = response.items.map(item => ({
                    ...item.objectData,
                    id: item.objectId
                }));

                // Mark messages as read
                await Promise.all(
                    newMessages
                        .filter(msg => msg.recipientId === currentUser.id && !msg.read)
                        .map(msg => 
                            trickleUpdateObject(`messages:${conversationId}`, msg.id, { read: true })
                        )
                );

                setMessages(newMessages);
            } catch (error) {
                setError('Failed to load messages');
            } finally {
                setLoading(false);
            }
        };

        const scrollToBottom = () => {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        };

        const handleSendMessage = async (e) => {
            e.preventDefault();
            if (!newMessage.trim()) return;

            try {
                // Create message
                const messageData = {
                    senderId: currentUser.id,
                    recipientId: recipientId,
                    content: newMessage,
                    timestamp: new Date().toISOString(),
                    read: false
                };

                // Save message
                const message = await trickleCreateObject(`messages:${conversationId}`, messageData);

                // Update conversation
                await trickleUpdateObject(`conversations:${conversationId}`, conversationId, {
                    lastMessage: messageData,
                    updatedAt: new Date().toISOString()
                });

                // Create notification
                await createNotification(recipientId, {
                    type: 'new_message',
                    title: 'New Message',
                    message: `${currentUser.name} sent you a message`,
                    link: `messages?id=${conversationId}`,
                    metadata: {
                        conversationId: conversationId,
                        messageId: message.objectId
                    }
                });

                // Update UI
                setMessages(prev => [...prev, { ...messageData, id: message.objectId }]);
                setNewMessage('');
                scrollToBottom();
            } catch (error) {
                setError('Failed to send message');
            }
        };

        if (loading) return <Loading />;
        if (error) return <ErrorMessage message={error} />;

        return (
            <div className="flex flex-col h-[600px] bg-white rounded-lg shadow-sm border border-gray-200">
                {/* Header */}
                <div className="p-4 border-b">
                    <div className="flex items-center">
                        <div className="relative">
                            <img
                                src={recipient?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(recipient?.name || '')}`}
                                alt={recipient?.name}
                                className="w-10 h-10 rounded-full"
                            />
                            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                        </div>
                        <div className="ml-3">
                            <h3 className="font-medium">{recipient?.name}</h3>
                            <p className="text-sm text-gray-500">{recipient?.role}</p>
                        </div>
                    </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4">
                    <div className="space-y-4">
                        {messages.map((message) => {
                            const isOwn = message.senderId === currentUser.id;

                            return (
                                <div
                                    key={message.id}
                                    className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`max-w-[70%] rounded-lg px-4 py-2 ${
                                        isOwn ? 'bg-blue-500 text-white' : 'bg-gray-100'
                                    }`}>
                                        <p className="text-sm">{message.content}</p>
                                        <div className={`text-xs mt-1 ${
                                            isOwn ? 'text-blue-100' : 'text-gray-500'
                                        }`}>
                                            {new Date(message.timestamp).toLocaleTimeString()}
                                            {isOwn && (
                                                <span className="ml-2">
                                                    {message.read ? (
                                                        <i className="fas fa-check-double"></i>
                                                    ) : (
                                                        <i className="fas fa-check"></i>
                                                    )}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                        <div ref={messagesEndRef} />
                    </div>
                </div>

                {/* Message Input */}
                <div className="p-4 border-t">
                    <form onSubmit={handleSendMessage} className="flex space-x-2">
                        <div className="relative flex-1">
                            <input style={{ padding: "8px", border: "1px solid #ccc", borderRadius: "4px", width: "100%" }}"
                                type="text"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                placeholder="Type a message..."
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button style={{ padding: "10px 16px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}"
                                type="button"
                                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            >
                                <i className="far fa-smile"></i>
                            </button>
                            {showEmojiPicker && (
                                <div className="absolute bottom-full right-0 mb-2 bg-white rounded-lg shadow-lg border p-2">
                                    {/* Simple emoji picker */}
                                    <div className="grid grid-cols-8 gap-1">
                                        {['😊', '👍', '❤️', '😂', '🎉', '👋', '💪', '🙌'].map((emoji) => (
                                            <button style={{ padding: "10px 16px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}"
                                                key={emoji}
                                                type="button"
                                                onClick={() => {
                                                    setNewMessage(prev => prev + emoji);
                                                    setShowEmojiPicker(false);
                                                }}
                                                className="text-2xl hover:bg-gray-100 p-1 rounded"
                                            >
                                                {emoji}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                        <button style={{ padding: "10px 16px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}"
                            type="submit"
                            disabled={!newMessage.trim()}
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
                        >
                            <i className="fas fa-paper-plane"></i>
                        </button>
                    </form>
                </div>
            </div>
        );
    } catch (error) {
        console.error('MessagingTab render error:', error);
        reportError(error);
        return <ErrorMessage message="Failed to load messaging" />;
    }
}
