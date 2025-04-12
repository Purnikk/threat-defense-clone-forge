
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Upload, FileUp, Download, ArrowRight } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Navigate } from 'react-router-dom';
import { toast } from 'sonner';

const UploadPage = () => {
  const { isAuthenticated } = useAuth();
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<string>("");

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const algorithms = [
    { value: "knn", label: "KNN - 97%" },
    { value: "randomForest", label: "RANDOM FOREST - 97%" },
    { value: "cnn", label: "CNN - 95%" },
    { value: "lstm", label: "LSTM - 95%" },
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFiles(e.target.files);
      toast.success(`${e.target.files.length} file(s) selected`);
    }
  };

  const handleUpload = () => {
    if (!selectedFiles) {
      toast.error("Please select a file first");
      return;
    }
    
    if (!selectedAlgorithm) {
      toast.error("Please select an algorithm");
      return;
    }

    toast.success("File uploaded successfully!");
    // In a real app, you would send the file to your backend here
  };

  const handleDownload = () => {
    toast.info("Downloading result file");
    // In a real app, this would download the processed file
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
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-blue-50">
      <Navbar />

      <main className="flex-1 py-12 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-10 text-center">Upload Dataset Files</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Random Row Predict */}
            <Card>
              <CardHeader>
                <CardTitle>RANDOM ROW PREDICT</CardTitle>
                <CardDescription>
                  It will take single row from validation data to predict the type of attack.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <Button className="w-full" onClick={() => toast.info("Random prediction initiated")}>
                  Predict
                </Button>
              </CardContent>
            </Card>

            {/* Open CSV */}
            <Card>
              <CardHeader>
                <CardTitle>OPEN CSV</CardTitle>
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
                
                <Button className="w-full" onClick={handlePredict}>
                  Predict
                </Button>
                
                <Button variant="outline" className="w-full" onClick={handleDownload}>
                  <Download size={16} className="mr-2" />
                  Download File
                </Button>
              </CardContent>
            </Card>

            {/* Enter Network Parameters */}
            <Card>
              <CardHeader>
                <CardTitle>Enter Network Parameters</CardTitle>
                <CardDescription>
                  It will take the network parameters from the user and predict the type of attack.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <Button className="w-full" onClick={() => toast.info("Network parameter prediction initiated")}>
                  Predict
                </Button>
              </CardContent>
            </Card>
          </div>
          
          {/* Advanced Upload Section */}
          <Card className="mt-12">
            <CardHeader>
              <CardTitle>Advanced Dataset Upload</CardTitle>
              <CardDescription>
                Upload multiple files or complete datasets for batch analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-primary/30 rounded-lg p-8 text-center mb-6">
                <div className="flex flex-col items-center justify-center gap-4">
                  <Upload size={40} className="text-primary/60" />
                  <div className="text-lg font-medium">Drop files here or click to browse</div>
                  <p className="text-gray-500">Supports CSV, PCAP, and log files</p>
                  
                  <Input 
                    id="advanced-upload"
                    type="file" 
                    multiple 
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <Button asChild>
                    <label htmlFor="advanced-upload" className="cursor-pointer">
                      <FileUp size={16} className="mr-2" />
                      Select Files
                    </label>
                  </Button>
                </div>
              </div>
              
              {selectedFiles && (
                <div className="mb-6">
                  <h3 className="font-medium mb-2">Selected Files:</h3>
                  <div className="bg-primary/10 rounded p-3 max-h-32 overflow-y-auto">
                    {Array.from(selectedFiles).map((file, index) => (
                      <div key={index} className="text-sm py-1">
                        {file.name} ({(file.size / 1024).toFixed(2)} KB)
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select value={selectedAlgorithm} onValueChange={setSelectedAlgorithm}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Analysis Algorithm" />
                  </SelectTrigger>
                  <SelectContent>
                    {algorithms.map(algo => (
                      <SelectItem key={algo.value} value={algo.value}>
                        {algo.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Button onClick={handleUpload} className="flex items-center gap-2">
                  Upload and Analyze <ArrowRight size={16} />
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

export default UploadPage;
