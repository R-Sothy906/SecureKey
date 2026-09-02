
import React, { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { ShieldCheck, Loader2, DollarSign, AlertCircle, LogIn, RefreshCcw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import PaymentOptionCard from '@/components/PaymentOptionCard';
import { ENDPOINTS } from '@/config/api';

const CheckoutPage = () => {
  const { cart, totalPrice } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  
  // Agreements
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [agreedToNonRefundable, setAgreedToNonRefundable] = useState(false);

  // Form States
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [emailError, setEmailError] = useState('');

  // Payment States
  const [selectedPaymentOption, setSelectedPaymentOption] = useState('abapay_khqr');
  
  // Checkout Processing States
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Currency
  const [currency, setCurrency] = useState('USD');
  const exchangeRate = 4100;
  
  const tax = 0.00;
  const shipping = 0.00;
  const finalTotal = totalPrice + tax + shipping;

  // Redirect if cart empty
  useEffect(() => {
    if (cart.length === 0) {
      navigate('/cart');
    }
  }, [cart, navigate]);

  // Pre-fill email if user is logged in
  useEffect(() => {
    if (user && user.email) {
      setEmail(user.email);
    }
  }, [user]);

  const handleEmailChange = (e) => {
    const val = e.target.value;
    setEmail(val);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (val && !emailRegex.test(val)) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError('');
    }
  };

  // Function to submit payment directly
  const submitPaymentForm = (data) => {
    // Create form if not exists
    let form = document.getElementById('aba_merchant_request');
    if (!form) {
      form = document.createElement('form');
      form.id = 'aba_merchant_request';
      form.method = 'POST';
      form.target = '_blank';
      document.body.appendChild(form);
    }

    // Clear existing inputs
    form.innerHTML = '';
    
    // Set form action
    form.action = data.api_url || 'https://checkout-sandbox.payway.com.kh/api/payment-gateway/v1/payments/purchase';
    
    // Add all fields
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

    // Submit form
    form.submit();
  };

  const handleCheckout = async () => {
    setIsLoading(true);
    setMessage('');

    if (finalTotal <= 0) {
      toast({ 
        variant: "destructive", 
        title: "Invalid Amount", 
        description: "ចំនួនទឹកប្រាក់ត្រូវតែធំជាងសូន្យ" 
      });
      setIsLoading(false);
      return;
    }

    try {
      setMessage('កំពុងភ្ជាប់ទៅកាន់ម៉ាស៊ីនបម្រើ...');
      
      const body = {
        amount: finalTotal.toFixed(2),
        firstname: firstName || 'Customer',
        lastname: lastName || 'Name',
        email: email || 'customer@example.com',
        phone: phone || '012345678',
        payment_option: selectedPaymentOption,
        items: cart.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity || 1
        }))
      };

      const response = await fetch(ENDPOINTS.GENERATE_HASH, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(body)
      });

      if (!response.ok) {
        throw new Error(`Server Error: ${response.status}`);
      }

      const data = await response.json();

      if (!data.hash) {
        throw new Error('Invalid response from server');
      }

      setMessage('កំពុងបើកផ្ទាំងទូទាត់ប្រាក់...');
      
      // Submit directly without loading SDK
      submitPaymentForm(data);

      setMessage('សូមបំពេញព័ត៌មានក្នុងផ្ទាំងថ្មី');
      
      setTimeout(() => {
        setIsLoading(false);
        setMessage('');
      }, 3000);

    } catch (err) {
      console.error('Checkout Error:', err);
      toast({ 
        variant: "destructive", 
        title: "Checkout Failed", 
        description: "សូមព្យាយាមម្តងទៀត" 
      });
      setIsLoading(false);
      setMessage('');
    }
  };

  const onCheckoutSubmit = () => {
    if (!user) {
      toast({ 
        variant: "destructive", 
        title: "Authentication Required", 
        description: "សូមចូលគណនីមុនពេលទូទាត់ប្រាក់" 
      });
      navigate('/login?returnTo=/checkout');
      return;
    }

    if (!firstName || !lastName || !email || !phone || emailError) {
      toast({ 
        variant: "destructive", 
        title: "Missing Information", 
        description: "សូមបំពេញព័ត៌មានដែលចាំបាច់ទាំងអស់" 
      });
      return;
    }

    if (!agreedToTerms || !agreedToNonRefundable) {
      toast({ 
        variant: "destructive", 
        title: "Accept Terms", 
        description: "សូមយល់ព្រមតាមលក្ខខណ្ឌ" 
      });
      return;
    }

    handleCheckout();
  };

  const formatPrice = (price) => {
    if (currency === 'USD') return `$${price.toFixed(2)}`;
    return `${(price * exchangeRate).toLocaleString()} ៛`;
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex items-center mb-8">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Secure Checkout</h1>
          </div>
        </div>

        {/* Hidden Form for ABA PayWay */}
        <form method="POST" target="_blank" id="aba_merchant_request" className="hidden">
           {/* Fields will be populated dynamically */}
        </form>

        {/* Authentication Warning */}
        {!user && (
          <div className="mb-8 bg-blue-50 border border-blue-200 p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                <LogIn className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-blue-900">Authentication Required</h3>
                <p className="text-blue-700 text-sm">សូមចូលគណនីរបស់អ្នកមុនពេលធ្វើការទូទាត់ប្រាក់។</p>
              </div>
            </div>
            <Button 
              onClick={() => navigate('/login?returnTo=/checkout')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold whitespace-nowrap"
            >
              Login to Continue
            </Button>
          </div>
        )}

        <div className={`grid grid-cols-1 lg:grid-cols-3 gap-8 ${!user ? 'opacity-50 pointer-events-none' : ''}`}>
          
          {/* Left Column - Form */}
          <div className="lg:col-span-2">
            <div className="bg-[#1a3a52] rounded-3xl p-6 md:p-10 shadow-xl space-y-10">
                
              {/* Section 1: Contact Info */}
              <section>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold shadow-lg shadow-blue-900/50">1</div>
                  <h2 className="text-2xl font-bold text-white">Contact Information</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-blue-100 font-medium">First Name *</Label>
                    <Input 
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="John" 
                      className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-400 h-12 rounded-xl" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-blue-100 font-medium">Last Name *</Label>
                    <Input 
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Doe" 
                      className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-400 h-12 rounded-xl" 
                    />
                  </div>
                  <div className="space-y-2 md:col-span-1">
                    <Label className="text-blue-100 font-medium">Email *</Label>
                    <Input 
                      type="email"
                      value={email}
                      onChange={handleEmailChange}
                      placeholder="john.doe@gmail.com" 
                      className={`bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-400 h-12 rounded-xl ${emailError ? 'border-red-400' : ''}`} 
                    />
                    {emailError && <p className="text-xs text-red-300 mt-1">{emailError}</p>}
                  </div>
                  <div className="space-y-2 md:col-span-1">
                    <Label className="text-blue-100 font-medium">Phone Number *</Label>
                    <Input 
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="012345678" 
                      className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-400 h-12 rounded-xl" 
                    />
                  </div>
                </div>
              </section>

              <div className="w-full h-px bg-slate-700/50" />

              {/* Section 2: Payment Method */}
              <section>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold shadow-lg shadow-blue-900/50">2</div>
                  <h2 className="text-2xl font-bold text-white">Payment Option</h2>
                </div>

                <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 space-y-4">
                  <PaymentOptionCard
                    id="khqr"
                    name="ABA KHQR"
                    description="Scan to pay with any banking app"
                    logo="https://horizons-cdn.hostinger.com/5c0033fd-531e-484e-ab31-3b609f01c973/c48d536bec287d66ae788847ef226a05.png"
                    value="abapay_khqr"
                    isSelected={selectedPaymentOption === 'abapay_khqr'}
                    onChange={setSelectedPaymentOption}
                  />
                </div>
              </section>

              {/* Agreements Section */}
              <section className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Checkbox 
                      id="terms" 
                      checked={agreedToTerms}
                      onCheckedChange={setAgreedToTerms}
                      className="data-[state=checked]:bg-blue-500 border-slate-400 mt-1"
                    />
                    <Label htmlFor="terms" className="text-slate-300 font-normal leading-relaxed cursor-pointer">
                      I agree to the terms and conditions *
                    </Label>
                  </div>
                  <div className="flex items-start gap-3">
                    <Checkbox 
                      id="refund" 
                      checked={agreedToNonRefundable}
                      onCheckedChange={setAgreedToNonRefundable}
                      className="data-[state=checked]:bg-blue-500 border-slate-400 mt-1"
                    />
                    <Label htmlFor="refund" className="text-slate-300 font-normal leading-relaxed cursor-pointer">
                      I understand that digital products are non-refundable *
                    </Label>
                  </div>
                </div>
              </section>

            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-slate-100 sticky top-24">
                
              {/* Currency Selector */}
              <div className="mb-6">
                <Label className="text-gray-600 mb-2 block font-medium">Select Currency</Label>
                <div className="grid grid-cols-2 gap-2 bg-slate-100 p-1 rounded-xl">
                  <button
                    onClick={() => setCurrency('USD')}
                    className={`flex items-center justify-center gap-2 py-2.5 text-sm font-bold rounded-lg transition-all ${
                      currency === 'USD' 
                      ? 'bg-white text-blue-600 shadow-sm ring-1 ring-slate-200' 
                      : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
                    }`}
                  >
                    <DollarSign className="w-4 h-4" /> USD ($)
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-end mt-6 pt-6 border-t border-slate-100">
                <span className="text-lg font-bold text-gray-900">Total</span>
                <span className="text-3xl font-bold text-gray-900">{formatPrice(finalTotal)}</span>
              </div>

              <Button 
                onClick={onCheckoutSubmit}
                disabled={!agreedToTerms || !agreedToNonRefundable || isLoading || !user}
                className="w-full h-14 mt-8 bg-[#005aab] hover:bg-[#004481] text-white text-xl font-bold rounded-xl shadow-lg shadow-blue-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-6 h-6 mr-2 animate-spin" />
                    {message || 'កំពុងដំណើរការ...'}
                  </>
                ) : (
                  `បង់ប្រាក់ឥឡូវនេះ`
                )}
              </Button>
              
              {/* Active Message Display */}
              {message && !isLoading && (
                <div className="mt-4 p-3 bg-blue-50 text-blue-700 rounded-xl text-center text-sm font-medium animate-pulse">
                  {message}
                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;