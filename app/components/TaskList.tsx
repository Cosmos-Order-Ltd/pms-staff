'use client';

import React, { useState } from 'react';
import toast from 'react-hot-toast';
import {
  CheckCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  MapPinIcon,
  UserIcon,
  WrenchScrewdriverIcon,
  SparklesIcon,
  TruckIcon
} from '@heroicons/react/24/outline';

interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'normal' | 'high' | 'urgent';
  status: 'pending' | 'in_progress' | 'completed';
  type: 'maintenance' | 'housekeeping' | 'guest_service' | 'delivery';
  location: string;
  assignedTo: string;
  dueTime: string;
  estimatedDuration: number;
  requestedBy?: string;
}

export function TaskList() {
  const [filter, setFilter] = useState<'all' | 'pending' | 'in_progress' | 'completed'>('all');
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 'task-001',
      title: 'Fix AC Unit',
      description: 'Guest reports AC not cooling properly in room 304',
      priority: 'high',
      status: 'pending',
      type: 'maintenance',
      location: 'Room 304',
      assignedTo: 'John Smith',
      dueTime: '14:00',
      estimatedDuration: 45,
      requestedBy: 'Guest Services'
    },
    {
      id: 'task-002',
      title: 'Room Cleaning',
      description: 'Deep clean and prepare room for VIP guest arrival',
      priority: 'normal',
      status: 'in_progress',
      type: 'housekeeping',
      location: 'Room 508',
      assignedTo: 'Maria Garcia',
      dueTime: '15:30',
      estimatedDuration: 60
    },
    {
      id: 'task-003',
      title: 'Welcome Package Delivery',
      description: 'Deliver complimentary fruit basket and wine to honeymoon suite',
      priority: 'normal',
      status: 'completed',
      type: 'delivery',
      location: 'Suite 201',
      assignedTo: 'David Chen',
      dueTime: '12:00',
      estimatedDuration: 15
    },
    {
      id: 'task-004',
      title: 'Pool Equipment Check',
      description: 'Daily maintenance check of pool filtration system',
      priority: 'low',
      status: 'pending',
      type: 'maintenance',
      location: 'Pool Area',
      assignedTo: 'Mike Johnson',
      dueTime: '16:00',
      estimatedDuration: 30
    },
    {
      id: 'task-005',
      title: 'Guest Complaint Resolution',
      description: 'Noise complaint from room 412 - investigate adjoining room',
      priority: 'urgent',
      status: 'pending',
      type: 'guest_service',
      location: 'Room 412/414',
      assignedTo: 'Sarah Wilson',
      dueTime: 'ASAP',
      estimatedDuration: 20,
      requestedBy: 'Front Desk'
    }
  ]);

  const handleTaskStatusChange = (taskId: string, newStatus: Task['status']) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );

    const task = tasks.find(t => t.id === taskId);
    if (task) {
      toast.success(`Task "${task.title}" marked as ${newStatus.replace('_', ' ')}`);
    }
  };

  const filteredTasks = tasks.filter(task => filter === 'all' || task.status === filter);

  const getTaskTypeIcon = (type: Task['type']) => {
    switch (type) {
      case 'maintenance':
        return WrenchScrewdriverIcon;
      case 'housekeeping':
        return SparklesIcon;
      case 'guest_service':
        return UserIcon;
      case 'delivery':
        return TruckIcon;
      default:
        return ClockIcon;
    }
  };

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'high':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'normal':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'low':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: Task['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in_progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'pending':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-4">
      {/* Filter Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-1">
        <div className="grid grid-cols-4 gap-1">
          {(['all', 'pending', 'in_progress', 'completed'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`py-2 px-3 text-xs font-medium rounded-md transition-colors ${
                filter === status
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
              }`}
            >
              {status === 'all' ? 'All' : status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </button>
          ))}
        </div>
      </div>

      {/* Task List */}
      <div className="space-y-3">
        {filteredTasks.map((task) => {
          const TaskIcon = getTaskTypeIcon(task.type);

          return (
            <div
              key={task.id}
              className={`bg-white rounded-lg shadow-sm border-l-4 p-4 ${
                task.priority === 'urgent' ? 'border-l-red-500' :
                task.priority === 'high' ? 'border-l-orange-500' :
                task.priority === 'normal' ? 'border-l-blue-500' : 'border-l-gray-500'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <div className={`p-2 rounded-full ${getPriorityColor(task.priority)}`}>
                    <TaskIcon className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 text-sm">{task.title}</h3>
                    <p className="text-xs text-gray-500 mt-1">{task.description}</p>
                  </div>
                </div>

                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                  {task.status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs text-gray-500 mb-3">
                <div className="flex items-center space-x-1">
                  <MapPinIcon className="h-3 w-3" />
                  <span>{task.location}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <ClockIcon className="h-3 w-3" />
                  <span>{task.dueTime} ({task.estimatedDuration}min)</span>
                </div>
                <div className="flex items-center space-x-1">
                  <UserIcon className="h-3 w-3" />
                  <span>{task.assignedTo}</span>
                </div>
                {task.requestedBy && (
                  <div className="flex items-center space-x-1">
                    <ExclamationTriangleIcon className="h-3 w-3" />
                    <span>By: {task.requestedBy}</span>
                  </div>
                )}
              </div>

              {/* Task Actions */}
              <div className="flex space-x-2">
                {task.status === 'pending' && (
                  <button
                    onClick={() => handleTaskStatusChange(task.id, 'in_progress')}
                    className="flex-1 bg-blue-600 text-white text-xs font-medium py-2 px-3 rounded-md hover:bg-blue-700"
                  >
                    Start Task
                  </button>
                )}
                {task.status === 'in_progress' && (
                  <button
                    onClick={() => handleTaskStatusChange(task.id, 'completed')}
                    className="flex-1 bg-green-600 text-white text-xs font-medium py-2 px-3 rounded-md hover:bg-green-700"
                  >
                    Mark Complete
                  </button>
                )}
                {task.status === 'completed' && (
                  <div className="flex-1 bg-gray-100 text-gray-500 text-xs font-medium py-2 px-3 rounded-md text-center">
                    <CheckCircleIcon className="h-4 w-4 inline mr-1" />
                    Completed
                  </div>
                )}
                <button
                  onClick={() => toast.success(`Viewing details for "${task.title}"`)}
                  className="bg-gray-100 text-gray-600 text-xs font-medium py-2 px-3 rounded-md hover:bg-gray-200"
                >
                  Details
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredTasks.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <ClockIcon className="h-12 w-12 mx-auto mb-2 text-gray-300" />
          <p>No tasks found for the selected filter.</p>
        </div>
      )}
    </div>
  );
}