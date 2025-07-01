
import React, { useState } from 'react';
import Sidebar from '../components/Dashboard/Sidebar';
import TopBar from '../components/Dashboard/TopBar';
import ProjectCard from '../components/Dashboard/ProjectCard';
import CreateProjectModal from '../components/Dashboard/CreateProjectModal';

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const sampleProjects = [
    {
      id: 1,
      name: 'Personal',
      type: 'folder',
      lastModified: '2 days ago',
      icon: '📁'
    },
    {
      id: 2,
      name: 'Sales Analytics',
      type: 'project',
      lastModified: '1 week ago',
      icon: '📊'
    },
    {
      id: 3,
      name: 'Marketing Data',
      type: 'project',
      lastModified: '3 days ago',
      icon: '📈'
    },
    {
      id: 4,
      name: 'Team Reports',
      type: 'folder',
      lastModified: '5 days ago',
      icon: '📋'
    }
  ];

  const handleOpenProject = (projectName) => {
    console.log(`Opening project: ${projectName}`);
  };

  const handleProjectAction = (action, projectName) => {
    console.log(`${action} project: ${projectName}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar 
        isOpen={isSidebarOpen} 
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        onCreateNew={() => setIsCreateModalOpen(true)}
      />
      
      <div className="flex-1 flex flex-col">
        <TopBar onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
        
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-semibold text-gray-900 mb-6">Dashboard</h1>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sampleProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onOpen={() => handleOpenProject(project.name)}
                  onAction={(action) => handleProjectAction(action, project.name)}
                />
              ))}
            </div>
          </div>
        </main>
      </div>

      <CreateProjectModal 
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
};

export default Dashboard;
