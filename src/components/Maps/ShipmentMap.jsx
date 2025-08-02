import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import { Map, Layers } from 'lucide-react';

// Fix for default markers in React Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom icons
const currentLocationIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const destinationIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const routeIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [20, 33],
  iconAnchor: [10, 33],
  popupAnchor: [1, -28],
  shadowSize: [33, 33]
});

// Map tile layers
const mapLayers = {
  street: {
    name: 'Street',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '© OpenStreetMap contributors'
  },
  satellite: {
    name: 'Satellite',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: '© Esri'
  },
  terrain: {
    name: 'Terrain',
    url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
    attribution: '© OpenTopoMap'
  },
  dark: {
    name: 'Dark',
    url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
    attribution: '© CartoDB'
  }
};

const ShipmentMap = ({ shipment, height = 400 }) => {
  const mapRef = useRef();
  const [currentMapType, setCurrentMapType] = useState('dark');
  const [showMapSelector, setShowMapSelector] = useState(false);

  if (!shipment) return null;

  const { currentLocation, destination, route } = shipment;

  // Create route coordinates for polyline
  const routeCoordinates = route.map(location => [
    location.coordinates.latitude,
    location.coordinates.longitude
  ]);

  // Add destination to route if not already included
  if (routeCoordinates.length > 0) {
    routeCoordinates.push([
      destination.coordinates.latitude,
      destination.coordinates.longitude
    ]);
  }

  // Calculate map center and bounds
  const center = [
    currentLocation.coordinates.latitude,
    currentLocation.coordinates.longitude
  ];

  useEffect(() => {
    if (mapRef.current && routeCoordinates.length > 1) {
      const map = mapRef.current;
      const bounds = L.latLngBounds(routeCoordinates);
      map.fitBounds(bounds, { padding: [20, 20] });
    }
  }, [routeCoordinates]);

  const handleZoomIn = () => {
    if (mapRef.current) {
      mapRef.current.setZoom(mapRef.current.getZoom() + 1);
    }
  };

  const handleZoomOut = () => {
    if (mapRef.current) {
      mapRef.current.setZoom(mapRef.current.getZoom() - 1);
    }
  };

  return (
    <div className="relative bg-gray-900/50 rounded-2xl overflow-hidden border border-gray-700/50 shadow-2xl">
      {/* Map Header - Fixed positioning */}
      <div className="absolute top-0 left-0 right-0 z-[1000] bg-gradient-to-b from-gray-900/95 via-gray-900/80 to-transparent p-4 pointer-events-none">
        <div className="flex items-center justify-between">
          <h3 className="text-white font-semibold text-lg pointer-events-auto">Shipment Route</h3>
          <div className="bg-gray-800/90 backdrop-blur-sm px-3 py-1 rounded-full border border-gray-600/50 pointer-events-auto">
            <span className="text-blue-400 text-sm font-medium">Live Tracking</span>
          </div>
        </div>
      </div>

      {/* Map Type Selector */}
      <div className="absolute top-16 right-4 z-[1000]">
        <div className="relative">
          <button
            onClick={() => setShowMapSelector(!showMapSelector)}
            className="bg-gray-900/95 backdrop-blur-sm border border-gray-700/50 rounded-xl p-3 text-white hover:bg-gray-800/95 transition-colors shadow-lg"
            title="Change map type"
          >
            <Layers className="h-4 w-4" />
          </button>
          
          {showMapSelector && (
            <div className="absolute top-full right-0 mt-2 bg-gray-900/95 backdrop-blur-sm border border-gray-700/50 rounded-xl overflow-hidden shadow-2xl min-w-[120px]">
              {Object.entries(mapLayers).map(([key, layer]) => (
                <button
                  key={key}
                  onClick={() => {
                    setCurrentMapType(key);
                    setShowMapSelector(false);
                  }}
                  className={`block w-full px-4 py-2 text-left text-sm transition-colors ${
                    currentMapType === key
                      ? 'bg-blue-600/20 text-blue-400'
                      : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
                  }`}
                >
                  {layer.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <MapContainer
        center={center}
        zoom={6}
        style={{ 
          height: `${height}px`, 
          width: '100%',
          borderRadius: '1rem'
        }}
        ref={mapRef}
        zoomControl={false}
        attributionControl={false}
      >
        <TileLayer
          attribution={mapLayers[currentMapType].attribution}
          url={mapLayers[currentMapType].url}
          key={currentMapType}
        />

        {/* Current Location Marker */}
        <Marker
          position={[currentLocation.coordinates.latitude, currentLocation.coordinates.longitude]}
          icon={currentLocationIcon}
          zIndexOffset={1000}
        >
          <Popup className="custom-popup" closeButton={true} autoClose={false} keepInView={true}>
            <div className="bg-gray-800 text-white p-3 rounded-lg border border-blue-500/30">
              <h4 className="font-bold text-blue-400 mb-2 text-lg">📍 Current Location</h4>
              <p className="font-semibold mb-1">{currentLocation.name}</p>
              <p className="text-gray-300 text-sm mb-2">
                Last Updated: {new Date(currentLocation.timestamp).toLocaleString()}
              </p>
              <p className="text-xs text-gray-400 font-mono">
                {currentLocation.coordinates.latitude.toFixed(4)}, {currentLocation.coordinates.longitude.toFixed(4)}
              </p>
            </div>
          </Popup>
        </Marker>

        {/* Destination Marker */}
        <Marker
          position={[destination.coordinates.latitude, destination.coordinates.longitude]}
          icon={destinationIcon}
          zIndexOffset={1000}
        >
          <Popup className="custom-popup" closeButton={true} autoClose={false} keepInView={true}>
            <div className="bg-gray-800 text-white p-3 rounded-lg border border-red-500/30">
              <h4 className="font-bold text-red-400 mb-2 text-lg">🎯 Destination</h4>
              <p className="font-semibold mb-1">{destination.name}</p>
              <p className="text-xs text-gray-400 font-mono">
                {destination.coordinates.latitude.toFixed(4)}, {destination.coordinates.longitude.toFixed(4)}
              </p>
            </div>
          </Popup>
        </Marker>

        {/* Route History Markers */}
        {route.slice(0, -1).map((location, index) => (
          <Marker
            key={index}
            position={[location.coordinates.latitude, location.coordinates.longitude]}
            icon={routeIcon}
            zIndexOffset={1000}
          >
            <Popup className="custom-popup" closeButton={true} autoClose={false} keepInView={true}>
              <div className="bg-gray-800 text-white p-3 rounded-lg border border-green-500/30">
                <h4 className="font-bold text-green-400 mb-2 text-lg">🚢 Route Point {index + 1}</h4>
                <p className="font-semibold mb-1">{location.name}</p>
                <p className="text-gray-300 text-sm">
                  {new Date(location.timestamp).toLocaleString()}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Route Polyline */}
        {routeCoordinates.length > 1 && (
          <Polyline
            positions={routeCoordinates}
            color="#3b82f6"
            weight={3}
            opacity={0.8}
            dashArray="5, 10"
          />
        )}
      </MapContainer>

      {/* Enhanced Map Legend - Fixed positioning */}
      <div className="absolute bottom-4 right-4 z-[1000] bg-gray-900/95 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 shadow-2xl">
        <h4 className="text-white font-semibold mb-3 text-sm">Map Legend</h4>
        <div className="space-y-2">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-blue-500 rounded-full shadow-lg"></div>
            <span className="text-gray-300 text-xs">Current Position</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-red-500 rounded-full shadow-lg"></div>
            <span className="text-gray-300 text-xs">Destination</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-500 rounded-full shadow-lg"></div>
            <span className="text-gray-300 text-xs">Route History</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-6 h-0.5 bg-blue-500 opacity-80"></div>
            <span className="text-gray-300 text-xs">Route Path</span>
          </div>
        </div>
      </div>

      {/* Zoom Controls - Fixed positioning */}
      <div className="absolute bottom-4 left-4 z-[1000] bg-gray-900/95 backdrop-blur-sm border border-gray-700/50 rounded-xl overflow-hidden shadow-lg">
        <button 
          onClick={handleZoomIn}
          className="block w-10 h-10 text-white hover:bg-gray-700/50 transition-colors border-b border-gray-700/50 font-bold text-lg"
          title="Zoom in"
        >
          +
        </button>
        <button 
          onClick={handleZoomOut}
          className="block w-10 h-10 text-white hover:bg-gray-700/50 transition-colors font-bold text-lg"
          title="Zoom out"
        >
          −
        </button>
      </div>

      {/* Click outside to close map selector */}
      {showMapSelector && (
        <div 
          className="fixed inset-0 z-[999]" 
          onClick={() => setShowMapSelector(false)}
        />
      )}
    </div>
  );
};

export default ShipmentMap;
