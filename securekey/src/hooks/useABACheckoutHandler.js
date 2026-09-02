
import { useState } from 'react';
import { getBackendUrl } from './useBackendUrl';
import { loadABASDK } from '@/utils/loadABASDK';

export const useABACheckoutHandler = (cartItems, totalAmount) => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);

  const handleCheckout = async (customerInfo) => {
    setIsLoading(true);
    setError(null);
    setMessage('');

    if (totalAmount <= 0) {
      setError('ចំនួនទឹកប្រាក់ត្រូវតែធំជាងសូន្យ (Amount must be > 0)');
      setIsLoading(false);
      return;
    }

    try {
      setMessage('កំពុងភ្ជាប់ទៅកាន់ម៉ាស៊ីនបម្រើ...');
      const backendUrl = getBackendUrl();
      console.log(`Initiating checkout flow using backend URL: ${backendUrl}`);

      const { 
        firstname = 'Customer', 
        lastname = 'Name', 
        email = 'customer@example.com', 
        phone = '012345678' 
      } = customerInfo || {};

      const payload = {
        amount: parseFloat(totalAmount).toFixed(2),
        firstname,
        lastname,
        email,
        phone,
        items: cartItems
      };

      const response = await fetch(`${backendUrl}/generate-hash`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`ម៉ាស៊ីនបម្រើមានបញ្ហា (Server Error: ${response.status}). Please check your backend connection.`);
      }

      const data = await response.json();
      
      setMessage('កំពុងរៀបចំការទូទាត់...');
      await loadABASDK();

      setMessage('កំពុងបើកផ្ទាំងទូទាត់ប្រាក់...');
      
      const form = document.getElementById('aba_merchant_request');
      if (!form) {
          throw new Error('រកមិនឃើញទម្រង់ទូទាត់ប្រាក់ទេ (Payment form not found in DOM)');
      }

      form.action = data.api_url || 'https://checkout-sandbox.payway.com.kh/api/payment-gateway/v1/payments/purchase';
      
      const fields = ['hash', 'tran_id', 'amount', 'req_time', 'merchant_id', 'firstname', 'lastname', 'phone', 'email', 'payment_option'];
      fields.forEach(field => {
          let input = form.querySelector(`input[name="${field}"]`);
          if (!input) {
              input = document.createElement('input');
              input.type = 'hidden';
              input.name = field;
              form.appendChild(input);
          }
          if (data[field]) {
              input.value = data[field];
          }
      });

      if (window.AbaPayway && window.AbaPayway.checkout) {
          window.AbaPayway.checkout();
      } else {
          form.submit();
      }

      setMessage('សូមបំពេញព័ត៌មានក្នុងផ្ទាំងថ្មី (Please complete in new window)');
      
      setTimeout(() => {
          setIsLoading(false);
          setMessage('');
      }, 3000);

    } catch (err) {
      console.error('Checkout Error:', err);
      setError(`បរាជ័យក្នុងការតភ្ជាប់ទៅកាន់ម៉ាស៊ីនបម្រើ (Connection Failed): ${err.message}. Please verify the backend URL (${getBackendUrl()}) is running and accessible.`);
      setIsLoading(false);
      setMessage('');
    }
  };

  return { handleCheckout, isLoading, message, setMessage, error, setError };
};
