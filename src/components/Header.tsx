import React from 'react';
import { Database, Globe, Shield, Zap, User } from 'lucide-react';

interface HeaderProps {
  onAdminClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onAdminClick }) => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-500 p-2 rounded-lg">
              <Database className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Data Center</h1>
              <p className="text-sm text-gray-600">Global Data Center Directory & Services</p>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Globe className="h-4 w-4 text-green-500" />
              <span>150+ Locations</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Shield className="h-4 w-4 text-blue-500" />
              <span>Tier 1-4 Certified</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Zap className="h-4 w-4 text-orange-500" />
              <span>99.9% Uptime</span>
            </div>
            </div>
            <button
              onClick={onAdminClick}
              className="flex items-center gap-2 px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <User className="h-4 w-4" />
              Admin
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;