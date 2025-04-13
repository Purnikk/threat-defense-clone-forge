
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { Navigate } from 'react-router-dom';

const ResultsPage = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-teal-500">
      <Navbar />

      <main className="flex-1 py-12 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* KNN Card */}
          <Card className="bg-teal-200/80 backdrop-blur-sm border-none shadow-lg overflow-hidden">
            <CardContent className="p-8 flex flex-col items-center">
              <h2 className="text-2xl font-bold text-center mb-6">K-Nearest-Neighbor (KNN)</h2>
              
              <div className="w-full space-y-4 mb-8">
                <p className="text-center">KNN Binary Class Accuracy = 0.9760368900303525</p>
                <p className="text-center">KNN Multi Class Accuracy = 0.9740368900303525</p>
              </div>
              
              <div className="w-full space-y-4">
                <Button 
                  className="w-full bg-sky-500 hover:bg-sky-600 text-white" 
                >
                  Binary-Class Classification Table
                </Button>
                
                <Button 
                  className="w-full bg-sky-500 hover:bg-sky-600 text-white"
                >
                  Multi-Class Classification Table
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Random Forest Card */}
          <Card className="bg-teal-200/80 backdrop-blur-sm border-none shadow-lg overflow-hidden">
            <CardContent className="p-8 flex flex-col items-center">
              <h2 className="text-2xl font-bold text-center mb-6">Random Forest</h2>
              
              <div className="w-full space-y-4 mb-8">
                <p className="text-center">Random Forest Binary Class Accuracy = 0.9741029652113005</p>
                <p className="text-center">Random Forest Multi Class Accuracy = 0.9731029652113005</p>
              </div>
              
              <div className="w-full space-y-4">
                <Button 
                  className="w-full bg-sky-500 hover:bg-sky-600 text-white"
                >
                  Binary-Class Classification Table
                </Button>
                
                <Button 
                  className="w-full bg-sky-500 hover:bg-sky-600 text-white"
                >
                  Multi-Class Classification Table
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ResultsPage;
