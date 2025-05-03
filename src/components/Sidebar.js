import React from 'react';

function Sidebar({ currentUser, currentPage, onNavigate, collapsed, onToggleCollapse }) {
    try {
        const [isMobileOpen, setIsMobileOpen] = React.useState(false);

        const baseNavItems = [
            { id: 'dashboard', icon: 'fas fa-chart-line', text: 'Dashboard', link: 'dashboard' }
        ];

        const roleNavItems = {
            candidate: [
                { id: 'resume', icon: 'fas fa-file-alt', text: 'My Resume', link: 'resume' },
                { id: 'jobs', icon: 'fas fa-briefcase', text: 'Jobs', link: 'jobs' },
                { id: 'applications', icon: 'fas fa-clipboard-list', text: 'My Applications', link: 'applications' },
                { id: 'recommended', icon: 'fas fa-star', text: 'Recommended Jobs', link: 'recommended' },
                { id: 'messages', icon: 'fas fa-comments', text: 'Messages', link: 'messages' },
                { id: 'ai', icon: 'fas fa-robot', text: 'AI Tools', link: 'ai' }
            ],
            employer: [
                { id: 'candidates', icon: 'fas fa-users', text: 'Candidates', link: 'candidates' },
                { id: 'jobs', icon: 'fas fa-briefcase', text: 'My Jobs', link: 'jobs' },
                { id: 'messages', icon: 'fas fa-comments', text: 'Messages', link: 'messages' },
                { id: 'contracts', icon: 'fas fa-file-contract', text: 'Contracts', link: 'contracts' },
                { id: 'ai', icon: 'fas fa-robot', text: 'AI Tools', link: 'ai' }
            ],
            admin: [
                { id: 'candidates', icon: 'fas fa-users', text: 'Candidates', link: 'candidates' },
                { id: 'jobs', icon: 'fas fa-briefcase', text: 'Jobs', link: 'jobs' },
                { id: 'messages', icon: 'fas fa-comments', text: 'Messages', link: 'messages' },
                { id: 'companies', icon: 'fas fa-building', text: 'Companies', link: 'companies' },
                { id: 'ai', icon: 'fas fa-robot', text: 'AI Tools', link: 'ai' },
                { id: 'adminai', icon: 'fas fa-brain', text: 'Admin AI Tools', link: 'adminai' },
                { id: 'analytics', icon: 'fas fa-chart-pie', text: 'Analytics', link: 'analytics' },
                { id: 'settings', icon: 'fas fa-cog', text: 'Settings', link: 'settings' }
            ]
        };

        const navItems = [
            ...baseNavItems,
            ...(roleNavItems[currentUser?.role] || roleNavItems.candidate)
        ];

        const handleNavigation = (link) => {
            window.location.hash = link;
            onNavigate(link);
            setIsMobileOpen(false);
        };

        React.useEffect(() => {
            const handleResize = () => {
                if (window.innerWidth > 768) {
                    setIsMobileOpen(false);
                }
            };

            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }, []);

        const sidebarClasses = [
            'sidebar',
            collapsed ? 'collapsed' : '',
            isMobileOpen ? 'open' : ''
        ].filter(Boolean).join(' ');

        return (
            <aside data-name="sidebar" className={sidebarClasses}>
                <div className="flex flex-col h-full">
                    <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                        {!collapsed && (
                            <div className="flex items-center">
                                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                                    {currentUser?.name?.charAt(0).toUpperCase() || 'U'}
                                </div>
                                <div className="ml-3 overflow-hidden">
                                    <p className="font-medium text-gray-800 truncate">{currentUser?.name || 'User'}</p>
                                    <p className="text-sm text-gray-500 truncate">{currentUser?.email || 'user@example.com'}</p>
                                </div>
                            </div>
                        )}

                        <button
                            onClick={onToggleCollapse}
                            className="p-2 rounded-md hover:bg-gray-100 text-gray-500 hidden md:block"
                            style={{
                                padding: '10px 16px',
                                backgroundColor: '#007bff',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer'
                            }}
                        >
                            <i className={`fas ${collapsed ? 'fa-angle-right' : 'fa-angle-left'}`}></i>
                        </button>

                        <button
                            onClick={() => setIsMobileOpen(false)}
                            className="p-2 rounded-md hover:bg-gray-100 text-gray-500 md:hidden"
                            style={{
                                padding: '10px 16px',
                                backgroundColor: '#007bff',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer'
                            }}
                        >
                            <i className="fas fa-times"></i>
                        </button>
                    </div>

                    <nav className="flex-1 overflow-y-auto">
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => handleNavigation(item.link)}
                                className={`w-full text-left px-4 py-3 flex items-center ${
                                    currentPage === item.link
                                        ? 'bg-blue-50 text-blue-600'
                                        : 'text-gray-600 hover:bg-gray-50'
                                }`}
                                style={{
                                    padding: '10px 16px',
                                    backgroundColor: '#007bff',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer'
                                }}
                            >
                                <i className={`${item.icon} ${collapsed ? 'mx-auto' : 'w-6'}`}></i>
                                {!collapsed && <span className="ml-3">{item.text}</span>}
                            </button>
                        ))}
                    </nav>
                </div>
            </aside>
        );
    } catch (error) {
        console.error('Sidebar render error:', error);
        return null;
    }
}

export default Sidebar;
