'use client';

import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import {
  ClipboardDocumentListIcon,
  UserGroupIcon,
  BellIcon,
  Bars3Icon,
  XMarkIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import { TaskList } from './components/TaskList';
import { RoomStatus } from './components/RoomStatus';
import { QuickActions } from './components/QuickActions';
import { NotificationPanel } from './components/NotificationPanel';

interface StaffDashboardProps {}

export default function StaffMobile({}: StaffDashboardProps) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeTab, setActiveTab] = useState('tasks');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState(3);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    toast.success('Welcome to PMS Staff Mobile!');
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const tabs = [
    { id: 'tasks', name: 'Tasks', icon: ClipboardDocumentListIcon },
    { id: 'rooms', name: 'Rooms', icon: UserGroupIcon },
    { id: 'notifications', name: 'Alerts', icon: BellIcon, badge: notifications }
  ];

  const statsData = [
    { label: 'Pending Tasks', value: 12, color: 'bg-yellow-100 text-yellow-800', icon: ClockIcon },
    { label: 'Completed Today', value: 8, color: 'bg-green-100 text-green-800', icon: CheckCircleIcon },
    { label: 'Urgent Items', value: 3, color: 'bg-red-100 text-red-800', icon: ExclamationTriangleIcon }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-md text-gray-600 hover:bg-gray-100"
          >
            {sidebarOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>

          <div className="flex-1 text-center">
            <h1 className="text-lg font-semibold text-gray-900">PMS Staff</h1>
            <p className="text-xs text-gray-500">{formatDate(currentTime)}</p>
          </div>

          <div className="flex items-center space-x-2">
            <div className="text-right">
              <div className="text-sm font-medium text-gray-900">{formatTime(currentTime)}</div>
              <div className="text-xs text-gray-500">Live</div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-t border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center py-3 px-2 text-sm font-medium relative ${
                activeTab === tab.id
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <tab.icon className="h-5 w-5 mr-1" />
              {tab.name}
              {tab.badge && tab.badge > 0 && (
                <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 bg-red-600 rounded-full">
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="p-4 space-y-4">
        <div className="grid grid-cols-3 gap-3">
          {statsData.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
                </div>
                <div className={`p-2 rounded-full ${stat.color}`}>
                  <stat.icon className="h-4 w-4" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <QuickActions />

        {/* Main Content */}
        <div className="space-y-4">
          {activeTab === 'tasks' && <TaskList />}
          {activeTab === 'rooms' && <RoomStatus />}
          {activeTab === 'notifications' && (
            <NotificationPanel onNotificationRead={() => setNotifications(Math.max(0, notifications - 1))} />
          )}
        </div>
      </div>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black bg-opacity-25" onClick={() => setSidebarOpen(false)} />

          <div className="relative flex flex-col w-64 max-w-xs bg-white shadow-xl">
            <div className="flex items-center justify-between px-4 py-6 bg-gray-900">
              <h2 className="text-lg font-medium text-white">Staff Menu</h2>
              <button
                onClick={() => setSidebarOpen(false)}
                className="text-white hover:bg-gray-800 p-2 rounded-md"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 px-4 py-6 space-y-2">
              <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">
                My Profile
              </button>
              <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">
                Schedule
              </button>
              <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">
                Reports
              </button>
              <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">
                Settings
              </button>
              <button
                onClick={() => {
                  toast.success('Logged out successfully');
                  setSidebarOpen(false);
                }}
                className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PWA Install Prompt */}
      <div className="fixed bottom-4 right-4 z-20">
        <button
          onClick={() => toast.success('Add to Home Screen available in browser menu')}
          className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </button>
      </div>
    </div>
  );
}