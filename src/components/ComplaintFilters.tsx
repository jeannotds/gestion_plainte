import React from 'react';
import { Search, Calendar, MapPin, User } from 'lucide-react';

export default function ComplaintFilters({ onFilterChange }: { 
  onFilterChange: (filters: {
    search: string;
    commune: string;
    startDate: string;
    endDate: string;
    subscriber: string;
  }) => void 
}) {
  const [filters, setFilters] = React.useState({
    search: '',
    commune: '',
    startDate: '',
    endDate: '',
    subscriber: ''
  });

  const communes = [
    'Bandalungwa', 'Barumbu', 'Bumbu', 'Gombe', 'Kalamu', 
    'Kasa-Vubu', 'Kimbaseke', 'Kinshasa', 'Kintambo', 'Kisenso',
    'Lemba', 'Limete', 'Lingwala', 'Makala', 'Maluku', 
    'Masina', 'Matete', 'Mont-Ngafula', 'Ndjili', 'Ngaba',
    'Ngaliema', 'Ngiri-Ngiri', 'Nsele', 'Selembao'
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 lg:p-6 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            name="search"
            value={filters.search}
            onChange={handleChange}
            placeholder="Rechercher..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MapPin className="h-5 w-5 text-gray-400" />
          </div>
          <select
            name="commune"
            value={filters.commune}
            onChange={handleChange}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Toutes les communes</option>
            {communes.map((commune) => (
              <option key={commune} value={commune}>
                {commune}
              </option>
            ))}
          </select>
        </div>

        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Calendar className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="date"
            name="startDate"
            value={filters.startDate}
            onChange={handleChange}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Calendar className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="date"
            name="endDate"
            value={filters.endDate}
            onChange={handleChange}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <User className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            name="subscriber"
            value={filters.subscriber}
            onChange={handleChange}
            placeholder="Nom de l'abonné"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
    </div>
  );
}