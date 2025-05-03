import React from 'react';
import ReactDOM from 'react-dom/client';

// Import components
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import Loading from './components/Loading';
import ErrorMessage from './components/ErrorMessage';

import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import Home from './pages/Home';
import DashboardPage from './pages/Dashboard';
import AI from './pages/AI';
import Messages from './pages/Messages';

import CandidateProfile from './pages/CandidateProfile';
import EmployerProfile from './pages/EmployerProfile';


import Applications from './features/candidate/Applications';
import RecommendedJobs from './features/candidate/RecommendedJobs';

import Candidates from './features/employer/Candidates';
import Admin from './features/admin/Analytics';
import AdminAI from './features/admin/AdminAI';

import { getCurrentUser } from './utils/auth';
import { reportError } from './utils/logger';

function App() {
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

    const handleRoute = () => {
      const hash = window.location.hash.slice(1);
      const [page, params] = hash.split('?');
      setCurrentPage(page || 'home');

      if (params) {
        const urlParams = new URLSearchParams(params);
        const paramObj = {};
        for (const [key, value] of urlParams.entries()) {
          paramObj[key] = value;
        }
        setPageParams(paramObj);
      } else {
        setPageParams({});
      }
    };

    checkAuth();
    window.addEventListener('hashchange', handleRoute);
    return () => window.removeEventListener('hashchange', handleRoute);
  }, []);

  const renderPage = () => {
    // Public pages
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

    // Force login if not authenticated
    if (!currentUser) {
      window.location.hash = 'login';
      return <Login />;
    }

    // Shared pages
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

    // Role-specific routing
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

    const availablePages = rolePages[currentUser?.role] || rolePages.candidate;
    return availablePages[currentPage] || <DashboardPage />;
  };

  try {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center min-h-screen" data-name="loading-container">
          <Loading />
        </div>
      );
    }

    return (
      <div className="main-container" data-name="app-container">
        <Header currentUser={currentUser} setCurrentUser={setCurrentUser} />
        <div className="layout-wrapper" data-name="layout-wrapper">
          {currentUser && (
            <Sidebar
              currentUser={currentUser}
              currentPage={currentPage}
              onNavigate={setCurrentPage}
              collapsed={sidebarCollapsed}
              onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
            />
          )}
          <main className={`main-content ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`} data-name="main-content">
            <div className="content-area">{renderPage()}</div>
            <Footer className={sidebarCollapsed ? 'sidebar-collapsed' : ''} />
          </main>
        </div>
      </div>
    );
  } catch (error) {
    console.error('App render error:', error);
    reportError(error);
    return (
      <div className="flex items-center justify-center min-h-screen" data-name="error-container">
        <ErrorMessage message="Something went wrong. Please try again later." />
      </div>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

export default App;
