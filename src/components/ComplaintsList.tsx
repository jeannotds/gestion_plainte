import React from 'react';
import { CheckCircle, Clock } from 'lucide-react';
import ComplaintDetails from './ComplaintDetails';
import ComplaintFilters from './ComplaintFilters';

interface Complaint {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'processed';
  date: string;
  type: string;
  commune?: string;
  subscriber?: string;
}

interface ComplaintsListProps {
  complaints: Complaint[];
}

export default function ComplaintsList({ complaints: initialComplaints }: ComplaintsListProps) {
  const [selectedComplaint, setSelectedComplaint] = React.useState<Complaint | null>(null);
  const [filteredComplaints, setFilteredComplaints] = React.useState(initialComplaints);

  const handleFilterChange = (filters: {
    search: string;
    commune: string;
    startDate: string;
    endDate: string;
    subscriber: string;
  }) => {
    let filtered = initialComplaints;

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(
        complaint =>
          complaint.title.toLowerCase().includes(searchLower) ||
          complaint.description.toLowerCase().includes(searchLower)
      );
    }

    if (filters.commune) {
      filtered = filtered.filter(complaint => complaint.commune === filters.commune);
    }

    if (filters.startDate) {
      filtered = filtered.filter(
        complaint => new Date(complaint.date) >= new Date(filters.startDate)
      );
    }
    if (filters.endDate) {
      filtered = filtered.filter(
        complaint => new Date(complaint.date) <= new Date(filters.endDate)
      );
    }

    if (filters.subscriber) {
      const subscriberLower = filters.subscriber.toLowerCase();
      filtered = filtered.filter(
        complaint => complaint.subscriber?.toLowerCase().includes(subscriberLower)
      );
    }

    setFilteredComplaints(filtered);
  };

  const mockComments = [
    {
      id: '1',
      author: 'Jean Dupont',
      content: 'Ma facture est vraiment trop élevée ce mois-ci.',
      date: '2024-03-15',
      isStaff: false,
    },
    {
      id: '2',
      author: 'Support REGIDESO',
      content: 'Nous avons bien reçu votre plainte. Notre équipe technique va analyser votre consommation.',
      date: '2024-03-16',
      isStaff: true,
    },
  ];

  return (
    <>
      <ComplaintFilters onFilterChange={handleFilterChange} />
      
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <div className="min-w-full">
          {/* Desktop view */}
          <table className="hidden md:table min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Référence
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Titre
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredComplaints.map((complaint) => (
                <tr key={complaint.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    #{complaint.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {complaint.type}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    <div>
                      <p className="font-medium">{complaint.title}</p>
                      <p className="text-gray-500 truncate">{complaint.description}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(complaint.date).toLocaleDateString('fr-FR')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {complaint.status === 'processed' ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Traité
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        <Clock className="h-4 w-4 mr-1" />
                        En attente
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => setSelectedComplaint(complaint)}
                      className="text-blue-800 hover:text-blue-900"
                    >
                      Voir détails
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Mobile view */}
          <div className="md:hidden divide-y divide-gray-200">
            {filteredComplaints.map((complaint) => (
              <div key={complaint.id} className="p-4 hover:bg-gray-50">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <span className="text-sm font-medium text-gray-900">#{complaint.id}</span>
                    <h3 className="text-base font-medium text-gray-900 mt-1">{complaint.title}</h3>
                  </div>
                  {complaint.status === 'processed' ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Traité
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      <Clock className="h-4 w-4 mr-1" />
                      En attente
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-500 mb-2">{complaint.description}</p>
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    {new Date(complaint.date).toLocaleDateString('fr-FR')}
                  </div>
                  <button
                    onClick={() => setSelectedComplaint(complaint)}
                    className="text-sm text-blue-800 hover:text-blue-900 font-medium"
                  >
                    Voir détails
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedComplaint && (
        <ComplaintDetails
          complaint={selectedComplaint}
          comments={mockComments}
          onClose={() => setSelectedComplaint(null)}
        />
      )}
    </>
  );
}