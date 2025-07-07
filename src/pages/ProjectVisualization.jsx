
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Download, Share, Settings } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '../components/ui/chart';
import { toast } from 'sonner';

const ProjectVisualization = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get project data from localStorage or props
    const savedProjects = JSON.parse(localStorage.getItem('projects') || '[]');
    const currentProject = savedProjects.find(p => p.id === parseInt(projectId));
    
    if (currentProject) {
      setProject(currentProject);
    } else {
      toast.error('Project not found');
      navigate('/dashboard');
    }
    setLoading(false);
  }, [projectId, navigate]);

  const renderChart = () => {
    if (!project || !project.data) return null;

    const chartConfig = {
      [project.yAxis]: {
        label: project.yAxis,
        color: "#10B981",
      },
    };

    switch (project.chartType) {
      case 'bar':
        return (
          <ChartContainer config={chartConfig} className="h-[400px] w-full">
            <BarChart data={project.data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={project.xAxis} />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              <Bar dataKey={project.yAxis} fill="#10B981" />
            </BarChart>
          </ChartContainer>
        );

      case 'line':
        return (
          <ChartContainer config={chartConfig} className="h-[400px] w-full">
            <LineChart data={project.data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={project.xAxis} />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              <Line type="monotone" dataKey={project.yAxis} stroke="#10B981" strokeWidth={2} />
            </LineChart>
          </ChartContainer>
        );

      case 'pie':
        const COLORS = ['#10B981', '#3B82F6', '#8B5CF6', '#F59E0B', '#EF4444'];
        return (
          <ChartContainer config={chartConfig} className="h-[400px] w-full">
            <PieChart>
              <Pie
                data={project.data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey={project.yAxis}
                nameKey={project.xAxis}
              >
                {project.data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <ChartTooltip content={<ChartTooltipContent />} />
            </PieChart>
          </ChartContainer>
        );

      default:
        return (
          <div className="h-[400px] flex items-center justify-center bg-gray-50 rounded-lg">
            <p className="text-gray-500">Chart type not supported yet</p>
          </div>
        );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Project not found</h2>
          <button
            onClick={() => navigate('/dashboard')}
            className="text-green-600 hover:text-green-700"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/dashboard')}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">{project.name}</h1>
                <p className="text-sm text-gray-500">
                  {project.chartType} chart • {project.fileName}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => toast.success('Chart exported successfully!')}
                className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
              <button
                onClick={() => toast.success('Chart shared successfully!')}
                className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Share className="w-4 h-4" />
                <span>Share</span>
              </button>
              <button
                onClick={() => toast.info('Settings coming soon!')}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Settings className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Chart Visualization */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Data Visualization</h2>
                <p className="text-sm text-gray-600">
                  {project.xAxis} vs {project.yAxis} • {project.data?.length || 0} data points
                </p>
              </div>
              
              {renderChart()}
            </div>
          </div>

          {/* Data Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Data Summary</h3>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Chart Type</p>
                  <p className="font-medium capitalize">{project.chartType}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600">X-Axis</p>
                  <p className="font-medium">{project.xAxis}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600">Y-Axis</p>
                  <p className="font-medium">{project.yAxis}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600">Data Points</p>
                  <p className="font-medium">{project.data?.length || 0}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600">Source File</p>
                  <p className="font-medium text-sm">{project.fileName}</p>
                </div>
              </div>
            </div>

            {/* Raw Data Preview */}
            {project.data && project.data.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Data Preview</h3>
                <div className="max-h-64 overflow-y-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-2 py-1 text-left font-medium text-gray-700">{project.xAxis}</th>
                        <th className="px-2 py-1 text-left font-medium text-gray-700">{project.yAxis}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {project.data.slice(0, 10).map((row, index) => (
                        <tr key={index} className="border-t border-gray-100">
                          <td className="px-2 py-1 text-gray-900">{row[project.xAxis]}</td>
                          <td className="px-2 py-1 text-gray-900">{row[project.yAxis]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {project.data.length > 10 && (
                    <p className="text-xs text-gray-500 mt-2 text-center">
                      Showing 10 of {project.data.length} rows
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectVisualization;
