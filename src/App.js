import React, { useState, useEffect } from 'react';
import { getCurrentUser } from './utils/auth';
import { reportError } from './utils/logger';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import Loading from './components/Loading';
import ErrorMessage from './components/ErrorMessage';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import DashboardPage from './pages/Dashboard';
import AI from './pages/AI';
import Messages from './pages/Messages';
import CandidateProfile from './pages/CandidateProfile';
import EmployerProfile from './pages/EmployerProfile';
import Resume from './pages/Resume';
import Jobs from './pages/Jobs';
import Applications from './pages/Applications';
import RecommendedJobs from './pages/RecommendedJobs';
import Candidates from './pages/Candidates';
import Admin from './pages/Admin';
import AdminAI from './pages/AdminAI';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(window.location.hash.slice(1) || 'home');
  const [pageParams, setPageParams] = useState({});
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
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

    const handleRoute = () => {
      const hash = window.location.hash.slice(1);
      const [page, params] = hash.split('?');
      setCurrentPage(page || 'home');

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

    if (!currentUser) {
      window.location.hash = 'login';
      return <Login />;
    }

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

    const rolePages = {
      candidate: {
        resume: <Resume />,
        jobs: <Jobs />,
        applications: <Applications />,
        recommended: <RecommendedJobs />,
      },
      employer: {
        candidates: <Candidates />,
        jobs: <Jobs />,
      },
      admin: {
        candidates: <Candidates />,
        jobs: <Jobs />,
        analytics: <Admin />,
        adminai: <AdminAI />,
      },
    };

    const availablePages = rolePages[currentUser?.role] || rolePages.candidate;

    return availablePages[currentPage] || <DashboardPage />;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loading />
      </div>
    );
  }

  return (
    <div className="main-container">
      <Header currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <div className="layout-wrapper">
        {currentUser && (
          <Sidebar
            currentUser={currentUser}
            currentPage={currentPage}
            onNavigate={setCurrentPage}
            collapsed={sidebarCollapsed}
            onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
          />
        )}
        <main className={`main-content ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
          <div className="content-area">{renderPage()}</div>
          <Footer className={sidebarCollapsed ? 'sidebar-collapsed' : ''} />
        </main>
      </div>
    </div>
  );
}

export default App;
