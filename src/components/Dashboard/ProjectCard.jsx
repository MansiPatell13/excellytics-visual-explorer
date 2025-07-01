
import React, { useState } from 'react';
import { MoreHorizontal } from 'lucide-react';

const ProjectCard = ({ project, onOpen, onAction }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleActionClick = (action) => {
    onAction(action);
    setShowDropdown(false);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200 relative">
      {/* Project Icon */}
      <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-green-100 to-blue-100 rounded-lg mb-4">
        <span className="text-2xl">{project.icon}</span>
      </div>

      {/* Project Info */}
      <div className="mb-4">
        <h3 className="font-semibold text-gray-900 mb-1">{project.name}</h3>
        <p className="text-sm text-gray-500">Modified {project.lastModified}</p>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between">
        <button 
          onClick={onOpen}
          className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:from-green-600 hover:to-blue-600 transition-colors"
        >
          Open project
        </button>
        
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <MoreHorizontal className="w-4 h-4 text-gray-600" />
          </button>
          
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
              <div className="py-1">
                <button
                  onClick={() => handleActionClick('rename')}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Rename
                </button>
                <button
                  onClick={() => handleActionClick('duplicate')}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Duplicate
                </button>
                <button
                  onClick={() => handleActionClick('delete')}
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Click outside to close dropdown */}
      {showDropdown && (
        <div 
          className="fixed inset-0 z-5"
          onClick={() => setShowDropdown(false)}
        />
      )}
    </div>
  );
};

export default ProjectCard;
