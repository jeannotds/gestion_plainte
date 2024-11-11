import React from 'react';
import { X, Send, Clock, CheckCircle } from 'lucide-react';

interface Comment {
  id: string;
  author: string;
  content: string;
  date: string;
  isStaff: boolean;
}

interface ComplaintDetailsProps {
  complaint: {
    id: string;
    title: string;
    description: string;
    status: 'pending' | 'processed';
    date: string;
    type: string;
  };
  comments: Comment[];
  onClose: () => void;
}

export default function ComplaintDetails({ complaint, comments, onClose }: ComplaintDetailsProps) {
  const [newComment, setNewComment] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement comment submission
    setNewComment('');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Détails de la Plainte #{complaint.id}</h2>
            <p className="text-sm text-gray-500 mt-1">{complaint.type}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Description</h3>
              <p className="mt-2 text-gray-600">{complaint.description}</p>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-gray-400" />
                <span className="text-sm text-gray-500">
                  Soumis le {new Date(complaint.date).toLocaleDateString('fr-FR')}
                </span>
              </div>
              <div className="flex items-center space-x-2">
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
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Commentaires</h3>
            <div className="space-y-4">
              {comments.map((comment) => (
                <div
                  key={comment.id}
                  className={`p-4 rounded-lg ${
                    comment.isStaff ? 'bg-blue-50 ml-4' : 'bg-gray-50'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-gray-900">{comment.author}</span>
                      {comment.isStaff && (
                        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                          Staff
                        </span>
                      )}
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(comment.date).toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                  <p className="mt-2 text-gray-600">{comment.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200">
          <form onSubmit={handleSubmit} className="flex space-x-4">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Ajouter un commentaire..."
              className="flex-1 min-w-0 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-800 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Send className="h-4 w-4 mr-2" />
              Envoyer
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}