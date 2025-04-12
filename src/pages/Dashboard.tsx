
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { AlertTriangle, Shield, Activity, Clock, AlertCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Dashboard = () => {
  const { user } = useAuth();

  // Sample data for charts
  const threatData = [
    { name: 'Jan', threats: 65 },
    { name: 'Feb', threats: 59 },
    { name: 'Mar', threats: 80 },
    { name: 'Apr', threats: 81 },
    { name: 'May', threats: 56 },
    { name: 'Jun', threats: 55 },
    { name: 'Jul', threats: 40 },
  ];

  const threatTypeData = [
    { name: 'Malware', value: 400 },
    { name: 'Phishing', value: 300 },
    { name: 'DDoS', value: 200 },
    { name: 'Insider', value: 100 },
  ];

  const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const recentThreats = [
    { id: 1, type: 'Malware Detected', time: '5 minutes ago', severity: 'High' },
    { id: 2, type: 'Suspicious Login', time: '1 hour ago', severity: 'Medium' },
    { id: 3, type: 'Port Scan', time: '3 hours ago', severity: 'Low' },
    { id: 4, type: 'Brute Force Attempt', time: '5 hours ago', severity: 'High' },
  ];

  const severityColor = (severity: string) => {
    switch(severity) {
      case 'High': return 'text-red-500';
      case 'Medium': return 'text-yellow-500';
      case 'Low': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Welcome header */}
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold">Welcome, {user?.username || 'User'}</h1>
            <p className="text-gray-600">Here's your threat detection overview</p>
          </div>
          
          {/* Stats cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Threats</CardTitle>
                <AlertTriangle className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2,345</div>
                <p className="text-xs text-green-500 flex items-center">
                  <Activity className="h-3 w-3 mr-1" />
                  +20.1% from last month
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Threat Prevention Rate</CardTitle>
                <Shield className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">96.5%</div>
                <p className="text-xs text-green-500 flex items-center">
                  <Activity className="h-3 w-3 mr-1" />
                  +2.3% from last month
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Active Incidents</CardTitle>
                <AlertCircle className="h-4 w-4 text-yellow-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">7</div>
                <p className="text-xs text-red-500 flex items-center">
                  <Activity className="h-3 w-3 mr-1" />
                  +3 from last week
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Avg. Response Time</CardTitle>
                <Clock className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1.2m</div>
                <p className="text-xs text-green-500 flex items-center">
                  <Activity className="h-3 w-3 mr-1" />
                  -30s from last month
                </p>
              </CardContent>
            </Card>
          </div>
          
          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Threats Over Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={threatData}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="threats" stroke="#00B3B3" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Threat Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={threatTypeData}
                        cx="50%"
                        cy="50%"
                        innerRadius={70}
                        outerRadius={90}
                        fill="#8884d8"
                        dataKey="value"
                        label={({name}) => name}
                      >
                        {threatTypeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Recent Threats */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Threats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentThreats.map(threat => (
                  <div key={threat.id} className="flex items-center justify-between p-3 bg-white border rounded-lg shadow-sm">
                    <div className="flex items-center">
                      <AlertTriangle className={`h-5 w-5 mr-3 ${severityColor(threat.severity)}`} />
                      <div>
                        <div className="font-medium">{threat.type}</div>
                        <div className="text-sm text-gray-500 flex items-center">
                          <Clock className="h-3 w-3 mr-1" /> {threat.time}
                        </div>
                      </div>
                    </div>
                    <div className={`px-2 py-1 rounded text-xs font-medium ${severityColor(threat.severity)}`}>
                      {threat.severity}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
