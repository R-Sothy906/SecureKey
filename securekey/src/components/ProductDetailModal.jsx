import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, ShoppingCart, Zap, Minus, Plus, ShieldCheck } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useNavigate } from 'react-router-dom';

const ProductDetailModal = ({ isOpen, onClose, product }) => {
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCart();
    const navigate = useNavigate();

    // Reset quantity when modal opens/closes or product changes
    useEffect(() => {
        if (isOpen) {
            setQuantity(1);
        }
    }, [isOpen, product]);

    if (!product) return null;

    const handleIncrement = () => setQuantity(q => q + 1);
    const handleDecrement = () => setQuantity(q => Math.max(1, q - 1));

    const handleAddToCart = () => {
        addToCart(product, quantity);
        setQuantity(1);
        onClose();
    };

    const handleBuyNow = () => {
        addToCart(product, quantity, false);
        setQuantity(1);
        onClose();
        navigate('/cart');
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-3xl overflow-hidden bg-white p-0 gap-0 border-none shadow-2xl">
                <div className="grid grid-cols-1 md:grid-cols-2">
                    {/* Image Section */}
                    <div className="relative bg-slate-50 p-8 flex items-center justify-center min-h-[300px] md:min-h-[450px]">
                        <img 
                            src={product.imgSrc} 
                            alt={product.name}
                            className="w-full h-auto object-contain max-h-[350px] mix-blend-multiply transition-transform duration-500 hover:scale-105"
                        />
                        <Badge variant="sale" className="absolute top-4 left-4 bg-blue-500 text-white border-none px-3 py-1 shadow-sm">
                            Best Seller
                        </Badge>
                    </div>

                    {/* Content Section */}
                    <div className="p-6 md:p-8 flex flex-col h-full bg-white">
                        <DialogTitle className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 leading-tight">
                            {product.name}
                        </DialogTitle>
                        
                        <div className="flex items-baseline gap-3 mb-6 border-b border-gray-100 pb-6">
                            <span className="text-3xl font-bold text-red-500">{product.price}</span>
                            <span className="text-lg text-gray-400 line-through decoration-gray-300">{product.originalPrice}</span>
                            <Badge variant="destructive" className="ml-1 bg-red-50 text-red-600 hover:bg-red-100 border-red-100">
                                Save {product.discount}
                            </Badge>
                        </div>

                        <DialogDescription className="text-gray-600 text-base leading-relaxed mb-6">
                            {product.longDescription || product.description}
                        </DialogDescription>

                        <div className="mt-auto space-y-6">
                            {/* Quantity Selector */}
                            <div>
                                <label className="text-sm font-semibold text-gray-700 mb-2 block">Quantity</label>
                                <div className="flex items-center w-36 border border-gray-200 rounded-lg bg-gray-50">
                                    <button 
                                        type="button"
                                        onClick={handleDecrement} 
                                        className="p-3 hover:bg-gray-100 rounded-l-lg transition-colors text-gray-600 hover:text-gray-900 active:bg-gray-200"
                                        aria-label="Decrease quantity"
                                    >
                                        <Minus className="w-4 h-4" />
                                    </button>
                                    <span className="flex-1 text-center font-bold text-gray-900 select-none">{quantity}</span>
                                    <button 
                                        type="button"
                                        onClick={handleIncrement} 
                                        className="p-3 hover:bg-gray-100 rounded-r-lg transition-colors text-gray-600 hover:text-gray-900 active:bg-gray-200"
                                        aria-label="Increase quantity"
                                    >
                                        <Plus className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="grid grid-cols-2 gap-4">
                                <Button 
                                    onClick={handleAddToCart}
                                    className="w-full bg-[#6366f1] hover:bg-[#4f46e5] text-white font-semibold h-12 text-base shadow-lg shadow-indigo-100"
                                >
                                    <ShoppingCart className="w-5 h-5 mr-2" />
                                    Add to Cart
                                </Button>
                                <Button 
                                    onClick={handleBuyNow}
                                    className="w-full bg-[#ec4899] hover:bg-[#db2777] text-white font-semibold h-12 text-base shadow-lg shadow-pink-100"
                                >
                                    <Zap className="w-5 h-5 mr-2 fill-current" />
                                    Buy Now
                                </Button>
                            </div>

                            {/* Trust Signals */}
                            <div className="grid grid-cols-2 gap-y-3 pt-4 text-sm text-gray-500 font-medium">
                                <div className="flex items-center gap-2">
                                    <div className="p-1 rounded-full bg-green-100">
                                        <ShieldCheck className="w-3.5 h-3.5 text-green-600" />
                                    </div>
                                    Safety buying
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="p-1 rounded-full bg-green-100">
                                        <Check className="w-3.5 h-3.5 text-green-600" />
                                    </div>
                                    Free Shipping
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ProductDetailModal;