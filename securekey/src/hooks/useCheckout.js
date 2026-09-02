
import { useState } from 'react';
import { supabase } from '@/lib/customSupabaseClient';

export const useCheckout = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCheckout = async (checkoutData) => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: invokeError } = await supabase.functions.invoke('create-checkout', {
        body: checkoutData,
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (invokeError) throw invokeError;

      if (data && data.ok) {
        // Replace current document with the payment gateway HTML
        document.open();
        document.write(data.checkout_html);
        document.close();
        return true;
      } else {
        // Gateway returned an error structure
        setError(data || { error: 'Unknown checkout error occurred' });
        return false;
      }
    } catch (err) {
      console.error('Checkout hook error:', err);
      setError({ error: err.message || 'Failed to connect to checkout service.' });
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, handleCheckout, setError };
};
