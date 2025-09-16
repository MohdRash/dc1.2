import React, { useState } from 'react';
import { 
  LogOut, 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  X, 
  Database,
  BarChart3,
  Users,
  Settings,
  Activity,
  Building2,
  MapPin,
  Server,
  Zap,
  Shield,
  ArrowLeft
} from 'lucide-react';
import { DataCenter } from '../types/DataCenter';
import { User } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import UserManagement from './UserManagement';

interface AdminPanelProps {
  dataCenters: DataCenter[];
  users: User[];
  onUpdateDataCenters: (dataCenters: DataCenter[]) => void;
  onUpdateUsers: (users: User[]) => void;
  onClose: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ 
  dataCenters, 
  users, 
  onUpdateDataCenters, 
  onUpdateUsers, 
  onClose 
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'datacenters' | 'users' | 'monitoring' | 'settings'>('overview');
  const [editingDataCenter, setEditingDataCenter] = useState<DataCenter | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { isDark } = useTheme();

  const filteredDataCenters = dataCenters.filter(dc =>
    dc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dc.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateDataCenter = () => {
    const newDataCenter: DataCenter = {
      id: Date.now().toString(),
      name: 'New Data Center',
      location: 'New Location',
      city: 'New City',
      country: 'New Country',
      coordinates: { lat: 0, lng: 0 },
      tier: 'Tier 3',
      description: 'New data center description',
      website: 'https://example.com',
      established: '2024',
      operator: 'New Operator',
      specifications: {
        totalSpace: '100,000 sq ft',
        power: '20 MW',
        cooling: 'N+1 Redundant',
        floors: 5,
        rackCount: 1000,
        powerDensity: '10 kW/rack'
      },
      capacity: {
        used: 50,
        availableRacks: 500,
        status: 'Available',
        lastUpdated: new Date().toISOString()
      },
      connectivity: {
        carriers: ['Carrier 1'],
        bandwidth: '100 Gbps',
        internetExchanges: ['IX 1'],
        fiberProviders: ['Provider 1'],
        cloudOnRamps: ['AWS Direct Connect']
      },
      services: ['Colocation', 'Cloud Hosting'],
      security: {
        level: 'High Security',
        accessControl: 'Key Card Access',
        surveillance: '24/7 CCTV',
        compliance: ['ISO 27001']
      },
      certifications: ['ISO 27001'],
      sustainability: {
        pue: 1.4,
        renewableEnergy: 50,
        carbonNeutral: false,
        greenCertifications: []
      },
      contact: {
        phone: '+1-555-0123',
        email: 'contact@example.com',
        website: 'www.example.com',
        salesTeam: 'sales@example.com',
        support: 'support@example.com'
      },
      pricing: {
        colocation: '400',
        dedicatedServer: '250',
        cloudHosting: '0.10',
        bandwidth: '2.50',
        setup: '500'
      },
      amenities: ['Parking', 'Reception'],
      nearbyServices: ['Hotels', 'Restaurants'],
      reviews: {
        rating: 4.0,
        totalReviews: 0,
        reliability: 4.0,
        support: 4.0,
        value: 4.0
      },
      realTimeData: {
        temperature: 22.0,
        humidity: 45,
        powerUsage: 15.0,
        networkLatency: 3.0,
        uptime: 99.9
      }
    };
    setEditingDataCenter(newDataCenter);
    setIsCreating(true);
  };

  const handleSaveDataCenter = (dataCenter: DataCenter) => {
    if (isCreating) {
      onUpdateDataCenters([...dataCenters, dataCenter]);
      setIsCreating(false);
    } else {
      onUpdateDataCenters(dataCenters.map(dc => dc.id === dataCenter.id ? dataCenter : dc));
    }
    setEditingDataCenter(null);
  };

  const handleDeleteDataCenter = (id: string) => {
    if (confirm('Are you sure you want to delete this data center?')) {
      onUpdateDataCenters(dataCenters.filter(dc => dc.id !== id));
    }
  };

  const stats = {
    totalDataCenters: dataCenters.length,
    totalUsers: users.length,
    availableCapacity: dataCenters.filter(dc => dc.capacity.status === 'Available').length,
    totalPower: dataCenters.reduce((sum, dc) => sum + parseInt(dc.specifications.power), 0),
    averageUptime: (dataCenters.reduce((sum, dc) => sum + dc.realTimeData.uptime, 0) / dataCenters.length).toFixed(2)
  };

  return (
    <div className={`min-h-screen transition-colors ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} shadow-sm border-b transition-colors`}>
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={onClose}
                className={`p-2 rounded-lg transition-colors ${isDark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'}`}
              >
                <ArrowLeft className="h-6 w-6" />
              </button>
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-xl">
                <Database className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Admin Panel</h1>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Data Center Management System</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Navigation Tabs */}
        <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl shadow-sm border mb-8 transition-colors`}>
          <div className={`flex border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex items-center gap-2 px-6 py-4 font-medium text-sm transition-colors ${
                activeTab === 'overview'
                  ? (isDark ? 'border-b-2 border-blue-400 text-blue-400' : 'border-b-2 border-blue-500 text-blue-600')
                  : (isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700')
              }`}
            >
              <BarChart3 className="h-4 w-4" />
              Overview
            </button>
            <button
              onClick={() => setActiveTab('datacenters')}
              className={`flex items-center gap-2 px-6 py-4 font-medium text-sm transition-colors ${
                activeTab === 'datacenters'
                  ? (isDark ? 'border-b-2 border-blue-400 text-blue-400' : 'border-b-2 border-blue-500 text-blue-600')
                  : (isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700')
              }`}
            >
              <Building2 className="h-4 w-4" />
              Data Centers
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`flex items-center gap-2 px-6 py-4 font-medium text-sm transition-colors ${
                activeTab === 'users'
                  ? (isDark ? 'border-b-2 border-blue-400 text-blue-400' : 'border-b-2 border-blue-500 text-blue-600')
                  : (isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700')
              }`}
            >
              <Users className="h-4 w-4" />
              Users
            </button>
            <button
              onClick={() => setActiveTab('monitoring')}
              className={`flex items-center gap-2 px-6 py-4 font-medium text-sm transition-colors ${
                activeTab === 'monitoring'
                  ? (isDark ? 'border-b-2 border-blue-400 text-blue-400' : 'border-b-2 border-blue-500 text-blue-600')
                  : (isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700')
              }`}
            >
              <Activity className="h-4 w-4" />
              Monitoring
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`flex items-center gap-2 px-6 py-4 font-medium text-sm transition-colors ${
                activeTab === 'settings'
                  ? (isDark ? 'border-b-2 border-blue-400 text-blue-400' : 'border-b-2 border-blue-500 text-blue-600')
                  : (isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700')
              }`}
            >
              <Settings className="h-4 w-4" />
              Settings
            </button>
          </div>
        </div>

        {/* Content */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl shadow-sm border p-6 transition-colors`}>
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-2 rounded-lg">
                    <Building2 className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Total Data Centers</p>
                    <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{stats.totalDataCenters}</p>
                  </div>
                </div>
              </div>
              
              <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl shadow-sm border p-6 transition-colors`}>
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-2 rounded-lg">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Total Users</p>
                    <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{stats.totalUsers}</p>
                  </div>
                </div>
              </div>
              
              <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl shadow-sm border p-6 transition-colors`}>
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-r from-green-500 to-green-600 p-2 rounded-lg">
                    <Server className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Available Capacity</p>
                    <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{stats.availableCapacity}</p>
                  </div>
                </div>
              </div>
              
              <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl shadow-sm border p-6 transition-colors`}>
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-2 rounded-lg">
                    <Zap className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Total Power</p>
                    <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{stats.totalPower} MW</p>
                  </div>
                </div>
              </div>
              
              <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl shadow-sm border p-6 transition-colors`}>
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-r from-red-500 to-red-600 p-2 rounded-lg">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Avg Uptime</p>
                    <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{stats.averageUptime}%</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl shadow-sm border p-6 transition-colors`}>
              <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Recent Activity</h3>
              <div className="space-y-3">
                <div className={`flex items-center gap-3 p-3 rounded-lg ${isDark ? 'bg-green-900/20' : 'bg-green-50'}`}>
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className={`text-sm ${isDark ? 'text-green-400' : 'text-green-800'}`}>All systems operating normally</span>
                  <span className={`text-xs ml-auto ${isDark ? 'text-green-500' : 'text-green-600'}`}>2 min ago</span>
                </div>
                <div className={`flex items-center gap-3 p-3 rounded-lg ${isDark ? 'bg-blue-900/20' : 'bg-blue-50'}`}>
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className={`text-sm ${isDark ? 'text-blue-400' : 'text-blue-800'}`}>New data center added to monitoring</span>
                  <span className={`text-xs ml-auto ${isDark ? 'text-blue-500' : 'text-blue-600'}`}>1 hour ago</span>
                </div>
                <div className={`flex items-center gap-3 p-3 rounded-lg ${isDark ? 'bg-yellow-900/20' : 'bg-yellow-50'}`}>
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className={`text-sm ${isDark ? 'text-yellow-400' : 'text-yellow-800'}`}>Scheduled maintenance reminder</span>
                  <span className={`text-xs ml-auto ${isDark ? 'text-yellow-500' : 'text-yellow-600'}`}>3 hours ago</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <UserManagement users={users} onUpdateUsers={onUpdateUsers} />
        )}

        {activeTab === 'datacenters' && (
          <div className="space-y-6">
            {/* Controls */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex-1 max-w-md">
                <input
                  type="text"
                  placeholder="Search data centers..."
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                    isDark 
                      ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button
                onClick={handleCreateDataCenter}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
              >
                <Plus className="h-4 w-4" />
                Add Data Center
              </button>
            </div>

            {/* Data Centers Table */}
            <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl shadow-sm border overflow-hidden transition-colors`}>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className={`${isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'} border-b`}>
                    <tr>
                      <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
                        Name & Location
                      </th>
                      <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
                        Tier
                      </th>
                      <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
                        Status
                      </th>
                      <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
                        Capacity
                      </th>
                      <th className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
                        Uptime
                      </th>
                      <th className={`px-6 py-3 text-right text-xs font-medium uppercase tracking-wider ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className={`${isDark ? 'bg-gray-800 divide-gray-700' : 'bg-white divide-gray-200'} divide-y`}>
                    {filteredDataCenters.map((dc) => (
                      <tr key={dc.id} className={`${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} transition-colors`}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{dc.name}</div>
                            <div className={`text-sm flex items-center gap-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                              <MapPin className="h-3 w-3" />
                              {dc.location}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                            {dc.tier}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            dc.capacity.status === 'Available' ? 'bg-green-100 text-green-800' :
                            dc.capacity.status === 'Limited' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {dc.capacity.status}
                          </span>
                        </td>
                        <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {dc.capacity.used}%
                        </td>
                        <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {dc.realTimeData.uptime}%
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center gap-2 justify-end">
                            <button
                              onClick={() => setEditingDataCenter(dc)}
                              className={`${isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-900'} transition-colors`}
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteDataCenter(dc.id)}
                              className={`${isDark ? 'text-red-400 hover:text-red-300' : 'text-red-600 hover:text-red-900'} transition-colors`}
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'monitoring' && (
          <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl shadow-sm border p-6 transition-colors`}>
            <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>System Monitoring</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dataCenters.slice(0, 6).map((dc) => (
                <div key={dc.id} className={`border rounded-lg p-4 ${isDark ? 'border-gray-600 bg-gray-700' : 'border-gray-200 bg-white'}`}>
                  <h4 className={`font-medium mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>{dc.name}</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Temperature:</span>
                      <span className="font-medium">{dc.realTimeData.temperature}°C</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Humidity:</span>
                      <span className="font-medium">{dc.realTimeData.humidity}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Power Usage:</span>
                      <span className="font-medium">{dc.realTimeData.powerUsage} MW</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Uptime:</span>
                      <span className={`font-medium ${isDark ? 'text-green-400' : 'text-green-600'}`}>{dc.realTimeData.uptime}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl shadow-sm border p-6 transition-colors`}>
            <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>System Settings</h3>
            <div className="space-y-6">
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  System Name
                </label>
                <input
                  type="text"
                  value="Data Center Management System"
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                    isDark 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  readOnly
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Default View Mode
                </label>
                <select className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                  isDark 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                }`}>
                  <option>Grid View</option>
                  <option>Map View</option>
                  <option>Analytics View</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="notifications" className="rounded" />
                <label htmlFor="notifications" className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Enable email notifications
                </label>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="monitoring" className="rounded" defaultChecked />
                <label htmlFor="monitoring" className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Enable real-time monitoring
                </label>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {editingDataCenter && (
        <DataCenterEditModal
          dataCenter={editingDataCenter}
          isCreating={isCreating}
          onSave={handleSaveDataCenter}
          onCancel={() => {
            setEditingDataCenter(null);
            setIsCreating(false);
          }}
        />
      )}
    </div>
  );
};

// Edit Modal Component
interface DataCenterEditModalProps {
  dataCenter: DataCenter;
  isCreating: boolean;
  onSave: (dataCenter: DataCenter) => void;
  onCancel: () => void;
}

const DataCenterEditModal: React.FC<DataCenterEditModalProps> = ({
  dataCenter,
  isCreating,
  onSave,
  onCancel
}) => {
  const [formData, setFormData] = useState<DataCenter>(dataCenter);
  const { isDark } = useTheme();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const updateField = (path: string, value: any) => {
    const keys = path.split('.');
    const newData = { ...formData };
    let current: any = newData;
    
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;
    
    setFormData(newData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className={`${isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden transition-colors`}>
        <div className={`flex items-center justify-between p-6 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
          <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {isCreating ? 'Create New Data Center' : 'Edit Data Center'}
          </h2>
          <button onClick={onCancel} className={`${isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'} transition-colors`}>
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Basic Information</h3>
              
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                    isDark 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  required
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Location</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => updateField('location', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                    isDark 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  required
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>City</label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => updateField('city', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                    isDark 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  required
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Country</label>
                <input
                  type="text"
                  value={formData.country}
                  onChange={(e) => updateField('country', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                    isDark 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  required
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Tier</label>
                <select
                  value={formData.tier}
                  onChange={(e) => updateField('tier', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                    isDark 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  <option value="Tier 1">Tier 1</option>
                  <option value="Tier 2">Tier 2</option>
                  <option value="Tier 3">Tier 3</option>
                  <option value="Tier 4">Tier 4</option>
                </select>
              </div>
            </div>

            {/* Specifications */}
            <div className="space-y-4">
              <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Specifications</h3>
              
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Total Space</label>
                <input
                  type="text"
                  value={formData.specifications.totalSpace}
                  onChange={(e) => updateField('specifications.totalSpace', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                    isDark 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Power</label>
                <input
                  type="text"
                  value={formData.specifications.power}
                  onChange={(e) => updateField('specifications.power', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                    isDark 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Cooling</label>
                <input
                  type="text"
                  value={formData.specifications.cooling}
                  onChange={(e) => updateField('specifications.cooling', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                    isDark 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Capacity Used (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={formData.capacity.used}
                  onChange={(e) => updateField('capacity.used', parseInt(e.target.value))}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                    isDark 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Status</label>
                <select
                  value={formData.capacity.status}
                  onChange={(e) => updateField('capacity.status', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                    isDark 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  <option value="Available">Available</option>
                  <option value="Limited">Limited</option>
                  <option value="Full">Full</option>
                </select>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => updateField('description', e.target.value)}
              rows={3}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                isDark 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
            />
          </div>

          <div className={`flex gap-3 mt-6 pt-6 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
            <button
              type="button"
              onClick={onCancel}
              className={`flex-1 py-2 px-4 border rounded-lg transition-colors ${
                isDark 
                  ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2 px-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <Save className="h-4 w-4" />
              {isCreating ? 'Create' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminPanel;