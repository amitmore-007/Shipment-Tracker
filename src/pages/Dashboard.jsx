import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { RefreshCw, Plus, Filter, TrendingUp, Package, Ship, MapPin, Edit, Trash2, X, Eye } from 'lucide-react';
import { fetchShipments, setFilters, updateShipment, deleteShipment } from '../store/slices/shipmentSlice';
import ShipmentTable from '../components/Shipments/ShipmentTable';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import { useTranslation } from 'react-i18next';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { shipments, loading, error, filters } = useSelector(state => state.shipments);
  const [localFilters, setLocalFilters] = useState(filters);
  const [showFilters, setShowFilters] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedShipment, setSelectedShipment] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [editLoading, setEditLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(fetchShipments(filters));
  }, [dispatch, filters]);

  useEffect(() => {
    if (error) {
      toast.error(`Error: ${error}`);
    }
  }, [error]);

  const handleFilterChange = (newFilters) => {
    setLocalFilters(newFilters);
    dispatch(setFilters(newFilters));
  };

  const handleRefresh = () => {
    dispatch(fetchShipments(filters));
    toast.success(t('Shipments refreshed successfully!'));
  };

  const stats = {
    total: shipments.length,
    pending: shipments.filter(s => s.status === 'pending').length,
    inTransit: shipments.filter(s => s.status === 'in-transit').length,
    delivered: shipments.filter(s => s.status === 'delivered').length,
  };

  if (loading) return <LoadingSpinner message={t('Loading dashboard...')} />;

  const statCards = [
    {
      label: t('Total Shipments'),
      value: stats.total,
      icon: Package,
      gradient: 'from-blue-500 to-blue-700',
      bgGradient: 'from-blue-500/10 to-blue-600/5',
      borderColor: 'border-blue-500/20'
    },
    {
      label: t('Pending'),
      value: stats.pending,
      icon: TrendingUp,
      gradient: 'from-yellow-500 to-orange-600',
      bgGradient: 'from-yellow-500/10 to-yellow-600/5',
      borderColor: 'border-yellow-500/20'
    },
    {
      label: t('In Transit'),
      value: stats.inTransit,
      icon: Ship,
      gradient: 'from-purple-500 to-indigo-600',
      bgGradient: 'from-purple-500/10 to-purple-600/5',
      borderColor: 'border-purple-500/20'
    },
    {
      label: t('Delivered'),
      value: stats.delivered,
      icon: MapPin,
      gradient: 'from-green-500 to-emerald-600',
      bgGradient: 'from-green-500/10 to-green-600/5',
      borderColor: 'border-green-500/20'
    }
  ];

  const filterOptions = [
    {
      label: 'Status',
      value: localFilters.status,
      options: [
        { value: '', label: t('All Statuses') },
        { value: 'pending', label: t('Pending') },
        { value: 'in-transit', label: t('In Transit') },
        { value: 'delivered', label: t('Delivered') },
        { value: 'delayed', label: t('Delayed') }
      ]
    },
    {
      label: 'Sort by',
      value: localFilters.sortBy,
      options: [
        { value: 'createdAt', label: t('Created Date') },
        { value: 'estimatedArrival', label: t('ETA') },
        { value: 'status', label: t('Status') },
        { value: 'containerId', label: t('Container ID') }
      ]
    },
    {
      label: 'Order',
      value: localFilters.order,
      options: [
        { value: 'desc', label: t('Descending') },
        { value: 'asc', label: t('Ascending') }
      ]
    }
  ];

  // Open edit modal and set form values
  const handleEditClick = (shipment) => {
    setSelectedShipment(shipment);
    setEditForm({
      containerId: shipment.containerId,
      cargo: shipment.cargo,
      weight: shipment.weight,
      destinationName: shipment.destination.name,
      destinationLat: shipment.destination.coordinates.latitude,
      destinationLng: shipment.destination.coordinates.longitude,
    });
    setEditModalOpen(true);
  };

  // Handle edit form submit
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setEditLoading(true);
    try {
      await dispatch(updateShipment({
        id: selectedShipment._id,
        updateData: {
          containerId: editForm.containerId,
          cargo: editForm.cargo,
          weight: editForm.weight,
          destination: {
            name: editForm.destinationName,
            coordinates: {
              latitude: parseFloat(editForm.destinationLat),
              longitude: parseFloat(editForm.destinationLng),
            }
          }
        }
      })).unwrap();
      toast.success('Shipment updated successfully!');
      setEditModalOpen(false);
    } catch (err) {
      toast.error('Failed to update shipment');
    } finally {
      setEditLoading(false);
    }
  };

  // Open delete modal
  const handleDeleteClick = (shipment) => {
    setSelectedShipment(shipment);
    setDeleteModalOpen(true);
  };

  // Handle delete confirm
  const handleDeleteConfirm = async () => {
    setDeleteLoading(true);
    try {
      await dispatch(deleteShipment(selectedShipment._id)).unwrap();
      toast.success('Shipment deleted successfully!');
      setDeleteModalOpen(false);
    } catch (err) {
      toast.error('Failed to delete shipment');
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-4 lg:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 lg:mb-12 space-y-6 lg:space-y-0">
          <div className="space-y-2">
            <h1 className="text-4xl lg:text-6xl font-bold gradient-text mb-3">
              {t('Dashboard')}
            </h1>
            <p className="text-lg lg:text-xl text-theme-muted max-w-2xl">
              {t('Monitor and track all your shipments with real-time updates')}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
            <button
              onClick={handleRefresh}
              className="flex items-center justify-center space-x-2 px-4 lg:px-6 py-2 lg:py-3 glass-effect rounded-2xl transition-all duration-300 hover:border-blue-400/50 border border-gray-700/50"
            >
              <RefreshCw className="h-5 w-5 text-blue-400" />
              <span className="text-theme-secondary font-medium">{t('Refresh')}</span>
            </button>

            <Link
              to="/create-shipment"
              className="flex items-center justify-center space-x-2 btn-primary px-4 lg:px-6 py-2 lg:py-3 text-base font-semibold"
            >
              <Plus className="h-5 w-5" />
              <span>{t('New Shipment')}</span>
            </Link>
          </div>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8 mb-8 lg:mb-12">
          {statCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className={`glass-card p-4 lg:p-8 ${stat.borderColor} hover:scale-105 transition-transform duration-200 cursor-pointer`}
              >
                <div className="flex items-center justify-between mb-4 lg:mb-6">
                  <div className="space-y-1">
                    <p className="text-theme-muted text-xs lg:text-sm font-medium tracking-wide uppercase">
                      {stat.label}
                    </p>
                    <p className="text-2xl lg:text-4xl font-bold text-theme-main">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`p-2 lg:p-4 bg-gradient-to-br ${stat.gradient} rounded-xl lg:rounded-2xl shadow-lg`}>
                    <Icon className="h-4 w-4 lg:h-7 lg:w-7 text-white" />
                  </div>
                </div>

                <div className="w-full bg-gray-700/50 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${stat.gradient} rounded-full transition-all duration-1000`}
                    style={{ width: `${Math.min((stat.value / Math.max(stats.total, 1)) * 100, 100)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Filters */}
        <div className="glass-card p-4 lg:p-8 mb-6 lg:mb-8 border border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 lg:mb-6 space-y-4 sm:space-y-0">
            <h2 className="text-xl lg:text-2xl font-bold text-theme-main flex items-center space-x-3">
              <Filter className="h-5 lg:h-6 w-5 lg:w-6 text-blue-400" />
              <span>{t('Filters & Search')}</span>
            </h2>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-center space-x-2 px-4 py-2 glass-effect rounded-xl transition-all duration-300 hover:border-blue-400/50 border border-gray-700/50"
            >
              <Filter className="h-4 w-4 text-blue-400" />
              <span className="text-theme-secondary font-medium">
                {showFilters ? t('Hide Filters') : t('Show Filters')}
              </span>
            </button>
          </div>

          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
              {filterOptions.map((filter, index) => (
                <div key={filter.label} className="space-y-3">
                  <label className="block text-sm font-semibold text-theme-secondary">
                    {filter.label}
                  </label>
                  <select
                    value={filter.value}
                    onChange={(e) => {
                      const key = filter.label.toLowerCase().replace(' ', '');
                      const mapKey = key === 'sortby' ? 'sortBy' : key;
                      handleFilterChange({ ...localFilters, [mapKey]: e.target.value });
                    }}
                    className="input-field w-full text-white bg-white/5"
                  >
                    {filter.options.map(option => (
                      <option key={option.value} value={option.value} className="bg-gray-800 text-white">
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Table with Edit/Delete actions */}
        <div className="glass-card overflow-hidden border border-white/10 mb-8">
          <div className="bg-gradient-to-r from-gray-800/60 to-gray-900/60 px-6 py-4 border-b border-white/10">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-theme-main flex items-center space-x-3">
                <span>{t('Shipments Overview')}</span>
              </h2>
              <div className="text-sm text-theme-muted bg-gray-800/50 px-3 py-1 rounded-full">
                {shipments.length} {t('total')}
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-800/30 border-b border-white/5">
                <tr>
                  <th className="px-4 py-4 text-left text-sm font-bold text-theme-secondary tracking-wider uppercase whitespace-nowrap">{t('Shipment ID')}</th>
                  <th className="px-4 py-4 text-left text-sm font-bold text-theme-secondary tracking-wider uppercase whitespace-nowrap">{t('Container ID')}</th>
                  <th className="px-4 py-4 text-left text-sm font-bold text-theme-secondary tracking-wider uppercase whitespace-nowrap">{t('Cargo')}</th>
                  <th className="px-4 py-4 text-left text-sm font-bold text-theme-secondary tracking-wider uppercase whitespace-nowrap">{t('Weight (kg)')}</th>
                  <th className="px-4 py-4 text-left text-sm font-bold text-theme-secondary tracking-wider uppercase whitespace-nowrap">{t('Destination')}</th>
                  <th className="px-4 py-4 text-left text-sm font-bold text-theme-secondary tracking-wider uppercase whitespace-nowrap">{t('Status')}</th>
                  <th className="px-4 py-4 text-left text-sm font-bold text-theme-secondary tracking-wider uppercase whitespace-nowrap">{t('Actions')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {shipments.map((shipment) => (
                  <tr key={shipment._id} className="hover:bg-white/5 transition-colors group">
                    <td className="px-4 py-4">
                      <Link
                        to={`/shipment/${shipment.shipmentId}`}
                        className="text-blue-400 hover:text-blue-300 font-semibold transition-colors group-hover:underline text-sm"
                      >
                        {shipment.shipmentId}
                      </Link>
                    </td>
                    <td className="px-4 py-4 text-sm font-medium text-theme-main whitespace-nowrap">{shipment.containerId}</td>
                    <td className="px-4 py-4 text-sm text-theme-secondary whitespace-nowrap">{shipment.cargo}</td>
                    <td className="px-4 py-4 text-sm text-theme-secondary whitespace-nowrap">{shipment.weight}</td>
                    <td className="px-4 py-4 text-sm text-theme-secondary whitespace-nowrap">{shipment.destination.name}</td>
                    <td className="px-4 py-4 text-sm whitespace-nowrap">
                      <span className={`text-xs font-semibold rounded-full px-3 py-1 ${shipment.status === 'delivered' ? 'bg-green-500/10 text-green-500' : shipment.status === 'in-transit' ? 'bg-purple-500/10 text-purple-500' : 'bg-yellow-500/10 text-yellow-500'}`}>
                        {t(shipment.status === 'in-transit' ? 'In Transit' : shipment.status.charAt(0).toUpperCase() + shipment.status.slice(1))}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex space-x-2">
                        <button
                          className="p-2 rounded-lg bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-400 transition-colors"
                          title={t('Edit')}
                          onClick={() => handleEditClick(shipment)}
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
                          title={t('Delete')}
                          onClick={() => handleDeleteClick(shipment)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                        <Link
                          to={`/shipment/${shipment.shipmentId}`}
                          className="inline-flex items-center space-x-1 p-2 rounded-lg bg-blue-600/20 hover:bg-blue-500/30 text-blue-400 border border-blue-500/30 hover:border-blue-400/50 transition-all duration-200"
                          title={t('View Details')}
                        >
                          <Eye className="h-4 w-4" />
                          <span className="text-xs font-medium">{t('View')}</span>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Edit Modal */}
        {editModalOpen && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="glass-effect rounded-2xl border border-yellow-500/20 max-w-md w-full relative">
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <h2 className="text-xl font-semibold text-theme-main flex items-center space-x-2">
                  <Edit className="h-5 w-5 text-yellow-400" />
                  <span>{t('Edit Shipment')}</span>
                </h2>
                <button
                  onClick={() => setEditModalOpen(false)}
                  className="text-theme-muted hover:text-theme-main transition-colors p-1"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <form onSubmit={handleEditSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-theme-secondary mb-2">{t('Container ID')}</label>
                  <input
                    type="text"
                    value={editForm.containerId}
                    onChange={e => setEditForm(f => ({ ...f, containerId: e.target.value }))}
                    className="input-field w-full"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-theme-secondary mb-2">{t('Cargo')}</label>
                  <input
                    type="text"
                    value={editForm.cargo}
                    onChange={e => setEditForm(f => ({ ...f, cargo: e.target.value }))}
                    className="input-field w-full"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-theme-secondary mb-2">{t('Weight (kg)')}</label>
                  <input
                    type="number"
                    value={editForm.weight}
                    onChange={e => setEditForm(f => ({ ...f, weight: e.target.value }))}
                    className="input-field w-full"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-theme-secondary mb-2">{t('Destination Name')}</label>
                  <input
                    type="text"
                    value={editForm.destinationName}
                    onChange={e => setEditForm(f => ({ ...f, destinationName: e.target.value }))}
                    className="input-field w-full"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-theme-secondary mb-2">{t('Latitude')}</label>
                    <input
                      type="number"
                      step="any"
                      value={editForm.destinationLat}
                      onChange={e => setEditForm(f => ({ ...f, destinationLat: e.target.value }))}
                      className="input-field w-full"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-theme-secondary mb-2">{t('Longitude')}</label>
                    <input
                      type="number"
                      step="any"
                      value={editForm.destinationLng}
                      onChange={e => setEditForm(f => ({ ...f, destinationLng: e.target.value }))}
                      className="input-field w-full"
                      required
                    />
                  </div>
                </div>
                <div className="flex space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setEditModalOpen(false)}
                    className="flex-1 btn-secondary border border-gray-700/50 py-3"
                    disabled={editLoading}
                  >
                    {t('Cancel')}
                  </button>
                  <button
                    type="submit"
                    className="flex-1 btn-primary disabled:opacity-50 py-3"
                    disabled={editLoading}
                  >
                    {editLoading ? t('Updating...') : t('Update')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Modal */}
        {deleteModalOpen && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="glass-effect rounded-2xl border border-red-500/20 max-w-md w-full relative">
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <h2 className="text-xl font-semibold text-theme-main flex items-center space-x-2">
                  <Trash2 className="h-5 w-5 text-red-400" />
                  <span>{t('Delete Shipment')}</span>
                </h2>
                <button
                  onClick={() => setDeleteModalOpen(false)}
                  className="text-theme-muted hover:text-theme-main transition-colors p-1"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="p-6">
                <p className="text-theme-secondary mb-6">
                  {t('Are you sure you want to delete shipment')} <span className="text-theme-main font-bold">{selectedShipment?.shipmentId}</span>? {t('This action cannot be undone.')}
                </p>
                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => setDeleteModalOpen(false)}
                    className="flex-1 btn-secondary border border-gray-700/50 py-3"
                    disabled={deleteLoading}
                  >
                    {t('Cancel')}
                  </button>
                  <button
                    type="button"
                    onClick={handleDeleteConfirm}
                    className="flex-1 btn-danger disabled:opacity-50 py-3"
                    disabled={deleteLoading}
                  >
                    {deleteLoading ? t('Deleting...') : t('Delete')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ...existing ShipmentTable for mobile, etc... */}
      </div>
    </div>
  );
};

export default Dashboard;
