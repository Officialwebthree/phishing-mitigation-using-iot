import React, { useState } from 'react';
import { Shield, CheckCircle, AlertTriangle, XCircle, FileText, Download, Calendar, Award } from 'lucide-react';

interface ComplianceFramework {
  id: string;
  name: string;
  description: string;
  status: 'compliant' | 'partial' | 'non-compliant';
  score: number;
  lastAssessment: string;
  nextReview: string;
  requirements: number;
  completed: number;
}

interface Requirement {
  id: string;
  framework: string;
  title: string;
  description: string;
  status: 'compliant' | 'partial' | 'non-compliant';
  priority: 'high' | 'medium' | 'low';
  dueDate: string;
  assignee: string;
}

const Compliance: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const frameworks: ComplianceFramework[] = [
    {
      id: '1',
      name: 'ISO 27001',
      description: 'Information Security Management System',
      status: 'compliant',
      score: 92,
      lastAssessment: '2024-01-15',
      nextReview: '2024-07-15',
      requirements: 114,
      completed: 105
    },
    {
      id: '2',
      name: 'NIST Cybersecurity Framework',
      description: 'Framework for Improving Critical Infrastructure Cybersecurity',
      status: 'partial',
      score: 78,
      lastAssessment: '2024-01-10',
      nextReview: '2024-04-10',
      requirements: 98,
      completed: 76
    },
    {
      id: '3',
      name: 'GDPR',
      description: 'General Data Protection Regulation',
      status: 'compliant',
      score: 95,
      lastAssessment: '2024-01-20',
      nextReview: '2024-06-20',
      requirements: 47,
      completed: 45
    },
    {
      id: '4',
      name: 'SOC 2 Type II',
      description: 'Service Organization Control 2',
      status: 'non-compliant',
      score: 45,
      lastAssessment: '2023-12-01',
      nextReview: '2024-03-01',
      requirements: 67,
      completed: 30
    }
  ];

  const requirements: Requirement[] = [
    {
      id: '1',
      framework: 'ISO 27001',
      title: 'Access Control Policy Review',
      description: 'Annual review of access control policies and procedures',
      status: 'partial',
      priority: 'high',
      dueDate: '2024-02-15',
      assignee: 'Sarah Chen'
    },
    {
      id: '2',
      framework: 'NIST',
      title: 'Incident Response Plan Update',
      description: 'Update incident response procedures for IoT devices',
      status: 'non-compliant',
      priority: 'high',
      dueDate: '2024-02-10',
      assignee: 'Mike Rodriguez'
    },
    {
      id: '3',
      framework: 'GDPR',
      title: 'Data Processing Impact Assessment',
      description: 'Conduct DPIA for new IoT data collection processes',
      status: 'compliant',
      priority: 'medium',
      dueDate: '2024-03-01',
      assignee: 'Emily Johnson'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compliant': return 'text-green-400 bg-green-500/20';
      case 'partial': return 'text-yellow-400 bg-yellow-500/20';
      case 'non-compliant': return 'text-red-400 bg-red-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'compliant': return <CheckCircle className="text-green-400" size={20} />;
      case 'partial': return <AlertTriangle className="text-yellow-400" size={20} />;
      case 'non-compliant': return <XCircle className="text-red-400" size={20} />;
      default: return <AlertTriangle className="text-gray-400" size={20} />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-400 bg-red-500/20';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20';
      case 'low': return 'text-blue-400 bg-blue-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-1">Compliance Management</h1>
        <p className="text-gray-400">Monitor and manage regulatory compliance across frameworks</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-800 p-1 rounded-lg">
        {[
          { id: 'overview', label: 'Overview', icon: Shield },
          { id: 'frameworks', label: 'Frameworks', icon: Award },
          { id: 'requirements', label: 'Requirements', icon: FileText },
          { id: 'reports', label: 'Reports', icon: Download },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
              activeTab === tab.id
                ? 'bg-blue-600 text-white'
                : 'text-gray-300 hover:bg-gray-700'
            }`}
          >
            <tab.icon size={18} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-gray-800 rounded-xl p-4 border-l-4 border-green-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Compliant Frameworks</p>
                  <p className="text-2xl font-bold text-green-400">{frameworks.filter(f => f.status === 'compliant').length}</p>
                </div>
                <CheckCircle className="text-green-400" size={24} />
              </div>
            </div>
            <div className="bg-gray-800 rounded-xl p-4 border-l-4 border-yellow-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Partial Compliance</p>
                  <p className="text-2xl font-bold text-yellow-400">{frameworks.filter(f => f.status === 'partial').length}</p>
                </div>
                <AlertTriangle className="text-yellow-400" size={24} />
              </div>
            </div>
            <div className="bg-gray-800 rounded-xl p-4 border-l-4 border-red-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Non-Compliant</p>
                  <p className="text-2xl font-bold text-red-400">{frameworks.filter(f => f.status === 'non-compliant').length}</p>
                </div>
                <XCircle className="text-red-400" size={24} />
              </div>
            </div>
            <div className="bg-gray-800 rounded-xl p-4 border-l-4 border-blue-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Avg. Score</p>
                  <p className="text-2xl font-bold text-blue-400">{Math.round(frameworks.reduce((sum, f) => sum + f.score, 0) / frameworks.length)}%</p>
                </div>
                <Award className="text-blue-400" size={24} />
              </div>
            </div>
          </div>

          {/* Compliance Overview Chart */}
          <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Compliance Status Overview</h3>
            <div className="space-y-4">
              {frameworks.map((framework) => (
                <div key={framework.id} className="p-4 bg-gray-700/50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(framework.status)}
                      <div>
                        <h4 className="font-medium">{framework.name}</h4>
                        <p className="text-sm text-gray-400">{framework.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold">{framework.score}%</div>
                      <div className="text-sm text-gray-400">{framework.completed}/{framework.requirements}</div>
                    </div>
                  </div>
                  <div className="w-full bg-gray-600 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        framework.status === 'compliant' ? 'bg-green-500' :
                        framework.status === 'partial' ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${framework.score}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Frameworks Tab */}
      {activeTab === 'frameworks' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {frameworks.map((framework) => (
            <div key={framework.id} className="bg-gray-800 rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  {getStatusIcon(framework.status)}
                  <h3 className="text-lg font-semibold">{framework.name}</h3>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(framework.status)}`}>
                  {framework.status.replace('-', ' ')}
                </span>
              </div>
              
              <p className="text-gray-300 mb-4">{framework.description}</p>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Compliance Score</span>
                  <span className="font-semibold">{framework.score}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Requirements Met</span>
                  <span className="font-semibold">{framework.completed}/{framework.requirements}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Last Assessment</span>
                  <span className="font-semibold">{framework.lastAssessment}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Next Review</span>
                  <span className="font-semibold">{framework.nextReview}</span>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-700">
                <button className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Requirements Tab */}
      {activeTab === 'requirements' && (
        <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold">Compliance Requirements</h3>
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
              Add Requirement
            </button>
          </div>
          
          <div className="space-y-4">
            {requirements.map((requirement) => (
              <div key={requirement.id} className="p-4 bg-gray-700/50 rounded-lg">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-medium">{requirement.title}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(requirement.status)}`}>
                        {requirement.status.replace('-', ' ')}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getPriorityColor(requirement.priority)}`}>
                        {requirement.priority}
                      </span>
                    </div>
                    <p className="text-gray-300 mb-2">{requirement.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <span>Framework: {requirement.framework}</span>
                      <span>Due: {requirement.dueDate}</span>
                      <span>Assignee: {requirement.assignee}</span>
                    </div>
                  </div>
                  {getStatusIcon(requirement.status)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Reports Tab */}
      {activeTab === 'reports' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Available Reports</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <FileText className="text-blue-400" size={20} />
                  <div>
                    <p className="font-medium">Compliance Summary Report</p>
                    <p className="text-sm text-gray-400">Overall compliance status across all frameworks</p>
                  </div>
                </div>
                <button className="p-2 text-blue-400 hover:text-blue-300">
                  <Download size={16} />
                </button>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <FileText className="text-green-400" size={20} />
                  <div>
                    <p className="font-medium">ISO 27001 Assessment</p>
                    <p className="text-sm text-gray-400">Detailed assessment report for ISO 27001</p>
                  </div>
                </div>
                <button className="p-2 text-blue-400 hover:text-blue-300">
                  <Download size={16} />
                </button>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <FileText className="text-yellow-400" size={20} />
                  <div>
                    <p className="font-medium">Gap Analysis Report</p>
                    <p className="text-sm text-gray-400">Identified gaps and remediation plans</p>
                  </div>
                </div>
                <button className="p-2 text-blue-400 hover:text-blue-300">
                  <Download size={16} />
                </button>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Generate Custom Report</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Report Type</label>
                <select className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Compliance Summary</option>
                  <option>Framework Assessment</option>
                  <option>Gap Analysis</option>
                  <option>Remediation Plan</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Frameworks</label>
                <div className="space-y-2">
                  {frameworks.map((framework) => (
                    <label key={framework.id} className="flex items-center">
                      <input type="checkbox" className="mr-2" defaultChecked />
                      <span className="text-sm">{framework.name}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Date Range</label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="date"
                    className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="date"
                    className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <button className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
                Generate Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Compliance;