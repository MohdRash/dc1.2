import React from 'react';
import { X } from 'lucide-react';

interface FilterPanelProps {
  locations: string[];
  tiers: string[];
  selectedLocation: string;
  selectedTier: string;
  onLocationChange: (location: string) => void;
  onTierChange: (tier: string) => void;
  onReset: () => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  locations,
  tiers,
  selectedLocation,
  selectedTier,
  onLocationChange,
  onTierChange,
  onReset
}) => {
  return (
    <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700">Location:</label>
          <select
            value={selectedLocation}
            onChange={(e) => onLocationChange(e.target.value)}
            className="px-3 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Locations</option>
            {locations.map(location => (
              <option key={location} value={location}>{location}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700">Tier:</label>
          <select
            value={selectedTier}
            onChange={(e) => onTierChange(e.target.value)}
            className="px-3 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Tiers</option>
            {tiers.map(tier => (
              <option key={tier} value={tier}>{tier}</option>
            ))}
          </select>
        </div>

        {(selectedLocation || selectedTier) && (
          <button
            onClick={onReset}
            className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800 bg-white border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
          >
            <X className="h-3 w-3" />
            Clear Filters
          </button>
        )}
      </div>
    </div>
  );
};

export default FilterPanel;