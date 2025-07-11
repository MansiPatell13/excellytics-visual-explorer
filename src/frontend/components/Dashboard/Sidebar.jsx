import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Home, Folder, Users, Building, Star, LogOut } from 'lucide-react';
const Sidebar = ({
  isOpen,
  onToggle,
  onCreateNew
}) => {
  const [isProjectsExpanded, setIsProjectsExpanded] = useState(true);
  const menuItems = [{
    id: 'dashboard',
    label: 'Dashboard',
    icon: Home,
    active: true
  }, {
    id: 'projects',
    label: 'Projects',
    icon: Folder,
    expandable: true,
    expanded: isProjectsExpanded,
    children: [{
      id: 'personal',
      label: 'Personal',
      icon: Star
    }, {
      id: 'shared',
      label: 'Shared with me',
      icon: Users
    }, {
      id: 'organization',
      label: 'Organization',
      icon: Building
    }]
  }, {
    id: 'teams',
    label: 'Teams',
    icon: Users
  }];
  const toggleProjects = () => {
    setIsProjectsExpanded(!isProjectsExpanded);
  };
  return <>
      {/* Mobile overlay */}
      {isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden" onClick={onToggle} />}
      
      {/* Sidebar */}
      <div className={`
        fixed lg:relative inset-y-0 left-0 z-30
        w-64 bg-white border-r border-gray-200
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        ${!isOpen ? 'lg:w-0 lg:overflow-hidden' : ''}
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">E</span>
              </div>
              <span className="font-semibold text-gray-900">Excel Analytics</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="p-4 space-y-3">
            <button onClick={onCreateNew} className="w-full px-4 py-2 rounded-lg font-medium transition-colors bg-green-600 hover:bg-green-500 text-white">
              Create new
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 pb-4">
            <ul className="space-y-1">
              {menuItems.map(item => <li key={item.id}>
                  <button onClick={item.expandable ? toggleProjects : undefined} className={
                    `w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors duration-200 ` +
                    (item.active ? 'bg-green-100 text-green-700 font-bold' : 'text-gray-700 hover:bg-gray-100')
                  }>
                    <item.icon className="w-5 h-5" />
                    <span className="flex-1">{item.label}</span>
                    {item.expandable && (item.expanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />)}
                  </button>
                  
                  {item.children && item.expanded && <ul className="ml-6 mt-1 space-y-1">
                      {item.children.map(child => <li key={child.id}>
                          <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left text-gray-600 hover:bg-gray-100 transition-colors">
                            <child.icon className="w-4 h-4" />
                            <span>{child.label}</span>
                          </button>
                        </li>)}
                    </ul>}
                </li>)}
            </ul>
          </nav>
          {/* Logout Button at the bottom */}
          {typeof window !== 'undefined' && localStorage.getItem('githubUser') && (
            <div className="p-4 mt-auto">
              <button
                className="w-full flex items-center justify-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors bg-red-500 hover:bg-red-600 text-white"
                onClick={() => {
                  localStorage.removeItem('githubUser');
                  window.location.reload();
                }}
              >
                <LogOut className="w-5 h-5 mr-2" />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </>;
};
export default Sidebar;