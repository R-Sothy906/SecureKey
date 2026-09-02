
import { useState } from 'react';
import { getBackendUrl } from './useBackendUrl';

export const useABAPayment = () => {
  const [amount, setAmount] = useState('10.00');
  const [currency, setCurrency] = useState('USD');
  const [lifetime, setLifetime] = useState('60');
  const [qrImageTemplate, setQrImageTemplate] = useState('template3_color');
  const [qrImage, setQrImage] = useState(null);
  const [qrString, setQrString] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [debugInfo, setDebugInfo] = useState(null);

  const generateQR = async () => {
    setLoading(true);
    setError(null);
    setDebugInfo(null);
    setQrImage(null);
    setQrString(null);

    try {
      const backendUrl = getBackendUrl();
      console.log(`[ABAPaymentPage] Generating QR using backend URL: ${backendUrl}`);

      const res = await fetch(`${backendUrl}/generate-qr`, {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({
            amount,
            currency,
            lifetime,
            qrImageTemplate
         })
      });

      const data = await res.json();
      if (!res.ok || data.error) {
         throw new Error(data.error || 'Failed to generate QR string from gateway');
      }

      setQrImage(data.qrImage);
      setQrString(data.qrString);
      if (data.debug) setDebugInfo(data.debug);

    } catch (err) {
      console.error('QR Generation error:', err);
      const url = getBackendUrl();
      setError(`Cannot connect to backend or gateway error. Target URL: ${url}. Message: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const resetPayment = () => {
    setQrImage(null);
    setQrString(null);
    setError(null);
    setDebugInfo(null);
  };

  return { 
    amount, setAmount, 
    currency, setCurrency, 
    lifetime, setLifetime, 
    qrImageTemplate, setQrImageTemplate, 
    qrImage, qrString, 
    loading, error, debugInfo, 
    generateQR, resetPayment 
  };
};
