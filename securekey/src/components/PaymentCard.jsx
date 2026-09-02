
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, AlertCircle, Loader2, RefreshCw, Info } from 'lucide-react';
import { useABACheckout } from '@/hooks/useABACheckout';
import { getBackendUrl } from '@/hooks/useBackendUrl';

const PaymentCard = ({ amount }) => {
  const { initiateCheckout, isLoading, error, statusMessage, setError } = useABACheckout();

  const handlePayClick = () => {
    initiateCheckout(amount);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-white rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.3)]"
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding: '2px'
        }}
      >
        <div className="bg-white rounded-[14px] h-full flex flex-col p-8">
          
          <div className="flex flex-col items-center justify-center text-center space-y-2 mb-8">
            <div className="w-20 h-20 mb-2 p-2 bg-slate-50 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center">
                <img 
                    src="https://horizons-cdn.hostinger.com/5c0033fd-531e-484e-ab31-3b609f01c973/c48d536bec287d66ae788847ef226a05.png" 
                    alt="ABA Bank Logo" 
                    className="w-full h-auto object-contain"
                />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">ABA PayWay</h2>
            <p className="text-[#005aab] font-medium text-sm">ការទូទាត់ប្រកបដោយសុវត្ថិភាព</p>
          </div>

          <div className="bg-slate-50 rounded-xl p-6 text-center border border-slate-100 mb-8 shadow-inner">
            <span className="text-sm text-gray-500 uppercase tracking-wider font-semibold block mb-1">Total Amount</span>
            <span className="text-4xl font-extrabold text-gray-900">${parseFloat(amount).toFixed(2)}</span>
          </div>

          <AnimatePresence mode="wait">
            {error && (
                <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex flex-col gap-2"
                >
                    <div className="flex items-center justify-center gap-2 text-red-600 mb-1">
                        <AlertCircle className="w-5 h-5 shrink-0" />
                        <span className="font-bold text-sm">Connection Failed</span>
                    </div>
                    
                    <p className="text-xs text-red-700 text-center mb-2">{error}</p>
                    
                    <div className="bg-red-100 rounded p-2 text-left">
                        <p className="text-[10px] text-red-800 flex flex-col gap-1">
                            <span className="font-semibold flex items-center gap-1"><Info className="w-3 h-3"/> Debug Info:</span>
                            <span>Target: {getBackendUrl()}</span>
                            <span>Ensure local server is running or ngrok URL is correct in `.env.local`.</span>
                        </p>
                    </div>

                    <button 
                        onClick={() => setError(null)}
                        className="mt-2 mx-auto flex items-center gap-1 text-xs text-red-600 hover:text-red-800 font-bold uppercase transition-colors"
                    >
                        <RefreshCw className="w-3 h-3" /> Dismiss
                    </button>
                </motion.div>
            )}

            {isLoading && statusMessage && !error && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-6 p-4 bg-blue-50 border border-blue-100 rounded-xl flex items-center gap-3"
                >
                    <Loader2 className="w-5 h-5 text-[#005aab] animate-spin shrink-0" />
                    <p className="text-sm text-[#005aab] font-medium">{statusMessage}</p>
                </motion.div>
            )}
          </AnimatePresence>

          <button
            onClick={handlePayClick}
            disabled={isLoading}
            className="w-full h-14 bg-[#005aab] hover:bg-[#004481] text-white rounded-xl text-lg font-bold shadow-lg shadow-blue-900/20 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed transform hover:-translate-y-0.5 active:translate-y-0"
          >
            {isLoading ? (
                <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    កំពុងដំណើរការ...
                </>
            ) : (
                'បង់ប្រាក់ឥឡូវនេះ'
            )}
          </button>

          <div className="mt-8 flex items-center justify-center gap-2 text-gray-400">
            <ShieldCheck className="w-4 h-4 text-green-500" />
            <span className="text-xs font-medium">ធនាគារ ABA ធានាសុវត្ថិភាព 100%</span>
          </div>

        </div>
      </motion.div>
      
      <div id="aba_main_modal" className="hidden">
        <div className="aba-modal-content"></div>
      </div>
    </div>
  );
};

export default PaymentCard;
