import React from 'react';
import { ArrowLeft, MapPin, Server, Zap, Thermometer, Shield, Wifi, Clock, Phone, Mail, Globe, Building, Users, ExternalLink, Calendar, Award, Leaf } from 'lucide-react';
import { DataCenter } from '../types/DataCenter';
import RealTimeMonitoring from './RealTimeMonitoring';

interface DataCenterDetailsProps {
  dataCenter: DataCenter;
  onBack: () => void;
}

const DataCenterDetails: React.FC<DataCenterDetailsProps> = ({ dataCenter, onBack }) => {
  const [activeTab, setActiveTab] = React.useState<'overview' | 'monitoring' | 'sustainability'>('overview');

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'Tier 1': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Tier 2': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Tier 3': return 'bg-green-100 text-green-800 border-green-200';
      case 'Tier 4': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available': return 'bg-green-100 text-green-800';
      case 'Limited': return 'bg-yellow-100 text-yellow-800';
      case 'Full': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            Back to Portal
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-start gap-6">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{dataCenter.name}</h1>
              <div className="flex items-center gap-2 text-gray-600 mb-4">
                <MapPin className="h-5 w-5" />
                <span className="text-lg">{dataCenter.location}</span>
                <span className="text-gray-400">•</span>
                <span>{dataCenter.city}, {dataCenter.country}</span>
              </div>
              
              <div className="flex flex-wrap gap-3 mb-6">
                <span className={`px-3 py-1 text-sm font-medium rounded-full border ${getTierColor(dataCenter.tier)}`}>
                  {dataCenter.tier}
                </span>
                <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(dataCenter.capacity.status)}`}>
                  {dataCenter.capacity.status}
                </span>
              </div>

              <p className="text-gray-600 leading-relaxed">{dataCenter.description}</p>
            </div>

            <div className="lg:w-80">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Quick Contact</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">{dataCenter.contact.phone}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">{dataCenter.contact.email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <ExternalLink className="h-4 w-4 text-gray-500" />
                    <a 
                      href={dataCenter.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      Visit Website
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">Est. {dataCenter.established}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Building className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">{dataCenter.operator}</span>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors">
                  Get Quote
                </button>
                  <button className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors">
                    Schedule Tour
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white border-b border-gray-200 sticky top-16 z-10">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex space-x-8">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'overview'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('monitoring')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'monitoring'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Live Monitoring
              </button>
              <button
                onClick={() => setActiveTab('sustainability')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'sustainability'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Sustainability
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          {activeTab === 'monitoring' ? (
            <RealTimeMonitoring dataCenter={dataCenter} />
          ) : activeTab === 'sustainability' ? (
            <div className="space-y-8">
              <div className="flex items-center gap-2 mb-6">
                <Leaf className="h-6 w-6 text-green-500" />
                <h3 className="text-xl font-semibold text-gray-900">Sustainability & Environmental Impact</h3>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Energy Efficiency</h4>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-600">PUE Rating</span>
                        <span className="text-2xl font-bold text-green-600">{dataCenter.sustainability.pue}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full bg-green-500"
                          style={{ width: `${Math.max(0, (2 - dataCenter.sustainability.pue) / 1 * 100)}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Lower is better (Industry avg: 1.6)</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Renewable Energy</h4>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-600">Renewable %</span>
                        <span className="text-2xl font-bold text-blue-600">{dataCenter.sustainability.renewableEnergy}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full bg-blue-500"
                          style={{ width: `${dataCenter.sustainability.renewableEnergy}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {dataCenter.sustainability.carbonNeutral && (
                        <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                          Carbon Neutral
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Green Certifications</h4>
                  <div className="space-y-2">
                    {dataCenter.sustainability.greenCertifications.map((cert, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 bg-green-50 rounded-lg">
                        <Award className="h-4 w-4 text-green-600" />
                        <span className="text-sm font-medium text-green-800">{cert}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Specifications Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Technical Specifications */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-4">
              <Server className="h-5 w-5 text-blue-500" />
              Technical Specs
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-600">Total Space</span>
                  <span className="font-medium">{dataCenter.specifications.totalSpace}</span>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-600">Power Capacity</span>
                  <span className="font-medium">{dataCenter.specifications.power}</span>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-600">Cooling System</span>
                  <span className="font-medium">{dataCenter.specifications.cooling}</span>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-600">Floors</span>
                  <span className="font-medium">{dataCenter.specifications.floors}</span>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-600">Total Racks</span>
                  <span className="font-medium">{dataCenter.specifications.rackCount}</span>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-600">Security Level</span>
                  <span className="font-medium">{dataCenter.security.level}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Capacity Status */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-4">
              <Building className="h-5 w-5 text-green-500" />
              Capacity Status
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Space Utilized</span>
                  <span>{dataCenter.capacity.used}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full transition-all duration-300 ${
                      dataCenter.capacity.used > 80 ? 'bg-red-500' : 
                      dataCenter.capacity.used > 60 ? 'bg-yellow-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${dataCenter.capacity.used}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Available Racks</span>
                  <span className="font-medium">{dataCenter.capacity.availableRacks}</span>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Status</span>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(dataCenter.capacity.status)}`}>
                    {dataCenter.capacity.status}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Connectivity */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-4">
              <Wifi className="h-5 w-5 text-purple-500" />
              Connectivity
            </h3>
            <div className="space-y-4">
              <div>
                <span className="text-sm text-gray-600">Network Carriers</span>
                <div className="mt-2 flex flex-wrap gap-1">
                  {dataCenter.connectivity.carriers.map((carrier, index) => (
                    <span key={index} className="px-2 py-1 text-xs bg-purple-50 text-purple-700 rounded">
                      {carrier}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Bandwidth</span>
                  <span className="font-medium">{dataCenter.connectivity.bandwidth}</span>
                </div>
              </div>
              <div>
                <span className="text-sm text-gray-600">Cloud On-Ramps</span>
                <div className="mt-2 flex flex-wrap gap-1">
                  {dataCenter.connectivity.cloudOnRamps.map((onramp, index) => (
                    <span key={index} className="px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded">
                      {onramp}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <span className="text-sm text-gray-600">Internet Exchanges</span>
                <div className="mt-2 flex flex-wrap gap-1">
                  {dataCenter.connectivity.internetExchanges.map((ix, index) => (
                    <span key={index} className="px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded">
                      {ix}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

              {/* Services and Security */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Services */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-4">
              <Users className="h-5 w-5 text-orange-500" />
              Available Services
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {dataCenter.services.map((service, index) => (
                <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm">{service}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Security & Compliance */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-4">
              <Shield className="h-5 w-5 text-red-500" />
              Security & Compliance
            </h3>
            <div className="space-y-3">
              <div>
                <span className="text-sm font-medium text-gray-700">Security Level: </span>
                <span className="text-sm">{dataCenter.security.level}</span>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-700">Access Control: </span>
                <span className="text-sm">{dataCenter.security.accessControl}</span>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-700">Surveillance: </span>
                <span className="text-sm">{dataCenter.security.surveillance}</span>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-700">Certifications:</span>
                <div className="mt-2 flex flex-wrap gap-1">
                  {dataCenter.certifications.map((cert, index) => (
                    <span key={index} className="px-2 py-1 text-xs bg-green-50 text-green-700 rounded">
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

              {/* Pricing */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Pricing Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Colocation</h4>
              <div className="text-2xl font-bold text-blue-600">${dataCenter.pricing.colocation}</div>
              <div className="text-sm text-gray-600">per month</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Dedicated Server</h4>
              <div className="text-2xl font-bold text-green-600">${dataCenter.pricing.dedicatedServer}</div>
              <div className="text-sm text-gray-600">per month</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Cloud Hosting</h4>
              <div className="text-2xl font-bold text-orange-600">${dataCenter.pricing.cloudHosting}</div>
              <div className="text-sm text-gray-600">per hour</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Setup Fee</h4>
              <div className="text-2xl font-bold text-purple-600">${dataCenter.pricing.setup}</div>
              <div className="text-sm text-gray-600">one-time</div>
            </div>
          </div>
        </div>

              {/* Reviews and Amenities */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Reviews</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="text-3xl font-bold text-yellow-500">{dataCenter.reviews.rating}</div>
                      <div>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <div
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(dataCenter.reviews.rating) ? 'text-yellow-400' : 'text-gray-300'
                              }`}
                            >
                              ★
                            </div>
                          ))}
                        </div>
                        <div className="text-sm text-gray-600">{dataCenter.reviews.totalReviews} reviews</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Reliability</span>
                        <span className="font-medium">{dataCenter.reviews.reliability}/5</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Support</span>
                        <span className="font-medium">{dataCenter.reviews.support}/5</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Value</span>
                        <span className="font-medium">{dataCenter.reviews.value}/5</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Amenities & Services</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">On-site Amenities</h4>
                      <div className="flex flex-wrap gap-1">
                        {dataCenter.amenities.map((amenity, index) => (
                          <span key={index} className="px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded">
                            {amenity}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Nearby Services</h4>
                      <div className="flex flex-wrap gap-1">
                        {dataCenter.nearbyServices.map((service, index) => (
                          <span key={index} className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DataCenterDetails;