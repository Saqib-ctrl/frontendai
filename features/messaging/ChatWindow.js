function ChatWindow({ conversation }) {
    try {
        const [messages, setMessages] = React.useState([]);
        const [newMessage, setNewMessage] = React.useState('');
        const [isLoading, setIsLoading] = React.useState(true);
        const [isSending, setIsSending] = React.useState(false);
        const [error, setError] = React.useState('');
        const [showEmojiPicker, setShowEmojiPicker] = React.useState(false);
        const [showAttachMenu, setShowAttachMenu] = React.useState(false);
        const [showScheduleModal, setShowScheduleModal] = React.useState(false);
        
        const messagesEndRef = React.useRef(null);
        const fileInputRef = React.useRef(null);
        
        // Get current user
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        
        // Scroll to bottom of messages
        const scrollToBottom = () => {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        };
        
        React.useEffect(() => {
            scrollToBottom();
        }, [messages]);
        
        // Fetch messages for the selected conversation
        React.useEffect(() => {
            const fetchMessages = async () => {
                if (!conversation) return;
                
                try {
                    setIsLoading(true);
                    setError('');
                    
                    // Mock API call
                    await new Promise(resolve => setTimeout(resolve, 800));
                    
                    // Generate mock messages based on conversation type
                    let mockMessages = [];
                    
                    if (conversation.type === 'direct') {
                        mockMessages = [
                            {
                                id: 'm1',
                                sender: {
                                    id: conversation.user.id,
                                    name: conversation.user.name,
                                    avatar: conversation.user.avatar
                                },
                                content: 'Hello, I saw your job posting for the Senior Developer position.',
                                timestamp: '10:15 AM',
                                status: 'read'
                            },
                            {
                                id: 'm2',
                                sender: {
                                    id: currentUser.id,
                                    name: currentUser.name,
                                    avatar: null
                                },
                                content: 'Hi there! Thanks for your interest. Do you have any specific questions about the role?',
                                timestamp: '10:18 AM',
                                status: 'read'
                            },
                            {
                                id: 'm3',
                                sender: {
                                    id: conversation.user.id,
                                    name: conversation.user.name,
                                    avatar: conversation.user.avatar
                                },
                                content: 'Yes, I was wondering about the tech stack you use and if remote work is an option?',
                                timestamp: '10:20 AM',
                                status: 'read'
                            },
                            {
                                id: 'm4',
                                sender: {
                                    id: currentUser.id,
                                    name: currentUser.name,
                                    avatar: null
                                },
                                content: 'We use React, Node.js, and PostgreSQL. And yes, we offer hybrid work arrangements with 2 days in office per week.',
                                timestamp: '10:25 AM',
                                status: 'delivered'
                            },
                            {
                                id: 'm5',
                                sender: {
                                    id: conversation.user.id,
                                    name: conversation.user.name,
                                    avatar: conversation.user.avatar
                                },
                                content: 'That sounds great! I have experience with all those technologies.',
                                timestamp: '10:28 AM',
                                status: 'read'
                            },
                            {
                                id: 'm6',
                                sender: {
                                    id: conversation.user.id,
                                    name: conversation.user.name,
                                    avatar: conversation.user.avatar
                                },
                                content: 'Thanks for considering my application',
                                timestamp: '10:30 AM',
                                status: 'delivered'
                            }
                        ];
                    } else if (conversation.type === 'group') {
                        mockMessages = [
                            {
                                id: 'm1',
                                sender: {
                                    id: 'user2',
                                    name: 'Sarah Williams',
                                    avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
                                },
                                content: 'Let\'s discuss the new candidate profiles',
                                timestamp: '1:30 PM',
                                status: 'read'
                            },
                            {
                                id: 'm2',
                                sender: {
                                    id: 'user3',
                                    name: 'Robert Johnson',
                                    avatar: 'https://randomuser.me/api/portraits/men/46.jpg'
                                },
                                content: 'I reviewed John Smith\'s application. He seems like a strong candidate for the Senior Developer role.',
                                timestamp: '1:32 PM',
                                status: 'read'
                            },
                            {
                                id: 'm3',
                                sender: {
                                    id: currentUser.id,
                                    name: currentUser.name,
                                    avatar: null
                                },
                                content: 'I agree. His technical skills match what we\'re looking for.',
                                timestamp: '1:35 PM',
                                status: 'read'
                            },
                            {
                                id: 'm4',
                                sender: {
                                    id: 'user2',
                                    name: 'Sarah Williams',
                                    avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
                                },
                                content: 'Should we schedule an interview for next week?',
                                timestamp: '1:40 PM',
                                status: 'read'
                            },
                            {
                                id: 'm5',
                                sender: {
                                    id: 'user3',
                                    name: 'Robert Johnson',
                                    avatar: 'https://randomuser.me/api/portraits/men/46.jpg'
                                },
                                content: 'Yes, I think that would be a good next step.',
                                timestamp: '1:42 PM',
                                status: 'read'
                            },
                            {
                                id: 'm6',
                                sender: {
                                    id: 'user2',
                                    name: 'Sarah Williams',
                                    avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
                                },
                                content: 'Great, I\'ll reach out to him to schedule.',
                                timestamp: '1:45 PM',
                                status: 'delivered'
                            }
                        ];
                    } else if (conversation.type === 'ai') {
                        mockMessages = [
                            {
                                id: 'm1',
                                sender: {
                                    id: conversation.id,
                                    name: conversation.name,
                                    avatar: conversation.avatar,
                                    isAI: true
                                },
                                content: `Hello! I'm ${conversation.name}. ${conversation.description}`,
                                timestamp: '2:00 PM',
                                status: 'read'
                            },
                            {
                                id: 'm2',
                                sender: {
                                    id: currentUser.id,
                                    name: currentUser.name,
                                    avatar: null
                                },
                                content: 'Hi, I have some questions about the hiring process.',
                                timestamp: '2:05 PM',
                                status: 'read'
                            },
                            {
                                id: 'm3',
                                sender: {
                                    id: conversation.id,
                                    name: conversation.name,
                                    avatar: conversation.avatar,
                                    isAI: true
                                },
                                content: 'Of course! I\'d be happy to help. What would you like to know about the hiring process?',
                                timestamp: '2:05 PM',
                                status: 'read'
                            },
                            {
                                id: 'm4',
                                sender: {
                                    id: currentUser.id,
                                    name: currentUser.name,
                                    avatar: null
                                },
                                content: 'How long does the typical interview process take?',
                                timestamp: '2:08 PM',
                                status: 'read'
                            },
                            {
                                id: 'm5',
                                sender: {
                                    id: conversation.id,
                                    name: conversation.name,
                                    avatar: conversation.avatar,
                                    isAI: true
                                },
                                content: 'Our typical interview process takes 2-3 weeks from application to offer. It includes an initial screening, a technical assessment, and 1-2 interviews with the team and hiring manager.',
                                timestamp: '2:08 PM',
                                status: 'read'
                            },
                            {
                                id: 'm6',
                                sender: {
                                    id: conversation.id,
                                    name: conversation.name,
                                    avatar: conversation.avatar,
                                    isAI: true
                                },
                                content: conversation.lastMessage.content,
                                timestamp: conversation.lastMessage.timestamp,
                                status: 'delivered'
                            }
                        ];
                    }
                    
                    setMessages(mockMessages);
                } catch (error) {
                    console.error('Error fetching messages:', error);
                    setError('Failed to load messages');
                } finally {
                    setIsLoading(false);
                }
            };
            
            fetchMessages();
        }, [conversation, currentUser]);
        
        const handleSendMessage = async (e) => {
            e.preventDefault();
            
            if (!newMessage.trim()) return;
            
            try {
                setIsSending(true);
                
                // Create new message object
                const newMessageObj = {
                    id: `new-${Date.now()}`,
                    sender: {
                        id: currentUser.id,
                        name: currentUser.name,
                        avatar: null
                    },
                    content: newMessage,
                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    status: 'sending'
                };
                
                // Add message to UI immediately
                setMessages([...messages, newMessageObj]);
                setNewMessage('');
                
                // Mock API call to send message
                await new Promise(resolve => setTimeout(resolve, 500));
                
                // Update message status
                setMessages(prevMessages => 
                    prevMessages.map(msg => 
                        msg.id === newMessageObj.id 
                            ? { ...msg, status: 'delivered' } 
                            : msg
                    )
                );
                
                // If AI conversation, generate response
                if (conversation.type === 'ai') {
                    // Show typing indicator
                    const typingIndicator = {
                        id: `typing-${Date.now()}`,
                        sender: {
                            id: conversation.id,
                            name: conversation.name,
                            avatar: conversation.avatar,
                            isAI: true
                        },
                        isTyping: true
                    };
                    
                    setMessages(prevMessages => [...prevMessages, typingIndicator]);
                    
                    // Mock API call for AI response
                    await new Promise(resolve => setTimeout(resolve, 1500));
                    
                    // Remove typing indicator and add AI response
                    setMessages(prevMessages => {
                        const filteredMessages = prevMessages.filter(msg => !msg.isTyping);
                        const aiResponse = {
                            id: `ai-${Date.now()}`,
                            sender: {
                                id: conversation.id,
                                name: conversation.name,
                                avatar: conversation.avatar,
                                isAI: true
                            },
                            content: generateAIResponse(newMessage, conversation.name),
                            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                            status: 'delivered'
                        };
                        
                        return [...filteredMessages, aiResponse];
                    });
                }
            } catch (error) {
                console.error('Error sending message:', error);
                
                // Update message status to failed
                setMessages(prevMessages => 
                    prevMessages.map(msg => 
                        msg.content === newMessage && msg.status === 'sending' 
                            ? { ...msg, status: 'failed' } 
                            : msg
                    )
                );
            } finally {
                setIsSending(false);
            }
        };
        
        const handleAttachFile = () => {
            fileInputRef.current?.click();
        };
        
        const handleFileChange = (e) => {
            const file = e.target.files[0];
            if (file) {
                // Mock file upload
                alert(`File "${file.name}" selected for upload`);
                
                // In a real application, you would upload the file to a server
                // and then send a message with the file URL
                const fileMessage = `[File] ${file.name}`;
                setNewMessage(fileMessage);
            }
        };
        
        const handleScheduleMessage = () => {
            setShowScheduleModal(true);
        };
        
        // Simple AI response generator based on input
        const generateAIResponse = (input, botName) => {
            const lowerInput = input.toLowerCase();
            
            if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
                return `Hello! How can I help you today?`;
            } else if (lowerInput.includes('interview')) {
                return `Interviews at our company typically consist of a technical assessment followed by 1-2 rounds of interviews with the team and hiring manager. Is there something specific about the interview process you'd like to know?`;
            } else if (lowerInput.includes('resume') || lowerInput.includes('cv')) {
                return `For a strong resume, highlight your relevant skills and experience, quantify your achievements, and tailor it to the job description. Would you like me to review your resume?`;
            } else if (lowerInput.includes('salary') || lowerInput.includes('compensation')) {
                return `Compensation packages are based on experience, skills, and market rates. The hiring manager would be the best person to discuss specific salary details during the interview process.`;
            } else if (lowerInput.includes('thank')) {
                return `You're welcome! Is there anything else I can help you with?`;
            } else {
                return `Thanks for your question. I'll help you find the information you need. Could you provide more details about what you're looking for?`;
            }
        };
        
        // Get message status icon
        const getMessageStatusIcon = (status) => {
            switch (status) {
                case 'sending':
                    return <i className="fas fa-circle-notch fa-spin text-gray-400"></i>;
                case 'sent':
                    return <i className="fas fa-check text-gray-400"></i>;
                case 'delivered':
                    return <i className="fas fa-check-double text-gray-400"></i>;
                case 'read':
                    return <i className="fas fa-check-double text-blue-500"></i>;
                case 'failed':
                    return <i className="fas fa-exclamation-circle text-red-500"></i>;
                default:
                    return null;
            }
        };
        
        // Format conversation header based on type
        const renderConversationHeader = () => {
            if (conversation.type === 'direct') {
                return (
                    <div className="flex items-center">
                        <div className="relative">
                            <img 
                                src={conversation.user.avatar} 
                                alt={conversation.user.name} 
                                className="w-10 h-10 rounded-full mr-3"
                            />
                            {conversation.user.online && (
                                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
                            )}
                        </div>
                        <div>
                            <h3 className="font-medium">{conversation.user.name}</h3>
                            <p className="text-xs text-gray-500">
                                {conversation.user.online ? 'Online' : 'Offline'}
                            </p>
                        </div>
                    </div>
                );
            } else if (conversation.type === 'group') {
                return (
                    <div className="flex items-center">
                        <img 
                            src={conversation.avatar} 
                            alt={conversation.name} 
                            className="w-10 h-10 rounded-full mr-3"
                        />
                        <div>
                            <h3 className="font-medium">{conversation.name}</h3>
                            <p className="text-xs text-gray-500">
                                {conversation.members.length} members
                            </p>
                        </div>
                    </div>
                );
            } else if (conversation.type === 'ai') {
                return (
                    <div className="flex items-center">
                        <div className="relative">
                            <img 
                                src={conversation.avatar} 
                                alt={conversation.name} 
                                className="w-10 h-10 rounded-full mr-3"
                            />
                            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
                        </div>
                        <div>
                            <h3 className="font-medium">{conversation.name}</h3>
                            <p className="text-xs text-gray-500">
                                AI Assistant • Always Online
                            </p>
                        </div>
                    </div>
                );
            }
        };
        
        if (isLoading) {
            return (
                <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                        <div className="inline-block w-8 h-8 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                        <p className="mt-2 text-gray-500">Loading messages...</p>
                    </div>
                </div>
            );
        }
        
        if (error) {
            return (
                <div className="flex-1 flex items-center justify-center">
                    <div className="text-center text-red-500">
                        <i className="fas fa-exclamation-circle text-4xl mb-2"></i>
                        <p>{error}</p>
                        <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                            Try Again
                        </button>
                    </div>
                </div>
            );
        }
        
        return (
            <div data-name="chat-window" className="flex flex-col h-full">
                {/* Chat header */}
                <div className="border-b border-gray-200 px-4 py-3 flex justify-between items-center">
                    {renderConversationHeader()}
                    
                    <div className="flex">
                        <button className="text-gray-500 hover:bg-gray-100 p-2 rounded-full">
                            <i className="fas fa-phone"></i>
                        </button>
                        <button className="text-gray-500 hover:bg-gray-100 p-2 rounded-full">
                            <i className="fas fa-video"></i>
                        </button>
                        <button className="text-gray-500 hover:bg-gray-100 p-2 rounded-full">
                            <i className="fas fa-info-circle"></i>
                        </button>
                    </div>
                </div>
                
                {/* Messages area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                    {messages.map((message) => (
                        message.isTyping ? (
                            <div 
                                key={message.id}
                                className="flex items-end space-x-2"
                            >
                                <img 
                                    src={message.sender.avatar} 
                                    alt={message.sender.name} 
                                    className="w-8 h-8 rounded-full"
                                />
                                <div className="bg-gray-200 rounded-lg py-2 px-3 max-w-xs">
                                    <div className="flex space-x-1">
                                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div 
                                key={message.id}
                                className={`flex ${message.sender.id === currentUser.id ? 'justify-end' : 'justify-start'}`}
                            >
                                <div className={`flex ${message.sender.id === currentUser.id ? 'flex-row-reverse' : 'flex-row'} items-end space-x-2`}>
                                    {message.sender.id !== currentUser.id && (
                                        <img 
                                            src={message.sender.avatar || 'https://via.placeholder.com/40?text=' + message.sender.name.charAt(0)} 
                                            alt={message.sender.name} 
                                            className="w-8 h-8 rounded-full"
                                        />
                                    )}
                                    
                                    <div className="flex flex-col">
                                        {conversation.type === 'group' && message.sender.id !== currentUser.id && (
                                            <span className="text-xs text-gray-500 ml-2 mb-1">{message.sender.name}</span>
                                        )}
                                        
                                        <div 
                                            className={`py-2 px-3 rounded-lg max-w-xs lg:max-w-md ${
                                                message.sender.id === currentUser.id
                                                    ? 'bg-blue-500 text-white'
                                                    : message.sender.isAI 
                                                        ? 'bg-purple-100 text-gray-800'
                                                        : 'bg-gray-200 text-gray-800'
                                            }`}
                                        >
                                            <p className="whitespace-pre-wrap">{message.content}</p>
                                        </div>
                                        
                                        <div className={`flex items-center mt-1 text-xs text-gray-500 ${
                                            message.sender.id === currentUser.id ? 'justify-end' : ''
                                        }`}>
                                            <span>{message.timestamp}</span>
                                            {message.sender.id === currentUser.id && message.status && (
                                                <span className="ml-1">
                                                    {getMessageStatusIcon(message.status)}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    ))}
                    <div ref={messagesEndRef} />
                </div>
                
                {/* Message input */}
                <div className="border-t border-gray-200 p-3">
                    <form onSubmit={handleSendMessage} className="flex items-end space-x-2">
                        <div className="relative flex-grow">
                            <textarea
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                placeholder="Type a message..."
                                className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
                                rows="1"
                                style={{ minHeight: '40px', maxHeight: '120px' }}
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault();
                                        handleSendMessage(e);
                                    }
                                }}
                            />
                            
                            <div className="absolute bottom-2 left-2 flex space-x-2">
                                <button
                                    type="button"
                                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    <i className="far fa-smile"></i>
                                </button>
                                
                                <div className="relative">
                                    <button
                                        type="button"
                                        onClick={() => setShowAttachMenu(!showAttachMenu)}
                                        className="text-gray-500 hover:text-gray-700"
                                    >
                                        <i className="fas fa-paperclip"></i>
                                    </button>
                                    
                                    {showAttachMenu && (
                                        <div className="absolute bottom-8 left-0 bg-white shadow-lg rounded-lg p-2 border border-gray-200">
                                            <button
                                                type="button"
                                                onClick={handleAttachFile}
                                                className="flex items-center px-3 py-2 hover:bg-gray-100 rounded w-full text-left"
                                            >
                                                <i className="fas fa-file mr-2 text-blue-500"></i>
                                                <span>Document</span>
                                            </button>
                                            <button
                                                type="button"
                                                className="flex items-center px-3 py-2 hover:bg-gray-100 rounded w-full text-left"
                                            >
                                                <i className="fas fa-image mr-2 text-green-500"></i>
                                                <span>Image</span>
                                            </button>
                                            <button
                                                type="button"
                                                className="flex items-center px-3 py-2 hover:bg-gray-100 rounded w-full text-left"
                                            >
                                                <i className="fas fa-link mr-2 text-purple-500"></i>
                                                <span>Link</span>
                                            </button>
                                        </div>
                                    )}
                                </div>
                                
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    className="hidden"
                                />
                            </div>
                            
                            <div className="absolute bottom-2 right-2">
                                <button
                                    type="button"
                                    onClick={handleScheduleMessage}
                                    className="text-gray-500 hover:text-gray-700 mr-2"
                                >
                                    <i className="far fa-clock"></i>
                                </button>
                            </div>
                        </div>
                        
                        <button
                            type="submit"
                            className="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-blue-600 disabled:opacity-50"
                            disabled={!newMessage.trim() || isSending}
                        >
                            {isSending ? (
                                <i className="fas fa-circle-notch fa-spin"></i>
                            ) : (
                                <i className="fas fa-paper-plane"></i>
                            )}
                        </button>
                    </form>
                </div>
                
                {/* Schedule message modal */}
                {showScheduleModal && (
                    <ScheduleMessageModal 
                        message={newMessage}
                        onClose={() => setShowScheduleModal(false)}
                        onSchedule={(message, dateTime) => {
                            alert(`Message scheduled for ${dateTime}`);
                            setShowScheduleModal(false);
                            setNewMessage('');
                        }}
                    />
                )}
            </div>
        );
    } catch (error) {
        console.error('ChatWindow render error:', error);
        reportError(error);
        return <ErrorMessage message="Failed to load chat window" />;
    }
}
