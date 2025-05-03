function AIChatList({ onSelectConversation }) {
    try {
        const [chatbots, setChatbots] = React.useState([]);
        const [loading, setLoading] = React.useState(true);
        const [error, setError] = React.useState('');
        
        React.useEffect(() => {
            const fetchAIChatbots = async () => {
                try {
                    // Mock API call
                    await new Promise(resolve => setTimeout(resolve, 500));
                    
                    // Mock AI chatbot conversations
                    const mockChatbots = [
                        {
                            id: 'ai1',
                            type: 'ai',
                            name: 'HR Assistant',
                            avatar: 'https://via.placeholder.com/50/10b981/FFFFFF?text=AI',
                            description: 'Ask questions about job applications and hiring process',
                            lastMessage: {
                                content: 'How can I help you with your job search today?',
                                timestamp: '2:10 PM'
                            }
                        },
                        {
                            id: 'ai2',
                            type: 'ai',
                            name: 'Interview Coach',
                            avatar: 'https://via.placeholder.com/50/6366f1/FFFFFF?text=AI',
                            description: 'Practice interview questions and get feedback',
                            lastMessage: {
                                content: 'Would you like to practice some common interview questions?',
                                timestamp: 'Yesterday'
                            }
                        },
                        {
                            id: 'ai3',
                            type: 'ai',
                            name: 'Resume Analyzer',
                            avatar: 'https://via.placeholder.com/50/ec4899/FFFFFF?text=AI',
                            description: 'Get feedback and suggestions for your resume',
                            lastMessage: {
                                content: 'Upload your resume for a detailed analysis',
                                timestamp: 'Last week'
                            }
                        }
                    ];
                    
                    setChatbots(mockChatbots);
                    setLoading(false);
                } catch (error) {
                    setError('Failed to load AI chatbots');
                    setLoading(false);
                }
            };
            
            fetchAIChatbots();
        }, []);
        
        if (loading) {
            return (
                <div className="p-4 text-center">
                    <div className="inline-block w-6 h-6 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                    <p className="mt-2 text-sm text-gray-500">Loading AI assistants...</p>
                </div>
            );
        }
        
        if (error) {
            return <div className="p-4 text-red-500">{error}</div>;
        }
        
        return (
            <div data-name="ai-chatbots-list">
                <div className="px-4 py-3">
                    <h3 className="font-medium">AI Assistants</h3>
                </div>
                
                <ul>
                    {chatbots.map(chatbot => (
                        <li 
                            key={chatbot.id} 
                            className="hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                            onClick={() => onSelectConversation(chatbot)}
                        >
                            <div className="flex items-center p-3">
                                <div className="relative">
                                    <img 
                                        src={chatbot.avatar} 
                                        alt={chatbot.name} 
                                        className="w-12 h-12 rounded-full mr-3"
                                    />
                                    <span className="absolute bottom-0 right-2 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
                                </div>
                                <div className="flex-grow min-w-0">
                                    <div className="flex justify-between items-baseline">
                                        <h4 className="font-medium truncate">{chatbot.name}</h4>
                                        <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                                            {chatbot.lastMessage.timestamp}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-600 truncate">
                                        {chatbot.lastMessage.content}
                                    </p>
                                    <p className="text-xs text-gray-500 truncate mt-1">
                                        {chatbot.description}
                                    </p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        );
    } catch (error) {
        console.error('AIChatList render error:', error);
        reportError(error);
        return <ErrorMessage message="Failed to load AI assistants" />;
    }
}
