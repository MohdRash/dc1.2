import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Activity, Thermometer, Droplets, Zap, Wifi, TrendingUp } from 'lucide-react';
import { DataCenter } from '../types/DataCenter';

interface RealTimeMonitoringProps {
  dataCenter: DataCenter;
}

const RealTimeMonitoring: React.FC<RealTimeMonitoringProps> = ({ dataCenter }) => {
  // Generate sample historical data
  const generateHistoricalData = (baseValue: number, variance: number = 5) => {
    return Array.from({ length: 24 }, (_, i) => ({
      hour: `${i}:00`,
      value: baseValue + (Math.random() - 0.5) * variance
    }));
  };

  const temperatureData = generateHistoricalData(dataCenter.realTimeData.temperature, 2);
  const powerData = generateHistoricalData(dataCenter.realTimeData.powerUsage, 3);
  const latencyData = generateHistoricalData(dataCenter.realTimeData.networkLatency, 1);

  const getStatusColor = (value: number, thresholds: { good: number; warning: number }) => {
    if (value <= thresholds.good) return 'text-green-600 bg-green-50';
    if (value <= thresholds.warning) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const metrics = [
    {
      icon: Thermometer,
      label: 'Temperature',
      value: `${dataCenter.realTimeData.temperature}°C`,
      status: getStatusColor(dataCenter.realTimeData.temperature, { good: 23, warning: 25 }),
      data: temperatureData,
      color: '#ef4444'
    },
    {
      icon: Droplets,
      label: 'Humidity',
      value: `${dataCenter.realTimeData.humidity}%`,
      status: getStatusColor(dataCenter.realTimeData.humidity, { good: 50, warning: 60 }),
      color: '#3b82f6'
    },
    {
      icon: Zap,
      label: 'Power Usage',
      value: `${dataCenter.realTimeData.powerUsage} MW`,
      status: getStatusColor(dataCenter.realTimeData.powerUsage, { good: 20, warning: 30 }),
      data: powerData,
      color: '#f59e0b'
    },
    {
      icon: Wifi,
      label: 'Network Latency',
      value: `${dataCenter.realTimeData.networkLatency} ms`,
      status: getStatusColor(dataCenter.realTimeData.networkLatency, { good: 3, warning: 5 }),
      data: latencyData,
      color: '#8b5cf6'
    },
    {
      icon: Activity,
      label: 'Uptime',
      value: `${dataCenter.realTimeData.uptime}%`,
      status: 'text-green-600 bg-green-50',
      color: '#10b981'
    },
    {
      icon: TrendingUp,
      label: 'PUE',
      value: dataCenter.sustainability.pue.toString(),
      status: getStatusColor(dataCenter.sustainability.pue, { good: 1.3, warning: 1.5 }),
      color: '#06b6d4'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <Activity className="h-6 w-6 text-blue-500" />
        <h3 className="text-xl font-semibold text-gray-900">Real-Time Monitoring</h3>
        <div className="ml-auto flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-600">Live Data</span>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {metrics.map((metric, index) => (
          <div key={index} className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <metric.icon className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">{metric.label}</span>
              </div>
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${metric.status}`}>
                {metric.value}
              </div>
            </div>
            {metric.data && (
              <div className="h-16 mt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={metric.data}>
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke={metric.color} 
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Detailed Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Temperature Trend (24h)</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={temperatureData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#ef4444" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Power Consumption (24h)</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={powerData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#f59e0b" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Alerts and Notifications */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">System Alerts</h4>
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm text-green-800">All systems operating normally</span>
            <span className="text-xs text-green-600 ml-auto">2 min ago</span>
          </div>
          <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-sm text-blue-800">Scheduled maintenance window: Jan 20, 2:00 AM - 4:00 AM</span>
            <span className="text-xs text-blue-600 ml-auto">1 hour ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealTimeMonitoring;