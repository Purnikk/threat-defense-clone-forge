
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ThreatCard from '@/components/ThreatCard';
import { Brain, Clock, Database, FileSignature, Network, AlertTriangle, Shield } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Navigate } from 'react-router-dom';

const ThreatsPage = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const threatCategories = [
    {
      id: 1,
      title: "Network Traffic Processing",
      description: "Convert the traffic into multiple network parameter patterns (Signatures)",
      icon: <Network size={48} className="text-primary" />,
    },
    {
      id: 2,
      title: "Prevent System",
      description: "Prevent System acts based on the threat detected",
      icon: <Shield size={48} className="text-primary" />,
    },
    {
      id: 3,
      title: "Threat Reporting",
      description: "Report/Log the threat",
      icon: <AlertTriangle size={48} className="text-primary" />,
    },
    {
      id: 4,
      title: "Threat Classification",
      description: "Classify the threat based on signature matching",
      icon: <Database size={48} className="text-primary" />,
    },
    {
      id: 5,
      title: "Anomaly Detection",
      description: "Match the input network signature against already available normal traffic signature to detect the zero-day attacks",
      icon: <Brain size={48} className="text-primary" />,
    },
    {
      id: 6,
      title: "Signature Matching",
      description: "Match the input signature against the already available threat signature patterns",
      icon: <FileSignature size={48} className="text-primary" />,
    },
  ];

  const threatTypes = [
    {
      id: 1,
      title: "Denial of Service (DoS)",
      description: "A Denial-of-Service (DoS) attack is an attack meant to shut down a machine or network, making it inaccessible to its intended users. DoS attacks accomplish this by flooding the target with traffic, or sending it information that triggers a crash. In both instances, the DoS attack deprives legitimate users (i.e. employees, members, or account holders) of the service or resource they expected."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-blue-50">
      <Navbar />

      <main className="flex-1">
        {/* Threat Categories Section */}
        <section className="py-12 px-6 md:px-10">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold mb-10 text-center">Threat Detection Components</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {threatCategories.map(category => (
                <ThreatCard 
                  key={category.id}
                  title={category.title}
                  description={category.description}
                  icon={category.icon}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Common Threat Types */}
        <section className="py-12 px-6 md:px-10 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold mb-10 text-center">Common Threat Types</h2>
            
            <div className="bg-primary/10 rounded-xl p-6 md:p-10 mb-8">
              <h3 className="text-2xl font-semibold mb-4">Denial of Service (DoS)</h3>
              <p className="text-gray-700 mb-4">
                A Denial-of-Service (DoS) attack is an attack meant to shut down a machine or network, making it inaccessible to its intended users. DoS attacks accomplish this by flooding the target with traffic, or sending it information that triggers a crash. In both instances, the DoS attack deprives legitimate users (i.e. employees, members, or account holders) of the service or resource they expected.
              </p>
              <div className="flex justify-end">
                <button className="text-primary font-medium hover:underline flex items-center gap-1">
                  Learn more <Clock size={16} />
                </button>
              </div>
            </div>
            
            {/* Add more threat types here */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-primary/10 rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-3">Man-in-the-Middle (MitM) Attacks</h3>
                <p className="text-gray-700">
                  A MitM attack occurs when an attacker intercepts communications between two parties to steal data or impersonate one of the parties.
                </p>
              </div>
              
              <div className="bg-primary/10 rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-3">Phishing Attacks</h3>
                <p className="text-gray-700">
                  Phishing attacks attempt to steal user data, including login credentials and credit card numbers, by disguising as a trustworthy entity.
                </p>
              </div>
              
              <div className="bg-primary/10 rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-3">SQL Injection</h3>
                <p className="text-gray-700">
                  SQL injection is a code injection technique used to attack data-driven applications by inserting malicious SQL statements.
                </p>
              </div>
              
              <div className="bg-primary/10 rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-3">Zero-Day Exploits</h3>
                <p className="text-gray-700">
                  A zero-day exploit targets a previously unknown vulnerability, leaving developers with zero days to address it before it's exploited.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ThreatsPage;
