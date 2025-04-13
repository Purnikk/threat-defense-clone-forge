
import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import SecurityStatusAlert from '@/components/SecurityStatusAlert';
import { ShieldCheck, Shield, ShieldAlert, ShieldX } from 'lucide-react';

const ResultsPage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // UNSAFE Example: Lower accuracy scores to demonstrate unsafe status
  const knnBinaryAccuracy = 0.8860368900303525;
  const knnMultiAccuracy = 0.8740368900303525;
  const rfBinaryAccuracy = 0.8741029652113005;
  const rfMultiAccuracy = 0.8731029652113005;

  const averageAccuracy = (knnBinaryAccuracy + knnMultiAccuracy + rfBinaryAccuracy + rfMultiAccuracy) / 4;
  
  // Determine security status based on the average accuracy
  const isSafe = averageAccuracy > 0.95;
  const threatLevel = averageAccuracy > 0.95 ? 'none' : 
                     (averageAccuracy > 0.90 ? 'low' : 
                     (averageAccuracy > 0.85 ? 'medium' : 'high'));

  const securityMessage = isSafe 
    ? "Based on our comprehensive analysis using KNN and Random Forest algorithms, your system appears to be secure. No malicious activity has been detected in the analyzed dataset. Continue monitoring for optimal security."
    : "Our analysis has detected potential security concerns. The analysis shows several patterns that match known attack signatures. We've identified irregular network behavior that suggests possible unauthorized access attempts. Immediate investigation and security measures are recommended.";

  const handleViewTable = (algorithm: 'knn' | 'rf', tableType: 'binary' | 'multi') => {
    navigate('/classification-table', { state: { algorithm, tableType } });
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
                  <div className="flex items-center justify-between">
                    <p className="text-left">Multi Class Accuracy:</p> 
                    <p className="font-semibold">{knnMultiAccuracy.toFixed(4)}</p>
                  </div>
                </div>
                
                <div className="w-full space-y-4">
                  <Button 
                    className="w-full bg-sky-500 hover:bg-sky-600 text-white"
                    onClick={() => handleViewTable('knn', 'binary')}
                  >
                    Binary-Class Classification Table
                  </Button>
                  
                  <Button 
                    className="w-full bg-sky-500 hover:bg-sky-600 text-white"
                    onClick={() => handleViewTable('knn', 'multi')}
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
                  <div className="flex items-center justify-between">
                    <p className="text-left">Binary Class Accuracy:</p> 
                    <p className="font-semibold">{rfBinaryAccuracy.toFixed(4)}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-left">Multi Class Accuracy:</p> 
                    <p className="font-semibold">{rfMultiAccuracy.toFixed(4)}</p>
                  </div>
                </div>
                
                <div className="w-full space-y-4">
                  <Button 
                    className="w-full bg-sky-500 hover:bg-sky-600 text-white"
                    onClick={() => handleViewTable('rf', 'binary')}
                  >
                    Binary-Class Classification Table
                  </Button>
                  
                  <Button 
                    className="w-full bg-sky-500 hover:bg-sky-600 text-white"
                    onClick={() => handleViewTable('rf', 'multi')}
                  >
                    Multi-Class Classification Table
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Overall Security Status Card */}
          <Card className={`
            ${isSafe ? 'bg-green-100/80' : 'bg-red-100/80'} 
            backdrop-blur-sm border-none shadow-lg overflow-hidden
          `}>
            <CardContent className="p-8 flex flex-col items-center">
              <div className="flex items-center mb-4">
                {isSafe ? (
                  <ShieldCheck className="h-8 w-8 text-green-600 mr-2" />
                ) : (
                  <ShieldX className="h-8 w-8 text-red-600 mr-2" />
                )}
                <h2 className="text-2xl font-bold text-center">
                  {isSafe ? 'System Security Status: Safe' : 'System Security Status: Unsafe - Action Required'}
                </h2>
              </div>
              
              <p className="text-center">
                {securityMessage}
              </p>
              
              {!isSafe && (
                <div className="w-full mt-4 p-4 bg-red-200/50 rounded-lg border border-red-300">
                  <h3 className="font-semibold mb-2 text-red-800">Detected Threats:</h3>
                  <ul className="list-disc pl-5 space-y-1 text-red-800">
                    <li>Multiple suspicious login attempts detected</li>
                    <li>Unusual outbound traffic patterns identified</li>
                    <li>Potential data exfiltration detected</li>
                    <li>Anomalous system behavior observed</li>
                  </ul>
                  
                  <h3 className="font-semibold mt-4 mb-2 text-red-800">Recommended Actions:</h3>
                  <ul className="list-disc pl-5 space-y-1 text-red-800">
                    <li>Isolate affected systems immediately</li>
                    <li>Update firewall rules and security policies</li>
                    <li>Run a full system scan</li>
                    <li>Review authentication logs</li>
                  </ul>
                </div>
              )}
              
              <div className="w-full mt-6 p-4 bg-white/50 rounded-lg">
                <h3 className="font-semibold mb-2">Key Indicators:</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Average Model Accuracy: {averageAccuracy.toFixed(4)}</li>
                  <li>KNN Binary Classification Accuracy: {knnBinaryAccuracy.toFixed(4)}</li>
                  <li>KNN Multi-Class Classification Accuracy: {knnMultiAccuracy.toFixed(4)}</li>
                  <li>Random Forest Binary Classification Accuracy: {rfBinaryAccuracy.toFixed(4)}</li>
                  <li>Random Forest Multi-Class Classification Accuracy: {rfMultiAccuracy.toFixed(4)}</li>
                </ul>
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
