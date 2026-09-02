import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Loader2 } from 'lucide-react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ServicesPage from './pages/ServicesPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import SuccessPage from './pages/SuccessPage';
import FAQPage from './pages/FAQPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsPage from './pages/TermsPage';
import ShippingPage from './pages/ShippingPage';
import ReturnsPage from './pages/ReturnsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProtectedRoute from './components/ProtectedRoute';
import SecurityCheckPage from './pages/SecurityCheckPage';
import ABAPaymentPage from './pages/ABAPaymentPage';

import ShoppingCart from './pages/ShoppingCart';
import PaymentResultPage from './pages/PaymentResultPage';
import PaymentCard from './components/PaymentCard';

import { Toaster } from '@/components/ui/toaster';
import { CartProvider } from '@/context/CartContext';
import { LanguageProvider } from '@/context/LanguageContext';
import { AuthProvider } from '@/contexts/SupabaseAuthContext';
import ScrollToTop from '@/components/ScrollToTop';

 
const LoadingScreen = () => (
    <motion.div 
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 z-[100] bg-[#0f172a] flex flex-col items-center justify-center"
    >
        <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center gap-6"
        >
            <div className="relative">
                <ShieldCheck className="w-24 h-24 text-[#0ea5e9]" strokeWidth={1.5} />
                <motion.div 
                    className="absolute -top-2 -right-2"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                    <Loader2 className="w-8 h-8 text-[#ff3b30]" />
                </motion.div>
            </div>
            <div className="flex flex-col items-center gap-2">
                <h1 className="text-3xl font-bold text-white tracking-widest">SECURE<span className="text-[#ff3b30]">|</span>KEY</h1>
                <p className="text-slate-400 text-sm tracking-wider uppercase">Loading Secure Environment...</p>
            </div>
            
            <div className="w-48 h-1 bg-slate-800 rounded-full overflow-hidden mt-4">
                <motion.div 
                    className="h-full bg-[#0ea5e9]"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 4.5, ease: "easeInOut" }}
                />
            </div>
        </motion.div>
    </motion.div>
);

const MainLayout = ({ children }) => (
    <div className='min-h-screen flex flex-col bg-slate-50 font-sans relative'>
        <Navbar />
        <main className="flex-grow">
            {children}
        </main>
        <Footer />
    </div>
);

function App() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <Router>
            <ScrollToTop />
            <AuthProvider>
                <CartProvider>
                    <LanguageProvider>
                        
                        <AnimatePresence>
                            {isLoading && <LoadingScreen key="loader" />}
                        </AnimatePresence>

                        {!isLoading && (
                            <Routes>
                                <Route path="/login" element={<LoginPage />} />
                                <Route path="/register" element={<RegisterPage />} />
                                <Route path="/security-check" element={<SecurityCheckPage />} />
                                <Route path="*" element={
                                    <MainLayout>
                                        <Routes>
                                            <Route path="/" element={<HomePage />} />
                                            
                                            {/* Edge Function Integration Routes */}
                                            <Route path="/shopping-cart" element={<ShoppingCart />} />
                                            <Route path="/payment-card" element={<div className="flex items-center justify-center min-h-[80vh] p-4"><PaymentCard amount={100} /></div>} />
                                            <Route path="/payment-result" element={<PaymentResultPage />} />
                                            
                                            {/* Standard Routes */}
                                            <Route path="/products" element={<ProductsPage />} />
                                            <Route path="/services" element={<ServicesPage />} />
                                            <Route path="/about" element={<AboutPage />} />
                                            <Route path="/contact" element={<ContactPage />} />
                                            <Route path="/cart" element={<CartPage />} />
                                            <Route path="/checkout" element={<CheckoutPage />} />
                                            <Route path="/success" element={<SuccessPage />} />
                                            <Route path="/faq" element={<FAQPage />} />
                                            <Route path="/privacy" element={<PrivacyPolicyPage />} />
                                            <Route path="/terms" element={<TermsPage />} />
                                            <Route path="/shipping" element={<ShippingPage />} />
                                            <Route path="/returns" element={<ReturnsPage />} />
                                            <Route path="/pay-with-aba-khqr" element={<ABAPaymentPage />} />
                                            
                                            <Route path="*" element={<Navigate to="/" replace />} />
                                        </Routes>
                                    </MainLayout>
                                } />
                            </Routes>
                        )}
                        
                        <Toaster />
                    </LanguageProvider>
                </CartProvider>
            </AuthProvider>
        </Router>
    );
}

export default App;