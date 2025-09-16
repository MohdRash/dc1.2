import React, { useState, useMemo } from 'react';
import { Search, MapPin, Server, Zap, Shield, Globe, Filter, BarChart3, Building2, GitCompare, TrendingUp } from 'lucide-react';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Header from './components/Header';
import DataCenterCard from './components/DataCenterCard';
import InteractiveMap from './components/InteractiveMap';
import FilterPanel from './components/FilterPanel';
import DataCenterDetails from './components/DataCenterDetails';
import ComparisonTool from './components/ComparisonTool';
import AdvancedAnalytics from './components/AdvancedAnalytics';
import AdminPanel from './components/AdminPanel';
import AuthModal from './components/AuthModal';
import UserManagement from './components/UserManagement';
import { dataCenters } from './data/dataCenters';
import { DataCenter } from './types/DataCenter';
import { mockUsers } from './contexts/AuthContext';

function AppContent() {
  const { isDark } = useTheme();
  const { user } = useAuth();
  const [currentDataCenters, setCurrentDataCenters] = useState<DataCenter[]>(dataCenters);
  const [currentUsers, setCurrentUsers] = useState(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedTier, setSelectedTier] = useState('');
  const [selectedDataCenter, setSelectedDataCenter] = useState<DataCenter | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'map' | 'analytics'>('grid');
  const [showComparison, setShowComparison] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [showAllDataCenters, setShowAllDataCenters] = useState(false);

  // Prioritize data centers based on user location
  const prioritizedDataCenters = useMemo(() => {
    if (!user || showAllDataCenters) {
      return currentDataCenters;
    }

    const userCountryDCs = currentDataCenters.filter(dc => 
      dc.country.toLowerCase() === user.country.toLowerCase()
    );
    const otherDCs = currentDataCenters.filter(dc => 
      dc.country.toLowerCase() !== user.country.toLowerCase()
    );

    return [...userCountryDCs, ...otherDCs];
  }, [currentDataCenters, user, showAllDataCenters]);

  const filteredDataCenters = useMemo(() => {
    return prioritizedDataCenters.filter(dc => {
      const matchesSearch = dc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          dc.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          dc.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          dc.country.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesLocation = !selectedLocation || dc.location === selectedLocation;
      const matchesTier = !selectedTier || dc.tier === selectedTier;
      
      return matchesSearch && matchesLocation && matchesTier;
    });
  }, [searchTerm, selectedLocation, selectedTier, prioritizedDataCenters]);

  const locations = [...new Set(prioritizedDataCenters.map(dc => dc.location))];
  const tiers = [...new Set(prioritizedDataCenters.map(dc => dc.tier))];

  const handleAuthClick = () => {
    if (user?.role === 'admin') {
      setShowAdminPanel(true);
    } else {
      setShowAuthModal(true);
    }
  };

  const handleUpdateDataCenters = (newDataCenters: DataCenter[]) => {
    setCurrentDataCenters(newDataCenters);
  };

  const handleUpdateUsers = (newUsers: typeof mockUsers) => {
    setCurrentUsers(newUsers);
  };

  // Get user's country data centers count
  const userCountryDCCount = user ? currentDataCenters.filter(dc => 
    dc.country.toLowerCase() === user.country.toLowerCase()
  ).length : 0;

  // Show admin panel if logged in
  if (showAdminPanel && user?.role === 'admin') {
    return (
      <AdminPanel
        dataCenters={currentDataCenters}
        users={currentUsers}
        onUpdateDataCenters={handleUpdateDataCenters}
        onUpdateUsers={handleUpdateUsers}
        onClose={() => setShowAdminPanel(false)}
      />
    );
  }

  return (
    <div className={`min-h-screen transition-colors ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Header onAuthClick={handleAuthClick} />
      
      {selectedDataCenter ? (
        <DataCenterDetails 
          dataCenter={selectedDataCenter} 
          onBack={() => setSelectedDataCenter(null)}
        />
      ) : (
        <>
          {/* Search and Controls Section */}
          <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} shadow-sm border-b transition-colors`}>
            <div className="max-w-7xl mx-auto px-4 py-6">
              <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                <div className="flex-1 max-w-2xl">
                  <div className="relative">
                    <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 ${isDark ? 'text-gray-400' : 'text-gray-400'}`} />
                    <input
                      type="text"
                      placeholder="Search data centers by name, location, city..."
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                        isDark 
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                          : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500'
                      }`}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                      showFilters 
                        ? (isDark ? 'bg-blue-900/20 border-blue-700 text-blue-400' : 'bg-blue-50 border-blue-200 text-blue-700')
                        : (isDark ? 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50')
                    }`}
                  >
                    <Filter className="h-4 w-4" />
                    Filters
                  </button>
                  
                  <div className={`flex rounded-lg border overflow-hidden ${isDark ? 'border-gray-600' : 'border-gray-200'}`}>
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`flex items-center gap-2 px-4 py-2 transition-colors ${
                        viewMode === 'grid' 
                          ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' 
                          : (isDark ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-white text-gray-600 hover:bg-gray-50')
                      }`}
                    >
                      <BarChart3 className="h-4 w-4" />
                      Grid
                    </button>
                    <button
                      onClick={() => setViewMode('map')}
                      className={`flex items-center gap-2 px-4 py-2 transition-colors ${
                        viewMode === 'map' 
                          ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' 
                          : (isDark ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-white text-gray-600 hover:bg-gray-50')
                      }`}
                    >
                      <MapPin className="h-4 w-4" />
                      Map
                    </button>
                    <button
                      onClick={() => setViewMode('analytics')}
                      className={`flex items-center gap-2 px-4 py-2 transition-colors ${
                        viewMode === 'analytics' 
                          ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' 
                          : (isDark ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-white text-gray-600 hover:bg-gray-50')
                      }`}
                    >
                      <TrendingUp className="h-4 w-4" />
                      Analytics
                    </button>
                  </div>
                  
                  <button
                    onClick={() => setShowComparison(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-200"
                  >
                    <GitCompare className="h-4 w-4" />
                    Compare
                  </button>
                </div>
              </div>
              
              {showFilters && (
                <FilterPanel
                  locations={locations}
                  tiers={tiers}
                  selectedLocation={selectedLocation}
                  selectedTier={selectedTier}
                  onLocationChange={setSelectedLocation}
                  onTierChange={setSelectedTier}
                  onReset={() => {
                    setSelectedLocation('');
                    setSelectedTier('');
                  }}
                />
              )}
            </div>
          </div>

          {/* Results Section */}
          <div className="max-w-7xl mx-auto px-4 py-8">
            {viewMode !== 'analytics' && (
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Data Centers ({filteredDataCenters.length})
                  </h2>
                  <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mt-1`}>
                    {user && userCountryDCCount > 0 && !showAllDataCenters && (
                      <span className="text-blue-500 font-medium">
                        Showing {userCountryDCCount} data centers in {user.country} first • 
                      </span>
                    )}
                    {searchTerm && ` Results for "${searchTerm}"`}
                    {selectedLocation && ` in ${selectedLocation}`}
                    {selectedTier && ` • Tier ${selectedTier}`}
                  </p>
                </div>
                {user && userCountryDCCount > 0 && !showAllDataCenters && (
                  <button
                    onClick={() => setShowAllDataCenters(true)}
                    className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 font-medium"
                  >
                    Show All Data Centers
                  </button>
                )}
              </div>
            )}

            {viewMode === 'analytics' ? (
              <AdvancedAnalytics dataCenters={currentDataCenters} />
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredDataCenters.map((dataCenter) => (
                  <DataCenterCard
                    key={dataCenter.id}
                    dataCenter={dataCenter}
                    onClick={() => setSelectedDataCenter(dataCenter)}
                  />
                ))}
              </div>
            ) : (
              <InteractiveMap 
                dataCenters={filteredDataCenters}
                onDataCenterClick={setSelectedDataCenter}
                selectedDataCenter={selectedDataCenter}
              />
            )}

            {filteredDataCenters.length === 0 && (
              <div className="text-center py-12">
                <Building2 className={`h-12 w-12 mx-auto mb-4 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                <h3 className={`text-lg font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>No data centers found</h3>
                <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Try adjusting your search criteria or filters</p>
              </div>
            )}
          </div>
        </>
      )}
      
      {showComparison && (
        <ComparisonTool
          dataCenters={currentDataCenters}
          onClose={() => setShowComparison(false)}
        />
      )}
      
      {showAuthModal && (
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
        />
      )}
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;