
import React, { useState } from 'react';
import ChartBlock from './ChartBlock';

const WorkspaceCanvas = ({ items, setItems, gridBackground, selectedSheet }) => {
  const [draggedItem, setDraggedItem] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e, item) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setDraggedItem(item.id);
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    e.preventDefault();
  };

  const handleMouseMove = (e) => {
    if (draggedItem) {
      const canvasRect = e.currentTarget.getBoundingClientRect();
      const newX = e.clientX - canvasRect.left - dragOffset.x;
      const newY = e.clientY - canvasRect.top - dragOffset.y;

      setItems(prev => prev.map(item => 
        item.id === draggedItem 
          ? { ...item, x: Math.max(0, newX), y: Math.max(0, newY) }
          : item
      ));
    }
  };

  const handleMouseUp = () => {
    setDraggedItem(null);
    setDragOffset({ x: 0, y: 0 });
  };

  const handleItemDelete = (itemId) => {
    setItems(prev => prev.filter(item => item.id !== itemId));
  };

  const handleItemResize = (itemId, newWidth, newHeight) => {
    setItems(prev => prev.map(item => 
      item.id === itemId 
        ? { ...item, width: newWidth, height: newHeight }
        : item
    ));
  };

  return (
    <div 
      className={`
        flex-1 relative overflow-auto
        ${gridBackground ? 'bg-grid-pattern' : 'bg-white'}
      `}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Grid pattern */}
      {gridBackground && (
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              radial-gradient(circle, #94a3b8 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px'
          }}
        />
      )}

      {/* Selected Sheet Info */}
      {selectedSheet && (
        <div className="absolute top-4 left-4 bg-white rounded-lg shadow-sm border border-gray-200 p-3 z-10">
          <h3 className="font-medium text-gray-900">{selectedSheet.name}</h3>
          <p className="text-sm text-gray-600">
            {selectedSheet.tables?.length || 0} tables available
          </p>
        </div>
      )}

      {/* Empty State */}
      {items.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Start Creating Your Analysis
            </h3>
            <p className="text-gray-600 mb-4">
              Add charts and visualizations to analyze your Excel data
            </p>
            {!selectedSheet && (
              <p className="text-sm text-gray-500">
                Select a sheet from the sidebar to begin
              </p>
            )}
          </div>
        </div>
      )}

      {/* Chart Items */}
      {items.map(item => (
        <ChartBlock
          key={item.id}
          item={item}
          onMouseDown={(e) => handleMouseDown(e, item)}
          onDelete={() => handleItemDelete(item.id)}
          onResize={(width, height) => handleItemResize(item.id, width, height)}
          isDragging={draggedItem === item.id}
        />
      ))}
    </div>
  );
};

export default WorkspaceCanvas;
