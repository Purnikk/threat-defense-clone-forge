
import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import SecurityStatusAlert from '@/components/SecurityStatusAlert';
import { ShieldCheck, Info } from 'lucide-react';

const ResultsPage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // SAFE Example: High accuracy scores to demonstrate safe status
  const knnBinaryAccuracy = 0.9760368900303525;
  const rfBinaryAccuracy = 0.9841029652113005;

  const averageAccuracy = (knnBinaryAccuracy + rfBinaryAccuracy) / 2;
  
  // Determine security status based on the average accuracy
  const isSafe = averageAccuracy > 0.95;
  const threatLevel = averageAccuracy > 0.95 ? 'none' : 
                     (averageAccuracy > 0.90 ? 'low' : 
                     (averageAccuracy > 0.85 ? 'medium' : 'high'));

  const securityMessage = 
    "Based on our comprehensive analysis using KNN and Random Forest algorithms, your system appears to be secure. No malicious activity has been detected in the analyzed dataset. All network traffic patterns match normal behavior signatures. Continue monitoring for optimal security.";

  const handleViewTable = (algorithm: 'knn' | 'rf') => {
    navigate('/classification-table', { state: { algorithm } });
  };

  return (
    <div className="min-h-screen flex flex-col bg-teal-500">
      <Navbar />

      <main className="flex-1 py-12 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-8 text-center">Analysis Results</h1>
          
          <SecurityStatusAlert 
            isSafe={isSafe} 
            threatLevel={threatLevel as any} 
            message={securityMessage} 
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* KNN Card */}
            <Card className="bg-teal-200/80 backdrop-blur-sm border-none shadow-lg overflow-hidden">
              <CardContent className="p-8 flex flex-col items-center">
                <h2 className="text-2xl font-bold text-center mb-6">K-Nearest-Neighbor (KNN)</h2>
                
                <div className="w-full space-y-4 mb-8">
                  <div className="flex items-center justify-between">
                    <p className="text-left">Binary Class Accuracy:</p> 
                    <p className="font-semibold">{knnBinaryAccuracy.toFixed(4)}</p>
                  </div>
                </div>
                
                <div className="w-full flex justify-center">
                  <Button 
                    className="w-full bg-sky-500 hover:bg-sky-600 text-white"
                    onClick={() => handleViewTable('knn')}
                  >
                    Binary-Class Classification Table
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Random Forest Card */}
            <Card className="bg-teal-200/80 backdrop-blur-sm border-none shadow-lg overflow-hidden">
              <CardContent className="p-8 flex flex-col items-center">
                <h2 className="text-2xl font-bold text-center mb-6">Random Forest</h2>
                
                <div className="w-full space-y-4 mb-8">
                  <div className="flex items-center justify-between">
                    <p className="text-left">Binary Class Accuracy:</p> 
                    <p className="font-semibold">{rfBinaryAccuracy.toFixed(4)}</p>
                  </div>
                </div>
                
                <div className="w-full flex justify-center">
                  <Button 
                    className="w-full bg-sky-500 hover:bg-sky-600 text-white"
                    onClick={() => handleViewTable('rf')}
                  >
                    Binary-Class Classification Table
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Overall Security Status Card */}
          <Card className="bg-green-100/80 backdrop-blur-sm border-none shadow-lg overflow-hidden mb-8">
            <CardContent className="p-8 flex flex-col items-center">
              <div className="flex items-center mb-4">
                <ShieldCheck className="h-8 w-8 text-green-600 mr-2" />
                <h2 className="text-2xl font-bold text-center">
                  System Security Status: Safe
                </h2>
              </div>
              
              <p className="text-center text-green-800 mb-4">
                {securityMessage}
              </p>
              
              <div className="w-full mt-4 p-4 bg-green-200/50 rounded-lg border border-green-300">
                <h3 className="font-semibold mb-2 text-green-800">System Health Indicators:</h3>
                <ul className="list-disc pl-5 space-y-1 text-green-800">
                  <li>All network traffic patterns within normal parameters</li>
                  <li>No unusual authentication attempts detected</li>
                  <li>Data transfer patterns consistent with regular operations</li>
                  <li>System behavior metrics within expected ranges</li>
                </ul>
              </div>
              
              <div className="w-full mt-6 p-4 bg-white/50 rounded-lg">
                <h3 className="font-semibold mb-2">Key Indicators:</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Average Model Accuracy: <span className="text-green-700 font-semibold">{averageAccuracy.toFixed(4)} (ABOVE SAFE THRESHOLD)</span></li>
                  <li>KNN Binary Classification Accuracy: {knnBinaryAccuracy.toFixed(4)}</li>
                  <li>Random Forest Binary Classification Accuracy: {rfBinaryAccuracy.toFixed(4)}</li>
                </ul>
              </div>
              
              <div className="w-full mt-6 flex justify-center">
                <Button 
                  className="bg-amber-500 hover:bg-amber-600 text-white flex items-center gap-2"
                  onClick={() => navigate('/unsafe-example')}
                >
                  <Info className="h-5 w-5" />
                  View Example of an Unsafe System
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
