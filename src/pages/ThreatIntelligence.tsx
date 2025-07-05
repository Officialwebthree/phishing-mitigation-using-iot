import React, { useState } from 'react';
import { Globe, Search, Filter, Download, AlertTriangle, TrendingUp, MapPin, Clock } from 'lucide-react';

interface ThreatIntel {
  id: string;
  title: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  category: string;
  source: string;
  timestamp: string;
  description: string;
  iocs: string[];
  affectedRegions: string[];
}

const ThreatIntelligence: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSeverity, setSelectedSeverity] = useState('all');

  const threatIntel: ThreatIntel[] = [
    {
      id: '1',
      title: 'APT Group Targeting IoT Infrastructure',
      severity: 'critical',
      category: 'APT',
      source: 'Internal Research',
      timestamp: '2 hours ago',
      description: 'Advanced persistent threat group identified targeting smart city infrastructure with custom malware.',
      iocs: ['192.168.1.100', 'malicious-domain.com', 'SHA256:abc123...'],
      affectedRegions: ['North America', 'Europe']
    },
    {
      id: '2',
      title: 'Phishing Campaign Using IoT Device Themes',
      severity: 'high',
      category: 'Phishing',
      source: 'Threat Feed',
      timestamp: '4 hours ago',
      description: 'Large-scale phishing campaign impersonating popular IoT device manufacturers to steal credentials.',
      iocs: ['phishing-site.net', 'fake-iot-update.com'],
      affectedRegions: ['Global']
    },
    {
      id: '3',
      title: 'New Botnet Exploiting Router Vulnerabilities',
      severity: 'high',
      category: 'Botnet',
      source: 'Partner Feed',
      timestamp: '6 hours ago',
      description: 'Newly discovered botnet leveraging unpatched router vulnerabilities for cryptocurrency mining.',
      iocs: ['C2-server.evil', '203.0.113.1'],
      affectedRegions: ['Asia-Pacific', 'Europe']
    },
    {
      id: '4',
      title: 'Smart Camera Firmware Vulnerability',
      severity: 'medium',
      category: 'Vulnerability',
      source: 'CVE Database',
      timestamp: '1 day ago',
      description: 'Buffer overflow vulnerability discovered in popular smart camera firmware allowing remote code execution.',
      iocs: ['CVE-2024-1234'],
      affectedRegions: ['Global']
    }
  ];

  const categories = ['all', 'APT', 'Phishing', 'Botnet', 'Vulnerability', 'Malware'];
  const severities = ['all', 'critical', 'high', 'medium', 'low'];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'high': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'low': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const filteredIntel = threatIntel.filter(intel => {
    const matchesSearch = intel.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         intel.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || intel.category === selectedCategory;
    const matchesSeverity = selectedSeverity === 'all' || intel.severity === selectedSeverity;
    
    return matchesSearch && matchesCategory && matchesSeverity;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-1">Threat Intelligence</h1>
        <p className="text-gray-400">Stay informed about the latest security threats and indicators</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-800 rounded-xl p-4 border-l-4 border-red-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Critical Threats</p>
              <p className="text-2xl font-bold text-red-400">12</p>
            </div>
            <AlertTriangle className="text-red-400" size={24} />
          </div>
        </div>
        <div className="bg-gray-800 rounded-xl p-4 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">IOCs Tracked</p>
              <p className="text-2xl font-bold text-blue-400">1,247</p>
            </div>
            <Globe className="text-blue-400" size={24} />
          </div>
        </div>
        <div className="bg-gray-800 rounded-xl p-4 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Sources Active</p>
              <p className="text-2xl font-bold text-green-400">23</p>
            </div>
            <TrendingUp className="text-green-400" size={24} />
          </div>
        </div>
        <div className="bg-gray-800 rounded-xl p-4 border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Regions Covered</p>
              <p className="text-2xl font-bold text-purple-400">15</p>
            </div>
            <MapPin className="text-purple-400" size={24} />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-gray-800 rounded-xl p-4">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex-1 min-w-64">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search threat intelligence..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Filter className="text-gray-400" size={18} />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <select
              value={selectedSeverity}
              onChange={(e) => setSelectedSeverity(e.target.value)}
              className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {severities.map(severity => (
                <option key={severity} value={severity}>
                  {severity === 'all' ? 'All Severities' : severity.charAt(0).toUpperCase() + severity.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Threat Intelligence List */}
      <div className="space-y-4">
        {filteredIntel.map((intel) => (
          <div key={intel.id} className="bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold">{intel.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getSeverityColor(intel.severity)}`}>
                    {intel.severity.toUpperCase()}
                  </span>
                  <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs">
                    {intel.category}
                  </span>
                </div>
                <p className="text-gray-300 mb-3">{intel.description}</p>
                
                <div className="flex items-center gap-6 text-sm text-gray-400">
                  <div className="flex items-center gap-1">
                    <Clock size={14} />
                    <span>{intel.timestamp}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Globe size={14} />
                    <span>{intel.source}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin size={14} />
                    <span>{intel.affectedRegions.join(', ')}</span>
                  </div>
                </div>
              </div>
              
              <button className="flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
                <Download size={16} />
                Export
              </button>
            </div>
            
            {intel.iocs.length > 0 && (
              <div className="border-t border-gray-700 pt-4">
                <h4 className="font-medium mb-2">Indicators of Compromise (IOCs)</h4>
                <div className="flex flex-wrap gap-2">
                  {intel.iocs.map((ioc, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-700 rounded text-sm font-mono">
                      {ioc}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredIntel.length === 0 && (
        <div className="text-center py-12">
          <Globe className="mx-auto text-gray-400 mb-4" size={48} />
          <h3 className="text-lg font-medium text-gray-300 mb-2">No threat intelligence found</h3>
          <p className="text-gray-400">Try adjusting your search criteria or filters</p>
        </div>
      )}
    </div>
  );
};

export default ThreatIntelligence;