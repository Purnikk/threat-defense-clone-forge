
import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import SecurityStatusAlert from '@/components/SecurityStatusAlert';
import { ShieldX, AlertTriangle, AlertCircle, Ban } from 'lucide-react';

const UnsafeExamplePage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Simulated low accuracy scores for unsafe example
  const knnBinaryAccuracy = 0.7260368900303525;
  const knnMultiAccuracy = 0.7140368900303525;
  const rfBinaryAccuracy = 0.7341029652113005;
  const rfMultiAccuracy = 0.7131029652113005;

  const averageAccuracy = (knnBinaryAccuracy + knnMultiAccuracy + rfBinaryAccuracy + rfMultiAccuracy) / 4;
  
  // For the unsafe example, we're forcing this to be unsafe
  const isSafe = false;
  const threatLevel = 'high';

  const securityMessage = 
    "CRITICAL ALERT: Our analysis has detected significant security concerns in your network. Multiple patterns matching known attack signatures have been identified, including potential data exfiltration attempts and unauthorized access. Immediate action is required to mitigate these threats and secure your systems.";

  return (
    <div className="min-h-screen flex flex-col bg-red-500">
      <Navbar />

      <main className="flex-1 py-12 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-8 text-center">Unsafe System Example</h1>
          
          <div className="mb-6 bg-red-600/50 p-4 rounded-lg text-white text-center">
            <AlertTriangle className="h-8 w-8 mx-auto mb-2" />
            <p className="font-bold text-xl">THIS IS AN EXAMPLE PAGE</p>
            <p>Demonstrating how a compromised system would appear in the dashboard</p>
          </div>
          
          <SecurityStatusAlert 
            isSafe={isSafe} 
            threatLevel={threatLevel as any} 
            message={securityMessage} 
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* KNN Card */}
            <Card className="bg-red-200/80 backdrop-blur-sm border-none shadow-lg overflow-hidden">
              <CardContent className="p-8 flex flex-col items-center">
                <h2 className="text-2xl font-bold text-center mb-6">K-Nearest-Neighbor (KNN)</h2>
                
                <div className="w-full space-y-4 mb-8">
                  <div className="flex items-center justify-between">
                    <p className="text-left">Binary Class Accuracy:</p> 
                    <p className="font-semibold text-red-800">{knnBinaryAccuracy.toFixed(4)}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-left">Multi Class Accuracy:</p> 
                    <p className="font-semibold text-red-800">{knnMultiAccuracy.toFixed(4)}</p>
                  </div>
                </div>
                
                <div className="w-full p-4 bg-red-300/50 rounded-lg">
                  <h3 className="font-semibold mb-2">Detected Anomalies:</h3>
                  <ul className="list-disc pl-5 space-y-1 text-red-900">
                    <li>Unusual authentication patterns</li>
                    <li>Suspicious network scanning activity</li>
                    <li>Potential data exfiltration attempts</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Random Forest Card */}
            <Card className="bg-red-200/80 backdrop-blur-sm border-none shadow-lg overflow-hidden">
              <CardContent className="p-8 flex flex-col items-center">
                <h2 className="text-2xl font-bold text-center mb-6">Random Forest</h2>
                
                <div className="w-full space-y-4 mb-8">
                  <div className="flex items-center justify-between">
                    <p className="text-left">Binary Class Accuracy:</p> 
                    <p className="font-semibold text-red-800">{rfBinaryAccuracy.toFixed(4)}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-left">Multi Class Accuracy:</p> 
                    <p className="font-semibold text-red-800">{rfMultiAccuracy.toFixed(4)}</p>
                  </div>
                </div>
                
                <div className="w-full p-4 bg-red-300/50 rounded-lg">
                  <h3 className="font-semibold mb-2">Detected Threats:</h3>
                  <ul className="list-disc pl-5 space-y-1 text-red-900">
                    <li>Potential DoS attack signature</li>
                    <li>Brute force login attempts</li>
                    <li>Malicious payload detection</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Overall Security Status Card */}
          <Card className="bg-red-100/80 backdrop-blur-sm border-none shadow-lg overflow-hidden mb-8">
            <CardContent className="p-8 flex flex-col items-center">
              <div className="flex items-center mb-4">
                <ShieldX className="h-8 w-8 text-red-600 mr-2" />
                <h2 className="text-2xl font-bold text-center">
                  System Security Status: UNSAFE - IMMEDIATE ACTION REQUIRED
                </h2>
              </div>
              
              <p className="text-center text-red-800 font-medium mb-4">
                {securityMessage}
              </p>
              
              <div className="w-full mt-4 p-4 bg-red-200/80 rounded-lg border border-red-300">
                <h3 className="font-bold mb-2 text-red-800 text-lg">Detected Threats:</h3>
                <ul className="list-disc pl-5 space-y-2 text-red-800">
                  <li><span className="font-semibold">Multiple suspicious login attempts detected</span> - Possible credential stuffing attack from multiple IP addresses</li>
                  <li><span className="font-semibold">Unusual outbound traffic patterns identified</span> - Large data transfers to unknown external servers</li>
                  <li><span className="font-semibold">Potential data exfiltration detected</span> - Encrypted channels being used to communicate with known malicious endpoints</li>
                  <li><span className="font-semibold">Anomalous system behavior observed</span> - Unusual process execution and privilege escalation attempts</li>
                </ul>
                
                <h3 className="font-bold mt-6 mb-2 text-red-800 text-lg">REQUIRED ACTIONS:</h3>
                <ul className="list-disc pl-5 space-y-2 text-red-800">
                  <li><span className="font-semibold">IMMEDIATE: Isolate affected systems</span> - Disconnect compromised devices from the network to prevent lateral movement</li>
                  <li><span className="font-semibold">URGENT: Update firewall rules and security policies</span> - Block identified malicious IP addresses and domains</li>
                  <li><span className="font-semibold">CRITICAL: Run a full system scan</span> - Deploy endpoint detection and response tools to identify persistence mechanisms</li>
                  <li><span className="font-semibold">PRIORITY: Review authentication logs</span> - Identify compromised accounts and force password resets</li>
                  <li><span className="font-semibold">REQUIRED: Activate incident response plan</span> - Notify security team and initiate documented procedures</li>
                </ul>
              </div>
              
              <div className="w-full mt-6 p-4 bg-white/50 rounded-lg">
                <h3 className="font-semibold mb-2">Key Indicators:</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Average Model Accuracy: <span className="text-red-700 font-semibold">{averageAccuracy.toFixed(4)} (BELOW SAFE THRESHOLD)</span></li>
                  <li>KNN Binary Classification Accuracy: <span className="text-red-700">{knnBinaryAccuracy.toFixed(4)}</span></li>
                  <li>KNN Multi-Class Classification Accuracy: <span className="text-red-700">{knnMultiAccuracy.toFixed(4)}</span></li>
                  <li>Random Forest Binary Classification Accuracy: <span className="text-red-700">{rfBinaryAccuracy.toFixed(4)}</span></li>
                  <li>Random Forest Multi-Class Classification Accuracy: <span className="text-red-700">{rfMultiAccuracy.toFixed(4)}</span></li>
                </ul>
              </div>
              
              <div className="mt-8 flex flex-col md:flex-row gap-4 justify-center w-full">
                <Button 
                  className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-2"
                  size="lg"
                >
                  <AlertCircle className="h-5 w-5" />
                  Activate Emergency Response
                </Button>
                <Button 
                  className="bg-amber-500 hover:bg-amber-600 text-white flex items-center gap-2"
                  size="lg"
                >
                  <Ban className="h-5 w-5" />
                  Quarantine Affected Systems
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Return button */}
          <div className="flex justify-center">
            <Button
              onClick={() => navigate('/results')}
              className="bg-white hover:bg-gray-100 text-red-800"
            >
              Return to Safe System Results
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default UnsafeExamplePage;
