
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import DarkModeToggle from './DarkModeToggle';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved === 'true';
  });
  const navigate = useNavigate();
  const githubUser = localStorage.getItem('githubUser');

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('githubUser');
    navigate('/');
    window.location.reload();
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border py-6">
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold gradient-text">Excellytics</span>
        </Link>
        
        <div className="flex items-center justify-between">
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 dark:text-gray-300 hover:text-excellytics-green-600 dark:hover:text-excellytics-green-400 transition-colors duration-200">
              Features
            </a>
            <a href="#how-it-works" className="text-gray-600 dark:text-gray-300 hover:text-excellytics-green-600 dark:hover:text-excellytics-green-400 transition-colors duration-200">
              How It Works
            </a>
            <a href="#charts" className="text-gray-600 dark:text-gray-300 hover:text-excellytics-green-600 dark:hover:text-excellytics-green-400 transition-colors duration-200">
              Charts
            </a>
            
            <div className="flex items-center space-x-4">
              {githubUser && (
                <>
                  <Link
                    to="/dashboard"
                    className="text-gray-600 dark:text-gray-300 hover:text-excellytics-green-600 dark:hover:text-excellytics-green-400 transition-colors duration-200 font-medium"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/profile"
                    className="text-gray-600 dark:text-gray-300 hover:text-excellytics-green-600 dark:hover:text-excellytics-green-400 transition-colors duration-200 font-medium"
                  >
                    Profile
                  </Link>
                </>
              )}
              <DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
              {!githubUser && (
                <>
                  <Link
                    to="/signin"
                    className="text-gray-600 dark:text-gray-300 hover:text-excellytics-green-600 dark:hover:text-excellytics-green-400 transition-colors duration-200 font-medium"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="bg-gradient-to-r from-excellytics-green-500 to-excellytics-blue-500 hover:from-excellytics-green-600 hover:to-excellytics-blue-600 text-white px-6 py-2 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 active:scale-95"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
            
            <button
              className="text-gray-600 dark:text-gray-300 hover:text-excellytics-green-600 dark:hover:text-excellytics-green-400 transition-colors duration-200"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Remove the logout button from the top nav bar */}

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden mt-4 py-4 border-t border-white/20 dark:border-white/10"
          >
            <div className="flex flex-col space-y-4">
              <a href="#features" className="text-gray-600 dark:text-gray-300 hover:text-excellytics-green-600 dark:hover:text-excellytics-green-400 transition-colors duration-200">
                Features
              </a>
              <a href="#how-it-works" className="text-gray-600 dark:text-gray-300 hover:text-excellytics-green-600 dark:hover:text-excellytics-green-400 transition-colors duration-200">
                How It Works
              </a>
              <a href="#charts" className="text-gray-600 dark:text-gray-300 hover:text-excellytics-green-600 dark:hover:text-excellytics-green-400 transition-colors duration-200">
                Charts
              </a>
              
              <div className="flex flex-col space-y-3 pt-4 border-t border-white/20 dark:border-white/10">
                <Link
                  to="/signin"
                  className="text-center text-gray-600 dark:text-gray-300 hover:text-excellytics-green-600 dark:hover:text-excellytics-green-400 transition-colors duration-200 font-medium"
                >
                  Sign In
                </Link>
                
                <Link
                  to="/signup"
                  className="text-center bg-gradient-to-r from-excellytics-green-500 to-excellytics-blue-500 hover:from-excellytics-green-600 hover:to-excellytics-blue-600 text-white px-6 py-2 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 active:scale-95"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
