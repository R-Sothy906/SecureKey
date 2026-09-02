import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Target, RotateCcw } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <div className="relative w-full bg-[#00aaff] text-white pt-28 pb-20 sm:pt-36 sm:pb-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 gap-12 items-center justify-center">
          
          {/* Left Column (now centered and full width) */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8 text-center"
          >
            <div className="flex flex-col gap-4">
                <div className="flex items-center justify-center gap-3">
                    <Target className="w-10 h-10 text-[#ff3b30] animate-pulse" />
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-[#1e3a8a]">
                        {t('hero.title')} <span className="block sm:inline text-[#1e3a8a]/90">{t('hero.subtitle')}</span>
                    </h1>
                </div>
                
                <p className="text-xl text-[#1e3a8a]/70 font-mono tracking-widest uppercase">
                🎯 {t('hero.limited')}
                </p>
            </div>

            {/* Progress Bar */}
            <div className="w-full max-w-md mx-auto h-2 bg-[#1e3a8a]/10 rounded-full overflow-hidden">
                <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "50%" }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="h-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"
                />
            </div>

            <div className="flex items-center justify-center gap-2 text-[#1e3a8a]/80 font-bold">
                <Flame className="w-5 h-5 text-orange-500 fill-orange-500" />
                <span>{t('hero.hotDeal')}</span>
            </div>
          </motion.div>
        </div>
        
        {/* Footer Text */}
        <div className="mt-16 text-center text-white/90 text-xs font-mono flex items-center justify-center gap-2 tracking-wider">
            <RotateCcw className="w-3 h-3 animate-spin" style={{ animationDuration: '3s' }} />
            {t('hero.cycle')}
        </div>
      </div>

      {/* Curved Bottom */}
      <div className="absolute bottom-0 left-0 right-0 translate-y-1">
         <svg viewBox="0 0 1440 80" className="w-full h-12 sm:h-20 fill-white block" preserveAspectRatio="none">
            <path d="M0,80 C480,0 960,0 1440,80 L1440,80 L0,80 Z"></path>
         </svg>
      </div>
    </div>
  );
};

export default HeroSection;