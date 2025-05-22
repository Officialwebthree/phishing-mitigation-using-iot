import React, { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Dashboard from '../../pages/Dashboard';
import ThreatMonitor from '../../pages/ThreatMonitor';
import DevicesPage from '../../pages/DevicesPage';
import MLModels from '../../pages/MLModels';
import ComingSoon from '../../pages/ComingSoon';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'threats':
        return <ThreatMonitor />;
      case 'devices':
        return <DevicesPage />;
      case 'ml-models':
        return <MLModels />;
      default:
        return <ComingSoon pageName={activeTab} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-950 text-white overflow-hidden">
      <Sidebar 
        isOpen={sidebarOpen} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
      />
      
      <div className="flex-1 flex flex-col overflow-hidden lg:pl-64">
        <Navbar toggleSidebar={toggleSidebar} />
        
        <main className="flex-1 overflow-y-auto bg-gray-950 p-4">
          {renderContent()}
        </main>
      </div>
      
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
};

export default Layout;