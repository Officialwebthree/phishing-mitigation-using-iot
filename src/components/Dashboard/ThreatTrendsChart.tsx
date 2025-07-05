import React from 'react';

interface ThreatData {
  date: string;
  phishing: number;
  malware: number;
  ddos: number;
  dataTheft: number;
  botnet: number;
}

const ThreatTrendsChart: React.FC = () => {
  // Mock data for the last 7 days
  const threatData: ThreatData[] = [
    { date: 'Mon', phishing: 12, malware: 8, ddos: 3, dataTheft: 5, botnet: 2 },
    { date: 'Tue', phishing: 19, malware: 12, ddos: 7, dataTheft: 8, botnet: 4 },
    { date: 'Wed', phishing: 15, malware: 6, ddos: 4, dataTheft: 3, botnet: 1 },
    { date: 'Thu', phishing: 22, malware: 15, ddos: 9, dataTheft: 12, botnet: 6 },
    { date: 'Fri', phishing: 28, malware: 18, ddos: 5, dataTheft: 9, botnet: 3 },
    { date: 'Sat', phishing: 16, malware: 9, ddos: 2, dataTheft: 4, botnet: 1 },
    { date: 'Sun', phishing: 20, malware: 11, ddos: 6, dataTheft: 7, botnet: 4 },
  ];

  const maxValue = Math.max(...threatData.map(d => 
    d.phishing + d.malware + d.ddos + d.dataTheft + d.botnet
  ));

  const threatTypes = [
    { key: 'phishing', label: 'Phishing', color: 'bg-red-500' },
    { key: 'malware', label: 'Malware', color: 'bg-orange-500' },
    { key: 'ddos', label: 'DDoS', color: 'bg-yellow-500' },
    { key: 'dataTheft', label: 'Data Theft', color: 'bg-purple-500' },
    { key: 'botnet', label: 'Botnet', color: 'bg-pink-500' },
  ];

  return (
    <div className="bg-gray-800 rounded-xl p-5 shadow-lg">
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-lg font-semibold">Threat Trends (7 Days)</h3>
        <button className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
          View Details
        </button>
      </div>
      
      {/* Chart */}
      <div className="h-64 flex items-end justify-between gap-3 mb-4 bg-gray-700/30 rounded-lg p-4">
        {threatData.map((day, index) => {
          const total = day.phishing + day.malware + day.ddos + day.dataTheft + day.botnet;
          const heightPercentage = total > 0 ? (total / maxValue) * 100 : 5;
          
          return (
            <div key={index} className="flex-1 flex flex-col items-center group relative">
              <div 
                className="w-full bg-gray-600 rounded-t relative overflow-hidden transition-all duration-300 hover:scale-105 cursor-pointer"
                style={{ height: `${Math.max(heightPercentage, 10)}%`, minHeight: '20px' }}
              >
                {/* Stacked bars with proper proportions */}
                <div className="absolute bottom-0 w-full flex flex-col">
                  {day.phishing > 0 && (
                    <div 
                      className="bg-red-500 w-full transition-all duration-300"
                      style={{ height: `${(day.phishing / total) * 100}%` }}
                      title={`Phishing: ${day.phishing}`}
                    ></div>
                  )}
                  {day.malware > 0 && (
                    <div 
                      className="bg-orange-500 w-full transition-all duration-300"
                      style={{ height: `${(day.malware / total) * 100}%` }}
                      title={`Malware: ${day.malware}`}
                    ></div>
                  )}
                  {day.ddos > 0 && (
                    <div 
                      className="bg-yellow-500 w-full transition-all duration-300"
                      style={{ height: `${(day.ddos / total) * 100}%` }}
                      title={`DDoS: ${day.ddos}`}
                    ></div>
                  )}
                  {day.dataTheft > 0 && (
                    <div 
                      className="bg-purple-500 w-full transition-all duration-300"
                      style={{ height: `${(day.dataTheft / total) * 100}%` }}
                      title={`Data Theft: ${day.dataTheft}`}
                    ></div>
                  )}
                  {day.botnet > 0 && (
                    <div 
                      className="bg-pink-500 w-full transition-all duration-300"
                      style={{ height: `${(day.botnet / total) * 100}%` }}
                      title={`Botnet: ${day.botnet}`}
                    ></div>
                  )}
                </div>
                
                {/* Hover tooltip */}
                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900 text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 border border-gray-600">
                  <div className="text-center">
                    <div className="font-semibold text-white">{day.date}</div>
                    <div className="text-gray-300">Total: {total}</div>
                    <div className="mt-1 space-y-1">
                      {day.phishing > 0 && <div className="text-red-400">Phishing: {day.phishing}</div>}
                      {day.malware > 0 && <div className="text-orange-400">Malware: {day.malware}</div>}
                      {day.ddos > 0 && <div className="text-yellow-400">DDoS: {day.ddos}</div>}
                      {day.dataTheft > 0 && <div className="text-purple-400">Data Theft: {day.dataTheft}</div>}
                      {day.botnet > 0 && <div className="text-pink-400">Botnet: {day.botnet}</div>}
                    </div>
                  </div>
                </div>
              </div>
              <span className="text-xs text-gray-400 mt-2 font-medium">{day.date}</span>
            </div>
          );
        })}
      </div>
      
      {/* Legend */}
      <div className="flex flex-wrap gap-4 text-xs mb-4">
        {threatTypes.map((type) => (
          <div key={type.key} className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded ${type.color}`}></div>
            <span className="text-gray-300">{type.label}</span>
          </div>
        ))}
      </div>
      
      {/* Summary */}
      <div className="pt-4 border-t border-gray-700 grid grid-cols-2 gap-4 text-sm">
        <div className="bg-gray-700/50 rounded-lg p-3">
          <span className="text-gray-400">Total This Week:</span>
          <span className="ml-2 font-semibold text-white text-lg">
            {threatData.reduce((sum, day) => 
              sum + day.phishing + day.malware + day.ddos + day.dataTheft + day.botnet, 0
            )}
          </span>
        </div>
        <div className="bg-gray-700/50 rounded-lg p-3">
          <span className="text-gray-400">Daily Average:</span>
          <span className="ml-2 font-semibold text-white text-lg">
            {Math.round(threatData.reduce((sum, day) => 
              sum + day.phishing + day.malware + day.ddos + day.dataTheft + day.botnet, 0
            ) / 7)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ThreatTrendsChart;