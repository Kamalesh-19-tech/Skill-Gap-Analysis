import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User, LogOut, Zap } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import AuthModal from './AuthModal'; // This will handle both login and signup tabs



const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDashboard = () => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      setShowAuthModal(true);
    }
  };

  // Always show login first
  const handleShowAuthModal = () => {
    setShowAuthModal(true);
  };

  return (
    <>
      <nav className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'dynamic-glassmorphism border-b border-white/20 shadow-2xl' 
          : 'bg-transparent border-b border-white/5'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-18">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-xl flex items-center justify-center logo-glow group-hover:scale-110 transition-transform">
                  <Zap className="w-7 h-7 text-white" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-xl opacity-20 group-hover:opacity-40 transition-opacity animate-pulse-slow"></div>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-2xl font-bold text-white text-glow">SkillPath AI</h1>
                <p className="text-xs text-blue-300 -mt-1">AI-Powered Learning</p>
              </div>
            </Link> 

            <div className="hidden md:flex items-center justify-between flex-1 mx-8">
              <div className="flex items-center space-x-8 mx-auto">
                <Link to="/" className="text-blue-200 hover:text-white transition-colors">Home</Link>
                <Link to="/about" className="text-blue-200 hover:text-white transition-colors">About</Link>
                <Link to="/blog" className="text-blue-200 hover:text-white transition-colors">Blog</Link>
                <Link to="/contact" className="text-blue-200 hover:text-white transition-colors">Contact</Link>
                <Link to="/community" className="text-blue-200 hover:text-white transition-colors">Community</Link>
                <Link to="/rewards" className="text-blue-200 hover:text-white transition-colors font-bold">Rewards</Link>
              </div>
              
              <div className="flex items-center space-x-4">
              <Link to="/admin" className="text-blue-200 hover:text-white transition-colors">Admin</Link>
                {isAuthenticated ? (
                  <>
                    <button 
                      onClick={handleDashboard}
                      className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all"
                    >
                      Dashboard
                    </button>
                    <div className="flex items-center space-x-2">
                      <User className="w-5 h-5 text-blue-200" />
                      <span className="text-blue-200">{user?.name}</span>
                      <button onClick={logout} className="text-blue-200 hover:text-white">
                        <LogOut className="w-5 h-5" />
                      </button>
                    </div>
                  </>
                ) : (
                  <button 
                    onClick={handleShowAuthModal}
                    className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all"
                  >
                    Get Started
                  </button>
                )}
              </div>
            </div>
 

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-white"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden glassmorphism border-t border-white/10">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link to="/" className="block px-3 py-2 text-blue-200 hover:text-white">Home</Link>
              <Link to="/about" className="block px-3 py-2 text-blue-200 hover:text-white">About</Link>
                           <Link to="/blog" className="block px-3 py-2 text-blue-200 hover:text-white">Blog</Link>
              <Link to="/contact" className="block px-3 py-2 text-blue-200 hover:text-white">Contact</Link>
              <Link to="/community" className="block px-3 py-2 text-blue-200 hover:text-white">Community</Link>
              <Link to="/admin" className="block px-3 py-2 text-blue-200 hover:text-white">Admin</Link> 
              {isAuthenticated ? (
                <>
                  <button 
                    onClick={handleDashboard}
                    className="block w-full text-left px-3 py-2 text-blue-200 hover:text-white"
                  >
                    Dashboard
                  </button>
                  <button 
                    onClick={logout}
                    className="block w-full text-left px-3 py-2 text-blue-200 hover:text-white"
                  >
                    Logout ({user?.name})
                  </button>
                </>
              ) : (
                <button 
                  onClick={handleShowAuthModal}
                  className="block w-full text-left px-3 py-2 text-blue-200 hover:text-white"
                >
                  Get Started
                </button>
              )}
            </div>
          </div>
        )}
      </nav>

      {showAuthModal && (
        <AuthModal onClose={() => setShowAuthModal(false)} />
      )}
    </>
  );
};

export default Navbar;