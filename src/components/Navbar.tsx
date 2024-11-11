import React from 'react';
import { Bell, User, LogOut } from 'lucide-react';
import NotificationPanel from './NotificationPanel';
import { useAuth } from '../contexts/AuthContext';
import LoginForm from './LoginForm';

export default function Navbar() {
  const [isNotificationOpen, setIsNotificationOpen] = React.useState(false);
  const [isLoginOpen, setIsLoginOpen] = React.useState(false);
  const notificationRef = React.useRef<HTMLDivElement>(null);
  const { user, logout, isAuthenticated } = useAuth();

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setIsNotificationOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <nav className="fixed w-full bg-white border-b border-gray-200 z-50">
        <div className="px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <img 
                src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?ixlib=rb-4.0.3&auto=format&fit=crop&w=40&h=40&q=80" 
                alt="REGIDESO Logo" 
                className="h-8 w-8 rounded"
              />
              <h1 className="text-xl font-bold text-blue-800 ml-3">REGIDESO</h1>
            </div>

            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <>
                  <div className="relative" ref={notificationRef}>
                    <button 
                      className="p-2 text-gray-600 hover:text-gray-900 relative"
                      onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                    >
                      <Bell className="h-5 w-5" />
                      <span className="absolute top-0 right-0 h-4 w-4 bg-blue-800 text-white rounded-full text-xs flex items-center justify-center">
                        2
                      </span>
                    </button>
                    <NotificationPanel 
                      isOpen={isNotificationOpen}
                      onClose={() => setIsNotificationOpen(false)}
                    />
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-sm font-medium text-gray-900">{user?.name}</span>
                    <button 
                      onClick={logout}
                      className="p-2 text-gray-600 hover:text-gray-900"
                      title="Se déconnecter"
                    >
                      <LogOut className="h-5 w-5" />
                    </button>
                  </div>
                </>
              ) : (
                <button
                  onClick={() => setIsLoginOpen(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-800 hover:bg-blue-700"
                >
                  <User className="h-4 w-4 mr-2" />
                  Se connecter
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      <LoginForm 
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
      />
    </>
  );
}