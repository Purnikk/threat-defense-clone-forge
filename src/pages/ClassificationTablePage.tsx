
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import ClassificationTable from '@/components/ClassificationTable';
import { ArrowLeft } from 'lucide-react';

// Define the mock data for KNN Binary Classification
const knnBinaryData = {
  title: "K-NEAREST NEIGHBOUR BINARY-CLASS CLASSIFICATION TABLE",
  headers: ["PRECISION", "RECALL", "F-1 SCORE", "SUPPORT"],
  rows: [
    { class: "NORMAL", precision: "0.97", recall: "0.97", fscore: "0.97", support: "9246" },
    { class: "ATTACK", precision: "0.98", recall: "0.98", fscore: "0.98", support: "12169" },
    { class: "ACCURACY", precision: "", recall: "", fscore: "0.98", support: "21415" },
    { class: "MACRO AVERAGE", precision: "0.98", recall: "0.98", fscore: "0.98", support: "21415" },
    { class: "WEIGHTED AVERAGE", precision: "0.98", recall: "0.98", fscore: "0.98", support: "21415" },
  ]
};

// Define the mock data for KNN Multi-Class Classification
const knnMultiData = {
  title: "K-NEAREST NEIGHBOUR MULTI-CLASS CLASSIFICATION TABLE",
  headers: ["PRECISION", "RECALL", "F-1 SCORE", "SUPPORT"],
  rows: [
    { class: "DOS", precision: "0.99", recall: "0.99", fscore: "0.99", support: "6834" },
    { class: "NORMAL", precision: "0.97", recall: "0.97", fscore: "0.97", support: "9270" },
    { class: "PROBE", precision: "0.98", recall: "0.98", fscore: "0.98", support: "2307" },
    { class: "U2R", precision: "0.84", recall: "0.87", fscore: "0.86", support: "919" },
    { class: "R2L", precision: "0.96", recall: "0.98", fscore: "0.97", support: "2085" },
    { class: "ACCURACY", precision: "", recall: "", fscore: "0.97", support: "21415" },
    { class: "MACRO AVERAGE", precision: "0.95", recall: "0.96", fscore: "0.97", support: "21415" },
    { class: "WEIGHTED AVERAGE", precision: "0.97", recall: "0.97", fscore: "0.97", support: "21415" },
  ]
};

// Define the mock data for Random Forest Binary Classification
const rfBinaryData = {
  title: "RANDOM-FOREST BINARY-CLASS CLASSIFICATION TABLE",
  headers: ["PRECISION", "RECALL", "F-1 SCORE", "SUPPORT"],
  rows: [
    { class: "NORMAL", precision: "0.99", recall: "0.96", fscore: "0.97", support: "9487" },
    { class: "ATTACK", precision: "0.97", recall: "0.99", fscore: "0.98", support: "11928" },
    { class: "ACCURACY", precision: "", recall: "", fscore: "0.97", support: "21415" },
    { class: "MACRO AVERAGE", precision: "0.98", recall: "0.97", fscore: "0.97", support: "21415" },
    { class: "WEIGHTED AVERAGE", precision: "0.97", recall: "0.97", fscore: "0.97", support: "21415" },
  ]
};

// Define the mock data for Random Forest Multi-Class Classification
const rfMultiData = {
  title: "RANDOM-FOREST MULTI-CLASS CLASSIFICATION TABLE",
  headers: ["PRECISION", "RECALL", "F-1 SCORE", "SUPPORT"],
  rows: [
    { class: "DOS", precision: "1.00", recall: "1.00", fscore: "1.00", support: "6822" },
    { class: "PROBE", precision: "1.00", recall: "1.00", fscore: "1.00", support: "2308" },
    { class: "R2L", precision: "0.94", recall: "0.89", fscore: "0.92", support: "1007" },
    { class: "U2R", precision: "0.83", recall: "1.00", fscore: "0.90", support: "1765" },
    { class: "NORMAL", precision: "0.99", recall: "0.95", fscore: "0.97", support: "9513" },
    { class: "ACCURACY", precision: "", recall: "", fscore: "0.97", support: "21415" },
    { class: "MACRO AVERAGE", precision: "0.95", recall: "0.97", fscore: "0.96", support: "21415" },
    { class: "WEIGHTED AVERAGE", precision: "0.98", recall: "0.97", fscore: "0.97", support: "21415" },
  ]
};

interface TableData {
  title: string;
  headers: string[];
  rows: Record<string, string | number>[];
  isBinary?: boolean;
}

const ClassificationTablePage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { tableType, algorithm } = location.state || { tableType: 'binary', algorithm: 'knn' };
  
  const getTableData = (): TableData => {
    if (algorithm === 'knn') {
      return tableType === 'binary' ? knnBinaryData : knnMultiData;
    } else {
      return tableType === 'binary' ? rfBinaryData : rfMultiData;
    }
  };
  
  const tableData = getTableData();

  return (
    <div className="min-h-screen flex flex-col bg-teal-500">
      <Navbar />

      <main className="flex-1 py-12 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <Button 
            onClick={() => navigate('/results')}
            className="mb-6 bg-sky-500 hover:bg-sky-600"
            variant="outline"
          >
            <ArrowLeft className="mr-2" /> Back to Results
          </Button>
          
          <ClassificationTable 
            title={tableData.title} 
            headers={["", ...tableData.headers]}
            rows={tableData.rows.map(row => ({ 
              class: row.class, 
              precision: row.precision || "-", 
              recall: row.recall || "-", 
              fscore: row.fscore, 
              support: row.support 
            }))}
            isBinary={tableType === 'binary'}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ClassificationTablePage;
