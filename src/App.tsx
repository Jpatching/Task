import React, { useState } from 'react';
import { HealthcareProfessional } from './types';
import { healthcareProfessionals } from './data/professionals';
import LeftSidebar from './components/LeftSidebar';
import ProfilePanel from './components/ProfilePanel';
import EnhancedNetworkGraph from './components/EnhancedNetworkGraph';

const App: React.FC = () => {
  const [selectedProfessional, setSelectedProfessional] = useState<HealthcareProfessional | null>(
    healthcareProfessionals.length > 0 ? healthcareProfessionals[0] : null
  );
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<HealthcareProfessional[]>([]);
  const [showMobileProfile, setShowMobileProfile] = useState<boolean>(false);

  const handleNodeClick = (professional: HealthcareProfessional) => {
    setSelectedProfessional(professional);
  };

  const handleSearch = (query: string, results: HealthcareProfessional[]) => {
    setSearchQuery(query);
    setSearchResults(results);
  };

  const handleSelectProfessional = (professional: HealthcareProfessional) => {
    setSelectedProfessional(professional);
  };

  if (!selectedProfessional) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-100">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gray-100 flex flex-col lg:flex-row">
      {/* Mobile Header with sidebar toggle */}
      <div className="lg:hidden bg-white shadow-sm p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
            <div className="text-white font-bold text-sm">PS</div>
          </div>
          <h1 className="text-lg font-semibold text-gray-900">PeerSpace</h1>
        </div>
        <button 
          onClick={() => setShowMobileProfile(!showMobileProfile)}
          className="p-2 bg-gray-100 rounded-lg"
        >
          {selectedProfessional && (
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
              {selectedProfessional.avatar || selectedProfessional.name.charAt(0)}
            </div>
          )}
        </button>
      </div>

      {/* Left Sidebar - Desktop Only */}
      <div className="hidden lg:block w-16 bg-gray-800">
        <LeftSidebar />
      </div>
      
      {/* Mobile Profile Overlay */}
      {showMobileProfile && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50" onClick={() => setShowMobileProfile(false)}>
          <div className="w-80 max-w-full h-full bg-white" onClick={(e) => e.stopPropagation()}>
            <div className="p-4 border-b flex items-center justify-between">
              <h2 className="font-semibold text-gray-900">Profile</h2>
              <button 
                onClick={() => setShowMobileProfile(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            <div className="h-full overflow-y-auto">
              <ProfilePanel
                selectedProfessional={selectedProfessional}
                professionals={healthcareProfessionals}
                onSearch={handleSearch}
                onSelectProfessional={(prof) => {
                  handleSelectProfessional(prof);
                  setShowMobileProfile(false);
                }}
              />
            </div>
          </div>
        </div>
      )}
      
      {/* Desktop Layout */}
      <div className="flex-1 flex">
        {/* Middle Panel - Profile Card - Desktop Only */}
        <div className="hidden lg:block w-80 bg-white shadow-lg">
          <ProfilePanel
            selectedProfessional={selectedProfessional}
            professionals={healthcareProfessionals}
            onSearch={handleSearch}
            onSelectProfessional={handleSelectProfessional}
          />
        </div>
        
        {/* Network Graph - Main Content */}
        <div className="flex-1 bg-white">
          <EnhancedNetworkGraph
            professionals={healthcareProfessionals}
            selectedProfessional={selectedProfessional}
            onNodeClick={handleNodeClick}
            searchQuery={searchQuery}
            searchResults={searchResults}
          />
        </div>
      </div>
    </div>
  );
};

export default App;