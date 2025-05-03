function GroupChatList({ onSelectConversation }) {
    try {
        const [groups, setGroups] = React.useState([]);
        const [loading, setLoading] = React.useState(true);
        const [error, setError] = React.useState('');
        
        React.useEffect(() => {
            const fetchGroupChats = async () => {
                try {
                    // Mock API call
                    await new Promise(resolve => setTimeout(resolve, 500));
                    
                    // Mock group chat conversations
                    const mockGroups = [
                        {
                            id: 'group1',
                            type: 'group',
                            name: 'HR Team',
                            avatar: 'https://via.placeholder.com/50/4f46e5/FFFFFF?text=HR',
                            members: [
                                { id: 'user1', name: 'John Smith' },
                                { id: 'user2', name: 'Sarah Williams' },
                                { id: 'user3', name: 'Robert Johnson' }
                            ],
                            lastMessage: {
                                sender: 'Sarah Williams',
                                content: 'Let\'s discuss the new candidate profiles',
                                timestamp: '1:45 PM',
                                unread: true
                            }
                        },
                        {
                            id: 'group2',
                            type: 'group',
                            name: 'Engineering Hiring',
                            avatar: 'https://via.placeholder.com/50/0ea5e9/FFFFFF?text=ENG',
                            members: [
                                { id: 'user1', name: 'John Smith' },
                                { id: 'user4', name: 'Michael Brown' },
                                { id: 'user5', name: 'Emily Davis' }
                            ],
                            lastMessage: {
                                sender: 'Michael Brown',
                                content: 'I think we should schedule another interview',
                                timestamp: 'Yesterday',
                                unread: false
                            }
                        },
                        {
                            id: 'group3',
                            type: 'group',
                            name: 'Marketing Team',
                            avatar: 'https://via.placeholder.com/50/f59e0b/FFFFFF?text=MKT',
                            members: [
                                { id: 'user2', name: 'Sarah Williams' },
                                { id: 'user6', name: 'Jessica Miller' },
                                { id: 'user7', name: 'Daniel Wilson' }
                            ],
                            lastMessage: {
                                sender: 'Jessica Miller',
                                content: 'The new marketing position is open',
                                timestamp: 'Monday',
                                unread: false
                            }
                        }
                    ];
                    
                    setGroups(mockGroups);
                    setLoading(false);
                } catch (error) {
                    setError('Failed to load group chats');
                    setLoading(false);
                }
            };
            
            fetchGroupChats();
        }, []);
        
        if (loading) {
            return (
                <div className="p-4 text-center">
                    <div className="inline-block w-6 h-6 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                    <p className="mt-2 text-sm text-gray-500">Loading group chats...</p>
                </div>
            );
        }
        
        if (error) {
            return <div className="p-4 text-red-500">{error}</div>;
        }
        
        if (groups.length === 0) {
            return (
                <div className="p-6 text-center text-gray-500">
                    <i className="fas fa-users text-4xl mb-2 text-gray-300"></i>
                    <p>No group chats yet</p>
                    <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                        <i className="fas fa-plus mr-2"></i>
                        Create Group
                    </button>
                </div>
            );
        }
        
        return (
            <div data-name="group-chats-list">
                <div className="flex justify-between items-center px-4 py-3">
                    <h3 className="font-medium">Group Chats</h3>
                    <button className="text-blue-500 hover:bg-blue-50 p-2 rounded">
                        <i className="fas fa-plus"></i>
                    </button>
                </div>
                
                <ul>
                    {groups.map(group => (
                        <li 
                            key={group.id} 
                            className="hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                            onClick={() => onSelectConversation(group)}
                        >
                            <div className="flex items-center p-3">
                                <img 
                                    src={group.avatar} 
                                    alt={group.name} 
                                    className="w-12 h-12 rounded-full mr-3"
                                />
                                <div className="flex-grow min-w-0">
                                    <div className="flex justify-between items-baseline">
                                        <h4 className="font-medium truncate">{group.name}</h4>
                                        <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                                            {group.lastMessage.timestamp}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-600 truncate">
                                        <span className="font-medium">{group.lastMessage.sender.split(' ')[0]}: </span>
                                        {group.lastMessage.content}
                                    </p>
                                </div>
                                {group.lastMessage.unread && (
                                    <span className="w-2 h-2 bg-blue-500 rounded-full ml-2"></span>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        );
    } catch (error) {
        console.error('GroupChatList render error:', error);
        reportError(error);
        return <ErrorMessage message="Failed to load group chats" />;
    }
}
