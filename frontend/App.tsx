import { useState, useEffect } from 'react';
import { Toaster } from './components/ui/sonner';
import SpaceBackground from './components/SpaceBackground';
import HomePage from './pages/public/HomePage';
import LoginPage from './pages/public/LoginPage';
import RegisterPage from './pages/public/RegisterPage';
import ProjectDetailPage from './pages/public/ProjectDetailPage';
import ExplorePage from './pages/public/ExplorePage';
import FAQPage from './pages/public/FAQPage';
import AboutPage from './pages/public/AboutPage';
import ContactPage from './pages/public/ContactPage';
import BlogPage from './pages/public/BlogPage';
import BlogDetailPage from './pages/public/BlogDetailPage';

// Investor Pages
import InvestorDashboard from './pages/investor/InvestorDashboard';
import InvestmentHistory from './pages/investor/InvestmentHistory';
import PaymentPage from './pages/investor/PaymentPage';

// Startup Pages
import StartupDashboard from './pages/startup/StartupDashboard';
import CreateProject from './pages/startup/CreateProject';
import MyProjects from './pages/startup/MyProjects';
import EditProject from './pages/startup/EditProject';

// CVA Pages
import CVADashboard from './pages/cva/CVADashboard';
import ReviewProjects from './pages/cva/ReviewProjects';
import ReviewDetail from './pages/cva/ReviewDetail';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import UserManagement from './pages/admin/UserManagement';
import ProjectManagement from './pages/admin/ProjectManagement';
import TransactionManagement from './pages/admin/TransactionManagement';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedBlog, setSelectedBlog] = useState(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (user) => {
    setCurrentUser(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
    
    // Redirect based on role
    if (user.role === 'investor') {
      setCurrentPage('investor-dashboard');
    } else if (user.role === 'startup') {
      setCurrentPage('startup-dashboard');
    } else if (user.role === 'cva') {
      setCurrentPage('cva-dashboard');
    } else if (user.role === 'admin') {
      setCurrentPage('admin-dashboard');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    setCurrentPage('home');
  };

  const handleRegister = (user) => {
    setCurrentUser(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
    
    // Redirect based on role
    if (user.role === 'investor') {
      setCurrentPage('home');
    } else if (user.role === 'startup') {
      setCurrentPage('startup-dashboard');
    }
  };

  const navigateTo = (page, data = null) => {
    setCurrentPage(page);
    if (data) {
      if (page === 'project-detail' || page === 'review-detail' || page === 'edit-project' || page === 'payment') {
        setSelectedProject(data);
      } else if (page === 'blog-detail') {
        setSelectedBlog(data);
      }
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      // Public Pages
      case 'home':
        return <HomePage currentUser={currentUser} onNavigate={navigateTo} onLogout={handleLogout} />;
      case 'login':
        return <LoginPage onLogin={handleLogin} onNavigate={navigateTo} />;
      case 'register':
        return <RegisterPage onRegister={handleRegister} onNavigate={navigateTo} />;
      case 'project-detail':
        return <ProjectDetailPage project={selectedProject} currentUser={currentUser} onNavigate={navigateTo} onLogout={handleLogout} />;
      case 'explore':
        return <ExplorePage currentUser={currentUser} onNavigate={navigateTo} onLogout={handleLogout} />;
      case 'faq':
        return <FAQPage currentUser={currentUser} onNavigate={navigateTo} onLogout={handleLogout} />;
      case 'about':
        return <AboutPage currentUser={currentUser} onNavigate={navigateTo} onLogout={handleLogout} />;
      case 'contact':
        return <ContactPage currentUser={currentUser} onNavigate={navigateTo} onLogout={handleLogout} />;
      case 'blog':
        return <BlogPage currentUser={currentUser} onNavigate={navigateTo} onLogout={handleLogout} />;
      case 'blog-detail':
        return <BlogDetailPage blog={selectedBlog} currentUser={currentUser} onNavigate={navigateTo} onLogout={handleLogout} />;
      
      // Investor Pages
      case 'investor-dashboard':
        return <InvestorDashboard currentUser={currentUser} onNavigate={navigateTo} onLogout={handleLogout} />;
      case 'investment-history':
        return <InvestmentHistory currentUser={currentUser} onNavigate={navigateTo} onLogout={handleLogout} />;
      case 'payment':
        return <PaymentPage project={selectedProject} currentUser={currentUser} onNavigate={navigateTo} onLogout={handleLogout} />;
      
      // Startup Pages
      case 'startup-dashboard':
        return <StartupDashboard currentUser={currentUser} onNavigate={navigateTo} onLogout={handleLogout} />;
      case 'create-project':
        return <CreateProject currentUser={currentUser} onNavigate={navigateTo} onLogout={handleLogout} />;
      case 'my-projects':
        return <MyProjects currentUser={currentUser} onNavigate={navigateTo} onLogout={handleLogout} />;
      case 'edit-project':
        return <EditProject project={selectedProject} currentUser={currentUser} onNavigate={navigateTo} onLogout={handleLogout} />;
      
      // CVA Pages
      case 'cva-dashboard':
        return <CVADashboard currentUser={currentUser} onNavigate={navigateTo} onLogout={handleLogout} />;
      case 'review-projects':
        return <ReviewProjects currentUser={currentUser} onNavigate={navigateTo} onLogout={handleLogout} />;
      case 'review-detail':
        return <ReviewDetail project={selectedProject} currentUser={currentUser} onNavigate={navigateTo} onLogout={handleLogout} />;
      
      // Admin Pages
      case 'admin-dashboard':
        return <AdminDashboard currentUser={currentUser} onNavigate={navigateTo} onLogout={handleLogout} />;
      case 'user-management':
        return <UserManagement currentUser={currentUser} onNavigate={navigateTo} onLogout={handleLogout} />;
      case 'project-management':
        return <ProjectManagement currentUser={currentUser} onNavigate={navigateTo} onLogout={handleLogout} />;
      case 'transaction-management':
        return <TransactionManagement currentUser={currentUser} onNavigate={navigateTo} onLogout={handleLogout} />;
      
      default:
        return <HomePage currentUser={currentUser} onNavigate={navigateTo} onLogout={handleLogout} />;
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <SpaceBackground />
      <div className="relative z-10">
        {renderPage()}
      </div>
      <Toaster position="top-right" />
    </div>
  );
}