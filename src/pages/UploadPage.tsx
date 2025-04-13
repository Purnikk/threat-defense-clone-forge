
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/context/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const UploadPage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<string>("");

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const algorithms = [
    { value: "knn", label: "K-Nearest Neighbor (KNN)" },
    { value: "randomForest", label: "Random Forest" },
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFiles(e.target.files);
      toast.success(`${e.target.files.length} file(s) selected`);
    }
  };

  const handleRandomRowPredict = () => {
    toast.info("Processing random prediction...");
    
    // Simulate processing
    setTimeout(() => {
      toast.success("Prediction completed!");
      navigate('/results');
    }, 2000);
  };

  const handlePredict = () => {
    if (!selectedFiles) {
      toast.error("Please select a file first");
      return;
    }
    
    if (!selectedAlgorithm) {
      toast.error("Please select an algorithm");
      return;
    }

    toast.success("Prediction started!");
    
    // Simulate processing
    setTimeout(() => {
      toast.success("Prediction completed!");
      navigate('/results');
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-blue-50">
      <Navbar />

      <main className="flex-1 py-12 px-6 md:px-10">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-10 text-center">Upload Dataset Files</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Random Row Predict */}
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Random Row Predict</CardTitle>
                <CardDescription>
                  It will take a single row from validation data to predict the type of attack.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <Select value={selectedAlgorithm} onValueChange={setSelectedAlgorithm}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Algorithm" />
                  </SelectTrigger>
                  <SelectContent>
                    {algorithms.map(algo => (
                      <SelectItem key={algo.value} value={algo.value}>
                        {algo.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Button 
                  className="w-full bg-cyan-500 hover:bg-cyan-600" 
                  onClick={handleRandomRowPredict}
                >
                  Predict
                </Button>
              </CardContent>
            </Card>

            {/* Open CSV */}
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Open CSV</CardTitle>
                <CardDescription>
                  It will take a CSV file of rows ranging from (1..500.. n rows) and update the file with type of attack for each row.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <Select value={selectedAlgorithm} onValueChange={setSelectedAlgorithm}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Algorithm" />
                  </SelectTrigger>
                  <SelectContent>
                    {algorithms.map(algo => (
                      <SelectItem key={algo.value} value={algo.value}>
                        {algo.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <label htmlFor="csv-file" className="sr-only">Choose file</label>
                  <Input
                    id="csv-file"
                    type="file"
                    accept=".csv"
                    onChange={handleFileChange}
                  />
                </div>
                
                <Button 
                  className="w-full bg-cyan-500 hover:bg-cyan-600" 
                  onClick={handlePredict}
                >
                  Predict
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default UploadPage;
