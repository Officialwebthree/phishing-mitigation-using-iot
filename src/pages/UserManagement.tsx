import React, { useState } from 'react';
import { Users, Plus, Search, Filter, Edit, Trash2, Shield, Mail, Phone } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  department: string;
  status: 'active' | 'inactive' | 'pending';
  lastLogin: string;
  joinDate: string;
  permissions: string[];
}

const UserManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showAddUser, setShowAddUser] = useState(false);

  const users: User[] = [
    {
      id: '1',
      name: 'Sarah Chen',
      email: 'sarah.chen@company.com',
      phone: '+1 (555) 123-4567',
      role: 'Security Analyst',
      department: 'Security',
      status: 'active',
      lastLogin: '5 minutes ago',
      joinDate: '2023-01-15',
      permissions: ['view_threats', 'manage_devices', 'view_reports']
    },
    {
      id: '2',
      name: 'Mike Rodriguez',
      email: 'mike.rodriguez@company.com',
      phone: '+1 (555) 234-5678',
      role: 'IoT Specialist',
      department: 'Engineering',
      status: 'active',
      lastLogin: '1 hour ago',
      joinDate: '2023-02-20',
      permissions: ['manage_devices', 'view_reports']
    },
    {
      id: '3',
      name: 'Emily Johnson',
      email: 'emily.johnson@company.com',
      phone: '+1 (555) 345-6789',
      role: 'ML Engineer',
      department: 'Data Science',
      status: 'active',
      lastLogin: '3 hours ago',
      joinDate: '2023-03-10',
      permissions: ['manage_models', 'view_reports']
    },
    {
      id: '4',
      name: 'David Kim',
      email: 'david.kim@company.com',
      phone: '+1 (555) 456-7890',
      role: 'Network Admin',
      department: 'IT',
      status: 'inactive',
      lastLogin: '2 days ago',
      joinDate: '2022-11-05',
      permissions: ['manage_network', 'view_threats']
    },
    {
      id: '5',
      name: 'Lisa Wang',
      email: 'lisa.wang@company.com',
      phone: '+1 (555) 567-8901',
      role: 'Threat Hunter',
      department: 'Security',
      status: 'pending',
      lastLogin: 'Never',
      joinDate: '2024-01-08',
      permissions: ['view_threats']
    }
  ];

  const roles = ['all', 'Security Analyst', 'IoT Specialist', 'ML Engineer', 'Network Admin', 'Threat Hunter'];
  const statuses = ['all', 'active', 'inactive', 'pending'];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500/20 text-green-400';
      case 'inactive': return 'bg-gray-500/20 text-gray-400';
      case 'pending': return 'bg-yellow-500/20 text-yellow-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'all' || user.role === selectedRole;
    const matchesStatus = selectedStatus === 'all' || user.status === selectedStatus;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold mb-1">User Management</h1>
          <p className="text-gray-400">Manage user accounts, roles, and permissions</p>
        </div>
        <button
          onClick={() => setShowAddUser(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
        >
          <Plus size={18} />
          Add User
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-800 rounded-xl p-4 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Users</p>
              <p className="text-2xl font-bold text-blue-400">{users.length}</p>
            </div>
            <Users className="text-blue-400" size={24} />
          </div>
        </div>
        <div className="bg-gray-800 rounded-xl p-4 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Active Users</p>
              <p className="text-2xl font-bold text-green-400">{users.filter(u => u.status === 'active').length}</p>
            </div>
            <Shield className="text-green-400" size={24} />
          </div>
        </div>
        <div className="bg-gray-800 rounded-xl p-4 border-l-4 border-yellow-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Pending</p>
              <p className="text-2xl font-bold text-yellow-400">{users.filter(u => u.status === 'pending').length}</p>
            </div>
            <Mail className="text-yellow-400" size={24} />
          </div>
        </div>
        <div className="bg-gray-800 rounded-xl p-4 border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Departments</p>
              <p className="text-2xl font-bold text-purple-400">{new Set(users.map(u => u.department)).size}</p>
            </div>
            <Users className="text-purple-400" size={24} />
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
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Filter className="text-gray-400" size={18} />
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {roles.map(role => (
                <option key={role} value={role}>
                  {role === 'all' ? 'All Roles' : role}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {statuses.map(status => (
                <option key={status} value={status}>
                  {status === 'all' ? 'All Statuses' : status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700">
              <tr>
                <th className="text-left py-4 px-6 font-medium text-gray-300">User</th>
                <th className="text-left py-4 px-6 font-medium text-gray-300">Role & Department</th>
                <th className="text-left py-4 px-6 font-medium text-gray-300">Contact</th>
                <th className="text-left py-4 px-6 font-medium text-gray-300">Status</th>
                <th className="text-left py-4 px-6 font-medium text-gray-300">Last Login</th>
                <th className="text-left py-4 px-6 font-medium text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b border-gray-700 hover:bg-gray-700/30 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center font-semibold">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-gray-400">ID: {user.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div>
                      <p className="font-medium">{user.role}</p>
                      <p className="text-sm text-gray-400">{user.department}</p>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm">
                        <Mail size={14} className="text-gray-400" />
                        <span>{user.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Phone size={14} className="text-gray-400" />
                        <span>{user.phone}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(user.status)}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-gray-300">{user.lastLogin}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-400/10 rounded-lg transition-colors">
                        <Edit size={16} />
                      </button>
                      <button className="p-2 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add User Modal */}
      {showAddUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Add New User</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                <input
                  type="text"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter email address"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Role</label>
                <select className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Security Analyst</option>
                  <option>IoT Specialist</option>
                  <option>ML Engineer</option>
                  <option>Network Admin</option>
                  <option>Threat Hunter</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Department</label>
                <select className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Security</option>
                  <option>Engineering</option>
                  <option>Data Science</option>
                  <option>IT</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowAddUser(false)}
                className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowAddUser(false)}
                className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
              >
                Add User
              </button>
            </div>
          </div>
        </div>
      )}

      {filteredUsers.length === 0 && (
        <div className="text-center py-12">
          <Users className="mx-auto text-gray-400 mb-4" size={48} />
          <h3 className="text-lg font-medium text-gray-300 mb-2">No users found</h3>
          <p className="text-gray-400">Try adjusting your search criteria or filters</p>
        </div>
      )}
    </div>
  );
};

export default UserManagement;