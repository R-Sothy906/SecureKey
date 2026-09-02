import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';

const CartContext = createContext();

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const { toast } = useToast();

    // Load cart from local storage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem('shopping-cart');
        if (savedCart) {
            setCart(JSON.parse(savedCart));
        }
    }, []);

    // Save cart to local storage whenever it changes
    useEffect(() => {
        localStorage.setItem('shopping-cart', JSON.stringify(cart));
    }, [cart]);

    // Changed default showToast to true to ensure notification on all adds
    const addToCart = (product, quantity = 1, showToast = true) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((item) => item.id === product.id);
            if (existingItem) {
                return prevCart.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }
            return [...prevCart, { ...product, quantity }];
        });

        // Consistent toast notification
        if (showToast) {
            toast({
                title: "Added to Cart 🛒",
                description: `${quantity} x ${product.name} added to your cart.`,
                className: "bg-white border-l-4 border-green-500 shadow-md",
                duration: 3000,
            });
        }
    };

    const removeFromCart = (productId) => {
        const itemToRemove = cart.find(item => item.id === productId);
        setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
        
        if (itemToRemove) {
            toast({
                title: "Removed from Cart",
                description: `${itemToRemove.name} has been removed.`,
                className: "bg-white border-l-4 border-red-500",
                duration: 3000,
            });
        }
    };

    const updateQuantity = (productId, newQuantity) => {
        if (newQuantity < 1) return;
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.id === productId ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    const clearCart = () => {
        setCart([]);
    };

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => {
        // Remove '$' and ',' from price string to parse float
        const price = parseFloat(item.price.replace(/[^0-9.-]+/g, ""));
        return sum + (price * item.quantity);
    }, 0);

    return (
        <CartContext.Provider value={{ 
            cart, 
            addToCart, 
            removeFromCart, 
            updateQuantity, 
            clearCart, 
            totalItems,
            totalPrice
        }}>
            {children}
        </CartContext.Provider>
    );
};