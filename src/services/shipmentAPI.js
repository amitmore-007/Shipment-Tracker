import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error Details:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      url: error.config?.url,
    });

    // Return a more descriptive error
    const errorMessage =
      error.response?.data?.error || error.message || 'Network error occurred';
    return Promise.reject(new Error(errorMessage));
  }
);

export const getShipments = (params = {}) => {
  const queryString = new URLSearchParams(params).toString();
  return api.get(`/shipments?${queryString}`);
};

export const getShipmentById = (id) => {
  console.log('Fetching shipment with ID:', id);
  return api.get(`/shipment/${encodeURIComponent(id)}`);
};

export const createShipment = (shipmentData) => {
  return api.post('/shipment', shipmentData);
};

export const updateShipmentLocation = (id, locationData) => {
  return api.post(`/shipment/${encodeURIComponent(id)}/update-location`, locationData);
};

export const getShipmentETA = (id) => {
  return api.get(`/shipment/${encodeURIComponent(id)}/eta`);
};

export const updateShipmentStatus = (id, status) => {
  return api.put(`/shipment/${encodeURIComponent(id)}/status`, { status });
};

export const updateShipment = (id, updateData) => {
  return api.put(`/shipment/${encodeURIComponent(id)}`, updateData);
};

export const deleteShipment = (id) => {
  return api.delete(`/shipment/${encodeURIComponent(id)}`);
};
