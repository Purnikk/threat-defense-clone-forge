
import React from 'react';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Shield, ShieldAlert, ShieldCheck } from 'lucide-react';

interface SecurityStatusAlertProps {
  isSafe: boolean;
  threatLevel: 'none' | 'low' | 'medium' | 'high';
  message: string;
}

const SecurityStatusAlert: React.FC<SecurityStatusAlertProps> = ({
  isSafe,
  threatLevel,
  message
}) => {
  const getBgColor = () => {
    if (isSafe) return 'bg-green-100 border-green-300';
    
    switch(threatLevel) {
      case 'low': return 'bg-amber-100 border-amber-300';
      case 'medium': return 'bg-orange-100 border-orange-300';
      case 'high': return 'bg-red-100 border-red-300';
      default: return 'bg-gray-100 border-gray-300';
    }
  };

  const getIcon = () => {
    if (isSafe) return <ShieldCheck className="h-5 w-5 text-green-600" />;
    
    switch(threatLevel) {
      case 'low': return <ShieldAlert className="h-5 w-5 text-amber-600" />;
      case 'medium': return <ShieldAlert className="h-5 w-5 text-orange-600" />;
      case 'high': return <ShieldAlert className="h-5 w-5 text-red-600" />;
      default: return <Shield className="h-5 w-5 text-gray-600" />;
    }
  };

  const getTitleColor = () => {
    if (isSafe) return 'text-green-800';
    
    switch(threatLevel) {
      case 'low': return 'text-amber-800';
      case 'medium': return 'text-orange-800';
      case 'high': return 'text-red-800';
      default: return 'text-gray-800';
    }
  };

  return (
    <Alert className={`${getBgColor()} border mb-6`}>
      <div className="flex items-center">
        {getIcon()}
        <AlertTitle className={`ml-2 ${getTitleColor()}`}>
          {isSafe ? 'System is Safe' : 'Potential Threat Detected'}
        </AlertTitle>
      </div>
      <AlertDescription className="mt-2">
        {message}
      </AlertDescription>
    </Alert>
  );
};

export default SecurityStatusAlert;
