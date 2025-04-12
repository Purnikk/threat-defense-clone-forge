
import React from 'react';
import { Shield } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Shield size={24} />
              <span className="text-xl font-bold">ATDCF</span>
            </div>
            <p className="text-gray-400 text-sm">
              Advanced cyber threat detection and forensics platform for enterprise security teams
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 text-lg">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/" className="hover:text-primary transition-colors duration-200">Home</a></li>
              <li><a href="/features" className="hover:text-primary transition-colors duration-200">Features</a></li>
              <li><a href="/threats" className="hover:text-primary transition-colors duration-200">Threats</a></li>
              <li><a href="/about" className="hover:text-primary transition-colors duration-200">About</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 text-lg">Contact</h3>
            <ul className="space-y-2 text-gray-400">
              <li>support@atdcf.com</li>
              <li>+1 (555) 123-4567</li>
              <li>123 Security Blvd, Cyber City</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} Active Threat Detection in Cyber Forensics. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
