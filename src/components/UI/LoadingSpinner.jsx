import React from 'react';
import { motion } from 'framer-motion';
import { Ship } from 'lucide-react';

const LoadingSpinner = ({ message = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] space-y-8">
      {/* Animated ship icon */}
      <motion.div
        animate={{ 
          rotate: [0, 360],
          scale: [1, 1.2, 1]
        }}
        transition={{ 
          rotate: { duration: 2, repeat: Infinity, ease: "linear" },
          scale: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
        }}
        className="relative"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-xl opacity-50 animate-pulse"></div>
        <div className="relative p-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full">
          <Ship className="h-8 w-8 text-white" />
        </div>
      </motion.div>

      {/* Loading dots */}
      <div className="flex items-center space-x-2">
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: index * 0.2,
              ease: "easeInOut",
            }}
            className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
          />
        ))}
      </div>

      {/* Loading text */}
      <motion.p
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="text-gray-300 font-medium text-lg"
      >
        {message}
      </motion.p>

      {/* Animated background waves */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            animate={{
              scale: [1, 2, 1],
              opacity: [0, 0.1, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: index * 1,
              ease: "easeInOut",
            }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-blue-500/20 rounded-full"
          />
        ))}
      </div>
    </div>
  );
};

export default LoadingSpinner;
