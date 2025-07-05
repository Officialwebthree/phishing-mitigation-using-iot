import React, { useState } from 'react';
import { KeyRound, Shield, Users, Settings, Eye, EyeOff, Smartphone, Key } from 'lucide-react';

interface AuthMethod {
  id: string;
  name: string;
  type: 'password' | 'mfa' | 'sso' | 'biometric';
  enabled: boolean;
  users: number;
  lastUsed: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  lastLogin: string;
  mfaEnabled: boolean;
  status: 'active' | 'inactive' | 'locked';
}

const Authentication: React.FC = () => {
  const [activeTab, setActiveTab] = useState('methods');
  const [showPassword, setShowPassword] = useState(false);

  const authMethods: AuthMethod[] = [
    { id: '1', name: 'Password Authentication', type: 'password', enabled: true, users: 18, lastUsed: '2 minutes ago' },
    { id: '2', name: 'Multi-Factor Authentication', type: 'mfa', enabled: true, users: 15, lastUsed: '5 minutes ago' },
    { id: '3', name: 'Single Sign-On (SSO)', type: 'sso', enabled: false, users: 0, lastUsed: 'Never' },
    { id: '4', name: 'Biometric Authentication', type: 'biometric', enabled: false, users: 0, lastUsed: 'Never' },
  ];

  const users: User[] = [
    { id: '1', name: 'Sarah Chen', email: 'sarah.chen@company.com', role: 'Security Analyst', lastLogin: '5 min ago', mfaEnabled: true, status: 'active' },
    { id: '2', name: 'Mike Rodriguez', email: 'mike.rodriguez@company.com', role: 'IoT Specialist', lastLogin: '1 hour ago', mfaEnabled: true, status: 'active' },
    { id: '3', name: 'Emily Johnson', email: 'emily.johnson@company.com', role: 'ML Engineer', lastLogin: '3 hours ago', mfaEnabled: false, status: 'active' },
    { id: '4', name: 'David Kim', email: 'david.kim@company.com', role: 'Network Admin', lastLogin: '1 day ago', mfaEnabled: true, status: 'inactive' },
  ];

  const getMethodIcon = (type: string) => {
    switch (type) {
      case 'password': return <Key className="text-blue-400" size={20} />;
      case 'mfa': return <Smartphone className="text-green-400" size={20} />;
      case 'sso': return <Shield className="text-purple-400" size={20} />;
      case 'biometric': return <Eye className="text-orange-400" size={20} />;
      default: return <KeyRound className="text-gray-400" size={20} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-500/20';
      case 'inactive': return 'text-yellow-400 bg-yellow-500/20';
      case 'locked': return 'text-red-400 bg-red-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-1">Authentication Management</h1>
        <p className="text-gray-400">Manage authentication methods and user access</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-800 p-1 rounded-lg">
        {[
          { id: 'methods', label: 'Auth Methods', icon: KeyRound },
          { id: 'users', label: 'User Access', icon: Users },
          { id: 'policies', label: 'Policies', icon: Shield },
          { id: 'settings', label: 'Settings', icon: Settings },
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

      {/* Authentication Methods Tab */}
      {activeTab === 'methods' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Authentication Methods</h3>
            <div className="space-y-4">
              {authMethods.map((method) => (
                <div key={method.id} className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    {getMethodIcon(method.type)}
                    <div>
                      <h4 className="font-medium">{method.name}</h4>
                      <p className="text-sm text-gray-400">{method.users} users • Last used {method.lastUsed}</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={method.enabled}
                      className="sr-only peer"
                      readOnly
                    />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Security Overview</h3>
            <div className="space-y-4">
              <div className="p-4 bg-green-500/20 border border-green-500/30 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="text-green-400" size={20} />
                  <h4 className="font-medium text-green-400">Strong Security Posture</h4>
                </div>
                <p className="text-sm text-gray-300">83% of users have MFA enabled</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-gray-700/50 rounded-lg text-center">
                  <p className="text-2xl font-bold text-blue-400">18</p>
                  <p className="text-sm text-gray-400">Total Users</p>
                </div>
                <div className="p-3 bg-gray-700/50 rounded-lg text-center">
                  <p className="text-2xl font-bold text-green-400">15</p>
                  <p className="text-sm text-gray-400">MFA Enabled</p>
                </div>
              </div>
              
              <div className="p-4 bg-yellow-500/20 border border-yellow-500/30 rounded-lg">
                <h4 className="font-medium text-yellow-400 mb-2">Recommendations</h4>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• Enable SSO for better user experience</li>
                  <li>• Require MFA for all admin accounts</li>
                  <li>• Consider biometric authentication</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* User Access Tab */}
      {activeTab === 'users' && (
        <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold">User Access Management</h3>
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
              Add User
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-3 px-4 font-medium text-gray-400">User</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-400">Role</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-400">Last Login</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-400">MFA</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-400">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b border-gray-700/50 hover:bg-gray-700/30">
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-gray-400">{user.email}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-300">{user.role}</td>
                    <td className="py-4 px-4 text-gray-300">{user.lastLogin}</td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${user.mfaEnabled ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                        {user.mfaEnabled ? 'Enabled' : 'Disabled'}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs capitalize ${getStatusColor(user.status)}`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <button className="text-blue-400 hover:text-blue-300 text-sm">Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Policies Tab */}
      {activeTab === 'policies' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Password Policies</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Minimum Length</span>
                <span className="text-blue-400">12 characters</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Require Uppercase</span>
                <span className="text-green-400">Enabled</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Require Numbers</span>
                <span className="text-green-400">Enabled</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Require Special Characters</span>
                <span className="text-green-400">Enabled</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Password Expiry</span>
                <span className="text-blue-400">90 days</span>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Session Policies</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Session Timeout</span>
                <span className="text-blue-400">30 minutes</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Concurrent Sessions</span>
                <span className="text-blue-400">3 max</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Remember Device</span>
                <span className="text-green-400">30 days</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Force Logout on Suspicious Activity</span>
                <span className="text-green-400">Enabled</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Settings Tab */}
      {activeTab === 'settings' && (
        <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold mb-6">Authentication Settings</h3>
          <div className="space-y-6">
            <div>
              <h4 className="font-medium mb-3">Global Settings</h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Enforce MFA for Admin Accounts</p>
                    <p className="text-sm text-gray-400">Require multi-factor authentication for all administrative users</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Login Attempt Monitoring</p>
                    <p className="text-sm text-gray-400">Monitor and alert on suspicious login attempts</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-3">API Keys</h4>
              <div className="space-y-3">
                <div className="p-4 bg-gray-700/50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Production API Key</span>
                    <button className="text-blue-400 hover:text-blue-300 text-sm">Regenerate</button>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value="sk_prod_1234567890abcdef"
                      readOnly
                      className="flex-1 bg-gray-600 border border-gray-500 rounded px-3 py-2 text-sm font-mono"
                    />
                    <button
                      onClick={() => setShowPassword(!showPassword)}
                      className="p-2 text-gray-400 hover:text-white"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Authentication;