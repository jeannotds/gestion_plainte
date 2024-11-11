import React from 'react';
import { FileText, CheckCircle, Clock, AlertCircle } from 'lucide-react';

export default function DashboardStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center">
          <div className="p-3 rounded-full bg-blue-100 text-blue-800">
            <FileText className="h-6 w-6" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Total Plaintes</p>
            <p className="text-2xl font-semibold text-gray-900">24</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center">
          <div className="p-3 rounded-full bg-green-100 text-green-800">
            <CheckCircle className="h-6 w-6" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Plaintes Traitées</p>
            <p className="text-2xl font-semibold text-gray-900">16</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center">
          <div className="p-3 rounded-full bg-yellow-100 text-yellow-800">
            <Clock className="h-6 w-6" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">En Attente</p>
            <p className="text-2xl font-semibold text-gray-900">5</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center">
          <div className="p-3 rounded-full bg-red-100 text-red-800">
            <AlertCircle className="h-6 w-6" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Urgentes</p>
            <p className="text-2xl font-semibold text-gray-900">3</p>
          </div>
        </div>
      </div>
    </div>
  );
}