import React from 'react';
import { X, Send } from 'lucide-react';

interface NewComplaintFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NewComplaintForm({ isOpen, onClose }: NewComplaintFormProps) {
  const [formData, setFormData] = React.useState({
    title: '',
    type: '',
    description: '',
    commune: '',
  });

  const types = [
    'Facturation',
    'Qualité de l\'eau',
    'Coupure d\'eau',
    'Fuite',
    'Pression faible',
    'Compteur',
    'Autre'
  ];

  const communes = [
    'Bandalungwa', 'Barumbu', 'Bumbu', 'Gombe', 'Kalamu', 
    'Kasa-Vubu', 'Kimbaseke', 'Kinshasa', 'Kintambo', 'Kisenso',
    'Lemba', 'Limete', 'Lingwala', 'Makala', 'Maluku', 
    'Masina', 'Matete', 'Mont-Ngafula', 'Ndjili', 'Ngaba',
    'Ngaliema', 'Ngiri-Ngiri', 'Nsele', 'Selembao'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement complaint submission
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">Nouvelle Plainte</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Titre de la plainte
              </label>
              <input
                type="text"
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                Type de plainte
              </label>
              <select
                id="type"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              >
                <option value="">Sélectionnez un type</option>
                {types.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="commune" className="block text-sm font-medium text-gray-700">
                Commune
              </label>
              <select
                id="commune"
                value={formData.commune}
                onChange={(e) => setFormData({ ...formData, commune: e.target.value })}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              >
                <option value="">Sélectionnez une commune</option>
                {communes.map((commune) => (
                  <option key={commune} value={commune}>
                    {commune}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description détaillée
              </label>
              <textarea
                id="description"
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-800 rounded-lg hover:bg-blue-700"
            >
              <Send className="h-4 w-4 mr-2" />
              Soumettre
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}