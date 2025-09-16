import React from 'react';
import { MapPin, Server, Zap, Shield, Users, Thermometer, Signal } from 'lucide-react';
import { DataCenter } from '../types/DataCenter';

interface DataCenterCardProps {
  dataCenter: DataCenter;
  onClick: () => void;
}

const DataCenterCard: React.FC<DataCenterCardProps> = ({ dataCenter, onClick }) => {
  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'Tier 1': return 'bg-yellow-100 text-yellow-800';
      case 'Tier 2': return 'bg-orange-100 text-orange-800';
      case 'Tier 3': return 'bg-green-100 text-green-800';
      case 'Tier 4': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available': return 'bg-green-100 text-green-800 border-green-200';
      case 'Limited': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Full': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div 
      className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-100 hover:border-blue-200 group"
      onClick={onClick}
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
              {dataCenter.name}
            </h3>
            <div className="flex items-center gap-1 text-gray-600 mt-1">
              <MapPin className="h-4 w-4" />
              <span className="text-sm">{dataCenter.city}, {dataCenter.country}</span>
            </div>
          </div>
          <div className="flex gap-2">
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTierColor(dataCenter.tier)}`}>
              {dataCenter.tier}
            </span>
            <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(dataCenter.capacity.status)}`}>
              {dataCenter.capacity.status}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Server className="h-4 w-4 text-blue-500" />
            <span>{dataCenter.specifications.totalSpace}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Zap className="h-4 w-4 text-orange-500" />
            <span>{dataCenter.specifications.power}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Thermometer className="h-4 w-4 text-green-500" />
            <span>{dataCenter.specifications.cooling}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Signal className="h-4 w-4 text-purple-500" />
            <span>{dataCenter.connectivity.carriers.length} Carriers</span>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Capacity Used</span>
            <span>{dataCenter.capacity.used}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-300 ${
                dataCenter.capacity.used > 80 ? 'bg-red-500' : 
                dataCenter.capacity.used > 60 ? 'bg-yellow-500' : 'bg-green-500'
              }`}
              style={{ width: `${dataCenter.capacity.used}%` }}
            ></div>
          </div>
        </div>

        <div className="flex flex-wrap gap-1 mb-4">
          {dataCenter.services.slice(0, 3).map((service, index) => (
            <span key={index} className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-md">
              {service}
            </span>
          ))}
          {dataCenter.services.length > 3 && (
            <span className="px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded-md">
              +{dataCenter.services.length - 3} more
            </span>
          )}
        </div>

        <div className="flex justify-between items-center text-sm">
          <div className="text-gray-600">
            <span className="font-medium">${dataCenter.pricing.colocation}</span>/month
          </div>
          <button className="text-blue-600 hover:text-blue-700 font-medium">
            View Details →
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataCenterCard;