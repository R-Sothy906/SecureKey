import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  Mail, 
  Lock, 
  Loader2, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Clock 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/SupabaseAuthContext';

const LoginPage = () => {
  const { signInWithEmail, resendConfirmationEmail, user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const returnTo = searchParams.get('returnTo');
  
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [needsConfirmation, setNeedsConfirmation] = useState(false);
  const [countdown, setCountdown] = useState(0);
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Redirect if already logged in (handling returnTo)
  useEffect(() => {
    if (user) {
      navigate(returnTo || '/');
    }
  }, [user, navigate, returnTo]);

  // Countdown timer effect
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(c => c - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setTouched(prev => ({ ...prev, [name]: true }));
    
    // Reset confirmation state when user changes email
    if (name === 'email') {
      setNeedsConfirmation(false);
    }

    // Real-time validation updates
    if (name === 'email') {
      if (!value) setErrors(prev => ({ ...prev, email: 'Email is required' }));
      else if (!validateEmail(value)) setErrors(prev => ({ ...prev, email: 'Invalid email format' }));
      else {
        const newErrors = { ...errors };
        delete newErrors.email;
        setErrors(newErrors);
      }
    }
    
    if (name === 'password') {
      if (!value) setErrors(prev => ({ ...prev, password: 'Password is required' }));
      else {
        const newErrors = { ...errors };
        delete newErrors.password;
        setErrors(newErrors);
      }
    }
  };

  const isFormValid = formData.email && formData.password && Object.keys(errors).length === 0;

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    setLoading(true);
    setNeedsConfirmation(false);
    
    try {
      const { error } = await signInWithEmail(formData.email, formData.password);
      
      if (error) {
        if (error.isUnconfirmed) {
          setNeedsConfirmation(true);
          throw new Error("Email not confirmed. Please verify your email.");
        }
        throw error;
      }
      
      toast({
        title: "Success",
        description: "Welcome back!",
        className: "bg-green-50 border-green-200 text-green-800",
      });
      // Navigation happens via useEffect when user state changes
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: error.message || "Invalid credentials",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResendConfirmation = async () => {
    if (!formData.email) return;
    
    setResendLoading(true);
    try {
      const { error } = await resendConfirmationEmail(formData.email);
      
      if (error) {
        if (error.isRateLimited) {
          setCountdown(60); // Start 60s cooldown on rate limit
          throw new Error("Too many requests. Please wait 60 seconds.");
        }
        throw error;
      }
      
      setCountdown(60); // Start 60s cooldown on success
      toast({
        title: "Confirmation Sent",
        description: "Please check your email inbox for the verification link.",
        className: "bg-blue-50 border-blue-200 text-blue-800",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to Resend",
        description: error.message || "Could not send confirmation email.",
      });
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700">
      <div className="w-full max-w-md">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/95 backdrop-blur-sm shadow-2xl rounded-2xl overflow-hidden border border-white/20"
        >
          {/* Header */}
          <div className="bg-slate-50 px-8 py-6 border-b border-slate-100 flex flex-col items-center">
            <Link to="/" className="flex items-center gap-2 group mb-4">
              <ShieldCheck className="h-10 w-10 text-indigo-600 group-hover:scale-110 transition-transform" />
              <span className="text-2xl font-bold text-slate-900 tracking-tight">
                SECURE<span className="text-indigo-600">|</span>KEY
              </span>
            </Link>
            <h2 className="text-xl font-bold text-slate-800">Welcome Back</h2>
            <p className="text-sm text-slate-500 mt-1">Sign in to access your account</p>
          </div>

          {/* Form */}
          <div className="p-8 space-y-6">
            {needsConfirmation && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4"
              >
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-yellow-800">Email Not Confirmed</h4>
                    <p className="text-xs text-yellow-700 mt-1">
                      Your email address hasn't been verified yet. Please check your inbox or request a new confirmation link.
                    </p>
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm" 
                      onClick={handleResendConfirmation}
                      disabled={resendLoading || countdown > 0}
                      className="mt-3 h-8 text-xs border-yellow-300 bg-white hover:bg-yellow-100 text-yellow-800 disabled:opacity-70"
                    >
                      {resendLoading ? (
                        <Loader2 className="h-3 w-3 animate-spin mr-2" />
                      ) : countdown > 0 ? (
                        <Clock className="h-3 w-3 mr-2" />
                      ) : null}
                      {countdown > 0 ? `Resend available in ${countdown}s` : "Resend Confirmation Email"}
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}

            <form onSubmit={handleLogin} className="space-y-5">
              
              {/* Email Input */}
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-slate-700 font-medium ml-1">Email Address</Label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-500 transition-colors">
                    <Mail className="h-5 w-5" />
                  </div>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={() => setTouched(prev => ({ ...prev, email: true }))}
                    className={`pl-10 pr-10 h-11 border-slate-200 focus:border-indigo-500 focus:ring-indigo-500 bg-slate-50/50 text-gray-900 ${ // Added text-gray-900
                      touched.email && errors.email ? 'border-red-300 focus:border-red-500 focus:ring-red-500 bg-red-50/30' : 
                      touched.email && !errors.email && formData.email ? 'border-green-300 focus:border-green-500 focus:ring-green-500 bg-green-50/30' : ''
                    }`}
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    {touched.email && errors.email && <XCircle className="h-5 w-5 text-red-500" />}
                    {touched.email && !errors.email && formData.email && <CheckCircle2 className="h-5 w-5 text-green-500" />}
                  </div>
                </div>
                {touched.email && errors.email && (
                  <p className="text-xs text-red-500 ml-1">{errors.email}</p>
                )}
              </div>

              {/* Password Input */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between ml-1">
                  <Label htmlFor="password" className="text-slate-700 font-medium">Password</Label>
                  <Link to="/reset-password" class="text-xs font-medium text-indigo-600 hover:text-indigo-500 hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-500 transition-colors">
                    <Lock className="h-5 w-5" />
                  </div>
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    className="pl-10 pr-10 h-11 border-slate-200 focus:border-indigo-500 focus:ring-indigo-500 bg-slate-50/50 text-gray-900" // Added text-gray-900
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition-colors focus:outline-none"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={!isFormValid || loading}
                className="w-full h-11 text-base font-medium shadow-lg shadow-indigo-500/20 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white border-0 transition-all duration-300 transform hover:-translate-y-0.5"
              >
                {loading ? <Loader2 className="animate-spin h-5 w-5 mr-2" /> : "Sign In"}
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-slate-500">Don't have an account?</span>
              </div>
            </div>

            <div className="text-center">
              <Link to="/register" className="font-semibold text-indigo-600 hover:text-indigo-500 hover:underline">
                Create a new account
              </Link>
            </div>
          </div>
        </motion.div>
        
        <p className="text-center text-blue-100 text-sm mt-6">
          &copy; {new Date().getFullYear()} SecureKey. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;