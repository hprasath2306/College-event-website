import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const location = useLocation();

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

          <div className="flex gap-8 font-['Poppins']">
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
              to="/moments" 
              className={`${isActive('/moments')} transition-colors duration-300`}
              replace
            >
              Moments
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;