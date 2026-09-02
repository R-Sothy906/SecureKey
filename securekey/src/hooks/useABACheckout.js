
import { useState } from 'react';
import { getBackendUrl } from './useBackendUrl';
import { loadABASDK } from '@/utils/loadABASDK';

export const useABACheckout = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [statusMessage, setStatusMessage] = useState('');

  const initiateCheckout = async (amount) => {
    setIsLoading(true);
    setError(null);
    setStatusMessage('Connecting to backend server...');

    try {
      const backendUrl = getBackendUrl();
      console.log(`[PaymentCard] Using backend URL: ${backendUrl}`);
      
      const payload = {
        amount: parseFloat(amount).toFixed(2),
        firstname: 'Demo',
        lastname: 'Customer',
        email: 'demo@example.com',
        phone: '012345678'
      };

      const res = await fetch(`${backendUrl}/generate-hash`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
         throw new Error(`Backend request failed with status ${res.status}`);
      }
      
      const data = await res.json();

      setStatusMessage('Loading ABA SDK...');
      await loadABASDK();
      
      setStatusMessage('Opening secure payment...');
      
      let form = document.getElementById('aba_merchant_request');
      if (!form) {
        form = document.createElement('form');
        form.id = 'aba_merchant_request';
        form.method = 'POST';
        document.body.appendChild(form);
      }
      
      form.action = data.api_url || 'https://checkout-sandbox.payway.com.kh/api/payment-gateway/v1/payments/purchase';
      form.innerHTML = ''; // clear existing inputs
      
      const fields = ['hash', 'tran_id', 'amount', 'req_time', 'merchant_id', 'firstname', 'lastname', 'phone', 'email', 'payment_option'];
      fields.forEach(field => {
          if (data[field]) {
              const input = document.createElement('input');
              input.type = 'hidden';
              input.name = field;
              input.value = data[field];
              form.appendChild(input);
          }
      });

      if (window.AbaPayway && window.AbaPayway.checkout) {
          window.AbaPayway.checkout();
      } else {
          form.submit();
      }

    } catch (err) {
      console.error('Payment initialization error:', err);
      const url = getBackendUrl();
      setError(`Cannot reach backend server. Attempted URL: ${url}. Error: ${err.message}`);
    } finally {
      setIsLoading(false);
      setStatusMessage('');
    }
  };

  return { initiateCheckout, isLoading, error, statusMessage, setError };
};
