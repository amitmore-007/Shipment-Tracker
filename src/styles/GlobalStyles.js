import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    /* Shared color palette */
    --primary-50: #eff6ff;
    --primary-100: #dbeafe;
    --primary-200: #bfdbfe;
    --primary-300: #93c5fd;
    --primary-400: #60a5fa;
    --primary-500: #3b82f6;
    --primary-600: #2563eb;
    --primary-700: #1d4ed8;
    --primary-800: #1e40af;
    --primary-900: #1e3a8a;
    
    --purple-400: #a855f7;
    --purple-500: #9333ea;
    --purple-600: #7c3aed;
    
    --gray-50: #f9fafb;
    --gray-100: #f3f4f6;
    --gray-200: #e5e7eb;
    --gray-300: #d1d5db;
    --gray-400: #9ca3af;
    --gray-500: #6b7280;
    --gray-600: #4b5563;
    --gray-700: #374151;
    --gray-800: #1f2937;
    --gray-900: #111827;
    
    --dark-100: #000000;
    --dark-200: #0a0a0a;
    --dark-300: #171717;
    --dark-400: #262626;
    --dark-500: #404040;
    
    /* Gradient Definitions */
    --gradient-primary: linear-gradient(135deg, var(--primary-500) 0%, var(--purple-500) 100%);
    --gradient-secondary: linear-gradient(135deg, var(--gray-800) 0%, var(--gray-900) 100%);
    --gradient-accent: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    --gradient-warm: linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%);
    --gradient-cool: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
    
    /* Shadows */
    --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    --shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    --shadow-glow: 0 0 20px rgba(59, 130, 246, 0.3);
    --shadow-glow-purple: 0 0 20px rgba(147, 51, 234, 0.3);
    
    /* Border Radius */
    --radius-sm: 0.375rem;
    --radius-md: 0.5rem;
    --radius-lg: 0.75rem;
    --radius-xl: 1rem;
    --radius-2xl: 1.5rem;
    --radius-3xl: 2rem;
    
    /* Animation Durations */
    --duration-fast: 150ms;
    --duration-normal: 300ms;
    --duration-slow: 500ms;
    
    /* Z-index Scale */
    --z-dropdown: 1000;
    --z-sticky: 1020;
    --z-fixed: 1030;
    --z-modal-backdrop: 1040;
    --z-modal: 1050;
    --z-popover: 1060;
    --z-tooltip: 1070;
  }

  [data-theme="dark"] {
    /* True Black Dark theme */
    --background-main: linear-gradient(135deg, #000000 0%, #0a0a0a 50%, #171717 100%);
    --text-main: #ffffff;
    --text-secondary: #e5e7eb;
    --text-muted: #9ca3af;
    --text-gray-300: #d1d5db;
    --text-gray-400: #9ca3af;
    --text-white: #ffffff;
    --card-bg: rgba(255, 255, 255, 0.05);
    --glass-bg: rgba(255, 255, 255, 0.03);
    --border-main: rgba(255, 255, 255, 0.1);
    --border-accent: rgba(255, 255, 255, 0.2);
    --input-bg: rgba(255, 255, 255, 0.05);
    --input-border: rgba(255, 255, 255, 0.15);
    --hover-bg: rgba(255, 255, 255, 0.05);
    --nav-bg: rgba(0, 0, 0, 0.95);
    
    /* Dark theme specific shadows */
    --shadow-color: rgba(0, 0, 0, 0.8);
    --shadow-glow: 0 0 20px rgba(59, 130, 246, 0.4);
    --shadow-glow-purple: 0 0 20px rgba(147, 51, 234, 0.4);
  }

  [data-theme="light"] {
    /* Clean Light theme */
    --background-main: linear-gradient(135deg, #ffffff 0%, #f8fafc 50%, #f1f5f9 100%);
    --text-main: #0f172a;
    --text-secondary: #334155;
    --text-muted: #64748b;
    --text-gray-300: #475569;
    --text-gray-400: #64748b;
    --text-white: #0f172a;
    --card-bg: rgba(255, 255, 255, 0.95);
    --glass-bg: rgba(255, 255, 255, 0.9);
    --border-main: rgba(0, 0, 0, 0.1);
    --border-accent: rgba(0, 0, 0, 0.15);
    --input-bg: rgba(255, 255, 255, 0.95);
    --input-border: rgba(0, 0, 0, 0.2);
    --hover-bg: rgba(0, 0, 0, 0.05);
    --nav-bg: rgba(255, 255, 255, 0.95);
    
    /* Light theme specific shadows */
    --shadow-color: rgba(0, 0, 0, 0.1);
    --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    --shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
    --shadow-glow: 0 0 20px rgba(59, 130, 246, 0.2);
    --shadow-glow-purple: 0 0 20px rgba(147, 51, 234, 0.2);
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: var(--background-main);
    color: var(--text-main);
    line-height: 1.6;
    overflow-x: hidden;
  }

  /* Enhanced Glass Effect with theme support */
  .glass-effect {
    background: var(--glass-bg);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid var(--border-main);
    box-shadow: var(--shadow-xl), inset 0 1px 0 var(--border-accent);
    position: relative;
    overflow: hidden;
  }

  [data-theme="light"] .glass-effect {
    background: var(--glass-bg);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    box-shadow: 
      0 10px 25px -5px rgba(0, 0, 0, 0.1), 
      0 10px 10px -5px rgba(0, 0, 0, 0.04),
      inset 0 1px 0 rgba(255, 255, 255, 0.8);
  }

  .glass-effect::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    transition: left 0.5s ease-in-out;
  }

  [data-theme="light"] .glass-effect::before {
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent);
  }

  .glass-effect:hover::before {
    left: 100%;
  }

  /* Enhanced Glass Card with proper theme support */
  .glass-card {
    background: var(--card-bg);
    backdrop-filter: blur(25px);
    -webkit-backdrop-filter: blur(25px);
    border: 1px solid var(--border-main);
    border-radius: var(--radius-2xl);
    box-shadow: var(--shadow-2xl), inset 0 1px 0 var(--border-accent);
    position: relative;
    overflow: hidden;
    transition: all var(--duration-normal) ease;
  }

  [data-theme="light"] .glass-card {
    background: var(--card-bg);
    backdrop-filter: blur(15px);
    -webkit-backdrop-filter: blur(15px);
    border: 1px solid var(--border-main);
    box-shadow: 
      0 20px 25px -5px rgba(0, 0, 0, 0.1), 
      0 10px 10px -5px rgba(0, 0, 0, 0.04),
      inset 0 1px 0 rgba(255, 255, 255, 0.9);
  }

  .glass-card:hover {
    transform: translateY(-2px);
    border-color: rgba(59, 130, 246, 0.3);
    box-shadow: var(--shadow-2xl), var(--shadow-glow), inset 0 1px 0 var(--border-accent);
  }

  /* Gradient Text */
  .gradient-text {
    background: var(--gradient-primary);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    display: inline-block;
  }

  /* Enhanced Buttons with proper theme support */
  .btn-primary {
    background: var(--gradient-primary);
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: var(--radius-xl);
    font-weight: 600;
    font-size: 0.875rem;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    transition: all var(--duration-normal) ease;
    box-shadow: var(--shadow-lg), var(--shadow-glow);
    position: relative;
    overflow: hidden;
  }

  .btn-primary::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, transparent 50%);
    opacity: 0;
    transition: opacity var(--duration-normal) ease;
  }

  .btn-primary:hover::before {
    opacity: 1;
  }

  .btn-primary:hover {
    transform: translateY(-1px);
    box-shadow: var(--shadow-xl), var(--shadow-glow);
  }

  .btn-secondary {
    background: var(--hover-bg);
    color: var(--text-secondary);
    border: 1px solid var(--border-main);
    padding: 0.75rem 1.5rem;
    border-radius: var(--radius-xl);
    font-weight: 500;
    font-size: 0.875rem;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    transition: all var(--duration-normal) ease;
    backdrop-filter: blur(10px);
  }

  .btn-secondary:hover {
    background: var(--hover-bg);
    border-color: var(--border-accent);
    color: var(--text-main);
    transform: translateY(-1px);
  }

  [data-theme="light"] .btn-secondary {
    background: rgba(0, 0, 0, 0.05);
    color: var(--text-secondary);
    border: 1px solid var(--border-main);
  }

  [data-theme="light"] .btn-secondary:hover {
    background: rgba(0, 0, 0, 0.1);
    border-color: var(--border-accent);
    color: var(--text-main);
  }

  /* Add danger button for delete actions */
  .btn-danger {
    background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: var(--radius-xl);
    font-weight: 600;
    font-size: 0.875rem;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    transition: all var(--duration-normal) ease;
    box-shadow: var(--shadow-lg);
    position: relative;
    overflow: hidden;
  }

  .btn-danger:hover {
    transform: translateY(-1px);
    box-shadow: var(--shadow-xl), 0 0 20px rgba(220, 38, 38, 0.3);
  }

  /* Enhanced Form Elements with better theme support */
  .input-field {
    background: var(--input-bg);
    border: 1px solid var(--input-border);
    border-radius: var(--radius-lg);
    padding: 0.875rem 1rem;
    color: var(--text-main);
    font-size: 0.875rem;
    transition: all var(--duration-normal) ease;
    backdrop-filter: blur(10px);
  }

  .input-field::placeholder {
    color: var(--text-muted);
  }

  .input-field:focus {
    outline: none;
    border-color: var(--primary-500);
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1), var(--shadow-glow);
    background: var(--input-bg);
  }

  [data-theme="light"] .input-field:focus {
    background: rgba(255, 255, 255, 0.98);
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1), var(--shadow-md);
  }

  /* Status Badges with better contrast */
  .status-pending {
    background: rgba(251, 191, 36, 0.15);
    color: #f59e0b;
    border: 1px solid rgba(251, 191, 36, 0.3);
  }

  [data-theme="light"] .status-pending {
    background: rgba(251, 191, 36, 0.1);
    color: #d97706;
    border: 1px solid rgba(251, 191, 36, 0.2);
  }

  .status-in-transit {
    background: rgba(147, 51, 234, 0.15);
    color: #a855f7;
    border: 1px solid rgba(147, 51, 234, 0.3);
  }

  [data-theme="light"] .status-in-transit {
    background: rgba(147, 51, 234, 0.1);
    color: #7c3aed;
    border: 1px solid rgba(147, 51, 234, 0.2);
  }

  .status-delivered {
    background: rgba(34, 197, 94, 0.15);
    color: #22c55e;
    border: 1px solid rgba(34, 197, 94, 0.3);
  }

  [data-theme="light"] .status-delivered {
    background: rgba(34, 197, 94, 0.1);
    color: #16a34a;
    border: 1px solid rgba(34, 197, 94, 0.2);
  }

  .status-delayed {
    background: rgba(239, 68, 68, 0.15);
    color: #ef4444;
    border: 1px solid rgba(239, 68, 68, 0.3);
  }

  [data-theme="light"] .status-delayed {
    background: rgba(239, 68, 68, 0.1);
    color: #dc2626;
    border: 1px solid rgba(239, 68, 68, 0.2);
  }

  /* Card Hover Effects */
  .card-hover {
    transition: all var(--duration-normal) cubic-bezier(0.4, 0, 0.2, 1);
  }

  .card-hover:hover {
    transform: translateY(-4px) scale(1.02);
    box-shadow: var(--shadow-2xl), var(--shadow-glow);
  }

  /* Neon Border Effect */
  .neon-border {
    border: 1px solid var(--primary-500);
    box-shadow: 
      0 0 5px rgba(59, 130, 246, 0.3),
      inset 0 0 5px rgba(59, 130, 246, 0.1);
  }

  /* Scrollbar Styling with theme support */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: var(--hover-bg);
    border-radius: var(--radius-md);
  }

  ::-webkit-scrollbar-thumb {
    background: var(--gradient-primary);
    border-radius: var(--radius-md);
    border: 2px solid transparent;
    background-clip: content-box;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(135deg, var(--primary-600) 0%, var(--purple-600) 100%);
    background-clip: content-box;
  }

  /* Animation Classes */
  .animate-pulse-slow {
    animation: pulse-slow 3s ease-in-out infinite;
  }

  @keyframes pulse-slow {
    0%, 100% { opacity: 0.3; }
    50% { opacity: 0.8; }
  }

  .animate-float {
    animation: float 6s ease-in-out infinite;
  }

  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }

  .animate-glow {
    animation: glow 2s ease-in-out infinite alternate;
  }

  @keyframes glow {
    from { box-shadow: var(--shadow-glow); }
    to { box-shadow: var(--shadow-glow), 0 0 30px rgba(59, 130, 246, 0.4); }
  }

  /* Typography with proper theme contrast */
  h1, h2, h3, h4, h5, h6 {
    font-weight: 700;
    line-height: 1.2;
    letter-spacing: -0.025em;
    color: var(--text-main);
  }

  h1 { font-size: 2.5rem; }
  h2 { font-size: 2rem; }
  h3 { font-size: 1.5rem; }
  h4 { font-size: 1.25rem; }

  /* Selection Styling with theme support */
  ::selection {
    background: rgba(59, 130, 246, 0.3);
    color: var(--text-main);
  }

  [data-theme="light"] ::selection {
    background: rgba(59, 130, 246, 0.2);
    color: var(--text-main);
  }

  /* Loading Spinner Enhancement */
  .spinner {
    width: 40px;
    height: 40px;
    border: 4px solid rgba(59, 130, 246, 0.1);
    border-left-color: var(--primary-500);
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  /* Mobile Optimizations */
  @media (max-width: 768px) {
    .glass-effect {
      backdrop-filter: blur(15px);
      -webkit-backdrop-filter: blur(15px);
    }
    
    h1 { font-size: 2rem; }
    h2 { font-size: 1.75rem; }
    h3 { font-size: 1.25rem; }
  }

  /* Accessibility Improvements */
  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }

  /* Focus Indicators with better visibility */
  button:focus-visible,
  a:focus-visible,
  input:focus-visible,
  select:focus-visible {
    outline: 2px solid var(--primary-500);
    outline-offset: 2px;
  }

  /* Enhanced Navigation Button Styles */
  .nav-button-glow {
    position: relative;
    overflow: hidden;
  }

  .nav-button-glow::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s ease-in-out;
  }

  .nav-button-glow:hover::before {
    left: 100%;
  }

  /* Stunning glow effects */
  .glow-blue {
    box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
  }

  .glow-purple {
    box-shadow: 0 0 20px rgba(147, 51, 234, 0.3);
  }

  .glow-yellow {
    box-shadow: 0 0 20px rgba(251, 191, 36, 0.3);
  }

  /* Enhanced button hover effects */
  .btn-enhanced {
    position: relative;
    overflow: hidden;
    background: linear-gradient(135deg, var(--primary-500) 0%, var(--purple-500) 100%);
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 
      0 8px 32px rgba(0, 0, 0, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.1);
    transition: all 0.3s ease;
  }

  .btn-enhanced::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .btn-enhanced:hover::before {
    opacity: 1;
  }

  .btn-enhanced:hover {
    transform: translateY(-2px);
    box-shadow: 
      0 12px 40px rgba(0, 0, 0, 0.4),
      0 0 20px rgba(59, 130, 246, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.2);
  }

  /* Shimmer effect for active states */
  .shimmer {
    position: relative;
    overflow: hidden;
  }

  .shimmer::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    animation: shimmer 2s infinite;
  }

  @keyframes shimmer {
    0% { left: -100%; }
    100% { left: 100%; }
  }

  /* Universal text color classes that adapt to theme */
  .text-theme-main {
    color: var(--text-main) !important;
  }

  .text-theme-secondary {
    color: var(--text-secondary) !important;
  }

  .text-theme-muted {
    color: var(--text-muted) !important;
  }

  .text-theme-white {
    color: var(--text-white) !important;
  }

  .text-theme-gray-300 {
    color: var(--text-gray-300) !important;
  }

  .text-theme-gray-400 {
    color: var(--text-gray-400) !important;
  }
`;

export default GlobalStyles;
