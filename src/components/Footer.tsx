
import React from 'react';
import { Shield } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-4 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <div className="flex items-center justify-center mb-2">
          <Shield size={20} className="mr-2" />
          <span className="font-bold">ATDCF</span>
        </div>
        <div className="text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} Active Threat Detection in Cyber Forensics
        </div>
      </div>
    </footer>
  );
};

export default Footer;
