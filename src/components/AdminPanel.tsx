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
  Shield
} from 'lucide-react';
import { DataCenter } from '../types/DataCenter';

interface AdminPanelProps {
  dataCenters: DataCenter[];
  onUpdateDataCenters: (dataCenters: DataCenter[]) => void;
  onLogout: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ dataCenters, onUpdateDataCenters, onLogout }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'datacenters' | 'monitoring' | 'settings'>('overview');
  const [editingDataCenter, setEditingDataCenter] = useState<DataCenter | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

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
    availableCapacity: dataCenters.filter(dc => dc.capacity.status === 'Available').length,
    totalPower: dataCenters.reduce((sum, dc) => sum + parseInt(dc.specifications.power), 0),
    averageUptime: (dataCenters.reduce((sum, dc) => sum + dc.realTimeData.uptime, 0) / dataCenters.length).toFixed(2)
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-blue-500 p-2 rounded-lg">
                <Database className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
                <p className="text-sm text-gray-600">Data Center Management System</p>
              </div>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex items-center gap-2 px-6 py-4 font-medium text-sm transition-colors ${
                activeTab === 'overview'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <BarChart3 className="h-4 w-4" />
              Overview
            </button>
            <button
              onClick={() => setActiveTab('datacenters')}
              className={`flex items-center gap-2 px-6 py-4 font-medium text-sm transition-colors ${
                activeTab === 'datacenters'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Building2 className="h-4 w-4" />
              Data Centers
            </button>
            <button
              onClick={() => setActiveTab('monitoring')}
              className={`flex items-center gap-2 px-6 py-4 font-medium text-sm transition-colors ${
                activeTab === 'monitoring'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Activity className="h-4 w-4" />
              Monitoring
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`flex items-center gap-2 px-6 py-4 font-medium text-sm transition-colors ${
                activeTab === 'settings'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Building2 className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Data Centers</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalDataCenters}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <Server className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Available Capacity</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.availableCapacity}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center gap-3">
                  <div className="bg-orange-100 p-2 rounded-lg">
                    <Zap className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Power</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalPower} MW</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center gap-3">
                  <div className="bg-purple-100 p-2 rounded-lg">
                    <Shield className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Avg Uptime</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.averageUptime}%</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-green-800">All systems operating normally</span>
                  <span className="text-xs text-green-600 ml-auto">2 min ago</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-blue-800">New data center added to monitoring</span>
                  <span className="text-xs text-blue-600 ml-auto">1 hour ago</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm text-yellow-800">Scheduled maintenance reminder</span>
                  <span className="text-xs text-yellow-600 ml-auto">3 hours ago</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'datacenters' && (
          <div className="space-y-6">
            {/* Controls */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex-1 max-w-md">
                <input
                  type="text"
                  placeholder="Search data centers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                onClick={handleCreateDataCenter}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                <Plus className="h-4 w-4" />
                Add Data Center
              </button>
            </div>

            {/* Data Centers Table */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name & Location
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tier
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Capacity
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Uptime
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredDataCenters.map((dc) => (
                      <tr key={dc.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{dc.name}</div>
                            <div className="text-sm text-gray-500 flex items-center gap-1">
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
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {dc.capacity.used}%
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {dc.realTimeData.uptime}%
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center gap-2 justify-end">
                            <button
                              onClick={() => setEditingDataCenter(dc)}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteDataCenter(dc.id)}
                              className="text-red-600 hover:text-red-900"
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
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">System Monitoring</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dataCenters.slice(0, 6).map((dc) => (
                <div key={dc.id} className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-3">{dc.name}</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Temperature:</span>
                      <span className="font-medium">{dc.realTimeData.temperature}°C</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Humidity:</span>
                      <span className="font-medium">{dc.realTimeData.humidity}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Power Usage:</span>
                      <span className="font-medium">{dc.realTimeData.powerUsage} MW</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Uptime:</span>
                      <span className="font-medium text-green-600">{dc.realTimeData.uptime}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">System Settings</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  System Name
                </label>
                <input
                  type="text"
                  value="Data Center Management System"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Default View Mode
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Grid View</option>
                  <option>Map View</option>
                  <option>Analytics View</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="notifications" className="rounded" />
                <label htmlFor="notifications" className="text-sm text-gray-700">
                  Enable email notifications
                </label>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="monitoring" className="rounded" defaultChecked />
                <label htmlFor="monitoring" className="text-sm text-gray-700">
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
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">
            {isCreating ? 'Create New Data Center' : 'Edit Data Center'}
          </h2>
          <button onClick={onCancel} className="text-gray-400 hover:text-gray-600">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => updateField('location', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => updateField('city', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                <input
                  type="text"
                  value={formData.country}
                  onChange={(e) => updateField('country', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tier</label>
                <select
                  value={formData.tier}
                  onChange={(e) => updateField('tier', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              <h3 className="text-lg font-semibold text-gray-900">Specifications</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Total Space</label>
                <input
                  type="text"
                  value={formData.specifications.totalSpace}
                  onChange={(e) => updateField('specifications.totalSpace', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Power</label>
                <input
                  type="text"
                  value={formData.specifications.power}
                  onChange={(e) => updateField('specifications.power', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cooling</label>
                <input
                  type="text"
                  value={formData.specifications.cooling}
                  onChange={(e) => updateField('specifications.cooling', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Capacity Used (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={formData.capacity.used}
                  onChange={(e) => updateField('capacity.used', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={formData.capacity.status}
                  onChange={(e) => updateField('capacity.status', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Available">Available</option>
                  <option value="Limited">Limited</option>
                  <option value="Full">Full</option>
                </select>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => updateField('description', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex gap-3 mt-6 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
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