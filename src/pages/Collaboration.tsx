import React, { useState } from 'react';
import { Users, MessageSquare, Share2, Bell, Calendar, FileText, Video, Plus } from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  status: 'online' | 'offline' | 'away';
  lastActive: string;
}

interface Notification {
  id: string;
  type: 'alert' | 'message' | 'update';
  title: string;
  description: string;
  timestamp: string;
  from: string;
}

const Collaboration: React.FC = () => {
  const [activeTab, setActiveTab] = useState('team');

  const teamMembers: TeamMember[] = [
    { id: '1', name: 'Sarah Chen', role: 'Security Analyst', avatar: 'SC', status: 'online', lastActive: 'Now' },
    { id: '2', name: 'Mike Rodriguez', role: 'IoT Specialist', avatar: 'MR', status: 'online', lastActive: '5 min ago' },
    { id: '3', name: 'Emily Johnson', role: 'ML Engineer', avatar: 'EJ', status: 'away', lastActive: '1 hour ago' },
    { id: '4', name: 'David Kim', role: 'Network Admin', avatar: 'DK', status: 'offline', lastActive: '3 hours ago' },
    { id: '5', name: 'Lisa Wang', role: 'Threat Hunter', avatar: 'LW', status: 'online', lastActive: '2 min ago' },
  ];

  const notifications: Notification[] = [
    {
      id: '1',
      type: 'alert',
      title: 'Critical Threat Detected',
      description: 'Sarah Chen shared a critical phishing campaign analysis',
      timestamp: '5 minutes ago',
      from: 'Sarah Chen'
    },
    {
      id: '2',
      type: 'message',
      title: 'Team Chat Message',
      description: 'Mike Rodriguez: "Updated the IoT device vulnerability report"',
      timestamp: '15 minutes ago',
      from: 'Mike Rodriguez'
    },
    {
      id: '3',
      type: 'update',
      title: 'Model Training Complete',
      description: 'Emily Johnson completed training the new phishing detection model',
      timestamp: '1 hour ago',
      from: 'Emily Johnson'
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'away': return 'bg-yellow-500';
      case 'offline': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'alert': return <Bell className="text-red-400" size={16} />;
      case 'message': return <MessageSquare className="text-blue-400" size={16} />;
      case 'update': return <FileText className="text-green-400" size={16} />;
      default: return <Bell className="text-gray-400" size={16} />;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-1">Collaboration Hub</h1>
        <p className="text-gray-400">Coordinate security efforts with your team</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-800 p-1 rounded-lg">
        {[
          { id: 'team', label: 'Team', icon: Users },
          { id: 'chat', label: 'Chat', icon: MessageSquare },
          { id: 'sharing', label: 'Sharing', icon: Share2 },
          { id: 'meetings', label: 'Meetings', icon: Video },
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

      {/* Content based on active tab */}
      {activeTab === 'team' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold">Team Members</h3>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
                  <Plus size={16} />
                  Invite Member
                </button>
              </div>
              
              <div className="space-y-4">
                {teamMembers.map((member) => (
                  <div key={member.id} className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center font-semibold">
                          {member.avatar}
                        </div>
                        <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${getStatusColor(member.status)} rounded-full border-2 border-gray-800`}></div>
                      </div>
                      <div>
                        <h4 className="font-medium">{member.name}</h4>
                        <p className="text-sm text-gray-400">{member.role}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-400">{member.lastActive}</div>
                      <div className={`text-xs capitalize ${member.status === 'online' ? 'text-green-400' : member.status === 'away' ? 'text-yellow-400' : 'text-gray-400'}`}>
                        {member.status}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div key={notification.id} className="p-3 bg-gray-700/50 rounded-lg">
                  <div className="flex items-start gap-3">
                    {getNotificationIcon(notification.type)}
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{notification.title}</h4>
                      <p className="text-xs text-gray-400 mt-1">{notification.description}</p>
                      <div className="text-xs text-gray-500 mt-2">{notification.timestamp}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'chat' && (
        <div className="bg-gray-800 rounded-xl p-6 shadow-lg h-96">
          <div className="flex flex-col h-full">
            <h3 className="text-lg font-semibold mb-4">Team Chat</h3>
            <div className="flex-1 bg-gray-700/50 rounded-lg p-4 mb-4 overflow-y-auto">
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-sm font-semibold">SC</div>
                  <div>
                    <div className="bg-gray-600 rounded-lg p-3">
                      <p className="text-sm">Just detected a new phishing campaign targeting our industry. Sharing the IOCs now.</p>
                    </div>
                    <div className="text-xs text-gray-400 mt-1">Sarah Chen • 5 min ago</div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-sm font-semibold">MR</div>
                  <div>
                    <div className="bg-gray-600 rounded-lg p-3">
                      <p className="text-sm">Thanks! I'll update our IoT device filters accordingly.</p>
                    </div>
                    <div className="text-xs text-gray-400 mt-1">Mike Rodriguez • 3 min ago</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Type a message..."
                className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
                Send
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'sharing' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Shared Threat Intelligence</h3>
            <div className="space-y-4">
              <div className="p-4 bg-gray-700/50 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium">Phishing Campaign Analysis</h4>
                  <span className="text-xs text-gray-400">2 hours ago</span>
                </div>
                <p className="text-sm text-gray-300 mb-2">Comprehensive analysis of recent phishing attempts targeting financial sector</p>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <span>Shared by Sarah Chen</span>
                  <span>•</span>
                  <span>3 downloads</span>
                </div>
              </div>
              <div className="p-4 bg-gray-700/50 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium">IoT Vulnerability Report</h4>
                  <span className="text-xs text-gray-400">1 day ago</span>
                </div>
                <p className="text-sm text-gray-300 mb-2">Latest vulnerabilities discovered in smart home devices</p>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <span>Shared by Mike Rodriguez</span>
                  <span>•</span>
                  <span>7 downloads</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Share New Intelligence</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
                <input
                  type="text"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter title..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                <textarea
                  rows={4}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Describe the threat intelligence..."
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">File Upload</label>
                <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
                  <FileText className="mx-auto text-gray-400 mb-2" size={32} />
                  <p className="text-sm text-gray-400">Drag and drop files here or click to browse</p>
                </div>
              </div>
              <button className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
                Share Intelligence
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'meetings' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Upcoming Meetings</h3>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
                <Plus size={16} />
                Schedule
              </button>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-gray-700/50 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <Calendar className="text-blue-400" size={16} />
                  <h4 className="font-medium">Weekly Security Review</h4>
                </div>
                <p className="text-sm text-gray-300 mb-2">Review of this week's security incidents and threat landscape</p>
                <div className="flex items-center gap-4 text-xs text-gray-400">
                  <span>Tomorrow, 2:00 PM</span>
                  <span>•</span>
                  <span>5 attendees</span>
                </div>
              </div>
              <div className="p-4 bg-gray-700/50 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <Calendar className="text-green-400" size={16} />
                  <h4 className="font-medium">ML Model Training Session</h4>
                </div>
                <p className="text-sm text-gray-300 mb-2">Training session for new team members on ML model deployment</p>
                <div className="flex items-center gap-4 text-xs text-gray-400">
                  <span>Friday, 10:00 AM</span>
                  <span>•</span>
                  <span>8 attendees</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center gap-3 p-3 bg-gray-700/50 hover:bg-gray-700 rounded-lg transition-colors">
                <Video className="text-blue-400" size={20} />
                <span>Start Instant Meeting</span>
              </button>
              <button className="w-full flex items-center gap-3 p-3 bg-gray-700/50 hover:bg-gray-700 rounded-lg transition-colors">
                <Share2 className="text-green-400" size={20} />
                <span>Share Screen</span>
              </button>
              <button className="w-full flex items-center gap-3 p-3 bg-gray-700/50 hover:bg-gray-700 rounded-lg transition-colors">
                <MessageSquare className="text-purple-400" size={20} />
                <span>Send Broadcast Message</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Collaboration;