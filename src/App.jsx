import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import 'leaflet/dist/leaflet.css';

import { store } from './store/store';
import GlobalStyles from './styles/GlobalStyles';
import Header from './components/Layout/Header';
import Dashboard from './pages/Dashboard';
import ShipmentDetail from './pages/ShipmentDetail';
import CreateShipment from './pages/CreateShipment';
import { ThemeProvider } from './context/ThemeContext';
import './i18n'; // import i18n config
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';

function App() {
  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <ThemeProvider>
          <Router>
            <GlobalStyles />
            <div className="min-h-screen relative overflow-hidden">
              {/* Enhanced animated background */}
              <div className="fixed inset-0 overflow-hidden pointer-events-none">
                {/* Primary gradient orbs */}
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full blur-3xl"
                />
                
                <motion.div
                  animate={{
                    scale: [1.2, 1, 1.2],
                    opacity: [0.2, 0.5, 0.2],
                    rotate: [360, 180, 0],
                  }}
                  transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-full blur-3xl"
                />
                
                {/* Additional floating elements */}
                <motion.div
                  animate={{
                    y: [-20, 20, -20],
                    x: [-10, 10, -10],
                    opacity: [0.1, 0.3, 0.1],
                  }}
                  transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute top-1/3 left-1/4 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl"
                />
                
                <motion.div
                  animate={{
                    y: [20, -20, 20],
                    x: [10, -10, 10],
                    opacity: [0.1, 0.25, 0.1],
                  }}
                  transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl"
                />
                
                {/* Grid pattern overlay */}
                <div 
                  className="absolute inset-0 opacity-[0.02]"
                  style={{
                    backgroundImage: `
                      linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
                    `,
                    backgroundSize: '50px 50px'
                  }}
                />
                
                {/* Radial gradient overlay */}
                <div className="absolute inset-0 bg-gradient-radial from-transparent via-slate-900/20 to-slate-900/40" />
              </div>
              
              <Header />
              
              <main className="relative z-10 min-h-[calc(100vh-4rem)]">
                <AnimatePresence mode="wait">
                  <Routes>
                    <Route path="/" element={
                      <motion.div
                        key="dashboard"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                      >
                        <Dashboard />
                      </motion.div>
                    } />
                    <Route path="/shipment/:id" element={
                      <motion.div
                        key="shipment-detail"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                      >
                        <ShipmentDetail />
                      </motion.div>
                    } />
                    <Route path="/create-shipment" element={
                      <motion.div
                        key="create-shipment"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                      >
                        <CreateShipment />
                      </motion.div>
                    } />
                  </Routes>
                </AnimatePresence>
              </main>
              
              <Toaster
                position="top-right"
                toastOptions={{
                  duration: 5000,
                  style: {
                    background: 'rgba(15, 23, 42, 0.9)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                    color: 'white',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 20px rgba(59, 130, 246, 0.1)',
                    fontSize: '14px',
                    fontWeight: '500',
                  },
                  success: {
                    iconTheme: {
                      primary: '#22c55e',
                      secondary: 'white',
                    },
                    style: {
                      border: '1px solid rgba(34, 197, 94, 0.2)',
                      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 20px rgba(34, 197, 94, 0.1)',
                    }
                  },
                  error: {
                    iconTheme: {
                      primary: '#ef4444',
                      secondary: 'white',
                    },
                    style: {
                      border: '1px solid rgba(239, 68, 68, 0.2)',
                      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 20px rgba(239, 68, 68, 0.1)',
                    }
                  },
                  loading: {
                    iconTheme: {
                      primary: '#3b82f6',
                      secondary: 'white',
                    },
                    style: {
                      border: '1px solid rgba(59, 130, 246, 0.2)',
                      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 20px rgba(59, 130, 246, 0.1)',
                    }
                  },
                }}
              />
            </div>
          </Router>
        </ThemeProvider>
      </I18nextProvider>
    </Provider>
  )
}

export default App

