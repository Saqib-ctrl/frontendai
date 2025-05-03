function DirectMessageList({ onSelectConversation }) {
    try {
        const [conversations, setConversations] = React.useState([]);
        const [loading, setLoading] = React.useState(false);
        const [error, setError] = React.useState('');
        
        // Get current user
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        
        React.useEffect(() => {
            const fetchDirectMessages = async () => {
                try {
                    setLoading(true);
                    // Mock API call
                    await new Promise(resolve => setTimeout(resolve, 500));
                    
                    // Mock direct message conversations
                    const mockConversations = [
                        {
                            id: 'dm1',
                            type: 'direct',
                            user: {
                                id: 'user1',
                                name: 'John Smith',
                                role: 'candidate',
                                avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
                                online: true
                            },
                            lastMessage: {
                                content: 'Thanks for considering my application',
                                timestamp: '10:30 AM',
                                unread: true
                            }
                        },
                        {
                            id: 'dm2',
                            type: 'direct',
                            user: {
                                id: 'user2',
                                name: 'Sarah Williams',
                                role: 'employer',
                                avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
                                online: false
                            },
                            lastMessage: {
                                content: 'When can you start the position?',
                                timestamp: 'Yesterday',
                                unread: false
                            }
                        },
                        {
                            id: 'dm3',
                            type: 'direct',
                            user: {
                                id: 'user3',
                                name: 'Robert Johnson',
                                role: 'admin',
                                avatar: 'https://randomuser.me/api/portraits/men/46.jpg',
                                online: true
                            },
                            lastMessage: {
                                content: 'Your profile has been approved',
                                timestamp: 'Monday',
                                unread: false
                            }
                        }
                    ];
                    
                    setConversations(mockConversations);
                    
                    // Auto-select the first conversation
                    if (mockConversations.length > 0) {
                        onSelectConversation(mockConversations[0]);
                    }
                    
                    setLoading(false);
                } catch (error) {
                    console.error('Failed to load direct messages:', error);
                    setError('Failed to load direct messages');
                    setLoading(false);
                }
            };
            
            fetchDirectMessages();
        }, [onSelectConversation]);
        
        if (loading) {
            return (
                <div className="p-4 text-center">
                    <div className="inline-block w-6 h-6 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                    <p className="mt-2 text-sm text-gray-500">Loading conversations...</p>
                </div>
            );
        }
        
        if (error) {
            return <div className="p-4 text-red-500">{error}</div>;
        }
        
        if (conversations.length === 0) {
            return (
                <div className="p-6 text-center text-gray-500">
                    <i className="fas fa-inbox text-4xl mb-2 text-gray-300"></i>
                    <p>No direct messages yet</p>
                    <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                        <i className="fas fa-plus mr-2"></i>
                        New Message
                    </button>
                </div>
            );
        }
        
        return (
            <div data-name="direct-messages-list">
                <div className="flex justify-between items-center px-4 py-3">
                    <h3 className="font-medium">Direct Messages</h3>
                    <button className="text-blue-500 hover:bg-blue-50 p-2 rounded">
                        <i className="fas fa-plus"></i>
                    </button>
                </div>
                
                <ul>
                    {conversations.map(conversation => (
                        <li 
                            key={conversation.id} 
                            className="hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                            onClick={() => onSelectConversation(conversation)}
                        >
                            <div className="flex items-center p-3">
                                <div className="relative">
                                    <img 
                                        src={conversation.user.avatar} 
                                        alt={conversation.user.name} 
                                        className="w-12 h-12 rounded-full mr-3"
                                    />
                                    {conversation.user.online && (
                                        <span className="absolute bottom-0 right-2 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
                                    )}
                                </div>
                                <div className="flex-grow min-w-0">
                                    <div className="flex justify-between items-baseline">
                                        <h4 className="font-medium truncate">{conversation.user.name}</h4>
                                        <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                                            {conversation.lastMessage.timestamp}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-600 truncate">
                                        {conversation.lastMessage.content}
                                    </p>
                                </div>
                                {conversation.lastMessage.unread && (
                                    <span className="w-2 h-2 bg-blue-500 rounded-full ml-2"></span>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        );
    } catch (error) {
        console.error('DirectMessageList render error:', error);
        reportError(error);
        return <ErrorMessage message="Failed to load direct messages" />;
    }
}
