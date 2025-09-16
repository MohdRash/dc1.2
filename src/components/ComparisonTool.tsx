import React, { useState } from 'react';
import { Plus, X, Check, AlertCircle, Star } from 'lucide-react';
import { DataCenter } from '../types/DataCenter';

interface ComparisonToolProps {
  dataCenters: DataCenter[];
  onClose: () => void;
}

const ComparisonTool: React.FC<ComparisonToolProps> = ({ dataCenters, onClose }) => {
  const [selectedDataCenters, setSelectedDataCenters] = useState<DataCenter[]>([]);

  const addDataCenter = (dataCenter: DataCenter) => {
    if (selectedDataCenters.length < 3 && !selectedDataCenters.find(dc => dc.id === dataCenter.id)) {
      setSelectedDataCenters([...selectedDataCenters, dataCenter]);
    }
  };

  const removeDataCenter = (id: string) => {
    setSelectedDataCenters(selectedDataCenters.filter(dc => dc.id !== id));
  };

  const getComparisonValue = (value1: any, value2: any, value3?: any) => {
    const values = [value1, value2, value3].filter(v => v !== undefined);
    if (typeof value1 === 'number') {
      const max = Math.max(...values);
      const min = Math.min(...values);
      return { max, min, values };
    }
    return { values };
  };

  const renderComparisonRow = (label: string, getValue: (dc: DataCenter) => any, format?: (value: any) => string) => {
    const values = selectedDataCenters.map(getValue);
    const comparison = getComparisonValue(...values);
    
    return (
      <tr className="border-b border-gray-100">
        <td className="py-3 px-4 font-medium text-gray-900 bg-gray-50">{label}</td>
        {selectedDataCenters.map((dc, index) => {
          const value = values[index];
          const formattedValue = format ? format(value) : value;
          const isNumeric = typeof value === 'number';
          const isBest = isNumeric && comparison.max === value;
          const isWorst = isNumeric && comparison.min === value && comparison.max !== comparison.min;
          
          return (
            <td key={dc.id} className={`py-3 px-4 text-center ${
              isBest ? 'bg-green-50 text-green-800 font-semibold' :
              isWorst ? 'bg-red-50 text-red-800' : ''
            }`}>
              <div className="flex items-center justify-center gap-1">
                {isBest && <Star className="h-4 w-4 text-green-600" />}
                {isWorst && <AlertCircle className="h-4 w-4 text-red-600" />}
                {formattedValue}
              </div>
            </td>
          );
        })}
      </tr>
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Data Center Comparison</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
          {selectedDataCenters.length === 0 ? (
            <div className="text-center py-12">
              <div className="mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Plus className="h-8 w-8 text-blue-500" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Select Data Centers to Compare</h3>
                <p className="text-gray-600">Choose up to 3 data centers to compare their features and specifications</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
                {dataCenters.slice(0, 6).map(dc => (
                  <div
                    key={dc.id}
                    onClick={() => addDataCenter(dc)}
                    className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 cursor-pointer transition-all"
                  >
                    <h4 className="font-semibold text-gray-900">{dc.name}</h4>
                    <p className="text-sm text-gray-600">{dc.location}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">{dc.tier}</span>
                      <span className="text-xs text-gray-500">{dc.specifications.power}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Selected Data Centers */}
              <div className="flex items-center gap-4 mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Comparing:</h3>
                <div className="flex gap-2">
                  {selectedDataCenters.map(dc => (
                    <div key={dc.id} className="flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                      <span className="text-sm font-medium">{dc.name}</span>
                      <button
                        onClick={() => removeDataCenter(dc.id)}
                        className="hover:bg-blue-200 rounded-full p-1"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
                {selectedDataCenters.length < 3 && (
                  <select
                    onChange={(e) => {
                      const dc = dataCenters.find(d => d.id === e.target.value);
                      if (dc) addDataCenter(dc);
                      e.target.value = '';
                    }}
                    className="px-3 py-1 border border-gray-300 rounded-lg text-sm"
                    value=""
                  >
                    <option value="">Add another...</option>
                    {dataCenters
                      .filter(dc => !selectedDataCenters.find(selected => selected.id === dc.id))
                      .map(dc => (
                        <option key={dc.id} value={dc.id}>{dc.name}</option>
                      ))}
                  </select>
                )}
              </div>

              {/* Comparison Table */}
              <div className="overflow-x-auto">
                <table className="w-full border border-gray-200 rounded-lg">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="py-3 px-4 text-left font-semibold text-gray-900">Feature</th>
                      {selectedDataCenters.map(dc => (
                        <th key={dc.id} className="py-3 px-4 text-center font-semibold text-gray-900 min-w-48">
                          <div>
                            <div className="font-bold">{dc.name}</div>
                            <div className="text-sm font-normal text-gray-600">{dc.location}</div>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {renderComparisonRow('Tier Level', dc => dc.tier)}
                    {renderComparisonRow('Total Space', dc => dc.specifications.totalSpace)}
                    {renderComparisonRow('Power Capacity', dc => dc.specifications.power)}
                    {renderComparisonRow('PUE Rating', dc => dc.sustainability.pue, v => v.toFixed(2))}
                    {renderComparisonRow('Renewable Energy', dc => dc.sustainability.renewableEnergy, v => `${v}%`)}
                    {renderComparisonRow('Capacity Used', dc => dc.capacity.used, v => `${v}%`)}
                    {renderComparisonRow('Available Racks', dc => dc.capacity.availableRacks)}
                    {renderComparisonRow('Bandwidth', dc => dc.connectivity.bandwidth)}
                    {renderComparisonRow('Carriers', dc => dc.connectivity.carriers.length)}
                    {renderComparisonRow('Colocation Price', dc => parseInt(dc.pricing.colocation), v => `$${v}/month`)}
                    {renderComparisonRow('Setup Fee', dc => parseInt(dc.pricing.setup), v => `$${v}`)}
                    {renderComparisonRow('Customer Rating', dc => dc.reviews.rating, v => `${v}/5.0`)}
                    {renderComparisonRow('Total Reviews', dc => dc.reviews.totalReviews)}
                    {renderComparisonRow('Uptime', dc => dc.realTimeData.uptime, v => `${v}%`)}
                    {renderComparisonRow('Temperature', dc => dc.realTimeData.temperature, v => `${v}°C`)}
                    {renderComparisonRow('Network Latency', dc => dc.realTimeData.networkLatency, v => `${v}ms`)}
                  </tbody>
                </table>
              </div>

              {/* Summary */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Comparison Summary</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {selectedDataCenters.map(dc => (
                    <div key={dc.id} className="bg-white rounded-lg p-4 border border-gray-200">
                      <h5 className="font-semibold text-gray-900 mb-2">{dc.name}</h5>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Best for:</span>
                          <span className="font-medium">
                            {dc.sustainability.pue < 1.3 ? 'Efficiency' :
                             dc.reviews.rating > 4.7 ? 'Reliability' :
                             parseInt(dc.pricing.colocation) < 400 ? 'Value' : 'Performance'}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Total Score:</span>
                          <span className="font-medium text-blue-600">
                            {((dc.reviews.rating / 5 * 40) + 
                              (dc.realTimeData.uptime - 99) * 20 + 
                              (2 - dc.sustainability.pue) * 20 + 
                              (100 - dc.capacity.used) / 5).toFixed(1)}/100
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ComparisonTool;