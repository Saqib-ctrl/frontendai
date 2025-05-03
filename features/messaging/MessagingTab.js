function MessagingTab({ recipientId }) {
    try {
        const [messages, setMessages] = React.useState([]);
        const [newMessage, setNewMessage] = React.useState('');
        const [loading, setLoading] = React.useState(true);
        const [error, setError] = React.useState('');
        const [recipient, setRecipient] = React.useState(null);
        const messagesEndRef = React.useRef(null);

        React.useEffect(() => {
            const fetchMessagesAndRecipient = async () => {
                try {
                    setLoading(true);
                    // Mock API calls
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    
                    // Mock messages
                    setMessages([
                        {
                            id: 1,
                            senderId: 'user1',
                            recipientId: recipientId,
                            content: 'Hello, I saw your profile and would like to connect.',
                            timestamp: '2024-01-15T10:30:00Z',
                            read: true
                        },
                        {
                            id: 2,
                            senderId: recipientId,
                            recipientId: 'user1',
                            content: 'Hi! Thanks for reaching out. How can I help you?',
                            timestamp: '2024-01-15T10:35:00Z',
                            read: true
                        }
                    ]);

                    // Mock recipient data
                    setRecipient({
                        id: recipientId,
                        name: 'John Doe',
                        avatar: `https://ui-avatars.com/api/?name=John+Doe&size=128`,
                        role: 'candidate',
                        online: true
                    });
                } catch (error) {
                    setError('Failed to load messages');
                } finally {
                    setLoading(false);
                }
            };

            fetchMessagesAndRecipient();
        }, [recipientId]);

        React.useEffect(() => {
            scrollToBottom();
        }, [messages]);

        const scrollToBottom = () => {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        };

        const handleSendMessage = async (e) => {
            e.preventDefault();
            if (!newMessage.trim()) return;

            const messageData = {
                id: Date.now(),
                senderId: 'user1',
                recipientId: recipientId,
                content: newMessage,
                timestamp: new Date().toISOString(),
                read: false
            };

            try {
                // Mock API call to send message
                await new Promise(resolve => setTimeout(resolve, 500));
                setMessages(prev => [...prev, messageData]);
                setNewMessage('');
            } catch (error) {
                setError('Failed to send message');
            }
        };

        if (loading) return <Loading />;
        if (error) return <ErrorMessage message={error} />;

        return (
            <div data-name="messaging-tab" className="flex flex-col h-[600px] bg-gray-50 rounded-lg border border-gray-200">
                {/* Header */}
                <div className="p-4 border-b bg-white rounded-t-lg">
                    <div className="flex items-center">
                        <div className="relative">
                            <img
                                src={recipient.avatar}
                                alt={recipient.name}
                                className="w-10 h-10 rounded-full"
                            />
                            {recipient.online && (
                                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                            )}
                        </div>
                        <div className="ml-3">
                            <h3 className="font-medium text-gray-900">{recipient.name}</h3>
                            <p className="text-sm text-gray-500">
                                {recipient.online ? 'Online' : 'Offline'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((message) => (
                        <div
                            key={message.id}
                            className={`flex ${message.senderId === 'user1' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div className={`max-w-[70%] ${message.senderId === 'user1' ? 'bg-blue-500 text-white' : 'bg-white'} rounded-lg px-4 py-2 shadow`}>
                                <p className="break-words">{message.content}</p>
                                <p className={`text-xs mt-1 ${message.senderId === 'user1' ? 'text-blue-100' : 'text-gray-500'}`}>
                                    {new Date(message.timestamp).toLocaleTimeString()}
                                </p>
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>

                {/* Message Input */}
                <div className="p-4 border-t bg-white rounded-b-lg">
                    <form onSubmit={handleSendMessage} className="flex space-x-2">
                        <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Type your message..."
                            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            type="submit"
                            disabled={!newMessage.trim()}
                            className="btn btn-primary"
                        >
                            <i className="fas fa-paper-plane mr-2"></i>
                            Send
                        </button>
                    </form>
                </div>
            </div>
        );
    } catch (error) {
        console.error('MessagingTab render error:', error);
        reportError(error);
        return <ErrorMessage message="Failed to load messaging tab" />;
    }
}
