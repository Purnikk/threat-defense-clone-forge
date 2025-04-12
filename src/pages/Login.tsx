
import React from 'react';
import LoginForm from '@/components/LoginForm';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center p-6 md:p-10 bg-gray-50">
        <div className="w-full max-w-md">
          <LoginForm />
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Login;
