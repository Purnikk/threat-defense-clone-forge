
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-4 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <div className="text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} Active Threat Detection in Cyber Forensics
        </div>
      </div>
    </footer>
  );
};

export default Footer;
