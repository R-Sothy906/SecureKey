import React from 'react';
import { motion } from 'framer-motion';
import { Trash2, ArrowLeft, ShoppingBag, Plus, Minus, CreditCard, ShieldCheck } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/components/ui/use-toast';
import { useLanguage } from '@/context/LanguageContext';

const CartPage = () => {
    const { cart, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();
    const navigate = useNavigate();
    const { toast } = useToast();
    const { t } = useLanguage();

    const handleClearCart = () => {
        clearCart();
        toast({
            title: t('cart.clearCart'),
            description: "All items have been removed from your shopping cart.",
            variant: "destructive"
        });
    };

    if (cart.length === 0) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center bg-slate-50 px-4 pt-20">
                <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md w-full border border-slate-100">
                    <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <ShoppingBag className="w-10 h-10 text-indigo-500" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('cart.emptyTitle')}</h2>
                    <p className="text-gray-500 mb-8">{t('cart.emptyDesc')}</p>
                    <Link to="/products">
                        <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-6 text-lg rounded-xl shadow-lg shadow-indigo-200">
                            <ArrowLeft className="w-5 h-5 mr-2" />
                            {t('cart.continueShopping')}
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 pt-28 pb-32 lg:pb-12 px-4 sm:px-6 lg:px-8 relative">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <Link to="/products" className="p-2 hover:bg-white rounded-full transition-colors">
                        <ArrowLeft className="w-6 h-6 text-gray-600" />
                    </Link>
                    <h1 className="text-3xl font-bold text-gray-900">{t('cart.title')}</h1>
                    <span className="ml-auto text-gray-500 text-sm font-medium bg-white px-3 py-1 rounded-full shadow-sm border border-slate-100">
                        {cart.length} {t('cart.items')}
                    </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Cart Items List */}
                    <div className="lg:col-span-8 space-y-4">
                        <motion.div layout className="space-y-3">
                            {cart.map((item) => (
                                <motion.div 
                                    layout
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    key={item.id} 
                                    className="bg-white rounded-xl p-3 sm:p-4 shadow-sm border border-slate-100 flex gap-4 items-center hover:shadow-md transition-shadow"
                                >
                                    {/* Redesigned smaller image container */}
                                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0 border border-slate-100">
                                        <img src={item.imgSrc} alt={item.name} className="w-full h-full object-cover" />
                                    </div>
                                    
                                    <div className="flex-grow min-w-0">
                                        <h3 className="font-bold text-gray-900 text-base truncate">{item.name}</h3>
                                        <p className="text-xs text-gray-500 mb-2">{t('cart.licenseKey')}</p>
                                        <div className="flex items-center justify-between sm:hidden mt-2">
                                            <div className="font-bold text-indigo-600">{item.price}</div>
                                            <div className="flex items-center border border-gray-200 rounded-md scale-90 origin-right">
                                                <button 
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="p-1 hover:bg-gray-50 border-r border-gray-200 transition-colors text-gray-500"
                                                >
                                                    <Minus className="w-3 h-3" />
                                                </button>
                                                <span className="w-6 text-center text-sm font-medium text-gray-900">{item.quantity}</span>
                                                <button 
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="p-1 hover:bg-gray-50 border-l border-gray-200 transition-colors text-gray-500"
                                                >
                                                    <Plus className="w-3 h-3" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="hidden sm:flex items-center gap-4">
                                        <div className="flex items-center border border-gray-200 rounded-lg">
                                            <button 
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                className="p-2 hover:bg-gray-50 rounded-l-lg transition-colors text-gray-500"
                                            >
                                                <Minus className="w-4 h-4" />
                                            </button>
                                            <span className="w-8 text-center font-medium text-gray-900">{item.quantity}</span>
                                            <button 
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="p-2 hover:bg-gray-50 rounded-r-lg transition-colors text-gray-500"
                                            >
                                                <Plus className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="text-right min-w-[80px] hidden sm:block">
                                        <div className="font-bold text-gray-900 text-lg">{item.price}</div>
                                    </div>

                                    <button 
                                        onClick={() => removeFromCart(item.id)}
                                        className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-all flex-shrink-0"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </motion.div>
                            ))}
                        </motion.div>

                        <div className="flex justify-end pt-4">
                            <Button 
                                variant="ghost" 
                                onClick={handleClearCart}
                                className="text-red-500 hover:text-red-600 hover:bg-red-50"
                            >
                                {t('cart.clearCart')}
                            </Button>
                        </div>
                    </div>

                    {/* Desktop Order Summary */}
                    <div className="hidden lg:block lg:col-span-4">
                        <div className="bg-white rounded-2xl shadow-xl shadow-indigo-50 border border-slate-100 p-6 sticky top-28">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">{t('cart.summary')}</h2>
                            
                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between text-gray-600">
                                    <span>{t('cart.subtotal')}</span>
                                    <span>${totalPrice.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>{t('cart.discount')}</span>
                                    <span className="text-green-600">-$0.00</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>{t('cart.tax')}</span>
                                    <span>Calculated at checkout</span>
                                </div>
                                <div className="h-px bg-gray-100 my-4"></div>
                                <div className="flex justify-between text-lg font-bold text-gray-900">
                                    <span>{t('cart.total')}</span>
                                    <span>${totalPrice.toFixed(2)}</span>
                                </div>
                            </div>

                            <Button 
                                onClick={() => navigate('/checkout')} 
                                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-6 text-lg mb-4 rounded-xl shadow-lg shadow-indigo-200 hover:shadow-indigo-300 transition-all"
                            >
                                <CreditCard className="w-5 h-5 mr-2" />
                                {t('cart.checkout')}
                            </Button>

                            <div className="flex items-center justify-center gap-2 text-xs text-gray-500 bg-slate-50 p-3 rounded-lg border border-slate-100">
                                <ShieldCheck className="w-4 h-4 text-green-500" />
                                {t('cart.secure')}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sticky/Fixed Bottom Bar for Mobile/Tablet */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-40 safe-area-bottom">
                <div className="max-w-7xl mx-auto flex items-center gap-4">
                    <div className="flex flex-col">
                        <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Total</span>
                        <span className="text-2xl font-bold text-indigo-600">${totalPrice.toFixed(2)}</span>
                    </div>
                    <Button 
                        onClick={() => navigate('/checkout')} 
                        className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold h-12 text-base rounded-xl shadow-lg shadow-indigo-200"
                    >
                        {t('cart.checkout')} <CreditCard className="w-4 h-4 ml-2" />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default CartPage;