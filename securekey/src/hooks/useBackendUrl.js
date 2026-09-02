import { useState, useEffect, useCallback } from 'react';
import { ENDPOINTS } from '@/config/api';

/**
 * Utility to resolve the correct backend URL.
 */
export const getBackendUrl = () => {
  const ngrokUrl = import.meta.env.VITE_NGROK_URL;
  
  if (ngrokUrl && ngrokUrl.trim() !== '') {
    console.log(`📡 Using ngrok backend URL: ${ngrokUrl}`);
    return ngrokUrl;
  }

  console.log(`💻 Using local backend URL: same origin (proxy)`);
  return '';  
};

/**
 * Hook to monitor the connection status to the backend.
 */
export const useBackendUrl = () => {
  const [url, setUrl] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  const checkConnection = useCallback(async () => {
    setIsChecking(true);
    try {
      const activeUrl = getBackendUrl();
      setUrl(activeUrl);
      
      // ប្រើ ENDPOINTS.HEALTH ដែលជា relative URL (/api/health)
      const healthUrl = activeUrl ? `${activeUrl}/health` : ENDPOINTS.HEALTH;
      
      console.log('Checking health at:', healthUrl);
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000);
      
      const res = await fetch(healthUrl, { 
          signal: controller.signal,
          headers: { 'Accept': 'application/json' }
      }).catch(err => {
        console.log('Health check error:', err);
        return null;
      });
      
      clearTimeout(timeoutId);
      setIsConnected(!!(res && res.ok));
    } catch (e) {
      setIsConnected(false);
      console.error(`Connection check failed:`, e);
    } finally {
      setIsChecking(false);
    }
  }, []);

  useEffect(() => {
    checkConnection();
  }, [checkConnection]);

  return { url, isConnected, isChecking, checkConnection };
};