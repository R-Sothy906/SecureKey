import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, CheckCircle2 } from 'lucide-react';

const PaymentMethodCard = ({ id, title, subtitle, icon, isSelected, onClick }) => {
  return (
    <motion.div
      onClick={onClick}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      className={`relative group cursor-pointer rounded-xl p-4 transition-all duration-300 flex items-center gap-4 bg-white overflow-hidden border border-slate-100 ${
        isSelected 
          ? 'ring-4 ring-blue-500 shadow-lg shadow-blue-900/20' 
          : 'hover:bg-blue-50/80 hover:border-blue-200 shadow-sm'
      }`}
    >
      {/* Selection Border/Indicator */}
      {isSelected && (
        <div className="absolute top-2 right-2 z-10">
            <CheckCircle2 className="w-5 h-5 text-blue-600 fill-blue-50" />
        </div>
      )}

      {/* Icon Area */}
      <div className="flex-shrink-0 w-16 h-12 flex items-center justify-center">
        {typeof icon === 'string' ? (
          <img src={icon} alt={title} className="max-w-full max-h-full object-contain" />
        ) : (
          icon
        )}
      </div>

      {/* Content Area */}
      <div className="flex-1 pr-8">
        <h3 className="font-bold text-slate-900 text-lg">{title}</h3>
        <p className="text-sm text-slate-500 leading-snug">{subtitle}</p>
      </div>

      {/* Arrow */}
      <div className={`text-slate-300 group-hover:text-blue-500 transition-colors ${isSelected ? 'opacity-0' : 'opacity-100'}`}>
        <ChevronRight className="w-6 h-6" />
      </div>
    </motion.div>
  );
};

export default PaymentMethodCard;