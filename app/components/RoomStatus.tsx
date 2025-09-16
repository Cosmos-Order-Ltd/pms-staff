'use client';

import React, { useState } from 'react';
import toast from 'react-hot-toast';
import {
  HomeIcon,
  UserIcon,
  ClockIcon,
  WrenchScrewdriverIcon,
  SparklesIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

interface Room {
  id: string;
  number: string;
  floor: number;
  type: 'standard' | 'deluxe' | 'suite' | 'villa';
  status: 'occupied' | 'vacant_clean' | 'vacant_dirty' | 'out_of_order' | 'maintenance';
  guestName?: string;
  checkIn?: string;
  checkOut?: string;
  housekeepingStatus: 'pending' | 'in_progress' | 'completed';
  maintenanceIssues: string[];
  lastCleaned?: string;
  notes?: string;
}

export function RoomStatus() {
  const [selectedFloor, setSelectedFloor] = useState<number | 'all'>('all');
  const [rooms, setRooms] = useState<Room[]>([
    {
      id: 'room-304',
      number: '304',
      floor: 3,
      type: 'deluxe',
      status: 'occupied',
      guestName: 'John & Mary Smith',
      checkIn: '2025-01-15',
      checkOut: '2025-01-18',
      housekeepingStatus: 'completed',
      maintenanceIssues: ['AC not cooling properly'],
      lastCleaned: '2025-01-16 10:30'
    },
    {
      id: 'room-305',
      number: '305',
      floor: 3,
      type: 'standard',
      status: 'vacant_dirty',
      housekeepingStatus: 'pending',
      maintenanceIssues: [],
      notes: 'Guest checked out at 11:00 AM'
    },
    {
      id: 'room-508',
      number: '508',
      floor: 5,
      type: 'suite',
      status: 'vacant_clean',
      housekeepingStatus: 'completed',
      maintenanceIssues: [],
      lastCleaned: '2025-01-16 14:15',
      notes: 'VIP arrival at 16:00'
    },
    {
      id: 'room-201',
      number: '201',
      floor: 2,
      type: 'suite',
      status: 'occupied',
      guestName: 'David & Sarah Johnson',
      checkIn: '2025-01-16',
      checkOut: '2025-01-20',
      housekeepingStatus: 'completed',
      maintenanceIssues: [],
      lastCleaned: '2025-01-16 15:45',
      notes: 'Honeymoon suite - special amenities delivered'
    },
    {
      id: 'room-412',
      number: '412',
      floor: 4,
      type: 'standard',
      status: 'occupied',
      guestName: 'Elena Rodriguez',
      checkIn: '2025-01-15',
      checkOut: '2025-01-17',
      housekeepingStatus: 'completed',
      maintenanceIssues: [],
      lastCleaned: '2025-01-16 09:15',
      notes: 'Noise complaint logged - monitoring situation'
    },
    {
      id: 'room-101',
      number: '101',
      floor: 1,
      type: 'standard',
      status: 'out_of_order',
      housekeepingStatus: 'pending',
      maintenanceIssues: ['Plumbing leak', 'Carpet needs replacement'],
      notes: 'Major maintenance required - estimated 3 days'
    }
  ]);

  const floors = [1, 2, 3, 4, 5];
  const filteredRooms = selectedFloor === 'all'
    ? rooms
    : rooms.filter(room => room.floor === selectedFloor);

  const handleStatusChange = (roomId: string, newStatus: Room['status']) => {
    setRooms(prevRooms =>
      prevRooms.map(room =>
        room.id === roomId ? { ...room, status: newStatus } : room
      )
    );

    const room = rooms.find(r => r.id === roomId);
    if (room) {
      toast.success(`Room ${room.number} status updated to ${newStatus.replace('_', ' ')}`);
    }
  };

  const handleHousekeepingUpdate = (roomId: string, status: Room['housekeepingStatus']) => {
    setRooms(prevRooms =>
      prevRooms.map(room =>
        room.id === roomId ? {
          ...room,
          housekeepingStatus: status,
          lastCleaned: status === 'completed' ? new Date().toISOString().slice(0, 16).replace('T', ' ') : room.lastCleaned
        } : room
      )
    );

    const room = rooms.find(r => r.id === roomId);
    if (room) {
      toast.success(`Room ${room.number} housekeeping marked as ${status.replace('_', ' ')}`);
    }
  };

  const getRoomStatusColor = (status: Room['status']) => {
    switch (status) {
      case 'occupied':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'vacant_clean':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'vacant_dirty':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'out_of_order':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'maintenance':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getHousekeepingStatusColor = (status: Room['housekeepingStatus']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoomTypeIcon = (type: Room['type']) => {
    switch (type) {
      case 'suite':
      case 'villa':
        return '👑';
      case 'deluxe':
        return '⭐';
      default:
        return '🏠';
    }
  };

  return (
    <div className="space-y-4">
      {/* Floor Filter */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3">
        <div className="flex items-center space-x-2 overflow-x-auto">
          <button
            onClick={() => setSelectedFloor('all')}
            className={`py-2 px-4 text-sm font-medium rounded-md whitespace-nowrap ${
              selectedFloor === 'all'
                ? 'bg-blue-600 text-white'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
            }`}
          >
            All Floors
          </button>
          {floors.map((floor) => (
            <button
              key={floor}
              onClick={() => setSelectedFloor(floor)}
              className={`py-2 px-4 text-sm font-medium rounded-md whitespace-nowrap ${
                selectedFloor === floor
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
              }`}
            >
              Floor {floor}
            </button>
          ))}
        </div>
      </div>

      {/* Rooms Grid */}
      <div className="space-y-3">
        {filteredRooms.map((room) => (
          <div
            key={room.id}
            className={`bg-white rounded-lg shadow-sm border-l-4 p-4 ${
              room.status === 'occupied' ? 'border-l-red-500' :
              room.status === 'vacant_clean' ? 'border-l-green-500' :
              room.status === 'vacant_dirty' ? 'border-l-yellow-500' :
              room.status === 'out_of_order' ? 'border-l-gray-500' : 'border-l-orange-500'
            }`}
          >
            {/* Room Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <div className="text-lg">
                  {getRoomTypeIcon(room.type)}
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-900">Room {room.number}</h3>
                  <p className="text-xs text-gray-500 capitalize">{room.type.replace('_', ' ')} • Floor {room.floor}</p>
                </div>
              </div>

              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getRoomStatusColor(room.status)}`}>
                {room.status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </span>
            </div>

            {/* Guest Info */}
            {room.guestName && (
              <div className="mb-3 p-2 bg-blue-50 rounded-md">
                <div className="flex items-center space-x-2 text-sm">
                  <UserIcon className="h-4 w-4 text-blue-600" />
                  <span className="font-medium text-blue-900">{room.guestName}</span>
                </div>
                {room.checkIn && room.checkOut && (
                  <div className="text-xs text-blue-700 mt-1">
                    Check-in: {room.checkIn} • Check-out: {room.checkOut}
                  </div>
                )}
              </div>
            )}

            {/* Housekeeping Status */}
            <div className="mb-3">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <SparklesIcon className="h-4 w-4 text-gray-600" />
                  <span className="text-sm font-medium text-gray-700">Housekeeping</span>
                </div>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getHousekeepingStatusColor(room.housekeepingStatus)}`}>
                  {room.housekeepingStatus.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </span>
              </div>

              {room.lastCleaned && (
                <p className="text-xs text-gray-500">
                  Last cleaned: {room.lastCleaned}
                </p>
              )}
            </div>

            {/* Maintenance Issues */}
            {room.maintenanceIssues.length > 0 && (
              <div className="mb-3">
                <div className="flex items-center space-x-2 mb-2">
                  <WrenchScrewdriverIcon className="h-4 w-4 text-orange-600" />
                  <span className="text-sm font-medium text-orange-700">Maintenance Issues</span>
                </div>
                <ul className="space-y-1">
                  {room.maintenanceIssues.map((issue, index) => (
                    <li key={index} className="text-xs text-orange-600 bg-orange-50 p-2 rounded">
                      • {issue}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Notes */}
            {room.notes && (
              <div className="mb-3 p-2 bg-gray-50 rounded-md">
                <p className="text-xs text-gray-600">
                  <strong>Notes:</strong> {room.notes}
                </p>
              </div>
            )}

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-2">
              {room.housekeepingStatus !== 'completed' && (
                <button
                  onClick={() => handleHousekeepingUpdate(room.id,
                    room.housekeepingStatus === 'pending' ? 'in_progress' : 'completed')}
                  className="bg-blue-600 text-white text-xs font-medium py-2 px-3 rounded-md hover:bg-blue-700"
                >
                  {room.housekeepingStatus === 'pending' ? 'Start Cleaning' : 'Mark Clean'}
                </button>
              )}

              <button
                onClick={() => toast.success(`Viewing details for Room ${room.number}`)}
                className="bg-gray-100 text-gray-600 text-xs font-medium py-2 px-3 rounded-md hover:bg-gray-200"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredRooms.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <HomeIcon className="h-12 w-12 mx-auto mb-2 text-gray-300" />
          <p>No rooms found for the selected floor.</p>
        </div>
      )}
    </div>
  );
}