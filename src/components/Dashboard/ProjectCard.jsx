
import React, { useState } from 'react';
import { MoreHorizontal, Download, Share, Eye } from 'lucide-react';
import { motion } from 'framer-motion';

const ProjectCard = ({ project, onOpen, onAction }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleActionClick = (action) => {
    onAction(action);
    setShowDropdown(false);
  };

  const IconComponent = project.icon;

  const getProjectTypeInfo = () => {
    if (project.type === 'project') {
      return {
        badge: project.chartType || 'chart',
        badgeColor: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      };
    }
    return {
      badge: 'folder',
      badgeColor: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
    };
  };

  const { badge, badgeColor } = getProjectTypeInfo();

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all duration-200 relative group"
    >
      {/* Project Icon */}
      <div className="flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg mb-4">
        <IconComponent className="w-6 h-6 text-green-600 dark:text-green-400" />
      </div>

      {/* Project Info */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-gray-900 dark:text-white truncate">{project.name}</h3>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${badgeColor}`}>
            {badge}
          </span>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">Modified {project.lastModified}</p>
        {project.fileName && (
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1 truncate">
            📊 {project.fileName}
          </p>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between">
        <button
          onClick={onOpen}
          className="flex items-center space-x-2 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 bg-green-600 hover:bg-green-700 transform hover:scale-105 active:scale-95"
        >
          <Eye className="w-4 h-4" />
          <span>Open</span>
        </button>
        
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
          >
            <MoreHorizontal className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          </button>
          
          {showDropdown && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600 z-10"
            >
              <div className="py-1">
                <button
                  onClick={() => handleActionClick('rename')}
                  className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
                >
                  Rename
                </button>
                <button
                  onClick={() => handleActionClick('duplicate')}
                  className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
                >
                  Duplicate
                </button>
                {project.type === 'project' && (
                  <>
                    <button
                      onClick={() => handleActionClick('export')}
                      className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </button>
                    <button
                      onClick={() => handleActionClick('share')}
                      className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
                    >
                      <Share className="w-4 h-4 mr-2" />
                      Share
                    </button>
                  </>
                )}
                <button
                  onClick={() => handleActionClick('delete')}
                  className="flex items-center w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600"
                >
                  Delete
                </button>
              </div>
            </motion.div>
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
    </motion.div>
  );
};

export default ProjectCard;
