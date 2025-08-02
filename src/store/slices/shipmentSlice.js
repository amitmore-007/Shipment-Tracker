import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as shipmentAPI from '../../services/shipmentAPI';

// Async thunks
export const fetchShipments = createAsyncThunk(
  'shipments/fetchShipments',
  async ({ status, sortBy, order } = {}) => {
    const response = await shipmentAPI.getShipments({ status, sortBy, order });
    return response.data;
  }
);

export const fetchShipmentById = createAsyncThunk(
  'shipments/fetchShipmentById',
  async (id) => {
    const response = await shipmentAPI.getShipmentById(id);
    return response.data;
  }
);

export const createShipment = createAsyncThunk(
  'shipments/createShipment',
  async (shipmentData) => {
    const response = await shipmentAPI.createShipment(shipmentData);
    return response.data;
  }
);

// Update shipment location
export const updateShipmentLocation = createAsyncThunk(
  'shipments/updateLocation',
  async ({ id, locationData }, { rejectWithValue }) => {
    try {
      const response = await shipmentAPI.updateShipmentLocation(id, locationData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Update shipment status
export const updateShipmentStatus = createAsyncThunk(
  'shipments/updateStatus',
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const response = await shipmentAPI.updateShipmentStatus(id, status);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchShipmentETA = createAsyncThunk(
  'shipments/fetchShipmentETA',
  async (id) => {
    const response = await shipmentAPI.getShipmentETA(id);
    return response.data;
  }
);

export const updateShipment = createAsyncThunk(
  'shipments/updateShipment',
  async ({ id, updateData }, { rejectWithValue }) => {
    try {
      const response = await shipmentAPI.updateShipment(id, updateData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteShipment = createAsyncThunk(
  'shipments/deleteShipment',
  async (id, { rejectWithValue }) => {
    try {
      const response = await shipmentAPI.deleteShipment(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  shipments: [],
  currentShipment: null,
  etaData: null,
  loading: false,
  error: null,
  filters: {
    status: '',
    sortBy: 'createdAt',
    order: 'desc'
  }
};

const shipmentSlice = createSlice({
  name: 'shipments',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearCurrentShipment: (state) => {
      state.currentShipment = null;
      state.etaData = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch shipments
      .addCase(fetchShipments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchShipments.fulfilled, (state, action) => {
        state.loading = false;
        state.shipments = action.payload;
      })
      .addCase(fetchShipments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Fetch shipment by ID
      .addCase(fetchShipmentById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchShipmentById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentShipment = action.payload;
      })
      .addCase(fetchShipmentById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Create shipment
      .addCase(createShipment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createShipment.fulfilled, (state, action) => {
        state.loading = false;
        state.shipments.unshift(action.payload);
      })
      .addCase(createShipment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Update location
      .addCase(updateShipmentLocation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateShipmentLocation.fulfilled, (state, action) => {
        state.loading = false;
        state.currentShipment = action.payload;
        // Update the shipment in the list if it exists
        const index = state.shipments.findIndex(s => s._id === action.payload._id);
        if (index !== -1) {
          state.shipments[index] = action.payload;
        }
      })
      .addCase(updateShipmentLocation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update status
      .addCase(updateShipmentStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateShipmentStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.currentShipment = action.payload;
        // Update the shipment in the list if it exists
        const index = state.shipments.findIndex(s => s._id === action.payload._id);
        if (index !== -1) {
          state.shipments[index] = action.payload;
        }
      })
      .addCase(updateShipmentStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch ETA
      .addCase(fetchShipmentETA.fulfilled, (state, action) => {
        state.etaData = action.payload;
      })
      // Update shipment details
      .addCase(updateShipment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateShipment.fulfilled, (state, action) => {
        state.loading = false;
        // Update in list
        const idx = state.shipments.findIndex(s => s._id === action.payload._id);
        if (idx !== -1) state.shipments[idx] = action.payload;
        // Update current if open
        if (state.currentShipment && state.currentShipment._id === action.payload._id) {
          state.currentShipment = action.payload;
        }
      })
      .addCase(updateShipment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete shipment
      .addCase(deleteShipment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteShipment.fulfilled, (state, action) => {
        state.loading = false;
        state.shipments = state.shipments.filter(s => s._id !== action.payload._id);
        if (state.currentShipment && state.currentShipment._id === action.payload._id) {
          state.currentShipment = null;
        }
      })
      .addCase(deleteShipment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { setFilters, clearCurrentShipment } = shipmentSlice.actions;
export default shipmentSlice.reducer;
