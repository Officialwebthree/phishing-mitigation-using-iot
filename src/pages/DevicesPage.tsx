import React from 'react';
import DeviceSecurityStatus from '../components/Dashboard/DeviceSecurityStatus';
import StatCard from '../components/Dashboard/StatCard';
import { Shield, AlertTriangle, CheckCircle, WifiOff } from 'lucide-react';

const DevicesPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-1">IoT Devices</h1>
        <p className="text-gray-400">Monitor and manage your connected devices</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Total Devices" 
          value="47" 
          icon={<Shield size={24} className="text-blue-400" />}
          bgColor="bg-gray-800 border-l-4 border-blue-500"
        />
        <StatCard 
          title="Vulnerable" 
          value="3" 
          icon={<AlertTriangle size={24} className="text-yellow-400" />}
          bgColor="bg-gray-800 border-l-4 border-yellow-500"
        />
        <StatCard 
          title="Secured" 
          value="43" 
          icon={<CheckCircle size={24} className="text-green-400" />}
          bgColor="bg-gray-800 border-l-4 border-green-500"
        />
        <StatCard 
          title="Offline" 
          value="1" 
          icon={<WifiOff size={24} className="text-gray-400" />}
          bgColor="bg-gray-800 border-l-4 border-gray-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <DeviceSecurityStatus />
        </div>
        <div className="bg-gray-800 rounded-xl p-5 shadow-lg">
          <h3 className="text-lg font-semibold mb-4">Device Categories</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-gray-700/50 rounded-lg">
              <span>Cameras</span>
              <span className="font-semibold">12</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-700/50 rounded-lg">
              <span>Smart Locks</span>
              <span className="font-semibold">8</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-700/50 rounded-lg">
              <span>Thermostats</span>
              <span className="font-semibold">15</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-700/50 rounded-lg">
              <span>Network Devices</span>
              <span className="font-semibold">7</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-700/50 rounded-lg">
              <span>Others</span>
              <span className="font-semibold">5</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DevicesPage;