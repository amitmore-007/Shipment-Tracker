import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Ship, Menu, X, Home, Plus, Sun, Moon, Globe, ChevronDown } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import { languages } from '../../i18n';

const Header = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { i18n, t } = useTranslation();
  const langDropdownRef = useRef(null);

  const isActive = (path) => location.pathname === path;

  const navItems = [
    { path: '/', label: t('Dashboard'), icon: Home },
    { path: '/create-shipment', label: t('Create Shipment'), icon: Plus },
  ];

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  const handleLanguageChange = (langCode) => {
    console.log('Changing language to:', langCode);
    i18n.changeLanguage(langCode);
    setIsLangOpen(false);
  };

  const toggleLanguageDropdown = (e) => {
    console.log('Toggle language dropdown, current state:', isLangOpen);
    setIsLangOpen(!isLangOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target)) {
        setIsLangOpen(false);
      }
    };

    if (isLangOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isLangOpen]);

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative glass-effect border-b border-white/10 sticky top-0 z-40"
      style={{ 
        background: 'var(--nav-bg)',
        backdropFilter: 'blur(20px)',
        borderBottomColor: 'var(--border-main)'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/" className="flex items-center space-x-3 group">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg"
              >
                <Ship className="h-5 w-5 text-white" />
              </motion.div>
              <span className="text-xl font-bold gradient-text hidden sm:block">
                Shipment Tracker
              </span>
              <span className="text-lg font-bold gradient-text sm:hidden">
                ST
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation with theme-aware styling */}
          <nav className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActiveItem = isActive(item.path);
              
              return (
                <motion.div key={item.path} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    to={item.path}
                    className={`relative flex items-center space-x-2 px-6 py-3 rounded-2xl transition-all duration-300 text-sm font-semibold overflow-hidden group ${
                      isActiveItem
                        ? 'text-white shadow-lg shadow-blue-500/25'
                        : 'hover:text-white'
                    }`}
                    style={{
                      color: isActiveItem ? 'white' : 'var(--text-secondary)'
                    }}
                  >
                    {/* Active background with gradient */}
                    {isActiveItem && (
                      <motion.div
                        layoutId="activeNavBg"
                        className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600 rounded-2xl"
                        initial={false}
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    
                    {/* Hover background */}
                    {!isActiveItem && (
                      <div 
                        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
                        style={{ background: 'var(--hover-bg)' }}
                      />
                    )}
                    
                    {/* Content */}
                    <div className="relative z-10 flex items-center space-x-2">
                      <Icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </div>
                    
                    {/* Shine effect for active items */}
                    {isActiveItem && (
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                    )}
                  </Link>
                </motion.div>
              );
            })}
          </nav>

          {/* Enhanced Controls */}
          <div className="flex items-center space-x-3">
            {/* Theme Toggle with enhanced styling */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className="relative p-3 rounded-2xl border transition-all duration-300 group overflow-hidden"
              style={{
                background: 'var(--hover-bg)',
                borderColor: 'var(--border-main)'
              }}
              title={theme === 'dark' ? t('Light Mode') : t('Dark Mode')}
            >
              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Icon container with rotation */}
              <motion.div
                animate={{ rotate: theme === 'dark' ? 0 : 180 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="relative z-10"
              >
                {theme === 'dark' ? (
                  <Sun className="h-4 w-4 text-yellow-400" />
                ) : (
                  <Moon className="h-4 w-4 text-blue-400" />
                )}
              </motion.div>
            </motion.button>

            {/* Language Dropdown - moved here and styled */}
            <div className="relative">
              <select
                value={i18n.language}
                onChange={e => {
                  i18n.changeLanguage(e.target.value);
                }}
                className="px-4 py-2 rounded-xl border border-[var(--border-main)] text-sm font-semibold shadow focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200
                  bg-[var(--card-bg)] text-[var(--text-main)] min-w-[140px] cursor-pointer
                  dark:bg-[var(--card-bg)] dark:text-[var(--text-main)]"
                style={{
                  appearance: 'none',
                  backgroundImage:
                    "linear-gradient(45deg,rgba(59,130,246,0.08),rgba(139,92,246,0.08)),url(\"data:image/svg+xml,%3Csvg width='16' height='16' fill='none' stroke='%2393a3b8' stroke-width='2' viewBox='0 0 24 24'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")",
                  backgroundRepeat: 'no-repeat, no-repeat',
                  backgroundPosition: 'right 0.75rem center, right 0.75rem center',
                  backgroundSize: '1.25em, 1.25em'
                }}
                aria-label="Select language"
              >
                {languages.map(lang => (
                  <option
                    key={lang.code}
                    value={lang.code}
                    style={{
                      background: 'var(--card-bg)',
                      color: 'var(--text-main)'
                    }}
                  >
                    {lang.flag} {lang.nativeName}
                  </option>
                ))}
              </select>
            </div>

            {/* Enhanced Mobile menu button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden relative p-3 rounded-2xl border transition-all duration-300 group overflow-hidden"
              style={{
                background: 'var(--hover-bg)',
                borderColor: 'var(--border-main)'
              }}
            >
              {/* Icon with animation */}
              <motion.div
                animate={{ rotate: isMenuOpen ? 90 : 0 }}
                transition={{ duration: 0.3 }}
                className="relative z-10"
              >
                {isMenuOpen ? (
                  <X className="h-4 w-4 transition-colors" style={{ color: 'var(--text-secondary)' }} />
                ) : (
                  <Menu className="h-4 w-4 transition-colors" style={{ color: 'var(--text-secondary)' }} />
                )}
              </motion.div>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Enhanced Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden border-t overflow-hidden"
            style={{ 
              borderTopColor: 'var(--border-main)',
              background: 'var(--card-bg)'
            }}
          >
            <div className="relative z-10 px-4 py-4 space-y-2">
              {navItems.map((item, index) => {
                const Icon = item.icon;
                const isActiveItem = isActive(item.path);
                
                return (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={item.path}
                      onClick={() => setIsMenuOpen(false)}
                      className={`relative flex items-center space-x-3 px-4 py-3 rounded-2xl transition-all duration-300 group overflow-hidden ${
                        isActiveItem
                          ? 'text-white shadow-lg shadow-blue-500/25'
                          : ''
                      }`}
                      style={{
                        color: isActiveItem ? 'white' : 'var(--text-secondary)'
                      }}
                    >
                      {/* Active background */}
                      {isActiveItem && (
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl" />
                      )}
                      
                      {/* Hover background */}
                      {!isActiveItem && (
                        <div 
                          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
                          style={{ background: 'var(--hover-bg)' }}
                        />
                      )}
                      
                      {/* Content */}
                      <div className="relative z-10 flex items-center space-x-3">
                        <Icon className="h-5 w-5" />
                        <span className="font-medium">{item.label}</span>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
