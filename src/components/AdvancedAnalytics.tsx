import React from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Area, AreaChart } from 'recharts';
import { TrendingUp, Globe, Zap, Leaf, Shield, Star } from 'lucide-react';
import { DataCenter } from '../types/DataCenter';

interface AdvancedAnalyticsProps {
  dataCenters: DataCenter[];
}

const AdvancedAnalytics: React.FC<AdvancedAnalyticsProps> = ({ dataCenters }) => {
  // Tier distribution
  const tierData = dataCenters.reduce((acc, dc) => {
    acc[dc.tier] = (acc[dc.tier] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const tierChartData = Object.entries(tierData).map(([tier, count]) => ({
    tier,
    count,
    percentage: (count / dataCenters.length * 100).toFixed(1)
  }));

  // Regional distribution
  const regionData = dataCenters.reduce((acc, dc) => {
    acc[dc.country] = (acc[dc.country] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const regionChartData = Object.entries(regionData).map(([country, count]) => ({
    country,
    count
  }));

  // Capacity analysis
  const capacityData = dataCenters.map(dc => ({
    name: dc.name.split(' ')[0],
    used: dc.capacity.used,
    available: 100 - dc.capacity.used,
    power: parseInt(dc.specifications.power)
  }));

  // Sustainability metrics
  const sustainabilityData = dataCenters.map(dc => ({
    name: dc.name.split(' ')[0],
    pue: dc.sustainability.pue,
    renewable: dc.sustainability.renewableEnergy,
    rating: dc.reviews.rating
  }));

  // Pricing analysis
  const pricingData = dataCenters.map(dc => ({
    name: dc.name.split(' ')[0],
    colocation: parseInt(dc.pricing.colocation),
    dedicated: parseInt(dc.pricing.dedicatedServer),
    cloud: parseFloat(dc.pricing.cloudHosting) * 100 // Convert to per 100 hours for better visualization
  }));

  const COLORS = ['#2563eb', '#059669', '#dc2626', '#f59e0b', '#8b5cf6', '#06b6d4'];

  const averageMetrics = {
    pue: (dataCenters.reduce((sum, dc) => sum + dc.sustainability.pue, 0) / dataCenters.length).toFixed(2),
    renewable: (dataCenters.reduce((sum, dc) => sum + dc.sustainability.renewableEnergy, 0) / dataCenters.length).toFixed(1),
    rating: (dataCenters.reduce((sum, dc) => sum + dc.reviews.rating, 0) / dataCenters.length).toFixed(1),
    uptime: (dataCenters.reduce((sum, dc) => sum + dc.realTimeData.uptime, 0) / dataCenters.length).toFixed(2),
    capacity: (dataCenters.reduce((sum, dc) => sum + dc.capacity.used, 0) / dataCenters.length).toFixed(1)
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2 mb-6">
        <TrendingUp className="h-6 w-6 text-blue-500" />
        <h2 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h2>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Globe className="h-4 w-4 text-blue-500" />
            <span className="text-sm font-medium text-gray-600">Total Facilities</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">{dataCenters.length}</div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Leaf className="h-4 w-4 text-green-500" />
            <span className="text-sm font-medium text-gray-600">Avg PUE</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">{averageMetrics.pue}</div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="h-4 w-4 text-orange-500" />
            <span className="text-sm font-medium text-gray-600">Renewable %</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">{averageMetrics.renewable}%</div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Star className="h-4 w-4 text-yellow-500" />
            <span className="text-sm font-medium text-gray-600">Avg Rating</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">{averageMetrics.rating}/5</div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="h-4 w-4 text-purple-500" />
            <span className="text-sm font-medium text-gray-600">Avg Uptime</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">{averageMetrics.uptime}%</div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tier Distribution */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Tier Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={tierChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ tier, percentage }) => `${tier} (${percentage}%)`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {tierChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Regional Distribution */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Regional Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={regionChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="country" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#2563eb" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Capacity Analysis */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Capacity Utilization</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={capacityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="used" stackId="a" fill="#ef4444" name="Used %" />
                <Bar dataKey="available" stackId="a" fill="#10b981" name="Available %" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sustainability Metrics */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Sustainability vs Rating</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sustainabilityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="renewable" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.6} name="Renewable %" />
                <Line type="monotone" dataKey="rating" stroke="#f59e0b" strokeWidth={3} name="Rating" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Pricing Comparison */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Pricing Comparison</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={pricingData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value, name) => [
                name === 'cloud' ? `$${(value / 100).toFixed(2)}/hour` : `$${value}`,
                name === 'colocation' ? 'Colocation/month' :
                name === 'dedicated' ? 'Dedicated Server/month' : 'Cloud Hosting/hour'
              ]} />
              <Bar dataKey="colocation" fill="#2563eb" name="colocation" />
              <Bar dataKey="dedicated" fill="#059669" name="dedicated" />
              <Bar dataKey="cloud" fill="#f59e0b" name="cloud" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Market Insights */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Market Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">Most Efficient</h4>
            <p className="text-sm text-blue-800">
              {dataCenters.reduce((min, dc) => dc.sustainability.pue < min.sustainability.pue ? dc : min).name} 
              with PUE of {Math.min(...dataCenters.map(dc => dc.sustainability.pue))}
            </p>
          </div>
          
          <div className="p-4 bg-green-50 rounded-lg">
            <h4 className="font-semibold text-green-900 mb-2">Highest Rated</h4>
            <p className="text-sm text-green-800">
              {dataCenters.reduce((max, dc) => dc.reviews.rating > max.reviews.rating ? dc : max).name} 
              with {Math.max(...dataCenters.map(dc => dc.reviews.rating))}/5 rating
            </p>
          </div>
          
          <div className="p-4 bg-orange-50 rounded-lg">
            <h4 className="font-semibold text-orange-900 mb-2">Best Value</h4>
            <p className="text-sm text-orange-800">
              {dataCenters.reduce((min, dc) => parseInt(dc.pricing.colocation) < parseInt(min.pricing.colocation) ? dc : min).name} 
              at ${Math.min(...dataCenters.map(dc => parseInt(dc.pricing.colocation)))}/month
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedAnalytics;