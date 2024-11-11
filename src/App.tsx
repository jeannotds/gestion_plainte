import React from 'react';
import Navbar from './components/Navbar';
import DashboardStats from './components/DashboardStats';
import ComplaintsList from './components/ComplaintsList';
import NewComplaintForm from './components/NewComplaintForm';
import LoginForm from './components/LoginForm';
import { LayoutDashboard, FileText, Users, CheckCircle, XCircle, Menu } from 'lucide-react';
import { useAuth } from './contexts/AuthContext';

function App() {
  const [activeTab, setActiveTab] = React.useState('dashboard');
  const [isNewComplaintOpen, setIsNewComplaintOpen] = React.useState(false);
  const [isLoginOpen, setIsLoginOpen] = React.useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const { isAuthenticated } = useAuth();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleNewComplaintClick = () => {
    if (!isAuthenticated) {
      setIsLoginOpen(true);
    } else {
      setIsNewComplaintOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="flex">
        {/* Mobile Menu Button */}
        <button
          onClick={toggleSidebar}
          className="fixed z-50 p-4 text-white bg-blue-800 rounded-full shadow-lg lg:hidden bottom-4 right-4 hover:bg-blue-700"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Sidebar */}
        <aside
          className={`
            fixed lg:sticky top-0 left-0 h-full w-64 bg-blue-800 lg:h-[100vh]
            transform lg:transform-none transition-transform duration-200 ease-in-out
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            z-30 pt-16
          `}
        >
          <div className="p-4">
            <nav className="space-y-2">
              <button
                onClick={() => {
                  setActiveTab('dashboard');
                  setIsSidebarOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'dashboard' ? 'bg-white text-blue-800' : 'text-white hover:bg-blue-700'
                  }`}
              >
                <LayoutDashboard className="w-5 h-5" />
                <span>Tableau de Bord</span>
              </button>
              <button
                onClick={() => {
                  setActiveTab('my-complaints');
                  setIsSidebarOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'my-complaints' ? 'bg-white text-blue-800' : 'text-white hover:bg-blue-700'
                  }`}
              >
                <FileText className="w-5 h-5" />
                <span>Mes Plaintes</span>
              </button>
              <button
                onClick={() => {
                  setActiveTab('all-complaints');
                  setIsSidebarOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'all-complaints' ? 'bg-white text-blue-800' : 'text-white hover:bg-blue-700'
                  }`}
              >
                <Users className="w-5 h-5" />
                <span>Toutes les Plaintes</span>
              </button>
              <button
                onClick={() => {
                  setActiveTab('processed');
                  setIsSidebarOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'processed' ? 'bg-white text-blue-800' : 'text-white hover:bg-blue-700'
                  }`}
              >
                <CheckCircle className="w-5 h-5" />
                <span>Plaintes Traitées</span>
              </button>
              <button
                onClick={() => {
                  setActiveTab('pending');
                  setIsSidebarOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'pending' ? 'bg-white text-blue-800' : 'text-white hover:bg-blue-700'
                  }`}
              >
                <XCircle className="w-5 h-5" />
                <span>Plaintes Non Traitées</span>
              </button>
            </nav>
          </div>
        </aside>

        {/* Overlay for mobile sidebar */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 min-h-screen p-4 pt-20 lg:p-8 lg:pt-24">
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">Tableau de Bord</h1>
                <button
                  onClick={handleNewComplaintClick}
                  className="px-4 py-2 text-white transition-colors bg-blue-800 rounded-lg hover:bg-blue-700"
                >
                  Nouvelle Plainte
                </button>
              </div>
              <DashboardStats />
              <div className="p-6 bg-white rounded-lg shadow">
                <h2 className="mb-4 text-lg font-semibold text-gray-900">Plaintes Récentes</h2>
                <ComplaintsList
                  complaints={[
                    {
                      id: '1',
                      title: 'Problème de Facturation',
                      description: 'Facture anormalement élevée pour le mois de Mars',
                      status: 'pending',
                      date: '2024-03-15',
                      type: 'Facturation'
                    },
                    {
                      id: '2',
                      title: 'Coupure d\'eau prolongée',
                      description: 'Pas d\'eau depuis 3 jours dans le quartier',
                      status: 'processed',
                      date: '2024-03-14',
                      type: 'Service'
                    }
                  ]}
                />
              </div>
            </div>
          )}

          {(activeTab === 'my-complaints' || activeTab === 'all-complaints' || activeTab === 'processed' || activeTab === 'pending') && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">
                  {activeTab === 'my-complaints' && 'Mes Plaintes'}
                  {activeTab === 'all-complaints' && 'Toutes les Plaintes'}
                  {activeTab === 'processed' && 'Plaintes Traitées'}
                  {activeTab === 'pending' && 'Plaintes Non Traitées'}
                </h1>
                <button
                  onClick={handleNewComplaintClick}
                  className="px-4 py-2 text-white transition-colors bg-blue-800 rounded-lg hover:bg-blue-700"
                >
                  Nouvelle Plainte
                </button>
              </div>
              <ComplaintsList
                complaints={[
                  {
                    id: '1',
                    title: 'Problème de Facturation',
                    description: 'Facture anormalement élevée pour le mois de Mars',
                    status: 'pending',
                    date: '2024-03-15',
                    type: 'Facturation'
                  },
                  {
                    id: '2',
                    title: 'Coupure d\'eau prolongée',
                    description: 'Pas d\'eau depuis 3 jours dans le quartier',
                    status: 'processed',
                    date: '2024-03-14',
                    type: 'Service'
                  }
                ].filter(complaint => {
                  if (activeTab === 'processed') return complaint.status === 'processed';
                  if (activeTab === 'pending') return complaint.status === 'pending';
                  return true;
                })}
              />
            </div>
          )}
        </main>
      </div>

      <NewComplaintForm
        isOpen={isNewComplaintOpen}
        onClose={() => setIsNewComplaintOpen(false)}
      />

      <LoginForm
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onSuccess={() => setIsNewComplaintOpen(true)}
      />
    </div>
  );
}

export default App;