import React, { useState, useMemo } from 'react';
import { ShoppingCart, Zap, Check, Eye, Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/context/CartContext';
import { useNavigate } from 'react-router-dom';
import ProductDetailModal from './ProductDetailModal';
import { useLanguage } from '@/context/LanguageContext';

const ProductCard = ({ product, onOpenModal }) => {
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCart();
    const navigate = useNavigate();
    const { t } = useLanguage();

    const handleIncrement = (e) => {
        e.stopPropagation();
        setQuantity(q => q + 1);
    } 
    const handleDecrement = (e) => {
        e.stopPropagation();
        setQuantity(q => Math.max(1, q - 1));
    }

    const handleAddToCart = (e) => {
        e.stopPropagation();
        // Toast handled by context
        addToCart(product, quantity);
        setQuantity(1);
    };

    const handleBuyNow = (e) => {
        e.stopPropagation();
        addToCart(product, quantity, false); // No toast for buy now as we redirect
        setQuantity(1);
        navigate('/cart');
    };

    return (
        <div className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col h-full relative group">
            {/* Image Container */}
            <div className="relative mb-4 overflow-hidden rounded-xl bg-gray-50 aspect-[4/3] group-hover:scale-[1.02] transition-transform duration-300 cursor-pointer" onClick={() => onOpenModal(product)}>
                <img 
                    src={product.imgSrc} 
                    alt={product.name} 
                    className="w-full h-full object-cover mix-blend-multiply"
                />
                
                {/* Floating Tags */}
                <div className="absolute top-3 left-3">
                   <Badge className="bg-blue-100 text-blue-600 hover:bg-blue-200 border-none px-3 py-1 text-xs font-bold shadow-sm">
                        <Zap className="w-3 h-3 mr-1 fill-blue-600" /> {t('bestsellers.bestSellerBadge') || 'Best Seller'}
                   </Badge>
                </div>
                
                <div className="absolute top-3 right-3">
                     <button className="bg-white/90 backdrop-blur-sm hover:bg-white text-gray-700 p-2 rounded-full shadow-md transition-colors">
                        <Eye className="w-4 h-4" />
                     </button>
                </div>
            </div>

            {/* Content */}
            <div className="flex flex-col flex-grow">
                <h3 className="text-lg font-bold text-slate-900 mb-1 line-clamp-1">{product.name}</h3>
                
                {/* Price Block */}
                <div className="mb-4">
                    <p className="text-gray-400 text-sm line-through decoration-slate-300">{product.originalPrice}</p>
                    <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-[#ff3b30]">{product.price}</span>
                        <Badge variant="destructive" className="bg-red-50 text-red-500 hover:bg-red-100 border border-red-100 font-normal">
                            {t('bestsellers.save') || 'Save'} {product.discount}
                        </Badge>
                    </div>
                </div>

                {/* Quantity */}
                <div className="mb-4">
                    <p className="text-sm font-semibold text-gray-700 mb-2">{t('bestsellers.quantity') || 'Quantity'}</p>
                    <div className="flex items-center w-32 border border-gray-200 rounded-lg bg-white">
                         <button 
                            type="button"
                            onClick={handleDecrement} 
                            className="p-2 hover:bg-gray-50 rounded-l-lg transition-colors text-gray-500 hover:text-gray-900"
                        >
                            <Minus className="w-4 h-4" />
                        </button>
                        <span className="flex-1 text-center font-medium text-gray-900 select-none">{quantity}</span>
                        <button 
                            type="button"
                            onClick={handleIncrement} 
                            className="p-2 hover:bg-gray-50 rounded-r-lg transition-colors text-gray-500 hover:text-gray-900"
                        >
                            <Plus className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Buttons */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                    <Button 
                        onClick={handleAddToCart}
                        className="bg-[#6366f1] hover:bg-[#4f46e5] text-white shadow-lg shadow-indigo-200 font-semibold text-xs sm:text-sm px-2"
                    >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        {t('bestsellers.addToCart') || 'Add to Cart'}
                    </Button>
                    <Button 
                        onClick={handleBuyNow}
                        className="bg-[#ec4899] hover:bg-[#db2777] text-white shadow-lg shadow-pink-200 font-semibold text-xs sm:text-sm px-2"
                    >
                        <Zap className="w-4 h-4 mr-2 fill-white" />
                        {t('bestsellers.buyNow') || 'Buy Now'}
                    </Button>
                </div>

                {/* Benefits Grid */}
                <div className="mt-auto grid grid-cols-2 gap-y-2 gap-x-1 text-xs text-gray-500">
                    {product.benefits.map((benefit, i) => (
                        <div key={i} className="flex items-center gap-1.5">
                            <div className="bg-green-100 rounded-full p-0.5">
                                <Check className="w-2.5 h-2.5 text-green-600" />
                            </div>
                            <span className="truncate">{benefit}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

const BestsellersSection = () => {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { t } = useLanguage();

    const openModal = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const products = useMemo(() => [
        {
            id: 'ws2022',
            name: "Windows Server 2022 Standard",
            price: "$39.99",
            originalPrice: "$159.99",
            discount: "$120.00",
            description: "Advanced multi-layer security, hybrid capabilities with Azure, and flexible application platform. Ideal for physical or minimally virtualized environments.",
            benefits: ["Perpetual License", "Instant Delivery", "Official Download", "24/7 Support"],
            imgSrc: "https://images.unsplash.com/photo-1633419461186-7d75ce160e29?auto=format&fit=crop&q=80&w=800"
        },
        {
            id: 'mb-prem',
            name: "Malwarebytes Premium",
            price: "$24.99",
            originalPrice: "$49.99",
            discount: "$25.00",
            description: "Smarter, faster, and lighter than ever. Malwarebytes Premium detects and removes malware in real-time with advanced anti-spyware technology.",
            benefits: ["Real-time Protection", "Ransomware Block", "Web Protection", "Fast Scans"],
            imgSrc: "https://images.unsplash.com/photo-1563206767-5b1d97289374?auto=format&fit=crop&q=80&w=800"
        },
        {
            id: 'eset-is',
            name: "ESET Internet Security",
            price: "$29.99",
            originalPrice: "$59.99",
            discount: "$30.00",
            description: "Legendary antivirus technology. Protects your online payments and privacy. Secure your webcam and home router from intruders.",
            benefits: ["Banking Protection", "Firewall", "Parental Control", "Low System Impact"],
            imgSrc: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&q=80&w=800"
        },
        {
            id: 'win11-home',
            name: "Windows 11 Home License",
            price: "$19.99",
            originalPrice: "$139.00",
            discount: "$119.01",
            description: "The latest OS from Microsoft. Brings you closer to what you love with a fresh new feel and tools that make it easier to be efficient.",
            benefits: ["New Design", "Gaming Features", "Android Apps", "Snap Layouts"],
            imgSrc: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&q=80&w=800"
        },
        {
            id: 'avast-prem',
            name: "Avast Premium Security",
            price: "$22.99",
            originalPrice: "$69.99",
            discount: "$47.00",
            description: "Complete online protection for all of your computers, phones, and tablets. Blocks viruses, spyware, ransomware, and other malware.",
            benefits: ["Wi-Fi Inspector", "Sandbox", "Real Site", "Ransomware Shield"],
            imgSrc: "https://images.unsplash.com/photo-1555421689-d68471e189f2?auto=format&fit=crop&q=80&w=800"
        },
        {
            id: 'm365-fam',
            name: "Microsoft 365 Family",
            price: "$79.99",
            originalPrice: "$99.99",
            discount: "$20.00",
            description: "One convenient subscription for up to 6 people. Includes premium Office apps, up to 6TB of cloud storage, and advanced security for all devices.",
            benefits: ["For 6 People", "Word, Excel, PPT", "1TB Cloud/Person", "Safety Features"],
            imgSrc: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=800"
        }
    ], []);

    return (
        <section className="py-12 bg-gray-50" id="products">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Header Banner */}
                <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] p-8 sm:p-12 mb-12 shadow-2xl shadow-indigo-200">
                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 p-8 opacity-10">
                        <Zap className="w-32 h-32 text-white" />
                    </div>
                    
                    <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-8 text-white">
                        <div className="max-w-xl">
                            <div className="flex items-center gap-2 mb-4">
                                <span className="text-2xl">🔥</span>
                                <h2 className="text-3xl sm:text-4xl font-bold">{t('bestsellers.header') || 'Best Sellers'}</h2>
                                <span className="text-2xl">🔥</span>
                            </div>
                            <p className="text-indigo-100 text-lg mb-8">
                                {t('bestsellers.subHeader') || 'Grab our hottest software deals before they are gone!'}
                            </p>
                            
                            <div className="flex gap-8">
                                <div>
                                    <div className="text-3xl font-bold">1000+</div>
                                    <div className="text-sm text-indigo-200">{t('bestsellers.happyCustomers') || 'Happy Customers'}</div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                            <div className="text-sm font-semibold uppercase tracking-wider mb-2 text-indigo-200">{t('bestsellers.flashSale') || 'Flash Sale Ends In'}</div>
                            <div className="text-3xl font-mono font-bold tracking-tight">
                                2<span className="text-base mx-1 font-sans font-normal">{t('bestsellers.days') || 'days'}</span>
                                0<span className="text-base mx-1 font-sans font-normal">{t('bestsellers.hours') || 'hours'}</span>
                                0<span className="text-base mx-1 font-sans font-normal">{t('bestsellers.mins') || 'mins'}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} onOpenModal={openModal} />
                    ))}
                </div>
            </div>

            <ProductDetailModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                product={selectedProduct} 
            />
        </section>
    );
};

export default BestsellersSection;