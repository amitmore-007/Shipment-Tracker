# Shipment Tracker Frontend

A modern, responsive React-based frontend for the Cargo Shipment Tracker application featuring real-time tracking, interactive maps, and comprehensive shipment management capabilities.

## 🚀 Features

### Core Functionality
- **📊 Interactive Dashboard**: Comprehensive shipment overview with filtering and sorting
- **🗺️ Real-time Map Tracking**: Live shipment visualization with React Leaflet
- **📝 Shipment Management**: Create, update, delete, and manage cargo shipments
- **📱 Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **🔄 Real-time Updates**: Live location and status updates
- **📈 ETA Predictions**: Estimated time of arrival calculations

### Advanced Features
- **🌐 Multi-language Support**: Internationalization with i18next
- **🎨 Modern UI**: Styled with Tailwind CSS and Styled Components
- **🔔 Toast Notifications**: User feedback with React Hot Toast

## 🛠 Tech Stack

- **⚛️ React 18** - Modern UI library
- **🔄 Redux Toolkit** - State management with async thunks
- **🧭 React Router v6** - Client-side routing
- **🗺️ React Leaflet** - Interactive maps with OpenStreetMap
- **💅 Styled Components** - CSS-in-JS styling
- **🎨 Tailwind CSS** - Utility-first CSS framework
- **⚡ Vite** - Next-generation frontend build tool
- **🔔 React Hot Toast** - Toast notifications
- **📝 React Hook Form** - Form handling and validation
- **🎨 Framer Motion** - Smooth animations
- **🌐 i18next** - Internationalization framework
- **🔧 Lucide React** - Icon library

## 🏗 Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                    Frontend Application                 │
├─────────────────────────────────────────────────────────┤
│  React Components  │  Redux Store  │  Service Layer     │
│  ├─ Pages          │  ├─ Slices    │  ├─ API Client     │
│  ├─ Components     │  └─ Thunks    │  └─ Axios HTTP     │
│  └─ Layouts        │               │                    │
├─────────────────────────────────────────────────────────┤
│                    External Services                    │
│  ├─ Backend API    └─ Map Services (OpenStreetMap)     │
└─────────────────────────────────────────────────────────┘
```

## 🚀 Setup Instructions

### Prerequisites
- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** package manager
- **Backend API** running on port 5000
- **Modern browser** with ES2020+ support

### Quick Start

1. **Clone the repository**:
```bash
git clone <frontend-repository-url>
cd shipment-tracker-frontend
```

2. **Install dependencies**:
```bash
# Using npm
npm install

# Using yarn
yarn install
```

3. **Environment Configuration**:
Create a `.env` file in the root directory:
```env
# API Configuration
VITE_API_BASE_URL=http://localhost:5000/api

# Development
VITE_DEBUG_MODE=true
```

4. **Start development server**:
```bash
npm run dev
# or
yarn dev
```

5. **Access the application**:
Open `http://localhost:5173` in your browser

## 🗺️ Map Integration

### OpenStreetMap (Default)
The application uses React Leaflet with OpenStreetMap tiles for map visualization:

```javascript
// Map implementation with shipment tracking
const TrackingMap = () => {
  const [shipmentLocation, setShipmentLocation] = useState(null);
  
  return (
    <MapContainer>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; OpenStreetMap contributors'
      />
      <Marker position={shipmentLocation} />
    </MapContainer>
  );
};
```

**Features:**
- Free to use, no API key required
- Good global coverage
- Lightweight implementation
- Custom markers and overlays

## ⚙️ Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `VITE_API_BASE_URL` | Backend API endpoint | ✅ | `http://localhost:5000/api` |
| `VITE_DEBUG_MODE` | Development debugging | ❌ | `false` |

## 📱 Available Scripts

```bash
# Development
npm run dev          # Start development server

# Building
npm run build        # Production build
npm run preview      # Preview production build

# Quality
npm run lint         # ESLint code checking
```

## 📁 Project Structure

```
src/
├── components/              # Reusable UI components
│   ├── Layout/             # Layout components
│   ├── Maps/               # Map-related components
│   ├── Shipments/          # Shipment management components
│   └── UI/                 # Basic UI components
├── pages/                  # Page-level components
│   ├── Dashboard.jsx       # Main dashboard
│   ├── ShipmentDetails.jsx # Individual shipment view
│   └── CreateShipment.jsx  # New shipment form
├── services/               # API services
│   └── shipmentAPI.js      # Shipment API calls
├── store/                  # Redux state management
│   ├── index.js           # Store configuration
│   └── slices/
│       └── shipmentSlice.js # Shipment state management
├── hooks/                  # Custom React hooks
├── utils/                  # Utility functions
├── styles/                 # Styling files
└── assets/                # Static assets
```

## 🌟 Redux State Management

### Shipment Slice Features

The application uses Redux Toolkit for state management with the following async thunks:

- **fetchShipments**: Get all shipments with filtering and sorting
- **fetchShipmentById**: Get individual shipment details
- **createShipment**: Create new shipment
- **updateShipment**: Update shipment details
- **updateShipmentLocation**: Update shipment location
- **updateShipmentStatus**: Update shipment status
- **deleteShipment**: Delete shipment
- **fetchShipmentETA**: Get estimated time of arrival

```javascript
// Example usage
const dispatch = useDispatch();
const { shipments, loading, error } = useSelector(state => state.shipments);

// Fetch shipments with filters
dispatch(fetchShipments({ 
  status: 'in-transit', 
  sortBy: 'createdAt', 
  order: 'desc' 
}));

// Update location
dispatch(updateShipmentLocation({ 
  id: 'shipment-id', 
  locationData: { lat: 40.7128, lng: -74.0060 } 
}));
```

## 🔄 Real-time Features

### Location Updates
```javascript
// Real-time location tracking implementation
const useShipmentTracking = (shipmentId) => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    // Polling or WebSocket implementation
    const interval = setInterval(() => {
      dispatch(fetchShipmentById(shipmentId));
    }, 30000); // Update every 30 seconds
    
    return () => clearInterval(interval);
  }, [shipmentId, dispatch]);
};
```

## 🎨 Styling

The application combines Tailwind CSS for utility classes with Styled Components for complex styling:

```javascript
// Styled Components example
const ShipmentCard = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  padding: 1rem;
  
  &:hover {
    transform: translateY(-2px);
    transition: transform 0.2s ease;
  }
`;

// Tailwind CSS classes
<div className="flex flex-col space-y-4 p-6 bg-gray-50 rounded-lg">
  <h2 className="text-xl font-semibold text-gray-900">Shipments</h2>
</div>
```

## 🌐 Internationalization

The app supports multiple languages using i18next:

```javascript
import { useTranslation } from 'react-i18next';

const Dashboard = () => {
  const { t } = useTranslation();
  
  return (
    <h1>{t('dashboard.title')}</h1>
  );
};
```

## 🔧 Development

### Error Handling
The Redux slices include proper error handling:

```javascript
// Error states in Redux
.addCase(fetchShipments.rejected, (state, action) => {
  state.loading = false;
  state.error = action.error.message;
})
```

### Form Validation
React Hook Form handles form state and validation:

```javascript
import { useForm } from 'react-hook-form';

const ShipmentForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  const onSubmit = (data) => {
    dispatch(createShipment(data));
  };
};
```

## 🧪 Testing

Basic ESLint configuration for code quality:

```bash
npm run lint    # Check for linting issues
```

## 🚀 Production Build

```bash
# Create production build
npm run build

# Preview production build locally
npm run preview
```

## 🐛 Troubleshooting

### Common Issues

1. **API Connection Issues**:
   - Verify backend is running on port 5000
   - Check VITE_API_BASE_URL in .env file
   - Verify CORS configuration

2. **Map not displaying**:
   - Check browser console for errors
   - Verify leaflet CSS is imported
   - Check network connectivity

3. **Redux state issues**:
   - Use Redux DevTools for debugging
   - Check async thunk error handling
   - Verify action payload structure

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

- **Issues**: Create GitHub issues for bugs and feature requests
- **Documentation**: Check this README for setup and usage instructions

---

**Built with ❤️ for efficient cargo tracking**

```

## 🔮 Future Enhancements & Roadmap

### Immediate (Next 3 months)
- **🔐 Authentication System**: JWT-based user authentication
- **📱 Mobile App**: React Native companion app
- **🌐 Internationalization**: Multi-language support
- **📊 Advanced Analytics**: Detailed performance metrics

### Short-term (3-6 months)
- **🤖 AI/ML Integration**: Predictive analytics for delays
- **📡 IoT Integration**: Direct sensor data integration
- **🔔 Advanced Notifications**: Email, SMS, push notifications
- **📈 Business Intelligence**: Custom reporting dashboards

### Long-term (6-12 months)
- **🌍 Multi-tenant Support**: Support for multiple shipping companies
- **⚡ Micro-frontend Architecture**: Scalable component federation
- **🔗 Blockchain Integration**: Immutable shipment records
- **🎯 AR/VR Features**: Augmented reality warehouse navigation

