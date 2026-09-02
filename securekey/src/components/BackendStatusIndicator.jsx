import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, RefreshCw, Server, AlertTriangle } from 'lucide-react';
import { ENDPOINTS } from '@/config/api';

const BackendStatusIndicator = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const isNgrok = false;  

  const checkBackendHealth = useCallback(async () => {
    setIsChecking(true);
    try {
      const response = await fetch(ENDPOINTS.HEALTH, {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        }
      }).catch(err => {
        console.log('Health check error:', err);
        return null;
      });
      
      if (response && response.ok) {
        const data = await response.json();
        if (data.status === 'ok') {
          setIsConnected(true);
          console.log('Backend health check successful: Connected');
        } else {
          setIsConnected(false);
        }
      } else {
        setIsConnected(false);
      }
    } catch (error) {
      setIsConnected(false);
    } finally {
      setIsChecking(false);
    }
  }, []);

  useEffect(() => {
    checkBackendHealth();
    
    const intervalId = setInterval(() => {
      checkBackendHealth();
    }, 30000);

    return () => clearInterval(intervalId);
  }, [checkBackendHealth]);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center justify-end">
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white/90 backdrop-blur-md border border-slate-200 shadow-xl rounded-2xl p-4 min-w-[280px] max-w-[340px]"
      >
        <div className="flex items-start gap-4">
          <div className={`p-2.5 rounded-xl shrink-0 ${isChecking ? 'bg-yellow-100' : isConnected ? 'bg-green-100' : 'bg-red-100'}`}>
            <Server className={`w-5 h-5 ${isChecking ? 'text-yellow-600 animate-pulse' : isConnected ? 'text-green-600' : 'text-red-600'}`} />
          </div>
          
          <div className="flex-grow min-w-0">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-sm font-bold text-gray-900">Backend Status</h3>
              <button 
                onClick={checkBackendHealth}
                disabled={isChecking}
                className="text-slate-400 hover:text-blue-600 transition-colors disabled:opacity-50"
                title="Refresh Status"
              >
                <RefreshCw className={`w-4 h-4 ${isChecking ? 'animate-spin text-blue-500' : ''}`} />
              </button>
            </div>
            
            <p className="text-[11px] text-slate-500 font-mono truncate w-full pr-2 mb-2">
              Using Proxy
            </p>

            <div className="flex items-center gap-2">
              {isChecking ? (
                 <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-yellow-50 text-yellow-700 text-[10px] font-bold uppercase tracking-wider border border-yellow-200">
                   <AlertTriangle className="w-3 h-3" /> Checking
                 </span>
              ) : isConnected ? (
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-green-50 text-green-700 text-[10px] font-bold uppercase tracking-wider border border-green-200">
                  <CheckCircle2 className="w-3 h-3" /> Connected
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-red-50 text-red-700 text-[10px] font-bold uppercase tracking-wider border border-red-200">
                  <XCircle className="w-3 h-3" /> Disconnected
                </span>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default BackendStatusIndicator;