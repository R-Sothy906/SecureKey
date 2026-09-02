
import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle, ShoppingBag, Home, CreditCard } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { motion } from 'framer-motion';

const PaymentResult = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { clearCart } = useCart();
  
  const [status, setStatus] = useState('');
  const [tranId, setTranId] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    // ABA PayWay typically returns status in query params
    const tranStatus = searchParams.get('status') || searchParams.get('resp_code');
    const transactionId = searchParams.get('tran_id');
    const paymentAmount = searchParams.get('amount') || searchParams.get('ap_amount');
    
    if (tranStatus === '0' || tranStatus === '00' || tranStatus?.toLowerCase() === 'success') {
      setStatus('success');
      clearCart();
    } else if (tranStatus) {
      setStatus('failed');
    } else {
      setStatus('unknown');
    }
    
    if (transactionId) setTranId(transactionId);
    if (paymentAmount) setAmount(paymentAmount);
    
    setDate(new Date().toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric',
      hour: '2-digit', minute: '2-digit'
    }));
  }, [searchParams, clearCart]);

  const isSuccess = status === 'success';

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, type: 'spring' }}
        className="max-w-md w-full bg-white rounded-3xl shadow-xl overflow-hidden text-center border border-gray-100"
      >
        {/* Header Area */}
        <div className={`pt-12 pb-8 px-8 ${isSuccess ? 'bg-gradient-to-b from-green-50 to-white' : 'bg-gradient-to-b from-red-50 to-white'}`}>
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg ${isSuccess ? 'bg-green-100 shadow-green-100/50' : 'bg-red-100 shadow-red-100/50'}`}
          >
            {isSuccess ? (
              <CheckCircle2 className="w-12 h-12 text-green-600" strokeWidth={2.5} />
            ) : (
              <XCircle className="w-12 h-12 text-red-600" strokeWidth={2.5} />
            )}
          </motion.div>
          
          <h1 className={`text-3xl font-extrabold mb-3 ${isSuccess ? 'text-green-700' : 'text-red-700'}`}>
            {isSuccess ? 'Payment Successful!' : 'Payment Failed'}
          </h1>
          <p className="text-gray-500 font-medium">
            {isSuccess ? 'Thank you for your purchase. Your transaction is complete.' : 'We could not process your payment at this time. Please try again.'}
          </p>
        </div>

        {/* Transaction Details */}
        <div className="px-8 pb-8">
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-4 mb-8 text-left">
            <h3 className="font-bold text-gray-900 border-b border-slate-200 pb-3 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-gray-400" /> Transaction Details
            </h3>
            
            {amount && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500 font-medium">Amount Paid</span>
                <span className="font-extrabold text-lg text-gray-900">${parseFloat(amount).toFixed(2)}</span>
              </div>
            )}
            
            {tranId && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500 font-medium">Transaction ID</span>
                <span className="font-mono text-sm font-semibold text-gray-700 bg-gray-200 px-2 py-1 rounded">{tranId}</span>
              </div>
            )}
            
            <div className="flex justify-between items-center border-t border-slate-200/60 pt-3 mt-1">
              <span className="text-sm text-gray-500 font-medium">Date & Time</span>
              <span className="text-sm font-semibold text-gray-700">{date}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button 
              onClick={() => navigate('/shopping-cart')}
              className={`w-full h-14 text-lg font-bold text-white rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all ${isSuccess ? 'bg-green-600 hover:bg-green-700 shadow-green-600/20' : 'bg-red-600 hover:bg-red-700 shadow-red-600/20'}`}
            >
              <ShoppingBag className="w-5 h-5" /> Continue Shopping
            </Button>
            <Button 
              variant="ghost"
              onClick={() => navigate('/')}
              className="w-full h-12 text-md font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl flex items-center justify-center gap-2"
            >
              <Home className="w-5 h-5" /> Back to Home
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentResult;
