import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface ThreatMetric {
  name: string;
  current: number;
  previous: number;
  color: string;
  bgColor: string;
}

const AllThreatsChart: React.FC = () => {
  const threatMetrics: ThreatMetric[] = [
    { name: 'Phishing Attacks', current: 124, previous: 98, color: 'text-red-400', bgColor: 'bg-red-500' },
    { name: 'Malware Detected', current: 89, previous: 112, color: 'text-orange-400', bgColor: 'bg-orange-500' },
    { name: 'DDoS Attempts', current: 45, previous: 38, color: 'text-yellow-400', bgColor: 'bg-yellow-500' },
    { name: 'Data Theft', current: 67, previous: 71, color: 'text-purple-400', bgColor: 'bg-purple-500' },
    { name: 'Botnet Activity', current: 23, previous: 19, color: 'text-pink-400', bgColor: 'bg-pink-500' },
    { name: 'Ransomware', current: 12, previous: 8, color: 'text-blue-400', bgColor: 'bg-blue-500' },
  ];

  const totalThreats = threatMetrics.reduce((sum, metric) => sum + metric.current, 0);
  const maxValue = Math.max(...threatMetrics.map(m => m.current));

  return (
    <div className="bg-gray-800 rounded-xl p-5 shadow-lg">
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-lg font-semibold">All Threats Overview</h3>
        <div className="text-right">
          <div className="text-2xl font-bold text-white">{totalThreats}</div>
          <div className="text-sm text-gray-400">Total Threats</div>
        </div>
      </div>

      <div className="space-y-4">
        {threatMetrics.map((metric, index) => {
          const percentage = (metric.current / maxValue) * 100;
          const change = metric.current - metric.previous;
          const changePercentage = metric.previous > 0 ? ((change / metric.previous) * 100) : 0;
          const isIncrease = change > 0;

          return (
            <div key={index} className="group">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-300">{metric.name}</span>
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-semibold ${metric.color}`}>{metric.current}</span>
                  <div className={`flex items-center text-xs ${isIncrease ? 'text-red-400' : 'text-green-400'}`}>
                    {isIncrease ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                    <span className="ml-1">{Math.abs(changePercentage).toFixed(1)}%</span>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                  <div 
                    className={`h-full ${metric.bgColor} rounded-full transition-all duration-500 ease-out relative`}
                    style={{ width: `${percentage}%` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20 rounded-full"></div>
                  </div>
                </div>
                
                {/* Hover tooltip */}
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 border border-gray-600">
                  Previous: {metric.previous} | Change: {change > 0 ? '+' : ''}{change}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-700">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="bg-gray-700/50 rounded-lg p-3">
            <div className="text-lg font-bold text-red-400">
              {threatMetrics.filter(m => (m.current - m.previous) > 0).length}
            </div>
            <div className="text-xs text-gray-400">Increasing</div>
          </div>
          <div className="bg-gray-700/50 rounded-lg p-3">
            <div className="text-lg font-bold text-green-400">
              {threatMetrics.filter(m => (m.current - m.previous) < 0).length}
            </div>
            <div className="text-xs text-gray-400">Decreasing</div>
          </div>
          <div className="bg-gray-700/50 rounded-lg p-3">
            <div className="text-lg font-bold text-blue-400">
              {threatMetrics.filter(m => (m.current - m.previous) === 0).length}
            </div>
            <div className="text-xs text-gray-400">Stable</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllThreatsChart;