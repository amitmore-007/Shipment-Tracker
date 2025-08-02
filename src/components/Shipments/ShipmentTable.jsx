import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { Eye, Package, MapPin, Calendar, Truck } from 'lucide-react';

const ShipmentTable = ({ shipments }) => {
  const getStatusConfig = (status) => {
    switch (status) {
      case 'pending':
        return { class: 'status-pending', icon: Package };
      case 'in-transit':
        return { class: 'status-in-transit', icon: Truck };
      case 'delivered':
        return { class: 'status-delivered', icon: MapPin };
      case 'delayed':
        return { class: 'status-delayed', icon: Calendar };
      default:
        return { class: 'bg-gray-500/20 text-gray-400 border border-gray-500/30', icon: Package };
    }
  };

  if (shipments.length === 0) {
    return (
      <div className="glass-card p-16 text-center border border-white/10">
        <div className="mb-8">
          <div className="mx-auto w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl">
            <Package className="h-12 w-12 text-white" />
          </div>
        </div>
        
        <h3 className="text-3xl font-bold text-theme-main mb-4">
          No shipments found
        </h3>
        
        <p className="text-xl text-theme-muted mb-8 max-w-md mx-auto">
          Get started by creating your first shipment to begin tracking
        </p>
        
        <Link
          to="/create-shipment"
          className="inline-flex items-center space-x-3 btn-primary px-8 py-4 text-lg font-semibold"
        >
          <Package className="h-5 w-5" />
          <span>Create First Shipment</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="glass-card overflow-hidden border border-white/10">
      {/* Table Header */}
      <div className="bg-gradient-to-r from-gray-800/60 to-gray-900/60 px-6 py-4 border-b border-white/10">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-theme-main flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
              <Package className="h-4 w-4 text-white" />
            </div>
            <span>Shipments Overview</span>
          </h2>
          <div className="text-sm text-theme-muted bg-gray-800/50 px-3 py-1 rounded-full">
            {shipments.length} total
          </div>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-800/30 border-b border-white/5">
              <tr>
                {['Shipment ID', 'Container', 'Current Location', 'Destination', 'ETA', 'Status', 'Cargo', 'Actions'].map((header) => (
                  <th
                    key={header}
                    className="px-4 py-4 text-left text-sm font-bold text-theme-secondary tracking-wider uppercase whitespace-nowrap"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {shipments.map((shipment) => {
                const statusConfig = getStatusConfig(shipment.status);
                const StatusIcon = statusConfig.icon;
                
                return (
                  <tr
                    key={shipment._id}
                    className="hover:bg-white/5 transition-colors group"
                  >
                    <td className="px-4 py-4">
                      <Link
                        to={`/shipment/${shipment.shipmentId}`}
                        className="text-blue-400 hover:text-blue-300 font-semibold transition-colors group-hover:underline"
                      >
                        {shipment.shipmentId}
                      </Link>
                    </td>
                    <td className="px-4 py-4 text-theme-secondary font-medium">{shipment.containerId}</td>
                    <td className="px-4 py-4 text-theme-secondary max-w-32 truncate">{shipment.currentLocation.name}</td>
                    <td className="px-4 py-4 text-theme-secondary max-w-32 truncate">{shipment.destination.name}</td>
                    <td className="px-4 py-4 text-theme-secondary font-mono text-sm whitespace-nowrap">
                      {format(new Date(shipment.estimatedArrival), 'MMM dd, HH:mm')}
                    </td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-semibold ${statusConfig.class}`}>
                        <StatusIcon className="h-3 w-3" />
                        <span>{shipment.status.replace('-', ' ').toUpperCase()}</span>
                      </span>
                    </td>
                    <td className="px-4 py-4 text-theme-secondary max-w-32 truncate">{shipment.cargo}</td>
                    <td className="px-4 py-4">
                      <Link
                        to={`/shipment/${shipment.shipmentId}`}
                        className="inline-flex items-center space-x-2 px-3 py-2 bg-blue-600/20 hover:bg-blue-500/30 text-blue-400 rounded-lg transition-all duration-200 border border-blue-500/30 hover:border-blue-400/50 font-medium text-sm whitespace-nowrap"
                      >
                        <Eye className="h-4 w-4" />
                        <span>View</span>
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden space-y-4 p-4">
        {shipments.map((shipment) => {
          const statusConfig = getStatusConfig(shipment.status);
          const StatusIcon = statusConfig.icon;
          
          return (
            <div
              key={shipment._id}
              className="glass-effect rounded-xl p-4 border border-white/10 hover:border-white/20 transition-all duration-200"
            >
              <div className="flex justify-between items-start mb-3">
                <Link
                  to={`/shipment/${shipment.shipmentId}`}
                  className="text-blue-400 hover:text-blue-300 font-bold text-lg"
                >
                  {shipment.shipmentId}
                </Link>
                <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-semibold ${statusConfig.class}`}>
                  <StatusIcon className="h-3 w-3" />
                  <span>{shipment.status.replace('-', ' ').toUpperCase()}</span>
                </span>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-theme-muted">Container:</span>
                  <span className="text-theme-secondary font-medium">{shipment.containerId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-theme-muted">From:</span>
                  <span className="text-theme-secondary text-right truncate ml-2">{shipment.currentLocation.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-theme-muted">To:</span>
                  <span className="text-theme-secondary text-right truncate ml-2">{shipment.destination.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-theme-muted">Cargo:</span>
                  <span className="text-theme-secondary text-right truncate ml-2">{shipment.cargo}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-theme-muted">ETA:</span>
                  <span className="text-theme-secondary font-mono text-right">{format(new Date(shipment.estimatedArrival), 'MMM dd, HH:mm')}</span>
                </div>
              </div>
              
              <Link
                to={`/shipment/${shipment.shipmentId}`}
                className="flex items-center justify-center space-x-2 w-full px-4 py-2 bg-blue-600/20 hover:bg-blue-500/30 text-blue-400 rounded-lg transition-all duration-200 border border-blue-500/30 hover:border-blue-400/50 font-semibold mt-4"
              >
                <Eye className="h-4 w-4" />
                <span>View Details</span>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ShipmentTable;

