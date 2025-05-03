import React from 'react';
import NotificationBar from './NotificationBar';
import SearchBar from './SearchBar';

function Header({ currentUser, setCurrentUser }) {
    try {
        const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
        const [isSearchOpen, setIsSearchOpen] = React.useState(false);

        const handleLogout = () => {
            try {
                localStorage.removeItem('currentUser');
                setCurrentUser(null);
                window.location.hash = 'login';
            } catch (error) {
                console.error('Logout error:', error);
            }
        };

        const handleNavigation = (path) => {
            window.location.hash = path;
            setIsMobileMenuOpen(false);
        };

        const getRoleBadgeColor = (role) => {
            switch (role) {
                case 'admin':
                    return 'bg-purple-100 text-purple-800';
                case 'employer':
                    return 'bg-blue-100 text-blue-800';
                case 'candidate':
                default:
                    return 'bg-green-100 text-green-800';
            }
        };

        return (
            <header data-name="header" className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
                <div className="container-fluid">
                    <div className="flex justify-between items-center h-16 md:h-14">
                        <div className="flex items-center">
                            {currentUser && (
                                <button
                                    style={{
                                        padding: '10px 16px',
                                        backgroundColor: '#007bff',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '4px',
                                        cursor: 'pointer'
                                    }}
                                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                    className="md:hidden mr-2 p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100"
                                >
                                    <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
                                </button>
                            )}

                            <div
                                className="flex items-center cursor-pointer"
                                onClick={() => handleNavigation('home')}
                            >
                                <i className="fas fa-users-gear text-blue-600 text-2xl mr-2"></i>
                                <h1 className="text-xl font-bold text-gray-900 hidden sm:block">AI HR Platform</h1>
                            </div>
                        </div>

                        {currentUser && (
                            <div className="hidden md:block flex-1 mx-8">
                                <SearchBar />
                            </div>
                        )}

                        <div className="flex items-center space-x-4">
                            {currentUser ? (
                                <>
                                    <button
                                        style={{
                                            padding: '10px 16px',
                                            backgroundColor: '#007bff',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '4px',
                                            cursor: 'pointer'
                                        }}
                                        onClick={() => setIsSearchOpen(!isSearchOpen)}
                                        className="md:hidden p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100"
                                    >
                                        <i className="fas fa-search"></i>
                                    </button>

                                    <NotificationBar />

                                    <div className="hidden sm:flex items-center">
                                        <span className="text-gray-700 mr-2">{currentUser.name}</span>
                                        <span className={`px-2 py-1 text-xs rounded-full ${getRoleBadgeColor(currentUser.role)}`}>
                                            {currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1)}
                                        </span>
                                    </div>

                                    <button
                                        style={{
                                            padding: '10px 16px',
                                            backgroundColor: '#007bff',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '4px',
                                            cursor: 'pointer'
                                        }}
                                        onClick={handleLogout}
                                        className="btn btn-secondary hidden sm:flex"
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <div className="flex items-center space-x-2 sm:space-x-4">
                                    <button
                                        style={{
                                            padding: '10px 16px',
                                            backgroundColor: '#007bff',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '4px',
                                            cursor: 'pointer'
                                        }}
                                        onClick={() => handleNavigation('login')}
                                        className="btn btn-primary"
                                    >
                                        Login
                                    </button>
                                    <button
                                        style={{
                                            padding: '10px 16px',
                                            backgroundColor: '#007bff',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '4px',
                                            cursor: 'pointer'
                                        }}
                                        onClick={() => handleNavigation('register')}
                                        className="btn btn-secondary hidden sm:inline-flex"
                                    >
                                        Register
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Mobile Search */}
                    {isSearchOpen && currentUser && (
                        <div className="md:hidden pb-4 px-4">
                            <SearchBar />
                        </div>
                    )}

                    {/* Mobile Menu */}
                    {isMobileMenuOpen && currentUser && (
                        <div className="md:hidden border-t border-gray-200">
                            <div className="py-2 space-y-1">
                                <div className="px-4 py-3 border-b border-gray-200">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0">
                                            <span className="inline-block h-10 w-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                                                {currentUser.name.charAt(0).toUpperCase()}
                                            </span>
                                        </div>
                                        <div className="ml-3">
                                            <div className="text-base font-medium text-gray-800">{currentUser.name}</div>
                                            <div className="text-sm font-medium text-gray-500">{currentUser.email}</div>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    style={{
                                        padding: '10px 16px',
                                        backgroundColor: '#007bff',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '4px',
                                        cursor: 'pointer'
                                    }}
                                    onClick={handleLogout}
                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    Logout
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </header>
        );
    } catch (error) {
        console.error('Header render error:', error);
        return null;
    }
}

export default Header;
