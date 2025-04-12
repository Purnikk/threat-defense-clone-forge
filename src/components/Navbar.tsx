
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from './ui/button';
import { Menu, X, Shield, LogOut } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Threats', path: '/threats', requiresAuth: true },
    { label: 'Upload', path: '/upload', requiresAuth: true },
  ];

  const filteredNavItems = navItems.filter(item => 
    !item.requiresAuth || (item.requiresAuth && isAuthenticated)
  );

  return (
    <nav className="bg-primary py-4 px-6 md:px-10">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Shield size={28} className="text-white" />
          <Link to="/" className="text-2xl font-bold text-white">ATDCF</Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {filteredNavItems.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className="text-white hover:text-secondary transition-colors duration-200"
            >
              {item.label}
            </Link>
          ))}
          
          {isAuthenticated ? (
            <Button 
              variant="secondary" 
              size="sm" 
              onClick={logout}
              className="flex items-center gap-1"
            >
              <LogOut size={16} />
              Logout
            </Button>
          ) : (
            <Link to="/login">
              <Button variant="secondary" size="sm">Login</Button>
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)} className="text-white">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-primary z-50 px-6 py-4 shadow-lg">
          <div className="flex flex-col gap-4">
            {filteredNavItems.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                className="text-white hover:text-secondary transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            
            {isAuthenticated ? (
              <Button 
                variant="secondary" 
                size="sm" 
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                className="flex items-center justify-center gap-1"
              >
                <LogOut size={16} />
                Logout
              </Button>
            ) : (
              <Link to="/login" onClick={() => setIsOpen(false)}>
                <Button variant="secondary" size="sm" className="w-full">Login</Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
