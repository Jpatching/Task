import React from 'react';
import {
  MagnifyingGlassIcon,
  UserGroupIcon,
  ArrowPathIcon,
  FolderIcon,
  Cog6ToothIcon,
  ChatBubbleLeftIcon,
  ChartBarIcon,
  PlusIcon,
  BookmarkIcon,
  BellIcon,
} from '@heroicons/react/24/outline';

const LeftSidebar: React.FC = () => {
  return (
    <div className="h-full bg-gray-800 flex flex-col items-center py-4 space-y-6">
      {/* Logo */}
      <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
        <div className="text-white font-bold text-sm">PS</div>
      </div>

      {/* Navigation Icons */}
      <div className="flex flex-col space-y-4">
        <button className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors">
          <MagnifyingGlassIcon className="w-5 h-5" />
        </button>
        
        <button className="w-10 h-10 flex items-center justify-center text-blue-400 bg-gray-700 rounded-lg">
          <UserGroupIcon className="w-5 h-5" />
        </button>
        
        <button className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors">
          <ArrowPathIcon className="w-5 h-5" />
        </button>
        
        <button className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors">
          <FolderIcon className="w-5 h-5" />
        </button>
        
        <button className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors">
          <ChatBubbleLeftIcon className="w-5 h-5" />
        </button>
        
        <button className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors">
          <ChartBarIcon className="w-5 h-5" />
        </button>
        
        <button className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors">
          <BookmarkIcon className="w-5 h-5" />
        </button>
        
        <button className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors">
          <BellIcon className="w-5 h-5" />
        </button>
      </div>

      {/* Bottom section */}
      <div className="flex-1"></div>
      
      <div className="flex flex-col space-y-4">
        <button className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors">
          <PlusIcon className="w-5 h-5" />
        </button>
        
        <button className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors">
          <Cog6ToothIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default LeftSidebar;