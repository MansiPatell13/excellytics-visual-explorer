
import React, { useState } from 'react';
import { Folder, BarChart3, TrendingUp, FileText, Download, Eye, Share } from 'lucide-react';
import { motion } from 'framer-motion';
import Sidebar from '../components/Dashboard/Sidebar';
import TopBar from '../components/Dashboard/TopBar';
import ProjectCard from '../components/Dashboard/ProjectCard';
import ProjectCreationModal from '../components/Dashboard/ProjectCreationModal';
import { toast } from 'sonner';

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: 'Sales Analytics',
      type: 'project',
      lastModified: '2 days ago',
      icon: BarChart3,
      chartType: 'bar',
      fileName: 'sales_data.xlsx'
    },
    {
      id: 2,
      name: 'Marketing Data',
      type: 'project',
      lastModified: '1 week ago',
      icon: TrendingUp,
      chartType: 'line',
      fileName: 'marketing_metrics.xlsx'
    },
    {
      id: 3,
      name: 'Personal',
      type: 'folder',
      lastModified: '3 days ago',
      icon: Folder
    },
    {
      id: 4,
      name: 'Team Reports',
      type: 'folder',
      lastModified: '5 days ago',
      icon: FileText
    }
  ]);

  const handleOpenProject = (projectName) => {
    console.log(`Opening project: ${projectName}`);
    toast.success(`Opening ${projectName}...`);
    // Navigate to workspace with project data
    // This would integrate with your existing Workspace component
  };

  const handleProjectAction = (action, projectName) => {
    console.log(`${action} project: ${projectName}`);
    
    switch (action) {
      case 'rename':
        toast.success(`Renaming ${projectName}...`);
        break;
      case 'duplicate':
        const projectToDuplicate = projects.find(p => p.name === projectName);
        if (projectToDuplicate) {
          const duplicatedProject = {
            ...projectToDuplicate,
            id: Date.now(),
            name: `${projectName} (Copy)`,
            lastModified: 'Just now'
          };
          setProjects([...projects, duplicatedProject]);
          toast.success(`${projectName} duplicated successfully!`);
        }
        break;
      case 'delete':
        setProjects(projects.filter(p => p.name !== projectName));
        toast.success(`${projectName} deleted successfully!`);
        break;
      case 'export':
        toast.success(`Exporting ${projectName}...`);
        break;
      case 'share':
        toast.success(`Sharing ${projectName}...`);
        break;
      default:
        break;
    }
  };

  const handleProjectCreate = (projectData) => {
    const newProject = {
      ...projectData,
      type: 'project',
      lastModified: 'Just now',
      icon: BarChart3
    };
    setProjects([newProject, ...projects]);
  };

  return (
    <div className="h-screen bg-gray-50 dark:bg-gray-900 flex overflow-hidden transition-colors duration-200">
      <Sidebar 
        isOpen={isSidebarOpen} 
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        onCreateNew={() => setIsCreateModalOpen(true)}
      />
      
      <div className="flex-1 flex flex-col">
        <TopBar onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
        
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Dashboard</h1>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    Manage your analytics projects and visualizations
                  </p>
                </div>
                <button
                  onClick={() => setIsCreateModalOpen(true)}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg"
                >
                  ➕ New Project
                </button>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Total Projects</p>
                      <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                        {projects.filter(p => p.type === 'project').length}
                      </p>
                    </div>
                    <BarChart3 className="w-8 h-8 text-green-600" />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Folders</p>
                      <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                        {projects.filter(p => p.type === 'folder').length}
                      </p>
                    </div>
                    <Folder className="w-8 h-8 text-blue-600" />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Charts Created</p>
                      <p className="text-2xl font-semibold text-gray-900 dark:text-white">12</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-purple-600" />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Data Files</p>
                      <p className="text-2xl font-semibold text-gray-900 dark:text-white">8</p>
                    </div>
                    <FileText className="w-8 h-8 text-orange-600" />
                  </div>
                </motion.div>
              </div>

              {/* Projects Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {projects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <ProjectCard
                      project={project}
                      onOpen={() => handleOpenProject(project.name)}
                      onAction={(action) => handleProjectAction(action, project.name)}
                    />
                  </motion.div>
                ))}
              </div>

              {/* Empty State */}
              {projects.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12"
                >
                  <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    No projects yet
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-6">
                    Create your first project to get started with data visualization
                  </p>
                  <button
                    onClick={() => setIsCreateModalOpen(true)}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                  >
                    Create Project
                  </button>
                </motion.div>
              )}
            </motion.div>
          </div>
        </main>
      </div>

      <ProjectCreationModal 
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onProjectCreate={handleProjectCreate}
      />
    </div>
  );
};

export default Dashboard;
