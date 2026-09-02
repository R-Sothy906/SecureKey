import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, Package, Calendar, CreditCard, Hash, DollarSign, ArrowRight, Home, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Helmet } from 'react-helmet';

const SuccessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    // Get order data from location state
    if (location.state && location.state.orderData) {
      setOrderData(location.state.orderData);
    } else {
      // Redirect to home if no order data
      navigate('/');
    }
  }, [location, navigate]);

  if (!orderData) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading order details...</p>
        </div>
      </div>
    );
  }

  const { transactionId, email, items, totalAmount, currency, paymentMethod, timestamp } = orderData;

  const formatPrice = (price) => {
    if (currency === 'USD') return `$${parseFloat(price).toFixed(2)}`;
    return `${(parseFloat(price) * 4100).toLocaleString()} ៛`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getPaymentMethodDisplay = (method) => {
    const methods = {
      'khqr': 'ABA KHQR',
      'card': 'Credit/Debit Card',
      'paypal': 'PayPal'
    };
    return methods[method] || method;
  };

  return (
    <>
      <Helmet>
        <title>Payment Successful - SecureKey</title>
        <meta name="description" content="Your order has been confirmed successfully" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          
          {/* Success Header */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
              <CheckCircle2 className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
            <p className="text-lg text-gray-600">
              Your order has been confirmed and is being processed
            </p>
          </motion.div>

          {/* Transaction Info Card */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="mb-6 border-2 border-blue-100 shadow-lg">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <Hash className="w-5 h-5 text-blue-600 mt-1" />
                    <div>
                      <p className="text-sm text-gray-500 font-medium">Transaction ID</p>
                      <p className="font-mono text-sm text-gray-900 break-all">{transactionId}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-blue-600 mt-1" />
                    <div>
                      <p className="text-sm text-gray-500 font-medium">Date & Time</p>
                      <p className="text-sm text-gray-900">{formatDate(timestamp)}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CreditCard className="w-5 h-5 text-blue-600 mt-1" />
                    <div>
                      <p className="text-sm text-gray-500 font-medium">Payment Method</p>
                      <p className="text-sm text-gray-900">{getPaymentMethodDisplay(paymentMethod)}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <DollarSign className="w-5 h-5 text-blue-600 mt-1" />
                    <div>
                      <p className="text-sm text-gray-500 font-medium">Amount Paid</p>
                      <p className="text-lg font-bold text-green-600">{formatPrice(totalAmount)}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-start gap-3">
                    <Package className="w-5 h-5 text-blue-600 mt-1" />
                    <div>
                      <p className="text-sm text-gray-500 font-medium">Confirmation sent to</p>
                      <p className="text-sm text-gray-900 font-semibold">{email}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Order Items */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="mb-6 shadow-lg">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5" />
                  Order Items
                </h2>
                <div className="space-y-4">
                  {items.map((item, index) => (
                    <div key={index} className="flex gap-4 items-center pb-4 border-b border-gray-100 last:border-0">
                      <div className="w-16 h-16 bg-slate-50 rounded-lg p-2 flex-shrink-0">
                        <img 
                          src={item.imgSrc || item.img_src} 
                          alt={item.name} 
                          className="w-full h-full object-contain mix-blend-multiply" 
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 text-sm line-clamp-2">{item.name}</h3>
                        <p className="text-xs text-gray-500 mt-1">Quantity: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-900">
                          {formatPrice(parseFloat(item.price.replace(/[^0-9.-]+/g, '')) * item.quantity)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t-2 border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900">Total Paid</span>
                    <span className="text-2xl font-bold text-green-600">{formatPrice(totalAmount)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Info Message */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6"
          >
            <p className="text-sm text-blue-800 text-center">
              📧 A detailed receipt has been sent to <span className="font-bold">{email}</span>. 
              Your digital product keys will be delivered within 24 hours.
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <Button
              onClick={() => navigate('/')}
              variant="outline"
              className="h-12 text-base font-semibold border-2"
            >
              <Home className="w-5 h-5 mr-2" />
              Back to Home
            </Button>
            <Button
              onClick={() => navigate('/products')}
              className="h-12 text-base font-semibold bg-blue-600 hover:bg-blue-700"
            >
              Continue Shopping
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>

          {/* Support Info */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-8 text-center text-sm text-gray-500"
          >
            <p>Need help? Contact our support team at <a href="mailto:support@securekey.online" className="text-blue-600 hover:underline font-medium">support@securekey.online</a></p>
            <p className="mt-1">Reference your Transaction ID: <span className="font-mono font-semibold">{transactionId}</span></p>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default SuccessPage;