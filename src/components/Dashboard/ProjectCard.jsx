
import React, { useState } from 'react';
import { MoreHorizontal, Folder } from 'lucide-react';

const ProjectCard = ({ project, onOpen, onAction }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleDropdownAction = (action) => {
    onAction(action);
    setShowDropdown(false);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-200 hover:-translate-y-1 relative group">
      {/* Decorative dots */}
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-pink-300 rounded-full"></div>
          <div className="w-2 h-2 bg-blue-300 rounded-full"></div>
          <div className="w-2 h-2 bg-green-300 rounded-full"></div>
        </div>
      </div>

      {/* Project Icon */}
      <div className="flex justify-center mb-4">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center">
          <Folder className="w-8 h-8 text-blue-600" />
        </div>
      </div>

      {/* Project Info */}
      <div className="text-center mb-6">
        <h3 className="font-semibold text-gray-900 mb-1">{project.name}</h3>
        <p className="text-sm text-gray-500">Modified {project.lastModified}</p>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between">
        <button
          onClick={onOpen}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm"
        >
          Open project
        </button>

        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <MoreHorizontal className="w-5 h-5 text-gray-500" />
          </button>

          {/* Dropdown Menu */}
          {showDropdown && (
            <>
              <div 
                className="fixed inset-0 z-10"
                onClick={() => setShowDropdown(false)}
              />
              <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
                <div className="py-2">
                  <button
                    onClick={() => handleDropdownAction('rename')}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    Rename
                  </button>
                  <button
                    onClick={() => handleDropdownAction('duplicate')}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    Duplicate
                  </button>
                  <button
                    onClick={() => handleDropdownAction('share')}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    Share
                  </button>
                  <hr className="my-2" />
                  <button
                    onClick={() => handleDropdownAction('delete')}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
