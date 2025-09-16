import React from 'react';
import { MapPin, Navigation } from 'lucide-react';
import { DataCenter } from '../types/DataCenter';

interface DataCenterMapProps {
  dataCenters: DataCenter[];
  onDataCenterClick: (dataCenter: DataCenter) => void;
}

const DataCenterMap: React.FC<DataCenterMapProps> = ({ dataCenters, onDataCenterClick }) => {
  // Simulate geographic distribution for visualization
  const getMarkerPosition = (index: number, total: number) => {
    const cols = Math.ceil(Math.sqrt(total));
    const row = Math.floor(index / cols);
    const col = index % cols;
    
    return {
      top: `${20 + (row * 60 / Math.ceil(total / cols))}%`,
      left: `${10 + (col * 80 / cols)}%`
    };
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-4 border-b border-gray-100 bg-gray-50">
        <div className="flex items-center gap-2">
          <Navigation className="h-5 w-5 text-blue-500" />
          <h3 className="font-semibold text-gray-900">Global Data Center Locations</h3>
        </div>
      </div>
      
      <div className="relative h-96 bg-gradient-to-br from-blue-50 to-green-50">
        {/* World map background simulation */}
        <div className="absolute inset-0 bg-gray-100 opacity-20">
          <svg viewBox="0 0 1000 500" className="w-full h-full">
            <defs>
              <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#e5e7eb" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Data center markers */}
        {dataCenters.map((dc, index) => {
          const position = getMarkerPosition(index, dataCenters.length);
          return (
            <div
              key={dc.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
              style={position}
              onClick={() => onDataCenterClick(dc)}
            >
              <div className="relative">
                <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg group-hover:bg-blue-600 transition-colors animate-pulse"></div>
                <div className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-10">
                  {dc.name} - {dc.city}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-4 bg-gray-50 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span>Active Data Centers ({dataCenters.length})</span>
            </div>
          </div>
          <div className="text-sm text-gray-500">
            Click on markers to view details
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataCenterMap;