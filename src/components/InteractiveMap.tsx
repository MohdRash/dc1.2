import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { DataCenter } from '../types/DataCenter';
import { MapPin, Server, Zap } from 'lucide-react';

// Fix for default markers in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface InteractiveMapProps {
  dataCenters: DataCenter[];
  onDataCenterClick: (dataCenter: DataCenter) => void;
  selectedDataCenter?: DataCenter | null;
}

const InteractiveMap: React.FC<InteractiveMapProps> = ({ 
  dataCenters, 
  onDataCenterClick, 
  selectedDataCenter 
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);

  useEffect(() => {
    if (!mapRef.current) return;

    // Initialize map
    const map = L.map(mapRef.current).setView([40.7589, -73.9851], 2);
    mapInstanceRef.current = map;

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Custom icon for data centers
    const createCustomIcon = (dataCenter: DataCenter) => {
      const color = dataCenter.capacity.status === 'Available' ? '#10b981' : 
                   dataCenter.capacity.status === 'Limited' ? '#f59e0b' : '#ef4444';
      
      return L.divIcon({
        html: `
          <div style="
            background-color: ${color};
            width: 20px;
            height: 20px;
            border-radius: 50%;
            border: 3px solid white;
            box-shadow: 0 2px 4px rgba(0,0,0,0.3);
            display: flex;
            align-items: center;
            justify-content: center;
          ">
            <div style="
              width: 8px;
              height: 8px;
              background-color: white;
              border-radius: 50%;
            "></div>
          </div>
        `,
        className: 'custom-marker',
        iconSize: [20, 20],
        iconAnchor: [10, 10]
      });
    };

    // Add markers for each data center
    dataCenters.forEach(dataCenter => {
      const marker = L.marker(
        [dataCenter.coordinates.lat, dataCenter.coordinates.lng],
        { icon: createCustomIcon(dataCenter) }
      ).addTo(map);

      // Create popup content
      const popupContent = `
        <div style="min-width: 250px; font-family: system-ui, -apple-system, sans-serif;">
          <div style="border-bottom: 1px solid #e5e7eb; padding-bottom: 8px; margin-bottom: 8px;">
            <h3 style="margin: 0; font-size: 16px; font-weight: 600; color: #111827;">${dataCenter.name}</h3>
            <p style="margin: 4px 0 0 0; font-size: 14px; color: #6b7280;">${dataCenter.city}, ${dataCenter.country}</p>
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 12px;">
            <div style="font-size: 12px;">
              <span style="color: #6b7280;">Tier:</span>
              <span style="font-weight: 500; color: #111827; margin-left: 4px;">${dataCenter.tier}</span>
            </div>
            <div style="font-size: 12px;">
              <span style="color: #6b7280;">Status:</span>
              <span style="font-weight: 500; color: ${dataCenter.capacity.status === 'Available' ? '#059669' : dataCenter.capacity.status === 'Limited' ? '#d97706' : '#dc2626'}; margin-left: 4px;">${dataCenter.capacity.status}</span>
            </div>
            <div style="font-size: 12px;">
              <span style="color: #6b7280;">Power:</span>
              <span style="font-weight: 500; color: #111827; margin-left: 4px;">${dataCenter.specifications.power}</span>
            </div>
            <div style="font-size: 12px;">
              <span style="color: #6b7280;">PUE:</span>
              <span style="font-weight: 500; color: #111827; margin-left: 4px;">${dataCenter.sustainability.pue}</span>
            </div>
          </div>
          <button 
            onclick="window.selectDataCenter('${dataCenter.id}')"
            style="
              width: 100%;
              background-color: #2563eb;
              color: white;
              border: none;
              padding: 8px 12px;
              border-radius: 6px;
              font-size: 14px;
              font-weight: 500;
              cursor: pointer;
              transition: background-color 0.2s;
            "
            onmouseover="this.style.backgroundColor='#1d4ed8'"
            onmouseout="this.style.backgroundColor='#2563eb'"
          >
            View Details
          </button>
        </div>
      `;

      marker.bindPopup(popupContent);
      markersRef.current.push(marker);

      marker.on('click', () => {
        onDataCenterClick(dataCenter);
      });
    });

    // Global function for popup button
    (window as any).selectDataCenter = (id: string) => {
      const dataCenter = dataCenters.find(dc => dc.id === id);
      if (dataCenter) {
        onDataCenterClick(dataCenter);
      }
    };

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
      markersRef.current = [];
    };
  }, [dataCenters, onDataCenterClick]);

  // Highlight selected data center
  useEffect(() => {
    if (selectedDataCenter && mapInstanceRef.current) {
      const { lat, lng } = selectedDataCenter.coordinates;
      mapInstanceRef.current.setView([lat, lng], 8);
    }
  }, [selectedDataCenter]);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-4 border-b border-gray-100 bg-gray-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-blue-500" />
            <h3 className="font-semibold text-gray-900">Global Data Center Locations</h3>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-gray-600">Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span className="text-gray-600">Limited</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-gray-600">Full</span>
            </div>
          </div>
        </div>
      </div>
      
      <div ref={mapRef} className="h-96 w-full" />
      
      <div className="p-4 bg-gray-50 border-t border-gray-100">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Server className="h-4 w-4 text-blue-500" />
              <span>{dataCenters.length} Data Centers</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-orange-500" />
              <span>{dataCenters.reduce((sum, dc) => sum + parseInt(dc.specifications.power), 0)} MW Total Power</span>
            </div>
          </div>
          <span className="text-gray-500">Click markers for details</span>
        </div>
      </div>
    </div>
  );
};

export default InteractiveMap;