import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { ArrowLeft, Package, MapPin, Weight, Lightbulb, Ship } from 'lucide-react';
import { createShipment } from '../store/slices/shipmentSlice';
import SuccessModal from '../components/UI/SuccessModal';
import { useTranslation } from 'react-i18next';

const CreateShipment = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [createdShipment, setCreatedShipment] = useState(null);
  const [formData, setFormData] = useState({
    containerId: '',
    currentLocationName: '',
    currentLocationLat: '',
    currentLocationLng: '',
    destinationName: '',
    destinationLat: '',
    destinationLng: '',
    cargo: '',
    weight: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validation
    if (!formData.containerId || !formData.currentLocationName || !formData.destinationName || 
        !formData.cargo || !formData.weight) {
      toast.error('Please fill in all required fields');
      setLoading(false);
      return;
    }

    if (!formData.currentLocationLat || !formData.currentLocationLng || 
        !formData.destinationLat || !formData.destinationLng) {
      toast.error('Please provide coordinates for both locations');
      setLoading(false);
      return;
    }

    // Validate coordinate ranges
    const currentLat = parseFloat(formData.currentLocationLat);
    const currentLng = parseFloat(formData.currentLocationLng);
    const destLat = parseFloat(formData.destinationLat);
    const destLng = parseFloat(formData.destinationLng);

    if (currentLat < -90 || currentLat > 90 || destLat < -90 || destLat > 90) {
      toast.error('Latitude must be between -90 and 90 degrees');
      setLoading(false);
      return;
    }

    if (currentLng < -180 || currentLng > 180 || destLng < -180 || destLng > 180) {
      toast.error('Longitude must be between -180 and 180 degrees');
      setLoading(false);
      return;
    }

    try {
      const shipmentData = {
        containerId: formData.containerId,
        currentLocation: {
          name: formData.currentLocationName,
          coordinates: {
            latitude: currentLat,
            longitude: currentLng
          }
        },
        destination: {
          name: formData.destinationName,
          coordinates: {
            latitude: destLat,
            longitude: destLng
          }
        },
        cargo: formData.cargo,
        weight: parseFloat(formData.weight)
      };

      const result = await dispatch(createShipment(shipmentData)).unwrap();
      setCreatedShipment(result);
      setShowSuccess(true);
      toast.success('Shipment created successfully!');
    } catch (error) {
      console.error('Error creating shipment:', error);
      toast.error(error.message || 'Failed to create shipment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen p-6"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>{t('Back to Dashboard')}</span>
          </motion.button>
          
          <div className="text-center">
            <h1 className="text-4xl font-bold gradient-text mb-2">
              {t('Create New Shipment')}
            </h1>
            <p className="text-theme-muted">{t('Fill in the details below to create a new shipment tracking record')}</p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <form onSubmit={handleSubmit} className="glass-effect rounded-2xl p-8 border border-white/10">
              {/* Basic Information */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mb-8"
              >
                <h2 className="text-xl font-semibold text-theme-main mb-6 flex items-center space-x-2">
                  <Package className="h-5 w-5 text-blue-400" />
                  <span>{t('Basic Information')}</span>
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-theme-secondary">{t('Container ID')} *</label>
                    <input
                      type="text"
                      name="containerId"
                      value={formData.containerId}
                      onChange={handleChange}
                      placeholder={t('e.g., CONT123456')}
                      className="input-field w-full"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-theme-secondary">{t('Cargo Description')} *</label>
                    <input
                      type="text"
                      name="cargo"
                      value={formData.cargo}
                      onChange={handleChange}
                      placeholder={t('e.g., Electronics, Textiles')}
                      className="input-field w-full"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-theme-secondary flex items-center space-x-1">
                      <Weight className="h-4 w-4" />
                      <span>{t('Weight (kg)')} *</span>
                    </label>
                    <input
                      type="number"
                      name="weight"
                      value={formData.weight}
                      onChange={handleChange}
                      placeholder={t('e.g., 15000')}
                      min="0"
                      step="0.1"
                      className="input-field w-full"
                      required
                    />
                  </div>
                </div>
              </motion.div>

              {/* Current Location */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mb-8"
              >
                <h2 className="text-xl font-semibold text-theme-main mb-6 flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-green-400" />
                  <span>{t('Current Location')}</span>
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-theme-secondary mb-2">{t('Location Name')} *</label>
                    <input
                      type="text"
                      name="currentLocationName"
                      value={formData.currentLocationName}
                      onChange={handleChange}
                      placeholder={t('e.g., Port of Mumbai')}
                      className="input-field w-full"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-theme-secondary mb-2">{t('Latitude')} *</label>
                      <input
                        type="number"
                        name="currentLocationLat"
                        value={formData.currentLocationLat}
                        onChange={handleChange}
                        placeholder={t('e.g., 19.0760')}
                        step="any"
                        className="input-field w-full"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-theme-secondary mb-2">{t('Longitude')} *</label>
                      <input
                        type="number"
                        name="currentLocationLng"
                        value={formData.currentLocationLng}
                        onChange={handleChange}
                        placeholder={t('e.g., 72.8777')}
                        step="any"
                        className="input-field w-full"
                        required
                      />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Destination */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mb-8"
              >
                <h2 className="text-xl font-semibold text-theme-main mb-6 flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-red-400" />
                  <span>{t('Destination')}</span>
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-theme-secondary mb-2">{t('Destination Name')} *</label>
                    <input
                      type="text"
                      name="destinationName"
                      value={formData.destinationName}
                      onChange={handleChange}
                      placeholder={t('e.g., Port of New York')}
                      className="input-field w-full"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-theme-secondary mb-2">{t('Latitude')} *</label>
                      <input
                        type="number"
                        name="destinationLat"
                        value={formData.destinationLat}
                        onChange={handleChange}
                        placeholder={t('e.g., 40.7128')}
                        step="any"
                        className="input-field w-full"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-theme-secondary mb-2">{t('Longitude')} *</label>
                      <input
                        type="number"
                        name="destinationLng"
                        value={formData.destinationLng}
                        onChange={handleChange}
                        placeholder={t('e.g., -74.0060')}
                        step="any"
                        className="input-field w-full"
                        required
                      />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Form Actions */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex justify-end space-x-4 pt-6 border-t border-white/10"
              >
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/')}
                  className="btn-secondary"
                >
                  {t('Cancel')}
                </motion.button>
                
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: loading ? 1 : 1.05 }}
                  whileTap={{ scale: loading ? 1 : 0.95 }}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>{t('Creating...')}</span>
                    </>
                  ) : (
                    <>
                      <Ship className="h-4 w-4" />
                      <span>{t('Create Shipment')}</span>
                    </>
                  )}
                </motion.button>
              </motion.div>
            </form>
          </motion.div>

          {/* Tips Sidebar */}
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            <div className="glass-effect rounded-2xl p-6 border border-white/10">
              <h3 className="text-lg font-semibold text-theme-main mb-4 flex items-center space-x-2">
                <Lightbulb className="h-5 w-5 text-yellow-400" />
                <span>{t('Tips')}</span>
              </h3>
              <ul className="space-y-3 text-theme-secondary text-sm">
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>{t('Use accurate coordinates for precise tracking')}</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>{t('Container ID should be unique for each shipment')}</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>{t('You can find coordinates using Google Maps')}</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>{t('Weight should be in kilograms')}</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        title={t('Shipment Created Successfully!')}
        message={`${t('Your shipment')} ${createdShipment?.shipmentId} ${t('has been created and is now being tracked.')}`}
        actionButton={
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(`/shipment/${createdShipment?.shipmentId}`)}
            className="btn-primary w-full"
          >
            {t('View Shipment Details')}
          </motion.button>
        }
      />
    </motion.div>
  );
};

export default CreateShipment;
