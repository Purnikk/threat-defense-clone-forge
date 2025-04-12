
import React, { ReactNode } from 'react';
import { Card, CardContent } from './ui/card';

interface ThreatCardProps {
  title: string;
  description: string;
  icon: ReactNode;
}

const ThreatCard: React.FC<ThreatCardProps> = ({ title, description, icon }) => {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <CardContent className="p-6 text-center">
        <div className="flex justify-center mb-4">
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </CardContent>
    </Card>
  );
};

export default ThreatCard;
