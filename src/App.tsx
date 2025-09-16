import React, { useState, useMemo } from 'react';
import { Search, MapPin, Server, Zap, Shield, Globe, Filter, BarChart3, Building2, GitCompare, TrendingUp } from 'lucide-react';
import Header from './components/Header';
import DataCenterCard from './components/DataCenterCard';
import InteractiveMap from './components/InteractiveMap';
import FilterPanel from './components/FilterPanel';
import DataCenterDetails from './components/DataCenterDetails';
import ComparisonTool from './components/ComparisonTool';
import AdvancedAnalytics from './components/AdvancedAnalytics';
import AdminLogin from './components/AdminLogin';
import AdminPanel from './components/AdminPanel';
import { dataCenters } from './data/dataCenters';
import { DataCenter } from './types/DataCenter';

function App() {
  const [currentDataCenters, setCurrentDataCenters] = useState<DataCenter[]>(dataCenters);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedTier, setSelectedTier] = useState('');
  const [selectedDataCenter, setSelectedDataCenter] = useState<DataCenter | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'map' | 'analytics'>('grid');
  const [showComparison, setShowComparison] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState('');

  const filteredDataCenters = useMemo(() => {
    return currentDataCenters.filter(dc => {
      const matchesSearch = dc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          dc.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          dc.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          dc.country.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesLocation = !selectedLocation || dc.location === selectedLocation;
      const matchesTier = !selectedTier || dc.tier === selectedTier;
      
      return matchesSearch && matchesLocation && matchesTier;
    });
  }, [searchTerm, selectedLocation, selectedTier, currentDataCenters]);

  const locations = [...new Set(currentDataCenters.map(dc => dc.location))];
  const tiers = [...new Set(currentDataCenters.map(dc => dc.tier))];

  const handleAdminLogin = (email: string, password: string) => {
    // Simple authentication - in production, this would be handled by a backend
    if (email === 'admin@datacenter.com' && password === 'admin123') {
      setIsAdminLoggedIn(true);
      setShowAdminLogin(false);
      setLoginError('');
    } else {
      setLoginError('Invalid email or password');
    }
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
  };

  const handleShowAdminLogin = () => {
    setShowAdminLogin(true);
  };

  const handleUpdateDataCenters = (newDataCenters: DataCenter[]) => {
    setCurrentDataCenters(newDataCenters);
  };

  // Show admin panel if logged in
  if (isAdminLoggedIn) {
    return (
      <AdminPanel
        dataCenters={currentDataCenters}
        onUpdateDataCenters={handleUpdateDataCenters}
        onLogout={handleAdminLogout}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onAdminClick={handleShowAdminLogin} />
      
      {selectedDataCenter ? (
        <DataCenterDetails 
          dataCenter={selectedDataCenter} 
          onBack={() => setSelectedDataCenter(null)}
        />
      ) : (
        <>
          {/* Search and Controls Section */}
          <div className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 py-6">
              <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                <div className="flex-1 max-w-2xl">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="text"
                      placeholder="Search data centers by name, location, city..."
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                        ? 'bg-blue-50 border-blue-200 text-blue-700' 
                        : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Filter className="h-4 w-4" />
                    Filters
                  </button>
                  
                  <div className="flex rounded-lg border border-gray-200 overflow-hidden">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`flex items-center gap-2 px-4 py-2 transition-colors ${
                        viewMode === 'grid' 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-white text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <BarChart3 className="h-4 w-4" />
                      Grid
                    </button>
                    <button
                      onClick={() => setViewMode('map')}
                      className={`flex items-center gap-2 px-4 py-2 transition-colors ${
                        viewMode === 'map' 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-white text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <MapPin className="h-4 w-4" />
                      Map
                    </button>
                    <button
                      onClick={() => setViewMode('analytics')}
                      className={`flex items-center gap-2 px-4 py-2 transition-colors ${
                        viewMode === 'analytics' 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-white text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <TrendingUp className="h-4 w-4" />
                      Analytics
                    </button>
                  </div>
                  
                  <button
                    onClick={() => setShowComparison(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
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
                  <h2 className="text-2xl font-bold text-gray-900">
                    Data Centers ({filteredDataCenters.length})
                  </h2>
                  <p className="text-gray-600 mt-1">
                    {searchTerm && `Results for "${searchTerm}"`}
                    {selectedLocation && ` in ${selectedLocation}`}
                    {selectedTier && ` • Tier ${selectedTier}`}
                  </p>
                </div>
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
                <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No data centers found</h3>
                <p className="text-gray-500">Try adjusting your search criteria or filters</p>
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
      
      {showAdminLogin && (
        <AdminLogin
          onLogin={handleAdminLogin}
          onClose={() => {
            setShowAdminLogin(false);
            setLoginError('');
          }}
          error={loginError}
        />
      )}
    </div>
  );
}

export default App;