
import React from 'react';
import { motion } from 'framer-motion';

const PaymentOptionCard = ({ id, name, description, logo, value, isSelected, onChange }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      onClick={() => onChange(value)}
      className={`flex items-center gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
        isSelected 
          ? 'border-blue-500 bg-blue-50 shadow-sm' 
          : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
      }`}
      role="radio"
      aria-checked={isSelected}
      tabIndex={0}
      id={id}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onChange(value);
        }
      }}
    >
      {/* Logo Container */}
      <div className="w-[60px] sm:w-[80px] h-[60px] sm:h-[80px] shrink-0 bg-white rounded-md p-2 flex items-center justify-center border border-gray-100 shadow-sm">
        <img src={logo} alt={name} className="w-full h-full object-contain" />
      </div>

      {/* Text Container */}
      <div className="flex-1 min-w-0">
        <h4 className={`text-base sm:text-lg font-bold truncate ${isSelected ? 'text-blue-900' : 'text-gray-900'}`}>
          {name}
        </h4>
        <p className={`text-sm mt-1 line-clamp-2 ${isSelected ? 'text-blue-700' : 'text-gray-500'}`}>
          {description}
        </p>
      </div>

      {/* Radio Indicator */}
      <div className="shrink-0 flex items-center justify-center ml-2">
        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
          isSelected ? 'border-blue-500' : 'border-gray-300'
        }`}>
          {isSelected && (
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-3 h-3 bg-blue-500 rounded-full" 
            />
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default PaymentOptionCard;
