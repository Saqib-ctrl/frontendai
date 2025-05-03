function NotificationBar() {
    try {
        const [notifications, setNotifications] = React.useState([]);
        const [unreadCount, setUnreadCount] = React.useState(0);
        const [showDropdown, setShowDropdown] = React.useState(false);
        const [loading, setLoading] = React.useState(false);
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        const dropdownRef = React.useRef(null);

        React.useEffect(() => {
            fetchNotifications();
            const interval = setInterval(fetchNotifications, 30000); // Poll every 30 seconds
            
            // Click outside handler
            const handleClickOutside = (event) => {
                if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                    setShowDropdown(false);
                }
            };
            
            document.addEventListener('mousedown', handleClickOutside);
            return () => {
                clearInterval(interval);
                document.removeEventListener('mousedown', handleClickOutside);
            };
        }, []);

        const fetchNotifications = async () => {
            try {
                setLoading(true);
                const response = await trickleListObjects(`notifications:${currentUser.id}`, 50, true);
                const notifs = response.items.map(item => ({
                    ...item.objectData,
                    id: item.objectId
                }));
                
                setNotifications(notifs);
                setUnreadCount(notifs.filter(n => !n.read).length);
            } catch (error) {
                console.error('Failed to fetch notifications:', error);
            } finally {
                setLoading(false);
            }
        };

        const markAsRead = async (notificationId) => {
            try {
                await trickleUpdateObject(`notifications:${currentUser.id}`, notificationId, { read: true });
                setNotifications(prev => 
                    prev.map(n => n.id === notificationId ? { ...n, read: true } : n)
                );
                setUnreadCount(prev => Math.max(0, prev - 1));
            } catch (error) {
                console.error('Failed to mark notification as read:', error);
            }
        };

        const markAllAsRead = async () => {
            try {
                await Promise.all(
                    notifications
                        .filter(n => !n.read)
                        .map(n => trickleUpdateObject(`notifications:${currentUser.id}`, n.id, { read: true }))
                );
                
                setNotifications(prev => prev.map(n => ({ ...n, read: true })));
                setUnreadCount(0);
            } catch (error) {
                console.error('Failed to mark all notifications as read:', error);
            }
        };

        return (
            <div data-name="notification-bar" className="relative" ref={dropdownRef}>
                <button style={{ padding: "10px 16px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}"
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="relative p-2 rounded-full hover:bg-gray-100 focus:outline-none"
                >
                    <i className="fas fa-bell text-gray-600"></i>
                    {unreadCount > 0 && (
                        <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                            {unreadCount}
                        </span>
                    )}
                </button>

                {showDropdown && (
                    <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                        <div className="p-4 border-b border-gray-200">
                            <div className="flex justify-between items-center">
                                <h3 className="text-lg font-semibold">Notifications</h3>
                                {unreadCount > 0 && (
                                    <button style={{ padding: "10px 16px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}"
                                        onClick={markAllAsRead}
                                        className="text-sm text-blue-600 hover:text-blue-800"
                                    >
                                        Mark all as read
                                    </button>
                                )}
                            </div>
                        </div>

                        <div className="max-h-96 overflow-y-auto">
                            {loading ? (
                                <div className="p-4 text-center">
                                    <Loading />
                                </div>
                            ) : notifications.length > 0 ? (
                                <div className="divide-y divide-gray-200">
                                    {notifications.map((notification) => (
                                        <div
                                            key={notification.id}
                                            className={`p-4 hover:bg-gray-50 cursor-pointer ${
                                                !notification.read ? 'bg-blue-50' : ''
                                            }`}
                                            onClick={() => {
                                                if (!notification.read) {
                                                    markAsRead(notification.id);
                                                }
                                                if (notification.link) {
                                                    window.location.hash = notification.link;
                                                }
                                            }}
                                        >
                                            <div className="flex items-start">
                                                <div className="flex-1">
                                                    <p className="font-medium">{notification.title}</p>
                                                    <p className="text-sm text-gray-600">{notification.message}</p>
                                                    <p className="text-xs text-gray-500 mt-1">
                                                        {new Date(notification.createdAt).toLocaleString()}
                                                    </p>
                                                </div>
                                                {!notification.read && (
                                                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="p-8 text-center text-gray-500">
                                    <i className="fas fa-bell-slash text-4xl mb-2"></i>
                                    <p>No notifications</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        );
    } catch (error) {
        console.error('NotificationBar render error:', error);
        reportError(error);
        return null;
    }
}
