
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
import { Loader, FileType, HelpCircle, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { classifyDataset } from '@/services/DatasetClassifier';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

const UploadPage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<string>("");
  const [isRequirementsOpen, setIsRequirementsOpen] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState<string>("");
  const [classificationInProgress, setClassificationInProgress] = useState(false);
  const [classificationResults, setClassificationResults] = useState<any>(null);
  const [isBuffering, setIsBuffering] = useState(false);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const runMLClassifier = async (file: File): Promise<boolean> => {
    setClassificationInProgress(true);
    try {
      const classificationResult = await classifyDataset(file);
      
      setClassificationResults(classificationResult);
      
      if (!classificationResult.isCybersecurityRelated) {
        toast.error('Upload failed: Dataset not recognized as cybersecurity or intrusion detection-related. Please upload a valid cyber threat dataset.');
        console.log('[ML Classification Failed]', {
          confidence: classificationResult.confidence,
          matchedKeywords: classificationResult.matchedKeywords,
          matchedPatterns: classificationResult.matchedPatterns,
          debugInfo: classificationResult.debugInfo
        });
        return false;
      }
      
      console.log('[ML Classification Passed]', {
        confidence: classificationResult.confidence,
        matchedKeywords: classificationResult.matchedKeywords,
        matchedPatterns: classificationResult.matchedPatterns,
        debugInfo: classificationResult.debugInfo
      });
      
      toast.success('Dataset validated as cybersecurity-related');
      return true;
    } catch (error) {
      console.error("ML Classification error:", error);
      toast.error('Error analyzing dataset format');
      return false;
    } finally {
      setClassificationInProgress(false);
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFiles(e.target.files);
      setUploadedFileName(e.target.files[0].name);
      setClassificationResults(null);
      toast.success(`${e.target.files.length} file(s) selected`);
    }
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

    setIsBuffering(true);
    
    setTimeout(async () => {
      setIsAnalyzing(true);
      const isValidCyberDataset = await runMLClassifier(selectedFiles[0]);
      
      if (!isValidCyberDataset) {
        setIsAnalyzing(false);
        setIsBuffering(false);
        return;
      }

      toast.success("Analyzing data...");
      
      try {
        // Check filename for keywords that indicate unsafe data
        const fileName = selectedFiles[0].name.toLowerCase();
        const unsafeKeywords = ['threat', 'attack', 'malware', 'unsafe'];
        const isUnsafeFile = unsafeKeywords.some(keyword => fileName.includes(keyword));
        
        // Wait for 5-6 seconds to show the analysis process
        setTimeout(() => {
          setIsAnalyzing(false);
          setIsBuffering(false);
          toast.success("Analysis completed!");
          
          // Redirect based on filename
          if (isUnsafeFile) {
            navigate('/unsafe-example');
          } else {
            navigate('/results');
          }
        }, 5500); // 5.5 seconds
      } catch (error) {
        setIsAnalyzing(false);
        setIsBuffering(false);
        toast.error("Error analyzing dataset");
      }
    }, 5000); // 5 seconds buffering time before analysis
  };

  const acceptableFileTypes = ".csv,.json";

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
                Please upload cybersecurity or network intrusion detection datasets. 
                The system accepts CSV and JSON formats with the following attributes:
              </p>
              <ul className="list-disc list-inside text-sm text-amber-700 space-y-1">
                <li>Network traffic features (e.g., IP addresses, ports, protocols)</li>
                <li>Attack classification labels (normal, DoS, R2L, U2R, Probe, etc.)</li>
                <li>Traffic metrics (duration, bytes transferred, packets, etc.)</li>
                <li>Connection statistics and flags</li>
                <li>Authentication and validation metrics</li>
              </ul>
              
              <div className="mt-3 flex items-center gap-2">
                <FileType className="h-4 w-4 text-amber-700" />
                <span className="text-sm text-amber-700">Supported formats: CSV, JSON</span>
              </div>
            </CollapsibleContent>
          </Collapsible>
          
          <div className="flex justify-center">
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle>Open CSV or JSON</CardTitle>
                <CardDescription>
                  Analyze your cybersecurity dataset file and predict attack types.
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
                  <label htmlFor="dataset-file" className="sr-only">Choose file</label>
                  <Input
                    id="dataset-file"
                    type="file"
                    accept={acceptableFileTypes}
                    onChange={handleFileChange}
                  />
                  {uploadedFileName && (
                    <p className="text-sm text-gray-500">{uploadedFileName}</p>
                  )}
                </div>
                
                <Button 
                  className="w-full bg-cyan-500 hover:bg-cyan-600" 
                  onClick={handlePredict}
                  disabled={isAnalyzing || classificationInProgress || isBuffering}
                >
                  {isBuffering || isAnalyzing || classificationInProgress ? (
                    <>
                      <Loader className="mr-2 h-4 w-4 animate-spin" />
                      {isBuffering ? "Processing..." : "Analyzing..."}
                    </>
                  ) : (
                    "Predict"
                  )}
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
