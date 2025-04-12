
import React from 'react';
import LoginForm from '@/components/LoginForm';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Shield } from 'lucide-react';

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Left side - Login form */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-10">
          <LoginForm />
        </div>
        
        {/* Right side - Background image or content */}
        <div className="hidden md:flex md:w-1/2 bg-primary items-center justify-center p-10 text-white">
          <div className="max-w-md text-center">
            <Shield size={80} className="mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Secure Access Portal</h2>
            <p className="text-lg mb-6 opacity-90">
              Sign in to access advanced threat detection tools and forensic analysis capabilities to protect your organization.
            </p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-white/10 p-4 rounded-lg">
                <h3 className="font-semibold mb-1">Real-time Alerts</h3>
                <p className="opacity-80">Instant notifications for suspicious activities</p>
              </div>
              <div className="bg-white/10 p-4 rounded-lg">
                <h3 className="font-semibold mb-1">Threat Intelligence</h3>
                <p className="opacity-80">Up-to-date data on emerging threats</p>
              </div>
              <div className="bg-white/10 p-4 rounded-lg">
                <h3 className="font-semibold mb-1">Forensic Analysis</h3>
                <p className="opacity-80">Advanced tools for deep investigation</p>
              </div>
              <div className="bg-white/10 p-4 rounded-lg">
                <h3 className="font-semibold mb-1">Secure Platform</h3>
                <p className="opacity-80">End-to-end encrypted communications</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Login;
