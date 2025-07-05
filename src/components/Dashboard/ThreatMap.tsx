import React, { useState, useEffect } from 'react';

interface ThreatPoint {
  id: string;
  x: string;
  y: string;
  type: 'phishing' | 'malware' | 'ddos' | 'botnet' | 'dataTheft';
  intensity: number;
}

const ThreatMap: React.FC = () => {
  const [threatPoints, setThreatPoints] = useState<ThreatPoint[]>([
    { id: '1', x: '20%', y: '30%', type: 'phishing', intensity: 0.8 },
    { id: '2', x: '70%', y: '40%', type: 'malware', intensity: 0.6 },
    { id: '3', x: '50%', y: '60%', type: 'ddos', intensity: 0.9 },
    { id: '4', x: '80%', y: '25%', type: 'botnet', intensity: 0.7 },
    { id: '5', x: '30%', y: '70%', type: 'dataTheft', intensity: 0.5 },
    { id: '6', x: '85%', y: '55%', type: 'phishing', intensity: 0.4 },
    { id: '7', x: '15%', y: '45%', type: 'malware', intensity: 0.6 },
  ]);

  const [stats, setStats] = useState({
    activeAttacks: 17,
    countries: 9,
    blocked: 93
  });

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate dynamic threat updates
      setThreatPoints(prev => prev.map(point => ({
        ...point,
        intensity: Math.max(0.2, Math.min(1, point.intensity + (Math.random() - 0.5) * 0.3))
      })));

      // Update stats
      setStats(prev => ({
        activeAttacks: Math.max(10, prev.activeAttacks + Math.floor((Math.random() - 0.5) * 6)),
        countries: Math.max(5, Math.min(15, prev.countries + Math.floor((Math.random() - 0.5) * 2))),
        blocked: Math.max(85, Math.min(99, prev.blocked + Math.floor((Math.random() - 0.5) * 4)))
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getThreatColor = (type: string) => {
    switch (type) {
      case 'phishing': return 'bg-red-500';
      case 'malware': return 'bg-orange-500';
      case 'ddos': return 'bg-yellow-500';
      case 'botnet': return 'bg-purple-500';
      case 'dataTheft': return 'bg-pink-500';
      default: return 'bg-red-500';
    }
  };

  const getThreatStroke = (type: string) => {
    switch (type) {
      case 'phishing': return 'rgba(239, 68, 68, 0.5)';
      case 'malware': return 'rgba(249, 115, 22, 0.5)';
      case 'ddos': return 'rgba(234, 179, 8, 0.5)';
      case 'botnet': return 'rgba(168, 85, 247, 0.5)';
      case 'dataTheft': return 'rgba(236, 72, 153, 0.5)';
      default: return 'rgba(239, 68, 68, 0.5)';
    }
  };

  return (
    <div className="h-[400px] bg-gray-800 rounded-xl p-4 relative overflow-hidden">
      <h3 className="text-lg font-semibold mb-4">Global Threat Map</h3>
      
      {/* World map background - simplified for demo */}
      <div className="absolute inset-0 opacity-20 flex items-center justify-center">
        <div className="w-[90%] h-[70%] border-2 border-gray-600 rounded-full"></div>
      </div>
      
      {/* Attack points */}
      {threatPoints.map((point) => (
        <div
          key={point.id}
          className={`absolute h-3 w-3 ${getThreatColor(point.type)} rounded-full animate-ping`}
          style={{ 
            top: point.y, 
            left: point.x,
            animationDuration: `${2 + point.intensity}s`,
            opacity: point.intensity
          }}
        >
          <div className="absolute inset-0 rounded-full bg-current opacity-75"></div>
        </div>
      ))}
      
      {/* Attack lines */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        {threatPoints.map((point, index) => (
          <line
            key={`line-${point.id}`}
            x1={point.x}
            y1={point.y}
            x2="50%"
            y2="50%"
            stroke={getThreatStroke(point.type)}
            strokeWidth="1"
          >
            <animate
              attributeName="stroke-opacity"
              values="0;0.7;0"
              dur={`${2 + point.intensity}s`}
              repeatCount="indefinite"
            />
          </line>
        ))}
      </svg>
      
      {/* Target point */}
      <div className="absolute h-4 w-4 bg-blue-500 rounded-full" style={{ top: 'calc(50% - 8px)', left: 'calc(50% - 8px)' }}>
        <div className="absolute inset-0 bg-blue-500 rounded-full animate-pulse"></div>
      </div>
      
      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-gray-900/90 p-3 rounded-md text-xs space-y-1">
        <div className="text-white font-medium mb-2">Threat Types</div>
        <div className="flex items-center">
          <div className="h-2 w-2 bg-red-500 rounded-full mr-2"></div>
          <span>Phishing</span>
        </div>
        <div className="flex items-center">
          <div className="h-2 w-2 bg-orange-500 rounded-full mr-2"></div>
          <span>Malware</span>
        </div>
        <div className="flex items-center">
          <div className="h-2 w-2 bg-yellow-500 rounded-full mr-2"></div>
          <span>DDoS</span>
        </div>
        <div className="flex items-center">
          <div className="h-2 w-2 bg-purple-500 rounded-full mr-2"></div>
          <span>Botnet</span>
        </div>
        <div className="flex items-center">
          <div className="h-2 w-2 bg-pink-500 rounded-full mr-2"></div>
          <span>Data Theft</span>
        </div>
        <div className="flex items-center mt-2">
          <div className="h-2 w-2 bg-blue-500 rounded-full mr-2"></div>
          <span>Your Infrastructure</span>
        </div>
      </div>
      
      {/* Stats */}
      <div className="absolute top-4 right-4 bg-gray-900/90 p-3 rounded-md text-xs">
        <div className="mb-1">Active Attacks: <span className="text-red-400 font-bold">{stats.activeAttacks}</span></div>
        <div className="mb-1">Countries: <span className="text-white font-bold">{stats.countries}</span></div>
        <div>Blocked: <span className="text-green-400 font-bold">{stats.blocked}%</span></div>
      </div>
    </div>
  );
};

export default ThreatMap;