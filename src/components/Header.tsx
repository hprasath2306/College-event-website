import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const mobileMenu = document.getElementById('mobile-menu');
      const hamburger = document.getElementById('hamburger-button');
      
      if (isMenuOpen && 
          mobileMenu && 
          hamburger && 
          !mobileMenu.contains(event.target as Node) && 
          !hamburger.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  const isActive = (path: string) => {
    return location.pathname === path ? 'text-[#FF3366]' : 'text-white hover:text-[#FF3366]';
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#1a1a1a] bg-opacity-95 backdrop-blur-sm">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link 
            to="/" 
            className="text-2xl font-['Righteous'] text-white hover:text-[#FF3366] transition-colors"
            replace
          >
            CSEUTSAV'25 🚀
          </Link>

          {/* Hamburger Menu Button */}
          <button
            id="hamburger-button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white hover:text-[#FF3366] transition-colors p-2"
            aria-label="Toggle menu"
          >
            <div className="w-6 h-5 relative flex flex-col justify-between">
              <span className={`w-full h-0.5 bg-current transform transition-all duration-300 ${
                isMenuOpen ? 'rotate-45 translate-y-2' : ''
              }`}></span>
              <span className={`w-full h-0.5 bg-current transition-all duration-300 ${
                isMenuOpen ? 'opacity-0' : ''
              }`}></span>
              <span className={`w-full h-0.5 bg-current transform transition-all duration-300 ${
                isMenuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}></span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-8 font-['Poppins']">
            <Link 
              to="/" 
              className={`${isActive('/')} transition-colors duration-300`}
              replace
            >
              Home
            </Link>
            <Link 
              to="/events" 
              className={`${isActive('/events')} transition-colors duration-300`}
              replace
            >
              Events
            </Link>
            <Link 
              to="/team" 
              className={`${isActive('/team')} transition-colors duration-300`}
              replace
            >
              Team
            </Link>
            <Link 
              to="/schedule" 
              className={`${isActive('/schedule')} transition-colors duration-300`}
              replace
            >
              Schedule
            </Link>
            <Link 
              to="/moments" 
              className={`${isActive('/moments')} transition-colors duration-300`}
              replace
            >
              Moments
            </Link>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          id="mobile-menu"
          className={`
            md:hidden fixed left-0 right-0 bg-[#1a1a1a] border-t border-gray-800
            transition-all duration-300 ease-in-out overflow-hidden
            ${isMenuOpen ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'}
          `}
          style={{
            top: '72px',
            boxShadow: isMenuOpen ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : 'none'
          }}
        >
          <div className="flex flex-col items-center gap-3 py-4 font-['Poppins']">
            <Link 
              to="/" 
              className={`${isActive('/')} transition-colors duration-300 w-full text-center py-2`}
              replace
            >
              Home
            </Link>
            <Link 
              to="/events" 
              className={`${isActive('/events')} transition-colors duration-300 w-full text-center py-2`}
              replace
            >
              Events
            </Link>
            <Link 
              to="/team" 
              className={`${isActive('/team')} transition-colors duration-300 w-full text-center py-2`}
              replace
            >
              Team
            </Link>
            <Link 
              to="/schedule" 
              className={`${isActive('/schedule')} transition-colors duration-300 w-full text-center py-2`}
              replace
            >
              Schedule
            </Link>
            <Link 
              to="/moments" 
              className={`${isActive('/moments')} transition-colors duration-300 w-full text-center py-2`}
              replace
            >
              Moments
            </Link>
          </div>
        </div>
      </nav>

      {/* Backdrop for mobile menu */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden"
          style={{ top: '72px' }}
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}
    </header>
  );
};

export default Header;