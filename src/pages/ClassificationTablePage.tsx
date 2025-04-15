
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

interface TableData {
  title: string;
  headers: string[];
  rows: Record<string, string | number>[];
}

const ClassificationTablePage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { algorithm } = location.state || { algorithm: 'knn' };
  
  const getTableData = (): TableData => {
    return algorithm === 'knn' ? knnBinaryData : rfBinaryData;
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
          />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ClassificationTablePage;
