import React, {useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';

import Home from './pages/Home';
import About from './pages/About';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Dashboard from './pages/Dashboard';
import Learn from './pages/Learn';
import Assessment from './pages/Assessment';
import AdminDashboard from './pages/AdminDashboard';
import Community from './pages/Community';
import ReadingModule from './pages/ReadingModule';
import Leaderboard from './components/Leaderboard';
import BossChallenge from './components/BossChallenge';
import AIChatbot from './components/AIChatbot';
import Rewards from './pages/Rewards';

import { AuthProvider } from './context/AuthContext';
import { AdminProvider } from './context/AdminContext';

import BossAssessment from './pages/BossAssessment';

import AOS from 'aos';
import 'aos/dist/aos.css';


const AppContent = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  const location = useLocation();

  // ✅ Only show chatbot on selected pages
  const chatbotVisiblePages = ['/dashboard', '/reading'];
  const shouldShowChatbot = chatbotVisiblePages.some(path =>
    location.pathname.startsWith(path)
  );

  return (
    <div className="min-h-screen">
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/community" element={<Community />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/boss-challenge" element={<BossChallenge />} />
        <Route path="/reading/:moduleId" element={<ReadingModule />} />
        <Route path="/boss-assessment/:bossId" element={<BossAssessment />} />
        <Route path="/rewards" element={<Rewards />} />

        {/* Protected Routes */}
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/assessment" element={<PrivateRoute><Assessment /></PrivateRoute>} />
        <Route path="/admin" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
      </Routes>

      {shouldShowChatbot && <AIChatbot />}
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <AdminProvider>
        <Router>
          <AppContent />
        </Router>
      </AdminProvider>
    </AuthProvider>
  );
}

export default App;
