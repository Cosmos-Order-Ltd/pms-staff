'use client';

import React, { useState } from 'react';
import toast from 'react-hot-toast';
import {
  BellIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  UserIcon,
  HomeIcon
} from '@heroicons/react/24/outline';

interface Notification {
  id: string;
  type: 'urgent' | 'warning' | 'info' | 'success' | 'error';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  source: 'system' | 'guest' | 'manager' | 'maintenance';
  actionRequired?: boolean;
  relatedEntity?: {
    type: 'room' | 'guest' | 'task' | 'system';
    id: string;
    name: string;
  };
}

interface NotificationPanelProps {
  onNotificationRead: () => void;
}

export function NotificationPanel({ onNotificationRead }: NotificationPanelProps) {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 'notif-001',
      type: 'urgent',
      title: 'Guest Complaint - Room 412',
      message: 'Noise complaint from adjoining room. Immediate attention required.',
      timestamp: '2025-01-16 13:45',
      isRead: false,
      source: 'guest',
      actionRequired: true,
      relatedEntity: {
        type: 'room',
        id: 'room-412',
        name: 'Room 412'
      }
    },
    {
      id: 'notif-002',
      type: 'warning',
      title: 'Maintenance Scheduled',
      message: 'Pool filtration system maintenance due in 30 minutes.',
      timestamp: '2025-01-16 13:30',
      isRead: false,
      source: 'system',
      actionRequired: true,
      relatedEntity: {
        type: 'task',
        id: 'task-004',
        name: 'Pool Equipment Check'
      }
    },
    {
      id: 'notif-003',
      type: 'info',
      title: 'VIP Arrival Alert',
      message: 'Honeymoon suite guest arriving at 16:00. Welcome package ready.',
      timestamp: '2025-01-16 13:15',
      isRead: false,
      source: 'manager',
      relatedEntity: {
        type: 'room',
        id: 'room-508',
        name: 'Suite 508'
      }
    },
    {
      id: 'notif-004',
      type: 'success',
      title: 'Task Completed',
      message: 'Room 201 cleaning completed successfully.',
      timestamp: '2025-01-16 12:30',
      isRead: true,
      source: 'system',
      relatedEntity: {
        type: 'room',
        id: 'room-201',
        name: 'Room 201'
      }
    },
    {
      id: 'notif-005',
      type: 'error',
      title: 'System Alert',
      message: 'Room 101 marked out of order due to plumbing issues.',
      timestamp: '2025-01-16 11:15',
      isRead: true,
      source: 'maintenance',
      relatedEntity: {
        type: 'room',
        id: 'room-101',
        name: 'Room 101'
      }
    }
  ]);

  const [filter, setFilter] = useState<'all' | 'unread' | 'urgent'>('unread');

  const handleMarkAsRead = (notificationId: string) => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notif =>
        notif.id === notificationId ? { ...notif, isRead: true } : notif
      )
    );
    onNotificationRead();
    toast.success('Notification marked as read');
  };

  const handleMarkAllRead = () => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notif => ({ ...notif, isRead: true }))
    );
    toast.success('All notifications marked as read');
  };

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'urgent':
        return ExclamationTriangleIcon;
      case 'warning':
        return ExclamationTriangleIcon;
      case 'info':
        return InformationCircleIcon;
      case 'success':
        return CheckCircleIcon;
      case 'error':
        return XCircleIcon;
      default:
        return BellIcon;
    }
  };

  const getNotificationColor = (type: Notification['type']) => {
    switch (type) {
      case 'urgent':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'info':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'success':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'error':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSourceIcon = (source: Notification['source']) => {
    switch (source) {
      case 'guest':
        return UserIcon;
      case 'manager':
        return UserIcon;
      case 'maintenance':
        return HomeIcon;
      default:
        return BellIcon;
    }
  };

  const filteredNotifications = notifications.filter(notif => {
    switch (filter) {
      case 'unread':
        return !notif.isRead;
      case 'urgent':
        return notif.type === 'urgent';
      default:
        return true;
    }
  });

  return (
    <div className="space-y-4">
      {/* Filter Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-1">
        <div className="grid grid-cols-3 gap-1">
          {(['unread', 'urgent', 'all'] as const).map((filterType) => (
            <button
              key={filterType}
              onClick={() => setFilter(filterType)}
              className={`py-2 px-3 text-xs font-medium rounded-md transition-colors ${
                filter === filterType
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
              }`}
            >
              {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Mark All Read Button */}
      {filteredNotifications.some(n => !n.isRead) && (
        <div className="flex justify-end">
          <button
            onClick={handleMarkAllRead}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            Mark all as read
          </button>
        </div>
      )}

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifications.map((notification) => {
          const NotificationIcon = getNotificationIcon(notification.type);
          const SourceIcon = getSourceIcon(notification.source);

          return (
            <div
              key={notification.id}
              className={`bg-white rounded-lg shadow-sm border-l-4 p-4 ${
                !notification.isRead ? 'bg-blue-50' : ''
              } ${
                notification.type === 'urgent' ? 'border-l-red-500' :
                notification.type === 'warning' ? 'border-l-yellow-500' :
                notification.type === 'info' ? 'border-l-blue-500' :
                notification.type === 'success' ? 'border-l-green-500' : 'border-l-gray-500'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-full ${getNotificationColor(notification.type)}`}>
                    <NotificationIcon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 text-sm">{notification.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                  </div>
                </div>

                {!notification.isRead && (
                  <div className="w-2 h-2 bg-blue-600 rounded-full ml-2"></div>
                )}
              </div>

              <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1">
                    <SourceIcon className="h-3 w-3" />
                    <span className="capitalize">{notification.source}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <ClockIcon className="h-3 w-3" />
                    <span>{notification.timestamp}</span>
                  </div>
                </div>

                {notification.actionRequired && (
                  <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">
                    Action Required
                  </span>
                )}
              </div>

              {notification.relatedEntity && (
                <div className="mb-3 p-2 bg-gray-50 rounded-md">
                  <div className="text-xs text-gray-600">
                    <strong>Related:</strong> {notification.relatedEntity.name}
                  </div>
                </div>
              )}

              <div className="flex space-x-2">
                {!notification.isRead && (
                  <button
                    onClick={() => handleMarkAsRead(notification.id)}
                    className="bg-blue-600 text-white text-xs font-medium py-1 px-3 rounded-md hover:bg-blue-700"
                  >
                    Mark as Read
                  </button>
                )}

                {notification.relatedEntity && (
                  <button
                    onClick={() => toast.success(`Navigating to ${notification.relatedEntity?.name}`)}
                    className="bg-gray-100 text-gray-600 text-xs font-medium py-1 px-3 rounded-md hover:bg-gray-200"
                  >
                    View {notification.relatedEntity.type}
                  </button>
                )}

                {notification.actionRequired && (
                  <button
                    onClick={() => toast.success('Opening action menu')}
                    className="bg-green-600 text-white text-xs font-medium py-1 px-3 rounded-md hover:bg-green-700"
                  >
                    Take Action
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {filteredNotifications.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <BellIcon className="h-12 w-12 mx-auto mb-2 text-gray-300" />
          <p>No notifications found for the selected filter.</p>
        </div>
      )}
    </div>
  );
}