import React from 'react';
import { HealthcareProfessional } from '../types';
import { UserIcon, ChartBarIcon, AcademicCapIcon } from '@heroicons/react/24/solid';
import EnhancedSearch from './EnhancedSearch';

interface ProfilePanelProps {
  selectedProfessional: HealthcareProfessional | null;
  professionals: HealthcareProfessional[];
  onSearch: (query: string, results: HealthcareProfessional[]) => void;
  onSelectProfessional: (professional: HealthcareProfessional) => void;
}

const ProfilePanel: React.FC<ProfilePanelProps> = ({ selectedProfessional, professionals, onSearch, onSelectProfessional }) => {
  if (!selectedProfessional) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header with profile info and actions */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
            {selectedProfessional.avatar || selectedProfessional.name.charAt(0)}
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">{selectedProfessional.name}</h3>
            <p className="text-sm text-gray-600">{selectedProfessional.specialty} at NNJHD</p>
          </div>
        </div>

        {/* Stats and buttons */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex space-x-4 text-sm text-gray-600">
            <span>My Peers <strong className="text-gray-900">{selectedProfessional.peersCount}</strong></span>
            <span>Following <strong className="text-gray-900">{selectedProfessional.followingCount}</strong></span>
          </div>
          <div className="flex items-center space-x-2">
            <label className="text-xs text-gray-500">Show connections</label>
            <div className="relative inline-block w-8 h-4">
              <input type="checkbox" className="sr-only" />
              <div className="block bg-gray-300 w-8 h-4 rounded-full"></div>
              <div className="dot absolute left-1 top-1 bg-white w-2 h-2 rounded-full transition"></div>
            </div>
          </div>
        </div>

        <div className="flex space-x-2 mb-4">
          <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
            Create web
          </button>
        </div>

        <div className="flex items-center space-x-2 text-xs text-gray-500">
          <label>Show my connections on map</label>
          <div className="relative inline-block w-8 h-4">
            <input type="checkbox" className="sr-only" defaultChecked />
            <div className="block bg-blue-600 w-8 h-4 rounded-full"></div>
            <div className="dot absolute right-1 top-1 bg-white w-2 h-2 rounded-full transition"></div>
          </div>
        </div>
      </div>

      {/* Enhanced Search bar */}
      <div className="p-4 border-b border-gray-200">
        <EnhancedSearch
          professionals={professionals}
          onSearch={onSearch}
          onSelectProfessional={onSelectProfessional}
        />
      </div>

      {/* PeerSpace section */}
      <div className="p-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">PeerSpace</h2>

        {/* Profile card */}
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 mb-6">
          <div className="text-center mb-4">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-3">
              {selectedProfessional.avatar || selectedProfessional.name.charAt(0)}
            </div>
            <h3 className="font-bold text-gray-900 text-lg">{selectedProfessional.name}</h3>
            <p className="text-blue-600 text-sm font-medium">{selectedProfessional.specialty}</p>
            <p className="text-gray-600 text-sm mt-2">{selectedProfessional.experience}</p>
          </div>

          {/* Stats */}
          <div className="flex justify-center space-x-8 py-4 border-t border-white/50 mb-4">
            <div className="text-center">
              <div className="text-lg font-bold text-gray-900">Peers</div>
              <div className="text-2xl font-bold text-gray-900">{selectedProfessional.peersCount}</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-gray-900">Following</div>
              <div className="text-2xl font-bold text-gray-900">{selectedProfessional.followingCount}</div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex space-x-3">
            <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
              View Profile
            </button>
            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
              Resume
            </button>
            <button className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
              ⋮
            </button>
          </div>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <UserIcon className="w-4 h-4 text-gray-400" />
              <span className="text-xs text-gray-500">Patient Served</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{selectedProfessional.patientsServed}</div>
            <div className="text-xs text-green-600">↗ +2%</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <ChartBarIcon className="w-4 h-4 text-gray-400" />
              <span className="text-xs text-gray-500">Success rate</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{selectedProfessional.successRate}%</div>
            <div className="text-xs text-green-600">↗ +5%</div>
          </div>
        </div>

        {/* About Section */}
        <div className="mb-6">
          <h4 className="font-semibold text-gray-900 mb-3">About</h4>
          <p className="text-gray-600 text-sm leading-relaxed">
            {selectedProfessional.about}
          </p>
        </div>

        {/* Education Section */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-3">Education</h4>
          <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <AcademicCapIcon className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h5 className="font-medium text-gray-900 text-sm">
                {selectedProfessional.education}
              </h5>
              <p className="text-gray-600 text-sm">Cardiology Degree</p>
              <p className="text-gray-600 text-sm">Specialization in Heart Health</p>
              <p className="text-gray-400 text-xs mt-1">Sep2015 - Jun 2020</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePanel;