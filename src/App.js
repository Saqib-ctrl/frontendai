function App() {
    try {
        const [currentUser, setCurrentUser] = React.useState(null);
        const [isLoading, setIsLoading] = React.useState(true);
        const [currentPage, setCurrentPage] = React.useState(window.location.hash.slice(1) || 'home');
        const [pageParams, setPageParams] = React.useState({});
        const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);

        React.useEffect(() => {
            const checkAuth = async () => {
                try {
                    const user = getCurrentUser();
                    setCurrentUser(user);
                } catch (error) {
                    console.error('Auth check failed:', error);
                } finally {
                    setIsLoading(false);
                }
            };
            
            checkAuth();

            // Handle route changes
            const handleRoute = () => {
                const hash = window.location.hash.slice(1);
                const [page, params] = hash.split('?');
                setCurrentPage(page || 'home');
                
                // Parse URL parameters
                if (params) {
                    const urlParams = new URLSearchParams(params);
                    const paramObj = {};
                    for (const [key, value] of urlParams) {
                        paramObj[key] = value;
                    }
                    setPageParams(paramObj);
                } else {
                    setPageParams({});
                }
            };

            window.addEventListener('hashchange', handleRoute);
            return () => window.removeEventListener('hashchange', handleRoute);
        }, []);

        const renderPage = () => {
            // Public pages accessible without login
            if (!currentUser && ['login', 'register', 'home', 'forgot-password'].includes(currentPage)) {
                switch (currentPage) {
                    case 'login':
                        return <Login />;
                    case 'register':
                        return <Register />;
                    case 'forgot-password':
                        return <ForgotPassword />;
                    default:
                        return <Home />;
                }
            }

            // Redirect to login if not authenticated
            if (!currentUser) {
                window.location.hash = 'login';
                return <Login />;
            }

            // Common pages for all roles
            switch (currentPage) {
                case 'dashboard':
                    return <DashboardPage />;
                case 'ai':
                    return <AI />;
                case 'messages':
                    return <Messages />;
                case 'candidate':
                    return <CandidateProfile candidateId={pageParams.id} />;
                case 'employer':
                    return <EmployerProfile employerId={pageParams.id} />;
                default:
                    break;
            }

            // Role-specific pages
            const rolePages = {
                candidate: {
                    resume: <Resume />,
                    jobs: <Jobs />,
                    applications: <Applications />,
                    recommended: <RecommendedJobs />
                },
                employer: {
                    candidates: <Candidates />,
                    jobs: <Jobs />
                },
                admin: {
                    candidates: <Candidates />,
                    jobs: <Jobs />,
                    analytics: <Admin />,
                    adminai: <AdminAI />
                }
            };

            // Get pages for current role or fallback to candidate
            const availablePages = rolePages[currentUser?.role] || rolePages.candidate;
            
            // Return requested page or fallback to dashboard
            return availablePages[currentPage] || <DashboardPage />;
        };

        if (isLoading) {
            return (
                <div data-name="loading-container" className="flex items-center justify-center min-h-screen">
                    <Loading />
                </div>
            );
        }

        return (
            <div data-name="app-container" className="main-container">
                <Header currentUser={currentUser} setCurrentUser={setCurrentUser} />
                <div data-name="layout-wrapper" className="layout-wrapper">
                    {currentUser && (
                        <Sidebar 
                            currentUser={currentUser} 
                            currentPage={currentPage}
                            onNavigate={setCurrentPage}
                            collapsed={sidebarCollapsed}
                            onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
                        />
                    )}
                    <main 
                        data-name="main-content" 
                        className={`main-content ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}
                    >
                        <div className="content-area">
                            {renderPage()}
                        </div>
                        <Footer className={sidebarCollapsed ? 'sidebar-collapsed' : ''} />
                    </main>
                </div>
            </div>
        );
    } catch (error) {
        console.error('App render error:', error);
        reportError(error);
        return (
            <div data-name="error-container" className="flex items-center justify-center min-h-screen">
                <ErrorMessage message="Something went wrong. Please try again later." />
            </div>
        );
    }
}

export default App;

