import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { format } from 'date-fns';
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  Package, 
  Weight, 
  Ship, 
  Edit, 
  RefreshCw,
  Navigation,
  Clock,
  Route,
  Truck,
  CheckCircle,
  AlertTriangle,
  X
} from 'lucide-react';
import { fetchShipmentById, updateShipmentLocation, fetchShipmentETA, updateShipmentStatus } from '../store/slices/shipmentSlice';
import ShipmentMap from '../components/Maps/ShipmentMap';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import SuccessModal from '../components/UI/SuccessModal';
import { useTranslation } from 'react-i18next';

const ShipmentDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentShipment, loading, error, etaData } = useSelector(state => state.shipments);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [newLocation, setNewLocation] = useState({ name: '', latitude: '', longitude: '' });
  const [showStatusUpdate, setShowStatusUpdate] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    if (id) {
      dispatch(fetchShipmentById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (error) {
      toast.error(`Error: ${error}`);
    }
  }, [error]);

  const handleUpdateLocation = async (e) => {
    e.preventDefault();
    if (!newLocation.name || !newLocation.latitude || !newLocation.longitude) {
      toast.error('Please fill all location fields');
      return;
    }

    // Validate coordinates
    const lat = parseFloat(newLocation.latitude);
    const lng = parseFloat(newLocation.longitude);
    
    if (lat < -90 || lat > 90) {
      toast.error('Latitude must be between -90 and 90 degrees');
      return;
    }
    
    if (lng < -180 || lng > 180) {
      toast.error('Longitude must be between -180 and 180 degrees');
      return;
    }

    setUpdateLoading(true);
    try {
      const result = await dispatch(updateShipmentLocation({
        id,
        locationData: {
          name: newLocation.name,
          coordinates: {
            latitude: lat,
            longitude: lng
          }
        }
      })).unwrap();
      
      // Show appropriate success message based on status
      if (result.status === 'delivered') {
        toast.success('🎉 Shipment has been delivered!');
      } else if (result.isAtDestination) {
        toast.success('📍 Shipment has reached destination area!');
      } else {
        toast.success('📍 Location updated successfully!');
      }
      
      // Refresh ETA data to get updated stats
      await dispatch(fetchShipmentETA(id));
      
      setShowSuccess(true);
      setShowUpdateForm(false);
      setNewLocation({ name: '', latitude: '', longitude: '' });
    } catch (error) {
      toast.error('Failed to update location');
    } finally {
      setUpdateLoading(false);
    }
  };

  const handleStatusUpdate = async (newStatus) => {
    try {
      await dispatch(updateShipmentStatus({ id, status: newStatus })).unwrap();
      toast.success(`Status updated to ${newStatus.replace('-', ' ').toUpperCase()}`);
      setShowStatusUpdate(false);
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const handleGetETA = async () => {
    try {
      await dispatch(fetchShipmentETA(id));
      toast.success('ETA information updated!');
    } catch (error) {
      toast.error('Failed to refresh ETA');
    }
  };

  // Auto-refresh ETA when component mounts and when shipment updates
  useEffect(() => {
    if (currentShipment && id) {
      dispatch(fetchShipmentETA(id));
    }
  }, [dispatch, id, currentShipment?.currentLocation]);

  if (loading) return <LoadingSpinner message={t('Loading shipment details...')} />;
  if (!currentShipment) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-4">{t('Shipment not found')}</h2>
        <Link to="/" className="btn-primary">{t('Back to Dashboard')}</Link>
      </div>
    </div>
  );

  const getStatusConfig = (status) => {
    switch (status) {
      case 'pending':
        return { class: 'status-pending', icon: Clock };
      case 'in-transit':
        return { class: 'status-in-transit', icon: Ship };
      case 'delivered':
        return { class: 'status-delivered', icon: Package };
      case 'delayed':
        return { class: 'status-delayed', icon: Calendar };
      default:
        return { class: 'bg-gray-500/20 text-gray-400 border border-gray-500/30', icon: Package };
    }
  };

  const statusConfig = getStatusConfig(currentShipment.status);
  const StatusIcon = statusConfig.icon;

  return (
    <div className="min-h-screen p-4 lg:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 lg:mb-8">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-theme-muted hover:text-theme-main transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>{t('Back to Dashboard')}</span>
          </Link>
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold gradient-text mb-2">
                {t('Shipment Details')}
              </h1>
              <p className="text-theme-muted">{t('Real-time tracking and management')}</p>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
              <button
                onClick={handleGetETA}
                className="flex items-center justify-center space-x-2 btn-secondary px-4 py-2 border border-gray-700/50"
              >
                <RefreshCw className="h-4 w-4" />
                <span>{t('Refresh ETA')}</span>
              </button>
              
              <button
                onClick={() => setShowUpdateForm(!showUpdateForm)}
                className="flex items-center justify-center space-x-2 btn-primary px-4 py-2"
              >
                <Edit className="h-4 w-4" />
                <span>{t('Update Location')}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mb-6 lg:mb-8">
          {/* Shipment Info Card */}
          <div className="glass-effect rounded-2xl p-4 lg:p-6 border border-white/10">
            <h2 className="text-lg lg:text-xl font-semibold text-theme-main mb-4 lg:mb-6 flex items-center space-x-2">
              <Package className="h-5 w-5 text-blue-400" />
              <span>{t('Shipment Information')}</span>
            </h2>
            
            <div className="space-y-3 lg:space-y-4">
              {[{
                label: t('Shipment ID'),
                value: currentShipment.shipmentId
              },
              {
                label: t('Container ID'),
                value: currentShipment.containerId
              },
              {
                label: t('Cargo'),
                value: currentShipment.cargo
              },
              {
                label: t('Weight'),
                value: `${currentShipment.weight} kg`
              },
              {
                label: t('Created'),
                value: format(new Date(currentShipment.createdAt), 'MMM dd, yyyy HH:mm')
              },
              {
                label: t('Status'),
                value: (
                  <span className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-medium ${statusConfig.class}`}>
                    <StatusIcon className="h-3 w-3" />
                    <span>{t(currentShipment.status === 'in-transit' ? 'In Transit' : currentShipment.status.charAt(0).toUpperCase() + currentShipment.status.slice(1))}</span>
                  </span>
                )
              }].map((item, index) => (
                <div
                  key={item.label}
                  className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 border-b border-white/5 space-y-1 sm:space-y-0"
                >
                  <span className="text-theme-muted text-sm">{item.label}</span>
                  <span className="text-theme-main font-medium text-sm lg:text-base">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Location Info Card */}
          <div className="glass-effect rounded-2xl p-4 lg:p-6 border border-white/10">
            <h2 className="text-lg lg:text-xl font-semibold text-theme-main mb-4 lg:mb-6 flex items-center space-x-2">
              <Navigation className="h-5 w-5 text-green-400" />
              <span>{t('Location Information')}</span>
            </h2>
            
            <div className="space-y-4 lg:space-y-6">
              <div className="p-3 lg:p-4 bg-green-500/10 rounded-xl border border-green-500/20">
                <h3 className="text-green-400 font-medium mb-2 flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>{t('Current Location')}</span>
                </h3>
                <p className="text-theme-main font-semibold text-sm lg:text-base">{currentShipment.currentLocation.name}</p>
                <p className="text-theme-muted text-xs lg:text-sm mt-1">
                  {currentShipment.currentLocation.coordinates.latitude.toFixed(4)}, 
                  {currentShipment.currentLocation.coordinates.longitude.toFixed(4)}
                </p>
              </div>
              
              <div className="p-3 lg:p-4 bg-red-500/10 rounded-xl border border-red-500/20">
                <h3 className="text-red-400 font-medium mb-2 flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>{t('Destination')}</span>
                </h3>
                <p className="text-theme-main font-semibold text-sm lg:text-base">{currentShipment.destination.name}</p>
                <p className="text-theme-muted text-xs lg:text-sm mt-1">
                  {currentShipment.destination.coordinates.latitude.toFixed(4)}, 
                  {currentShipment.destination.coordinates.longitude.toFixed(4)}
                </p>
              </div>
              
              <div className="p-3 lg:p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
                <h3 className="text-blue-400 font-medium mb-2 flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>{t('Estimated Arrival')}</span>
                </h3>
                <p className="text-theme-main font-semibold text-sm lg:text-base">
                  {format(new Date(currentShipment.estimatedArrival), 'MMM dd, yyyy HH:mm')}
                </p>
              </div>
            </div>
          </div>

          {/* ETA Info Card */}
          <div className="glass-effect rounded-2xl p-4 lg:p-6 border border-white/10">
            <h2 className="text-lg lg:text-xl font-semibold text-theme-main mb-4 lg:mb-6 flex items-center space-x-2">
              <Route className="h-5 w-5 text-purple-400" />
              <span>{t('Journey Progress')}</span>
            </h2>
            
            {etaData ? (
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl lg:text-3xl font-bold text-theme-main mb-2">
                    {etaData.distanceRemaining?.toFixed(0)} km
                  </div>
                  <p className="text-theme-muted">{t('Distance remaining')}</p>
                </div>
                
                <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-1000"
                    style={{ width: `${etaData.progressPercentage || 0}%` }}
                  ></div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-sm text-theme-muted">{t('Progress')}</p>
                    <p className="font-semibold text-theme-main">{etaData.progressPercentage || 0}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-theme-muted">{t('Avg Speed')}</p>
                    <p className="font-semibold text-theme-main">{etaData.averageSpeed || 0} km/h</p>
                  </div>
                </div>
                
                <div className="text-center">
                  <p className="text-sm text-theme-muted">{t('Distance Covered')}</p>
                  <p className="font-semibold text-theme-main">{etaData.totalDistanceCovered?.toFixed(0) || 0} km</p>
                </div>
                
                {etaData.estimatedRemainingTime && (
                  <div className="text-center">
                    <p className="text-sm text-theme-muted">{t('Est. Time Remaining')}</p>
                    <p className="font-semibold text-theme-main">{etaData.estimatedRemainingTime} hours</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center text-theme-muted">
                <Route className="h-8 lg:h-12 w-8 lg:w-12 mx-auto mb-4 opacity-50" />
                <p className="text-sm lg:text-base">{t('Click "Refresh ETA" to get journey information')}</p>
              </div>
            )}
          </div>
        </div>

        {/* Status Update Section */}
        {currentShipment.status !== 'delivered' && (
          <div className="mb-6 lg:mb-8">
            <div className="glass-effect rounded-2xl p-4 lg:p-6 border border-white/10">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                <div>
                  <h2 className="text-lg lg:text-xl font-semibold text-theme-main mb-2 flex items-center space-x-2">
                    <Truck className="h-5 w-5 text-blue-400" />
                    <span>{t('Status Management')}</span>
                  </h2>
                  <p className="text-theme-muted text-sm">{t('Current status')}: <span className="text-theme-main font-medium">{currentShipment.status.replace('-', ' ').toUpperCase()}</span></p>
                </div>
                
                <button
                  onClick={() => setShowStatusUpdate(!showStatusUpdate)}
                  className="btn-secondary border border-gray-700/50"
                >
                  {t('Update Status')}
                </button>
              </div>
              
              {showStatusUpdate && (
                <div className="mt-6 pt-6 border-t border-white/10">
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                    {['in-transit', 'delayed', 'delivered'].map((status) => (
                      <button
                        key={status}
                        onClick={() => handleStatusUpdate(status)}
                        disabled={status === currentShipment.status}
                        className={`p-4 rounded-xl border transition-all duration-200 ${
                          status === currentShipment.status
                            ? 'bg-gray-600/20 border-gray-600/30 text-gray-500 cursor-not-allowed'
                            : status === 'delivered'
                            ? 'bg-green-600/20 border-green-500/30 text-green-400 hover:bg-green-500/30'
                            : status === 'delayed'
                            ? 'bg-red-600/20 border-red-500/30 text-red-400 hover:bg-red-500/30'
                            : 'bg-blue-600/20 border-blue-500/30 text-blue-400 hover:bg-blue-500/30'
                        }`}
                      >
                        <div className="flex items-center justify-center space-x-2">
                          {status === 'delivered' && <CheckCircle className="h-4 w-4" />}
                          {status === 'delayed' && <AlertTriangle className="h-4 w-4" />}
                          {status === 'in-transit' && <Truck className="h-4 w-4" />}
                          <span className="font-medium capitalize">{t(status === 'in-transit' ? 'In Transit' : status.charAt(0).toUpperCase() + status.slice(1))}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Update Location Modal */}
        {showUpdateForm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
            <div className="glass-effect rounded-2xl border border-yellow-500/20 max-w-md w-full max-h-[80vh] overflow-hidden relative flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <h2 className="text-xl font-semibold text-theme-main flex items-center space-x-2">
                  <Edit className="h-5 w-5 text-yellow-400" />
                  <span>{t('Update Current Location')}</span>
                </h2>
                <button
                  onClick={() => setShowUpdateForm(false)}
                  className="text-theme-muted hover:text-theme-main transition-colors p-1"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-6">
                {/* Current Location Display */}
                <div className="mb-4 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                  <p className="text-blue-400 text-sm font-medium mb-1">{t('Current Location')}:</p>
                  <p className="text-theme-main text-sm">{currentShipment.currentLocation.name}</p>
                  <p className="text-theme-muted text-xs">
                    {currentShipment.currentLocation.coordinates.latitude.toFixed(4)}, 
                    {currentShipment.currentLocation.coordinates.longitude.toFixed(4)}
                  </p>
                </div>

                {/* Distance to Destination Info */}
                {etaData && (
                  <div className="mb-4 p-3 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                    <p className="text-purple-400 text-sm font-medium mb-1">{t('Journey Info')}:</p>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-theme-muted">{t('Distance Left')}:</span>
                        <span className="text-theme-main ml-1">{etaData.distanceRemaining?.toFixed(0)} km</span>
                      </div>
                      <div>
                        <span className="text-theme-muted">{t('Progress')}:</span>
                        <span className="text-theme-main ml-1">{etaData.progressPercentage}%</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Warning for destination proximity */}
                {etaData?.distanceRemaining <= 10 && (
                  <div className="mb-4 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                    <p className="text-green-400 text-sm">
                      🎯 {t('Shipment is close to destination! Updating location within 5km will mark it as delivered.')}
                    </p>
                  </div>
                )}
                
                {/* Form Fields */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-theme-secondary mb-2">{t('New Location Name')} *</label>
                    <input
                      type="text"
                      value={newLocation.name}
                      onChange={(e) => setNewLocation({...newLocation, name: e.target.value})}
                      placeholder={t('e.g., Port of Singapore')}
                      className="input-field w-full"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-theme-secondary mb-2">{t('Latitude')} *</label>
                      <input
                        type="number"
                        step="any"
                        value={newLocation.latitude}
                        onChange={(e) => setNewLocation({...newLocation, latitude: e.target.value})}
                        placeholder={t('e.g., 1.3521')}
                        className="input-field w-full"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-theme-secondary mb-2">{t('Longitude')} *</label>
                      <input
                        type="number"
                        step="any"
                        value={newLocation.longitude}
                        onChange={(e) => setNewLocation({...newLocation, longitude: e.target.value})}
                        placeholder={t('e.g., 103.8198')}
                        className="input-field w-full"
                        required
                      />
                    </div>
                  </div>

                  {/* Quick Location Suggestions */}
                  <div className="space-y-2">
                    <p className="text-sm text-theme-muted">{t('Quick Locations')}:</p>
                    <div className="grid grid-cols-1 gap-2 max-h-32 overflow-y-auto border border-gray-700/30 rounded-lg p-2">
                      {/*
                        For production, you might want to remove these hardcoded values
                        and instead provide a way for users to select from real locations
                      */}
                      {[
                        { name: t("Singapore Port"), lat: 1.3521, lng: 103.8198 },
                        { name: t("Mumbai Port"), lat: 19.0760, lng: 72.8777 },
                        { name: t("New York Port"), lat: 40.7128, lng: -74.0060 },
                        { name: t("London Port"), lat: 51.5074, lng: -0.1278 }
                      ].map((loc) => (
                        <button
                          key={loc.name}
                          type="button"
                          onClick={() => setNewLocation({
                            name: loc.name,
                            latitude: loc.lat.toString(),
                            longitude: loc.lng.toString()
                          })}
                          className="text-left p-2 text-xs bg-gray-700/30 hover:bg-gray-600/30 rounded text-theme-secondary hover:text-theme-main transition-colors"
                        >
                          {loc.name} ({loc.lat}, {loc.lng})
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Fixed Footer with Buttons */}
              <div className="p-6 border-t border-white/10 bg-gray-900/95 backdrop-blur-sm">
                <form onSubmit={handleUpdateLocation}>
                  <div className="flex space-x-4">
                    <button
                      type="button"
                      onClick={() => setShowUpdateForm(false)}
                      className="flex-1 btn-secondary border border-gray-700/50 py-3"
                      disabled={updateLoading}
                    >
                      {t('Cancel')}
                    </button>
                    <button
                      type="submit"
                      className="flex-1 btn-primary disabled:opacity-50 py-3"
                      disabled={updateLoading}
                    >
                      {updateLoading ? (
                        <div className="flex items-center justify-center space-x-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          <span>{t('Updating...')}</span>
                        </div>
                      ) : (
                        t('Update Location')
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Map Section */}
        <div className="glass-effect rounded-2xl p-4 lg:p-6 border border-white/10">
          <h2 className="text-lg lg:text-xl font-semibold text-theme-main mb-4 lg:mb-6 flex items-center space-x-2">
            <MapPin className="h-5 w-5 text-blue-400" />
            <span>{t('Route Map')}</span>
          </h2>
          
          <div className="rounded-xl overflow-hidden">
            <ShipmentMap shipment={currentShipment} height={window.innerWidth < 768 ? 300 : 500} />
          </div>
        </div>
      </div>

      {/* Enhanced Success Modal */}
      <SuccessModal
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        title={currentShipment?.status === 'delivered' ? "🎉 Shipment Delivered!" : "📍 Location Updated!"}
        message={
          currentShipment?.status === 'delivered' 
            ? "The shipment has reached its destination and has been marked as delivered."
            : `Location updated successfully! ${etaData ? `Distance remaining: ${etaData.distanceRemaining?.toFixed(0)} km` : ''}`
        }
        actionButton={
          <button
            onClick={() => setShowSuccess(false)}
            className="btn-primary w-full"
          >
            {t('Continue Tracking')}
          </button>
        }
      />
    </div>
  );
};

export default ShipmentDetail;
