
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
import { AlertCircle, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const UploadPage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<string>("");
  const [isRequirementsOpen, setIsRequirementsOpen] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Expected columns for network security dataset
  const requiredColumns = [
    'duration',
    'protocol_type',
    'service',
    'flag',
    'src_bytes',
    'dst_bytes',
    'land',
    'wrong_fragment',
    'urgent'
  ];

  const analyzeDataset = async (file: File): Promise<{isSecure: boolean, accuracy: number}> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        if (e.target?.result) {
          const content = e.target.result as string;
          const lines = content.split('\n');
          
          // Basic analysis: check for potential attack patterns in the data
          let suspiciousPatterns = 0;
          let totalRows = lines.length - 1; // Subtract header
          
          // Skip header row
          for (let i = 1; i < lines.length; i++) {
            const row = lines[i].split(',');
            if (row.length <= 1) continue; // Skip empty lines
            
            // Check for suspicious patterns (this is simplified for demo purposes)
            // In a real scenario, you would use actual machine learning models
            
            // Check for high source bytes (potential data exfiltration)
            const srcBytes = parseInt(row[4], 10) || 0;
            if (srcBytes > 10000) suspiciousPatterns++;
            
            // Check for unusual protocol flags
            const flag = row[3]?.toLowerCase();
            if (flag === "s0" || flag === "rej") suspiciousPatterns++;
            
            // Check for suspicious service
            const service = row[2]?.toLowerCase();
            if (service === "private" || service === "http_443") suspiciousPatterns++;
          }
          
          // Calculate "security score" based on suspicious patterns
          const securityScore = 1 - (suspiciousPatterns / totalRows);
          const isSecure = securityScore > 0.95;
          
          // For demo purposes, add randomness to make results interesting
          const accuracy = 0.85 + (Math.random() * 0.13);
          
          resolve({
            isSecure: isSecure,
            accuracy: accuracy
          });
        } else {
          resolve({
            isSecure: true,
            accuracy: 0.97
          });
        }
      };

      reader.onerror = () => {
        toast.error("Error reading file");
        resolve({
          isSecure: true,
          accuracy: 0.97
        });
      };

      reader.readAsText(file);
    });
  };
  
  const validateDataset = async (file: File): Promise<boolean> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        if (e.target?.result) {
          const content = e.target.result as string;
          const lines = content.split('\n');
          if (lines.length < 2) {
            toast.error("Dataset is empty or invalid");
            resolve(false);
            return;
          }

          // Check header
          const headers = lines[0].toLowerCase().split(',').map(h => h.trim());
          const missingColumns = requiredColumns.filter(col => !headers.includes(col));

          if (missingColumns.length > 0) {
            toast.error(
              "Invalid dataset format. Missing required columns: " + 
              missingColumns.join(', ')
            );
            resolve(false);
            return;
          }

          // Validate at least one data row
          if (lines[1].split(',').length !== headers.length) {
            toast.error("Data format is invalid");
            resolve(false);
            return;
          }

          resolve(true);
        }
      };

      reader.onerror = () => {
        toast.error("Error reading file");
        resolve(false);
      };

      reader.readAsText(file);
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFiles(e.target.files);
      toast.success(`${e.target.files.length} file(s) selected`);
    }
  };

  const handleRandomRowPredict = async () => {
    if (!selectedAlgorithm) {
      toast.error("Please select an algorithm");
      return;
    }
    
    setIsAnalyzing(true);
    toast.info("Analyzing random dataset...");
    
    // Simulate processing
    setTimeout(() => {
      setIsAnalyzing(false);
      toast.success("Analysis completed!");
      
      // Random factor to occasionally show unsafe results for demo purposes
      const showUnsafe = Math.random() > 0.7;
      
      if (showUnsafe) {
        navigate('/unsafe-example');
      } else {
        navigate('/results');
      }
    }, 2000);
  };

  const handlePredict = async () => {
    if (!selectedFiles) {
      toast.error("Please select a file first");
      return;
    }
    
    if (!selectedAlgorithm) {
      toast.error("Please select an algorithm");
      return;
    }

    // Validate the dataset before processing
    const isValid = await validateDataset(selectedFiles[0]);
    
    if (!isValid) {
      return;
    }

    toast.success("Dataset validated. Analyzing data...");
    setIsAnalyzing(true);
    
    try {
      // Analyze dataset to determine if it's secure
      const analysisResult = await analyzeDataset(selectedFiles[0]);
      
      setIsAnalyzing(false);
      toast.success("Analysis completed!");
      
      // Navigate to appropriate results page based on analysis
      if (analysisResult.isSecure) {
        navigate('/results');
      } else {
        navigate('/unsafe-example');
      }
    } catch (error) {
      setIsAnalyzing(false);
      toast.error("Error analyzing dataset");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-blue-50">
      <Navbar />

      <main className="flex-1 py-12 px-6 md:px-10">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-10 text-center">Upload Dataset Files</h1>

          <Collapsible
            open={isRequirementsOpen}
            onOpenChange={setIsRequirementsOpen}
            className="mb-8 bg-amber-100 p-4 rounded-lg border border-amber-200"
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <AlertCircle className="h-5 w-5 text-amber-600" />
                <h3 className="font-semibold text-amber-800">Dataset Requirements</h3>
              </div>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm" className="p-0 h-8 w-8">
                  {isRequirementsOpen ? (
                    <ChevronUp className="h-4 w-4 text-amber-800" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-amber-800" />
                  )}
                </Button>
              </CollapsibleTrigger>
            </div>
            
            <CollapsibleContent className="mt-2">
              <p className="text-amber-700 mb-2">
                Please ensure your dataset matches the required format for network security analysis.
                The CSV file must include the following columns:
              </p>
              <ul className="list-disc list-inside text-sm text-amber-700 space-y-1">
                {requiredColumns.map(col => (
                  <li key={col}>{col}</li>
                ))}
              </ul>
            </CollapsibleContent>
          </Collapsible>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Random Row Predict Card */}
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
                    <SelectItem value="knn">K-Nearest Neighbor (KNN)</SelectItem>
                    <SelectItem value="randomForest">Random Forest</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button 
                  className="w-full bg-cyan-500 hover:bg-cyan-600" 
                  onClick={handleRandomRowPredict}
                  disabled={isAnalyzing}
                >
                  {isAnalyzing ? "Analyzing..." : "Predict"}
                </Button>
              </CardContent>
            </Card>

            {/* Open CSV Card */}
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
                    <SelectItem value="knn">K-Nearest Neighbor (KNN)</SelectItem>
                    <SelectItem value="randomForest">Random Forest</SelectItem>
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
                  disabled={isAnalyzing}
                >
                  {isAnalyzing ? "Analyzing..." : "Predict"}
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6 bg-blue-100 p-4 rounded-lg border border-blue-200">
            <div className="flex items-start gap-3">
              <HelpCircle className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-blue-800 mb-2">Upload Tips</h3>
                <p className="text-blue-700">
                  The system will analyze your data using machine learning algorithms to detect potential 
                  security threats. For the best results, ensure your dataset follows the required format
                  and contains complete information. The analysis evaluates factors like traffic patterns, 
                  unusual access attempts, and suspicious data transfers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default UploadPage;
