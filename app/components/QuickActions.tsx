'use client';

import React from 'react';
import toast from 'react-hot-toast';
import {
  QrCodeIcon,
  CameraIcon,
  PhoneIcon,
  ExclamationTriangleIcon,
  ClipboardDocumentIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';

interface QuickAction {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  action: () => void;
}

export function QuickActions() {
  const quickActions: QuickAction[] = [
    {
      id: 'scan_qr',
      name: 'Scan QR',
      description: 'Room or asset QR code',
      icon: QrCodeIcon,
      color: 'bg-blue-100 text-blue-800 hover:bg-blue-200',
      action: () => {
        toast.success('QR Scanner opened');
        // In a real app, this would open the camera for QR scanning
      }
    },
    {
      id: 'take_photo',
      name: 'Photo',
      description: 'Document issue or completion',
      icon: CameraIcon,
      color: 'bg-green-100 text-green-800 hover:bg-green-200',
      action: () => {
        toast.success('Camera opened');
        // In a real app, this would open the camera for photo capture
      }
    },
    {
      id: 'call_manager',
      name: 'Call Manager',
      description: 'Quick emergency contact',
      icon: PhoneIcon,
      color: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200',
      action: () => {
        toast.success('Calling Manager...');
        // In a real app, this would initiate a phone call
      }
    },
    {
      id: 'report_issue',
      name: 'Report Issue',
      description: 'Emergency or urgent matter',
      icon: ExclamationTriangleIcon,
      color: 'bg-red-100 text-red-800 hover:bg-red-200',
      action: () => {
        toast.success('Issue reporting form opened');
        // In a real app, this would open an issue reporting form
      }
    },
    {
      id: 'inventory',
      name: 'Inventory',
      description: 'Check supplies and equipment',
      icon: ClipboardDocumentIcon,
      color: 'bg-purple-100 text-purple-800 hover:bg-purple-200',
      action: () => {
        toast.success('Inventory system opened');
        // In a real app, this would open inventory management
      }
    },
    {
      id: 'staff_directory',
      name: 'Staff',
      description: 'Contact colleagues',
      icon: UserGroupIcon,
      color: 'bg-indigo-100 text-indigo-800 hover:bg-indigo-200',
      action: () => {
        toast.success('Staff directory opened');
        // In a real app, this would open staff contact directory
      }
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>

      <div className="grid grid-cols-3 gap-3">
        {quickActions.map((action) => (
          <button
            key={action.id}
            onClick={action.action}
            className={`p-4 rounded-lg border border-gray-200 transition-all duration-200 hover:shadow-md active:scale-95 ${action.color}`}
          >
            <div className="flex flex-col items-center space-y-2">
              <action.icon className="h-6 w-6" />
              <div className="text-center">
                <div className="text-xs font-semibold">{action.name}</div>
                <div className="text-xs opacity-75 mt-1">{action.description}</div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Emergency Actions */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Emergency Actions</h4>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => {
              if (confirm('Are you sure you want to trigger a maintenance emergency alert?')) {
                toast.error('Emergency maintenance alert sent!');
              }
            }}
            className="bg-red-600 text-white text-xs font-semibold py-2 px-3 rounded-md hover:bg-red-700 transition-colors"
          >
            🚨 Maintenance Emergency
          </button>
          <button
            onClick={() => {
              if (confirm('Are you sure you want to trigger a security alert?')) {
                toast.error('Security alert sent!');
              }
            }}
            className="bg-orange-600 text-white text-xs font-semibold py-2 px-3 rounded-md hover:bg-orange-700 transition-colors"
          >
            🔒 Security Alert
          </button>
        </div>
      </div>

      {/* Status Indicators */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="grid grid-cols-3 gap-3 text-center">
          <div>
            <div className="text-lg font-bold text-green-600">✓</div>
            <div className="text-xs text-gray-500">Systems OK</div>
          </div>
          <div>
            <div className="text-lg font-bold text-blue-600">📶</div>
            <div className="text-xs text-gray-500">Online</div>
          </div>
          <div>
            <div className="text-lg font-bold text-yellow-600">⚡</div>
            <div className="text-xs text-gray-500">Sync Active</div>
          </div>
        </div>
      </div>
    </div>
  );
}