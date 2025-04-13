
import React from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ClassificationTableProps {
  title: string;
  headers: string[];
  rows: Record<string, string | number>[];
  isBinary?: boolean;
}

const ClassificationTable: React.FC<ClassificationTableProps> = ({
  title,
  headers,
  rows,
  isBinary = true
}) => {
  // Function to determine if a value indicates high performance (for color highlighting)
  const isHighPerformance = (value: string | number): boolean => {
    if (typeof value === 'string') {
      const numValue = parseFloat(value);
      return !isNaN(numValue) && numValue >= 0.95;
    }
    return typeof value === 'number' && value >= 0.95;
  };

  // Function to determine cell background color based on value
  const getCellColor = (value: string | number): string => {
    if (typeof value === 'string' && (value === '-' || value === '')) return '';
    
    if (isHighPerformance(value)) {
      return 'bg-green-400/40';
    } else {
      const numValue = typeof value === 'string' ? parseFloat(value) : value;
      if (!isNaN(numValue as number)) {
        if (numValue >= 0.9) return 'bg-amber-400/40';
        if (numValue >= 0.85) return 'bg-orange-400/40';
        if (numValue < 0.85) return 'bg-red-400/40';
      }
    }
    return '';
  };

  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold mb-6 text-center text-white">
        {title}
      </h1>
      <div className="w-full overflow-auto">
        <Table className="border-collapse w-full">
          <TableHeader className="[&_tr]:border-b-0">
            <TableRow className="bg-teal-600/50 border-b-0">
              {headers.map((header, index) => (
                <TableHead 
                  key={index} 
                  className="text-white font-medium text-center p-4 border-b border-teal-200"
                >
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row, rowIndex) => (
              <TableRow 
                key={rowIndex} 
                className={`
                  ${rowIndex % 2 === 0 ? 'bg-teal-500/80' : 'bg-teal-500/60'}
                  hover:bg-teal-400/90 border-b-0
                `}
              >
                {Object.keys(row).map((key, cellIndex) => (
                  <TableCell 
                    key={cellIndex} 
                    className={`text-center text-white font-medium p-4 border-b border-teal-200 ${getCellColor(row[key])}`}
                  >
                    {row[key]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ClassificationTable;
