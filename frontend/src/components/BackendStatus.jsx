import  { useState, useEffect } from 'react';
import { Server, CheckCircle, AlertCircle, Clock } from 'lucide-react';

const BackendStatus = () => {
  const [status, setStatus] = useState({
    ai: 'connected',
    database: 'connected',
    gamification: 'connected',
    learning: 'connected'
  });

  useEffect(() => {
    // Simulate backend status monitoring
    const checkServices = () => {
      const services = ['ai', 'database', 'gamification', 'learning'];
      const newStatus = {};
      
      services.forEach(service => {
        // Simulate occasional service issues
        const random = Math.random();
        if (random > 0.95) {
          newStatus[service] = 'error';
        } else if (random > 0.9) {
          newStatus[service] = 'loading';
        } else {
          newStatus[service] = 'connected';
        }
      });
      
      setStatus(newStatus);
    };

    const interval = setInterval(checkServices, 30000); // Check every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const getStatusIcon = (serviceStatus) => {
    switch (serviceStatus) {
      case 'connected':
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'loading':
        return <Clock className="w-4 h-4 text-yellow-400 animate-spin" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-400" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (serviceStatus) => {
    switch (serviceStatus) {
      case 'connected':
        return 'text-green-400';
      case 'loading':
        return 'text-yellow-400';
      case 'error':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className="fixed bottom-4 left-4 glassmorphism p-4 rounded-xl z-40 max-w-xs">
      <div className="flex items-center mb-3">
        <Server className="w-5 h-5 text-blue-400 mr-2" />
        <h3 className="text-white font-semibold text-sm">Backend Services</h3>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-blue-200 text-xs">AI Service</span>
          <div className="flex items-center">
            {getStatusIcon(status.ai)}
            <span className={`text-xs ml-1 ${getStatusColor(status.ai)}`}>
              {status.ai}
            </span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-blue-200 text-xs">User Data</span>
          <div className="flex items-center">
            {getStatusIcon(status.database)}
            <span className={`text-xs ml-1 ${getStatusColor(status.database)}`}>
              {status.database}
            </span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-blue-200 text-xs">Gamification</span>
          <div className="flex items-center">
            {getStatusIcon(status.gamification)}
            <span className={`text-xs ml-1 ${getStatusColor(status.gamification)}`}>
              {status.gamification}
            </span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-blue-200 text-xs">Learning Engine</span>
          <div className="flex items-center">
            {getStatusIcon(status.learning)}
            <span className={`text-xs ml-1 ${getStatusColor(status.learning)}`}>
              {status.learning}
            </span>
          </div>
        </div>
      </div>
      
      <div className="mt-3 pt-2 border-t border-white border-opacity-10">
        <div className="text-xs text-blue-300">
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
};

export default BackendStatus;
 