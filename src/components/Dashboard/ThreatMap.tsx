import React from 'react';

const ThreatMap: React.FC = () => {
  // In a real application, this would use a proper geospatial visualization library
  return (
    <div className="h-[400px] bg-gray-800 rounded-xl p-4 relative overflow-hidden">
      <h3 className="text-lg font-semibold mb-4">Global Threat Map</h3>
      
      {/* World map background - simplified for demo */}
      <div className="absolute inset-0 opacity-20 flex items-center justify-center">
        <div className="w-[90%] h-[70%] border-2 border-gray-600 rounded-full"></div>
      </div>
      
      {/* Attack points */}
      <div className="absolute h-2 w-2 bg-red-500 rounded-full animate-ping" style={{ top: '30%', left: '20%' }}></div>
      <div className="absolute h-2 w-2 bg-red-500 rounded-full animate-ping" style={{ top: '40%', left: '70%' }}></div>
      <div className="absolute h-2 w-2 bg-red-500 rounded-full animate-ping" style={{ top: '60%', left: '50%' }}></div>
      <div className="absolute h-2 w-2 bg-red-500 rounded-full animate-ping" style={{ top: '25%', left: '80%' }}></div>
      <div className="absolute h-2 w-2 bg-red-500 rounded-full animate-ping" style={{ top: '70%', left: '30%' }}></div>
      
      {/* Attack lines */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <line x1="20%" y1="30%" x2="50%" y2="50%" stroke="rgba(239, 68, 68, 0.5)" strokeWidth="1">
          <animate attributeName="stroke-opacity" values="0;0.5;0" dur="3s" repeatCount="indefinite" />
        </line>
        <line x1="70%" y1="40%" x2="50%" y2="50%" stroke="rgba(239, 68, 68, 0.5)" strokeWidth="1">
          <animate attributeName="stroke-opacity" values="0;0.5;0" dur="2s" repeatCount="indefinite" />
        </line>
        <line x1="50%" y1="60%" x2="50%" y2="50%" stroke="rgba(239, 68, 68, 0.5)" strokeWidth="1">
          <animate attributeName="stroke-opacity" values="0;0.5;0" dur="4s" repeatCount="indefinite" />
        </line>
        <line x1="80%" y1="25%" x2="50%" y2="50%" stroke="rgba(239, 68, 68, 0.5)" strokeWidth="1">
          <animate attributeName="stroke-opacity" values="0;0.5;0" dur="3.5s" repeatCount="indefinite" />
        </line>
        <line x1="30%" y1="70%" x2="50%" y2="50%" stroke="rgba(239, 68, 68, 0.5)" strokeWidth="1">
          <animate attributeName="stroke-opacity" values="0;0.5;0" dur="2.5s" repeatCount="indefinite" />
        </line>
      </svg>
      
      {/* Target point */}
      <div className="absolute h-4 w-4 bg-blue-500 rounded-full" style={{ top: 'calc(50% - 8px)', left: 'calc(50% - 8px)' }}></div>
      
      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-gray-900/80 p-2 rounded-md text-xs">
        <div className="flex items-center mb-1">
          <div className="h-2 w-2 bg-red-500 rounded-full mr-2"></div>
          <span>Attack Sources</span>
        </div>
        <div className="flex items-center">
          <div className="h-2 w-2 bg-blue-500 rounded-full mr-2"></div>
          <span>Your Infrastructure</span>
        </div>
      </div>
      
      {/* Stats */}
      <div className="absolute top-4 right-4 bg-gray-900/80 p-2 rounded-md text-xs">
        <div className="mb-1">Active Attacks: <span className="text-red-400 font-bold">17</span></div>
        <div className="mb-1">Countries: <span className="text-white font-bold">9</span></div>
        <div>Blocked: <span className="text-green-400 font-bold">93%</span></div>
      </div>
    </div>
  );
};

export default ThreatMap;