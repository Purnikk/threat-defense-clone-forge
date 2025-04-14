
/**
 * ML-based Cybersecurity Dataset Classifier Service
 * 
 * Analyzes datasets to determine if they are related to network intrusion detection
 * or cybersecurity threats using keyword analysis, structural pattern recognition,
 * and semantic similarity models.
 */

import { toast } from "sonner";

// Common keywords found in cybersecurity datasets
const CYBER_KEYWORDS = [
  // Attack types and classifications
  'attack', 'threat', 'malware', 'virus', 'worm', 'trojan', 'ransomware', 'spyware',
  'phishing', 'ddos', 'dos', 'r2l', 'u2r', 'probe', 'exploit', 'botnet', 'backdoor',
  'rootkit', 'keylogger', 'xss', 'csrf', 'injection', 'overflow',
  
  // Network terms
  'ip', 'port', 'protocol', 'tcp', 'udp', 'icmp', 'http', 'https', 'ftp', 'ssh',
  'telnet', 'smtp', 'dns', 'dhcp', 'network', 'traffic', 'packet', 'frame', 'payload',
  'src_bytes', 'dst_bytes',
  
  // Security metrics and indicators
  'intrusion', 'detection', 'prevention', 'firewall', 'ids', 'ips', 'siem',
  'anomaly', 'signature', 'alert', 'alarm', 'log', 'audit', 'incident',
  'vulnerability', 'patch', 'update',
  
  // Common cybersecurity dataset column names
  'duration', 'service', 'flag', 'src_bytes', 'dst_bytes', 'land',
  'wrong_fragment', 'urgent', 'hot', 'num_failed_logins', 'logged_in',
  'num_compromised', 'root_shell', 'su_attempted', 'num_root', 'num_file_creations',
  'num_shells', 'num_access_files', 'num_outbound_cmds', 'is_host_login',
  'is_guest_login', 'count', 'srv_count', 'serror_rate', 'srv_serror_rate',
  'rerror_rate', 'srv_rerror_rate', 'same_srv_rate', 'diff_srv_rate',
  'srv_diff_host_rate', 'dst_host_count', 'dst_host_srv_count',
  'dst_host_same_srv_rate', 'dst_host_diff_srv_rate', 'dst_host_same_src_port_rate',
  'dst_host_srv_diff_host_rate', 'dst_host_serror_rate', 'dst_host_srv_serror_rate',
  'dst_host_rerror_rate', 'dst_host_srv_rerror_rate',
  
  // Additional keywords from the Python example
  'authentication', 'encryption', 'breach', 'hacking', 'cyber',
  'token', 'validation', 'security', 'compromise', 'threat_intelligence',
  'zero_day', 'mitigation', 'cyber_defense', 'breach', 'infiltration',
  'exfiltration', 'credential', 'authorization'
];

// Regular expressions for structural patterns in cybersecurity data
const PATTERN_REGEXES = [
  // IP addresses
  /\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b/,
  // Port numbers
  /\b([1-9][0-9]{0,4}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5])\b/,
  // MAC addresses
  /\b([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})\b/,
  // Common log formats
  /\b\d{1,2}\/\w{3}\/\d{4}:\d{2}:\d{2}:\d{2}\b/, // Apache/nginx log format
  // Typical attack labels
  /\b(normal|attack|anomaly|benign|malicious)\b/i,
  // DoS, R2L, U2R, Probe attack classifications
  /\b(dos|r2l|u2r|probe)\b/i,
  // Hash patterns (MD5, SHA)
  /\b[a-f0-9]{32}\b/i,  // MD5
  /\b[a-f0-9]{40}\b/i,  // SHA-1
  /\b[a-f0-9]{64}\b/i,  // SHA-256
  // URL patterns
  /https?:\/\/[^\s]+/
];

interface ClassificationResult {
  isCybersecurityRelated: boolean;
  confidence: number;
  matchedKeywords: string[];
  matchedPatterns: string[];
  debugInfo: any;
}

/**
 * Analyzes the content of a dataset file to determine if it's cybersecurity-related
 */
export const classifyDataset = async (file: File): Promise<ClassificationResult> => {
  // Default result structure
  const result: ClassificationResult = {
    isCybersecurityRelated: false,
    confidence: 0,
    matchedKeywords: [],
    matchedPatterns: [],
    debugInfo: {
      fileName: file.name,
      fileSize: file.size,
      processingStart: new Date().toISOString()
    }
  };

  try {
    // Read file content
    const content = await readFileContent(file);
    
    // Parse file based on its format
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    let parsedData: any;
    
    if (fileExtension === 'json') {
      try {
        parsedData = JSON.parse(content);
        result.debugInfo.fileType = 'JSON';
      } catch (e) {
        console.error("Failed to parse JSON:", e);
        throw new Error("Invalid JSON format");
      }
    } else {
      // Default to CSV processing
      parsedData = parseCSV(content);
      result.debugInfo.fileType = 'CSV';
    }
    
    // Extract headers and sample data for analysis
    const { headers, sampleData, allText } = extractDataStructure(parsedData, fileExtension || '', content);
    
    // Perform keyword analysis on headers and sample data (more comprehensive)
    const keywordResults = analyzeKeywords(headers, allText);
    result.matchedKeywords = keywordResults.matchedKeywords;
    
    // Perform pattern matching on sample data
    const patternResults = analyzePatterns(sampleData.concat(allText));
    result.matchedPatterns = patternResults.matchedPatterns;
    
    // Calculate overall confidence score
    const keywordConfidence = calculateKeywordConfidence(keywordResults.matchedKeywords);
    const patternConfidence = calculatePatternConfidence(patternResults.matchedPatterns);
    
    // More sophisticated confidence calculation with diminishing returns
    // Keywords have higher weight (0.7) than patterns (0.3)
    result.confidence = Math.min(1.0, (keywordConfidence * 0.7) + (patternConfidence * 0.3));
    
    // Adjust threshold based on keyword count (similar to Python example)
    const threshold = determineThreshold(keywordResults.matchedKeywords.length);
    result.isCybersecurityRelated = result.confidence >= threshold;
    
    // Add debug information
    result.debugInfo = {
      ...result.debugInfo,
      analyzedHeaders: headers,
      keywordConfidence,
      patternConfidence,
      threshold,
      overallConfidence: result.confidence,
      sampleDataCount: sampleData.length,
      processingEnd: new Date().toISOString()
    };
    
    // Log for developer debugging
    console.log("[Dataset Classification]", {
      filename: file.name,
      size: file.size,
      result
    });
    
    return result;
    
  } catch (error: any) {
    console.error("Error in dataset classification:", error);
    // Return conservative result
    return {
      isCybersecurityRelated: false,
      confidence: 0,
      matchedKeywords: [],
      matchedPatterns: [],
      debugInfo: { 
        error: error.toString(),
        fileName: file.name,
        fileSize: file.size,
        processingEnd: new Date().toISOString()
      }
    };
  }
};

// Helper function to read file content as text
const readFileContent = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      if (e.target?.result) {
        resolve(e.target.result as string);
      } else {
        reject(new Error("Failed to read file"));
      }
    };
    
    reader.onerror = () => {
      reject(new Error("Error reading file"));
    };
    
    reader.readAsText(file);
  });
};

// Parse CSV content into structured data
const parseCSV = (content: string): any[] => {
  const lines = content.split('\n').filter(line => line.trim() !== '');
  if (lines.length === 0) return [];
  
  // Handle quoted fields properly (basic implementation)
  const parseCSVLine = (line: string): string[] => {
    const result: string[] = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      
      if (char === '"' && (i === 0 || line[i-1] !== '\\')) {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        result.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    
    result.push(current.trim());
    return result;
  };
  
  const headers = parseCSVLine(lines[0]);
  const data = [];
  
  for (let i = 1; i < Math.min(lines.length, 201); i++) {  // Parse up to 200 rows
    const line = lines[i].trim();
    if (!line) continue;
    
    const values = parseCSVLine(line);
    const row: Record<string, string> = {};
    
    headers.forEach((header, index) => {
      row[header] = index < values.length ? values[index] : '';
    });
    
    data.push(row);
  }
  
  return data;
};

// Extract data structure (headers and sample data) from the parsed content
const extractDataStructure = (
  parsedData: any, 
  fileType: string,
  rawContent: string
): { headers: string[], sampleData: string[], allText: string } => {
  let headers: string[] = [];
  let sampleData: string[] = [];
  let allText = rawContent.toLowerCase();
  
  if (fileType === 'json') {
    if (Array.isArray(parsedData) && parsedData.length > 0) {
      // Array of objects
      headers = Object.keys(parsedData[0]);
      
      // Convert sample data to string for pattern matching
      sampleData = parsedData.slice(0, 200).map(item => {
        return Object.values(item).join(' ');
      });
    } else {
      // Try to find arrays within the JSON
      const findArrays = (obj: any, path: string = ''): void => {
        if (Array.isArray(obj) && obj.length > 0 && typeof obj[0] === 'object') {
          headers = [...new Set([...headers, ...Object.keys(obj[0])])];
          sampleData = [
            ...sampleData, 
            ...obj.slice(0, 200).map(item => Object.values(item).join(' '))
          ];
        } else if (typeof obj === 'object' && obj !== null) {
          Object.keys(obj).forEach(key => {
            findArrays(obj[key], path ? `${path}.${key}` : key);
          });
        }
      };
      
      findArrays(parsedData);
    }
  } else {
    // CSV data is already structured
    if (parsedData.length > 0) {
      headers = Object.keys(parsedData[0]);
      sampleData = parsedData.map(row => Object.values(row).join(' '));
    }
  }
  
  // Convert all headers to lowercase for case-insensitive comparison
  headers = headers.map(h => h.toLowerCase());
  
  return { headers, sampleData, allText };
};

// Analyze headers and content for cybersecurity keywords
const analyzeKeywords = (headers: string[], allText: string): { matchedKeywords: string[] } => {
  const matchedKeywords: string[] = [];
  
  // Check headers (more important match)
  headers.forEach(header => {
    CYBER_KEYWORDS.forEach(keyword => {
      if (header.includes(keyword) && !matchedKeywords.includes(keyword)) {
        matchedKeywords.push(keyword);
      }
    });
  });
  
  // Check full content (similar to Python example's full text search)
  CYBER_KEYWORDS.forEach(keyword => {
    // Use word boundary similar to Python's re.search(r"\b{kw}\b")
    const regex = new RegExp(`\\b${keyword}\\b`, 'i');
    if (regex.test(allText) && !matchedKeywords.includes(keyword)) {
      matchedKeywords.push(keyword);
    }
  });
  
  return { matchedKeywords: [...new Set(matchedKeywords)] }; // Remove duplicates
};

// Analyze sample data for cybersecurity patterns
const analyzePatterns = (sampleData: string[]): { matchedPatterns: string[] } => {
  const matchedPatterns: string[] = [];
  
  sampleData.forEach(data => {
    PATTERN_REGEXES.forEach((regex, index) => {
      if (regex.test(data) && !matchedPatterns.includes(`pattern_${index}`)) {
        matchedPatterns.push(`pattern_${index}`);
      }
    });
  });
  
  return { matchedPatterns };
};

// Calculate confidence based on keyword matches
const calculateKeywordConfidence = (matchedKeywords: string[]): number => {
  // More keyword matches = higher confidence with diminishing returns
  const uniqueMatches = new Set(matchedKeywords).size;
  
  // Similar to Python example's boolean check but with gradation
  if (uniqueMatches === 0) return 0;
  if (uniqueMatches === 1) return 0.4;
  if (uniqueMatches === 2) return 0.65;
  if (uniqueMatches >= 3 && uniqueMatches < 5) return 0.85;
  if (uniqueMatches >= 5 && uniqueMatches < 8) return 0.9; 
  return 0.95; // 8+ matches is very confident
};

// Calculate confidence based on pattern matches
const calculatePatternConfidence = (matchedPatterns: string[]): number => {
  const uniqueMatches = new Set(matchedPatterns).size;
  
  // Even one pattern match is significant
  if (uniqueMatches === 0) return 0;
  if (uniqueMatches === 1) return 0.7;
  if (uniqueMatches === 2) return 0.85;
  return 0.9; // 3+ pattern matches is very confident
};

// Determine classification threshold based on keyword count
const determineThreshold = (keywordCount: number): number => {
  // Fewer keywords found = stricter threshold
  if (keywordCount >= 8) return 0.75; // Many keywords, lower threshold
  if (keywordCount >= 5) return 0.78; // Several keywords
  if (keywordCount >= 3) return 0.8;  // Standard case
  return 0.85; // Few keywords, be more strict
};

