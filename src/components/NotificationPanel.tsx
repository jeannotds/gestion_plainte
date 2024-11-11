import React from 'react';
import { Bell, X, MessageSquare, AlertCircle } from 'lucide-react';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'complaint' | 'response' | 'alert';
  date: string;
  read: boolean;
}

export default function NotificationPanel({ 
  isOpen, 
  onClose 
}: { 
  isOpen: boolean; 
  onClose: () => void;
}) {
  const [notifications, setNotifications] = React.useState<Notification[]>([
    {
      id: '1',
      title: 'Nouvelle réponse',
      message: 'Le service technique a répondu à votre plainte #123',
      type: 'response',
      date: '2024-03-15T10:30:00',
      read: false
    },
    {
      id: '2',
      title: 'Plainte traitée',
      message: 'Votre plainte #456 concernant la facturation a été traitée',
      type: 'complaint',
      date: '2024-03-14T15:45:00',
      read: false
    }
  ]);

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  if (!isOpen) return null;

  const getIcon = (type: string) => {
    switch (type) {
      case 'complaint':
        return <MessageSquare className="h-5 w-5 text-blue-800" />;
      case 'response':
        return <Bell className="h-5 w-5 text-green-600" />;
      default:
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
    }
  };

  return (
    <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-lg z-50">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
        <button 
          onClick={onClose}
          className="p-1 hover:bg-gray-100 rounded-full"
        >
          <X className="h-5 w-5 text-gray-500" />
        </button>
      </div>
      
      <div className="max-h-[400px] overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            Aucune notification
          </div>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                !notification.read ? 'bg-blue-50' : ''
              }`}
              onClick={() => markAsRead(notification.id)}
            >
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-white rounded-full shadow-sm">
                  {getIcon(notification.type)}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{notification.title}</p>
                  <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(notification.date).toLocaleDateString('fr-FR', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
                {!notification.read && (
                  <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
      
      {notifications.length > 0 && (
        <div className="p-4 border-t border-gray-200">
          <button 
            className="w-full text-center text-sm text-blue-800 hover:text-blue-900 font-medium"
            onClick={() => setNotifications(notifications.map(n => ({ ...n, read: true })))}
          >
            Tout marquer comme lu
          </button>
        </div>
      )}
    </div>
  );
}