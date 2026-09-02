import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  Mail, 
  Lock, 
  User,
  Loader2, 
  Eye, 
  EyeOff,
  CheckCircle2,
  XCircle,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/SupabaseAuthContext';

const RegisterPage = () => {
  const { signUp, checkEmailExists, user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [emailStatus, setEmailStatus] = useState('neutral'); // neutral, checking, available, taken, invalid
  
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0, // 0-3
    label: 'Weak',
    color: 'bg-slate-200'
  });

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  // Password Strength Logic
  useEffect(() => {
    const pwd = formData.password;
    if (!pwd) {
      setPasswordStrength({ score: 0, label: 'Weak', color: 'bg-slate-200' });
      return;
    }

    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd) && /[a-z]/.test(pwd)) score++;
    if (/\d/.test(pwd) || /[^A-Za-z0-9]/.test(pwd)) score++;

    let label = 'Weak';
    let color = 'bg-red-500';

    if (score === 2) {
      label = 'Medium';
      color = 'bg-yellow-500';
    } else if (score === 3) {
      label = 'Strong';
      color = 'bg-green-500';
    }

    setPasswordStrength({ score, label, color });
  }, [formData.password]);

  // Email Validation & Availability Check (Debounced)
  useEffect(() => {
    const email = formData.email;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!email) {
      setEmailStatus('neutral');
      return;
    }

    if (!emailRegex.test(email)) {
      setEmailStatus('invalid');
      return;
    }

    setEmailStatus('checking');
    const timer = setTimeout(async () => {
      const exists = await checkEmailExists(email);
      if (exists) {
        setEmailStatus('taken');
      } else {
        setEmailStatus('available');
      }
    }, 600);

    return () => clearTimeout(timer);
  }, [formData.email, checkEmailExists]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const isFormValid = 
    formData.fullName.length > 2 &&
    emailStatus === 'available' &&
    passwordStrength.score >= 2 && // Require at least Medium
    formData.password === formData.confirmPassword;

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    setLoading(true);
    try {
      const { error } = await signUp(formData.email, formData.password, formData.fullName);
      if (error) throw error;
      
      toast({
        title: "Account Created!",
        description: "Registration successful. Please login to continue.",
        className: "bg-green-50 border-green-200 text-green-800",
      });
      
      // Navigate directly to login as requested
      navigate('/login');
      
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Registration Failed",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-purple-700 via-indigo-600 to-blue-600">
      <div className="w-full max-w-md my-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
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
            <h2 className="text-xl font-bold text-slate-800">Create Account</h2>
            <p className="text-sm text-slate-500 mt-1">Join us for secure software solutions</p>
          </div>

          {/* Content */}
          <div className="p-8 space-y-6">
            <form onSubmit={handleRegister} className="space-y-5">
              
              {/* Full Name */}
              <div className="space-y-1.5">
                <Label htmlFor="fullName" className="text-slate-700 font-medium ml-1">Full Name</Label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-500 transition-colors">
                    <User className="h-5 w-5" />
                  </div>
                  <Input
                    id="fullName"
                    name="fullName"
                    placeholder="John Doe"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={`pl-10 pr-10 h-11 border-slate-200 focus:border-indigo-500 focus:ring-indigo-500 bg-slate-50/50 text-gray-900 ${ // Added text-gray-900
                      formData.fullName.length > 2 ? 'border-green-300 bg-green-50/30' : ''
                    }`}
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    {formData.fullName.length > 2 && <CheckCircle2 className="h-5 w-5 text-green-500" />}
                  </div>
                </div>
              </div>

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
                    className={`pl-10 pr-10 h-11 border-slate-200 focus:border-indigo-500 focus:ring-indigo-500 bg-slate-50/50 text-gray-900 ${ // Added text-gray-900
                      emailStatus === 'available' ? 'border-green-300 bg-green-50/30' : 
                      emailStatus === 'taken' || emailStatus === 'invalid' ? 'border-red-300 bg-red-50/30' : ''
                    }`}
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    {emailStatus === 'checking' && <Loader2 className="h-4 w-4 text-slate-400 animate-spin" />}
                    {emailStatus === 'available' && <CheckCircle2 className="h-5 w-5 text-green-500" />}
                    {(emailStatus === 'taken' || emailStatus === 'invalid') && <XCircle className="h-5 w-5 text-red-500" />}
                  </div>
                </div>
                {emailStatus === 'taken' && <p className="text-xs text-red-500 ml-1">Email is already registered.</p>}
                {emailStatus === 'invalid' && <p className="text-xs text-red-500 ml-1">Invalid email format.</p>}
              </div>

              {/* Password Input */}
              <div className="space-y-1.5">
                <Label htmlFor="password" className="text-slate-700 font-medium ml-1">Password</Label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-500 transition-colors">
                    <Lock className="h-5 w-5" />
                  </div>
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
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
                
                {/* Password Strength Indicator */}
                {formData.password && (
                  <div className="mt-2 space-y-1">
                    <div className="flex justify-between items-center px-1">
                        <span className="text-xs text-slate-500">Strength: <span className={`font-semibold ${passwordStrength.label === 'Weak' ? 'text-red-500' : passwordStrength.label === 'Medium' ? 'text-yellow-600' : 'text-green-600'}`}>{passwordStrength.label}</span></span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div 
                            className={`h-full transition-all duration-300 ${passwordStrength.color}`} 
                            style={{ width: `${(passwordStrength.score / 3) * 100}%` }}
                        />
                    </div>
                    {passwordStrength.score < 2 && (
                        <p className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                            <AlertCircle className="h-3 w-3" /> Min 8 chars, mixed case & numbers
                        </p>
                    )}
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div className="space-y-1.5">
                <Label htmlFor="confirmPassword" className="text-slate-700 font-medium ml-1">Confirm Password</Label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-500 transition-colors">
                    <Lock className="h-5 w-5" />
                  </div>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`pl-10 pr-10 h-11 border-slate-200 focus:border-indigo-500 focus:ring-indigo-500 bg-slate-50/50 text-gray-900 ${ // Added text-gray-900
                      formData.confirmPassword && formData.confirmPassword === formData.password ? 'border-green-300 bg-green-50/30' : 
                      formData.confirmPassword && formData.confirmPassword !== formData.password ? 'border-red-300 bg-red-50/30' : ''
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-10 flex items-center text-slate-400 hover:text-slate-600 transition-colors focus:outline-none"
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    {formData.confirmPassword && formData.confirmPassword === formData.password && <CheckCircle2 className="h-5 w-5 text-green-500" />}
                    {formData.confirmPassword && formData.confirmPassword !== formData.password && <XCircle className="h-5 w-5 text-red-500" />}
                  </div>
                </div>
                {formData.confirmPassword && formData.confirmPassword !== formData.password && (
                    <p className="text-xs text-red-500 ml-1">Passwords do not match</p>
                )}
              </div>

              <Button
                type="submit"
                disabled={!isFormValid || loading}
                className="w-full h-11 text-base font-medium shadow-lg shadow-indigo-500/20 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white border-0 transition-all duration-300 transform hover:-translate-y-0.5"
              >
                {loading ? <Loader2 className="animate-spin h-5 w-5 mr-2" /> : "Create Account"}
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-slate-500">Already have an account?</span>
              </div>
            </div>

            <div className="text-center">
              <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-500 hover:underline">
                Sign in here
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

export default RegisterPage;