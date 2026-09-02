
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingCart as CartIcon, Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import PaymentCardModal from '@/components/PaymentCardModal';

const PRODUCTS = [
  { id: 1, name: 'iPhone 15 Pro', price: "1100.00", image: 'https://images.unsplash.com/photo-1696446701796-da61225697cc?w=800&q=80', desc: "Titanium design, A17 Pro chip." },
  { id: 2, name: 'Apple Watch Series 9', price: "350.00", image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&q=80', desc: "Smarter, brighter, mightier." },
  { id: 3, name: 'AirPods Max', price: "549.00", image: 'https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc1?w=800&q=80', desc: "High-fidelity audio, Active Noise Cancellation." },
];

const ShoppingCart = () => {
  const { cart, addToCart, removeFromCart, updateQuantity, clearCart, totalPrice } = useCart();
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-8">
            <CartIcon className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Products List */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Available Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {PRODUCTS.map(product => (
                <Card key={product.id} className="overflow-hidden flex flex-col border-none shadow-md hover:shadow-xl transition-shadow duration-300 rounded-2xl group bg-white">
                  <div className="h-48 overflow-hidden bg-gray-100 relative">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full font-bold text-gray-900 text-sm shadow-sm">
                        ${parseFloat(product.price).toFixed(2)}
                    </div>
                  </div>
                  <CardHeader className="p-5 pb-2">
                    <CardTitle className="text-lg font-bold text-gray-900">{product.name}</CardTitle>
                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">{product.desc}</p>
                  </CardHeader>
                  <CardFooter className="p-5 pt-4 mt-auto">
                    <Button 
                      onClick={() => addToCart(product)}
                      className="w-full bg-gray-900 hover:bg-gray-800 text-white rounded-xl h-11"
                    >
                      <Plus className="w-4 h-4 mr-2" /> Add to Cart
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>

          {/* Cart Sidebar */}
          <div className="lg:col-span-1">
            <Card className="shadow-xl sticky top-24 rounded-2xl border-none bg-white">
              <CardHeader className="border-b border-gray-100 pb-5 mb-2 bg-gray-50/50 rounded-t-2xl">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl flex items-center gap-2">
                    Order Summary
                  </CardTitle>
                  <Button variant="ghost" size="sm" onClick={clearCart} className="text-red-500 hover:text-red-700 hover:bg-red-50 h-8 px-3 rounded-lg">
                    <Trash2 className="w-4 h-4 mr-1.5" /> Clear
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent className="p-5">
                {cart.length === 0 ? (
                  <div className="text-center py-12 flex flex-col items-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                        <CartIcon className="w-8 h-8 text-gray-300" />
                    </div>
                    <p className="text-gray-500 font-medium">Your cart is empty</p>
                    <p className="text-sm text-gray-400 mt-1">Add items to get started</p>
                  </div>
                ) : (
                  <div className="space-y-5 mb-6 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                    {cart.map(item => (
                      <div key={item.id} className="flex gap-4 items-center">
                        <img src={item.image} alt={item.name} className="w-16 h-16 rounded-xl object-cover bg-gray-100" />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-900 truncate text-sm">{item.name}</h4>
                          <div className="text-blue-600 font-medium text-sm">${parseFloat(item.price).toFixed(2)}</div>
                          
                          <div className="flex items-center gap-3 mt-2">
                            <div className="flex items-center bg-gray-100 rounded-lg p-0.5">
                                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-6 h-6 flex items-center justify-center text-gray-600 hover:bg-white hover:shadow-sm rounded-md transition-all">
                                    <Minus className="w-3 h-3" />
                                </button>
                                <span className="w-6 text-center text-xs font-semibold">{item.quantity}</span>
                                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-6 h-6 flex items-center justify-center text-gray-600 hover:bg-white hover:shadow-sm rounded-md transition-all">
                                    <Plus className="w-3 h-3" />
                                </button>
                            </div>
                            <button onClick={() => removeFromCart(item.id)} className="text-xs text-red-500 hover:underline">Remove</button>
                          </div>
                        </div>
                        <div className="font-bold text-gray-900 self-start">
                          ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="border-t border-gray-100 pt-5 mt-2 space-y-3">
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Subtotal</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Taxes</span>
                    <span>$0.00</span>
                  </div>
                  <div className="flex justify-between items-end pt-3">
                    <span className="text-gray-900 font-bold">Total</span>
                    <span className="text-3xl font-extrabold text-[#005aab]">${totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="p-5 pt-0">
                <Button 
                  onClick={() => setIsPaymentModalOpen(true)}
                  disabled={cart.length === 0}
                  className="w-full h-14 bg-[#005aab] hover:bg-[#004481] text-white font-bold rounded-xl shadow-lg shadow-blue-900/20 transition-all text-lg flex items-center justify-center gap-2"
                >
                  Checkout Now <ArrowRight className="w-5 h-5" />
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>

      <PaymentCardModal 
        isOpen={isPaymentModalOpen} 
        onClose={() => setIsPaymentModalOpen(false)} 
        amount={totalPrice} 
      />
    </div>
  );
};

export default ShoppingCart;
