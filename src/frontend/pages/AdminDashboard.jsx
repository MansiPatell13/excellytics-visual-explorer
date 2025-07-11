import React, { useState } from 'react';
import Sidebar from '../components/Dashboard/Sidebar';
import TopBar from '../components/Dashboard/TopBar';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../components/ui/table';

const mockStats = [
  { label: 'Total Uploads', value: 120 },
  { label: 'Active Users', value: 34 },
  { label: 'Most Used Chart', value: 'Bar Chart' },
];

const mockUsers = [
  { id: 1, name: 'Alice', email: 'alice@example.com', status: 'active', role: 'user' },
  { id: 2, name: 'Bob', email: 'bob@example.com', status: 'blocked', role: 'user' },
  { id: 3, name: 'Charlie', email: 'charlie@example.com', status: 'active', role: 'admin' },
];

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} onCreateNew={() => {}} />
      <div className="flex-1 flex flex-col">
        <TopBar onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 p-6 space-y-8">
          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mockStats.map((stat) => (
              <Card key={stat.label}>
                <CardHeader>
                  <CardTitle>{stat.label}</CardTitle>
                </CardHeader>
                <CardContent>
                  <span className="text-3xl font-bold">{stat.value}</span>
                </CardContent>
              </Card>
            ))}
          </div>
          {/* User Management */}
          <div>
            <h2 className="text-xl font-semibold mb-4">User Management</h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <span className={user.status === 'active' ? 'text-green-600' : 'text-red-600'}>
                        {user.status}
                      </span>
                    </TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>
                      <button className="px-3 py-1 bg-yellow-400 text-white rounded mr-2" disabled={user.status === 'blocked'}>
                        Block
                      </button>
                      <button className="px-3 py-1 bg-red-500 text-white rounded" disabled={user.role === 'admin'}>
                        Delete
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard; 