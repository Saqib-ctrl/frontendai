function ScheduledMessageList() {
    try {
        const [scheduledMessages, setScheduledMessages] = React.useState([]);
        const [loading, setLoading] = React.useState(true);
        const [error, setError] = React.useState('');
        
        React.useEffect(() => {
            const fetchScheduledMessages = async () => {
                try {
                    // Mock API call
                    await new Promise(resolve => setTimeout(resolve, 500));
                    
                    // Mock scheduled messages
                    const mockScheduledMessages = [
                        {
                            id: 'sched1',
                            recipient: {
                                name: 'John Smith',
                                avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
                            },
                            content: 'Just following up on your application for the Software Engineer position.',
                            scheduledTime: '2023-12-15T10:00:00',
                            displayTime: 'Tomorrow, 10:00 AM',
                            status: 'pending'
                        },
                        {
                            id: 'sched2',
                            recipient: {
                                name: 'Engineering Team',
                                avatar: 'https://via.placeholder.com/50/0ea5e9/FFFFFF?text=ENG'
                            },
                            content: 'Reminder: Team meeting to discuss new candidate shortlist.',
                            scheduledTime: '2023-12-18T14:30:00',
                            displayTime: 'Monday, 2:30 PM',
                            status: 'pending'
                        },
                        {
                            id: 'sched3',
                            recipient: {
                                name: 'Sarah Williams',
                                avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
                            },
                            content: 'Your interview is scheduled for next Tuesday at 11:00 AM. Please confirm your availability.',
                            scheduledTime: '2023-12-16T09:00:00',
                            displayTime: 'Saturday, 9:00 AM',
                            status: 'pending'
                        }
                    ];
                    
                    setScheduledMessages(mockScheduledMessages);
                    setLoading(false);
                } catch (error) {
                    setError('Failed to load scheduled messages');
                    setLoading(false);
                }
            };
            
            fetchScheduledMessages();
        }, []);
        
        const handleCancelScheduled = (id, e) => {
            e.stopPropagation();
            setScheduledMessages(scheduledMessages.filter(msg => msg.id !== id));
        };
        
        const handleEditScheduled = (id, e) => {
            e.stopPropagation();
            // Implement edit functionality
            alert(`Edit scheduled message ${id}`);
        };
        
        if (loading) {
            return (
                <div className="p-4 text-center">
                    <div className="inline-block w-6 h-6 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                    <p className="mt-2 text-sm text-gray-500">Loading scheduled messages...</p>
                </div>
            );
        }
        
        if (error) {
            return <div className="p-4 text-red-500">{error}</div>;
        }
        
        if (scheduledMessages.length === 0) {
            return (
                <div className="p-6 text-center text-gray-500">
                    <i className="fas fa-clock text-4xl mb-2 text-gray-300"></i>
                    <p>No scheduled messages</p>
                    <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                        <i className="fas fa-plus mr-2"></i>
                        Schedule New Message
                    </button>
                </div>
            );
        }
        
        return (
            <div data-name="scheduled-messages-list">
                <div className="flex justify-between items-center px-4 py-3">
                    <h3 className="font-medium">Scheduled Messages</h3>
                    <button className="text-blue-500 hover:bg-blue-50 p-2 rounded">
                        <i className="fas fa-plus"></i>
                    </button>
                </div>
                
                <ul>
                    {scheduledMessages.map(message => (
                        <li 
                            key={message.id} 
                            className="hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                        >
                            <div className="p-3">
                                <div className="flex items-center mb-2">
                                    <img 
                                        src={message.recipient.avatar} 
                                        alt={message.recipient.name} 
                                        className="w-8 h-8 rounded-full mr-2"
                                    />
                                    <div className="flex-grow">
                                        <h4 className="font-medium text-sm">{message.recipient.name}</h4>
                                    </div>
                                    <div className="flex">
                                        <button 
                                            onClick={(e) => handleEditScheduled(message.id, e)}
                                            className="text-gray-500 hover:text-blue-500 p-1"
                                        >
                                            <i className="fas fa-edit"></i>
                                        </button>
                                        <button 
                                            onClick={(e) => handleCancelScheduled(message.id, e)}
                                            className="text-gray-500 hover:text-red-500 p-1"
                                        >
                                            <i className="fas fa-times"></i>
                                        </button>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                                    {message.content}
                                </p>
                                <div className="flex items-center text-xs text-gray-500">
                                    <i className="fas fa-clock mr-1"></i>
                                    <span>Scheduled for {message.displayTime}</span>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        );
    } catch (error) {
        console.error('ScheduledMessageList render error:', error);
        reportError(error);
        return <ErrorMessage message="Failed to load scheduled messages" />;
    }
}
