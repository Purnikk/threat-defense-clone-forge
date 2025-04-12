
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Shield, TrendingUp, Lock, Database, AlertTriangle, Search } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Index = () => {
  const features = [
    {
      icon: <Shield className="h-10 w-10 text-primary" />,
      title: "Real-time Threat Monitoring",
      description: "Continuously scan for and identify malicious activities with advanced pattern recognition algorithms."
    },
    {
      icon: <TrendingUp className="h-10 w-10 text-primary" />,
      title: "Behavioral Analysis",
      description: "Detect anomalies by analyzing user and system behaviors against established baselines."
    },
    {
      icon: <Lock className="h-10 w-10 text-primary" />,
      title: "Incident Response",
      description: "Automated containment protocols and guided recovery processes for security incidents."
    },
    {
      icon: <Database className="h-10 w-10 text-primary" />,
      title: "Forensic Investigation",
      description: "Advanced tools for digital evidence collection, preservation, and analysis."
    },
    {
      icon: <AlertTriangle className="h-10 w-10 text-primary" />,
      title: "Threat Intelligence",
      description: "Up-to-date feeds on emerging threats, vulnerabilities, and attack methodologies."
    },
    {
      icon: <Search className="h-10 w-10 text-primary" />,
      title: "Deep Packet Inspection",
      description: "Analyze network traffic at a granular level to identify suspicious patterns and data exfiltration."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="hero-gradient text-white py-20 md:py-32">
        <div className="container mx-auto px-6 md:px-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Active Threat Detection in Cyber Forensics</h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Advanced analytics and real-time monitoring to identify, analyze, and neutralize cyber threats before they compromise your systems.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/login">
                <Button size="lg" variant="secondary">Get Started</Button>
              </Link>
              <Link to="/features">
                <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-6 md:px-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Comprehensive Threat Protection</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our platform offers end-to-end security solutions to protect your organization from the full spectrum of cyber threats.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gray-100">
        <div className="container mx-auto px-6 md:px-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Secure Your Organization?</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Join thousands of organizations that trust our platform for their critical cybersecurity needs.
          </p>
          <Link to="/login">
            <Button size="lg" className="px-8">Start Now</Button>
          </Link>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
