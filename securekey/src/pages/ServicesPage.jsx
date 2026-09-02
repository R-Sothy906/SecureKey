import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ShoppingCart, 
  Shield, 
  Key, 
  Cpu, 
  Zap, 
  Headphones, 
  Package, 
  Globe,
  Smartphone,
  Laptop
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';

const ServicesPage = () => {
    const { t } = useLanguage();

    const softwareLicenses = [
        {
            icon: <Shield className="w-10 h-10 text-green-600" />,
            title: t('services.softwareTitle'), 
            description: t('services.softwareDesc'),
            products: ["Kaspersky Total Security", "Norton 360", "McAfee LiveSafe", "Bitdefender Premium"],
            category: "antivirus"
        },
        {
            icon: <Key className="w-10 h-10 text-blue-600" />,
            title: "Operating Systems", // Keeping simple due to list structure
            description: "Authentic Windows OS licenses (Windows 10/11 Pro, Home) and Microsoft Office suites with lifetime activation.",
            products: ["Windows 11 Pro", "Windows 10 Pro", "Microsoft Office 2021", "Windows Server"],
            category: "operating-system"
        },
        {
            icon: <Cpu className="w-10 h-10 text-purple-600" />,
            title: "Creative & Productivity Software",
            description: "Professional software licenses for design, video editing, and office productivity at competitive prices.",
            products: ["Adobe Creative Cloud", "Autodesk AutoCAD", "Final Cut Pro", "VMware Workstation"],
            category: "productivity"
        }
    ];

    const accessories = [
        {
            icon: <Smartphone className="w-10 h-10 text-red-500" />,
            title: "Phone & Tablet Accessories",
            description: "Premium cases, screen protectors, chargers, and cables for all major brands.",
            brands: ["Apple", "Samsung", "Google", "OnePlus"],
            category: "phone-accessories"
        },
        {
            icon: <Laptop className="w-10 h-10 text-orange-500" />,
            title: "Computer Peripherals",
            description: "Keyboards, mice, monitors, webcams, and external storage from trusted brands.",
            brands: ["Logitech", "Razer", "WD", "Seagate", "Dell"],
            category: "computer-accessories"
        },
        {
            icon: <Package className="w-10 h-10 text-cyan-600" />,
            title: "Networking & Storage",
            description: "Routers, switches, NAS systems, and wireless accessories for home and office.",
            brands: ["TP-Link", "Netgear", "Synology", "ASUS"],
            category: "networking"
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 pt-20 pb-20">
            <Helmet>
                <title>SecureKey - Services | Professional Support</title>
                <meta name="description" content="Expert software installation, troubleshooting, and license activation services. We provide comprehensive tech support." />
                <link rel="canonical" href="https://securekey.online/services" />
            </Helmet>
            {/* Hero */}
            <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white py-20 px-4 mb-16">
                <div className="max-w-7xl mx-auto text-center">
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-bold mb-6"
                    >
                        {t('services.heroTitle')}
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-blue-200 max-w-3xl mx-auto"
                    >
                        {t('services.heroDesc')}
                    </motion.p>
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mt-8 flex flex-wrap justify-center gap-4"
                    >
                        <div className="bg-blue-800 bg-opacity-50 px-4 py-2 rounded-full">
                            <span className="text-blue-100">🔐 {t('services.badges.genuine')}</span>
                        </div>
                        <div className="bg-blue-800 bg-opacity-50 px-4 py-2 rounded-full">
                            <span className="text-blue-100">⚡ {t('services.badges.instant')}</span>
                        </div>
                        <div className="bg-blue-800 bg-opacity-50 px-4 py-2 rounded-full">
                            <span className="text-blue-100">🛡️ {t('services.badges.guarantee')}</span>
                        </div>
                        <div className="bg-blue-800 bg-opacity-50 px-4 py-2 rounded-full">
                            <span className="text-blue-100">📞 {t('services.badges.support')}</span>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Software Licenses Section */}
                <div className="mb-20">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('services.softwareTitle')}</h2>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            {t('services.softwareDesc')}
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                        {softwareLicenses.map((service, index) => (
                            <motion.div
                                key={`software-${index}`}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all border border-blue-100 group"
                            >
                                <div className="bg-blue-50 w-20 h-20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                    {service.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                                    {service.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed mb-4">
                                    {service.description}
                                </p>
                                <div className="mb-6">
                                    <h4 className="font-semibold text-gray-800 mb-2">{t('services.popular')}</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {service.products.map((product, i) => (
                                            <span key={i} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                                                {product}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <Link to={`/products?category=${service.category}`}>
                                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white cursor-pointer">
                                        <ShoppingCart className="w-4 h-4 mr-2" />
                                        {t('services.browseAll')}
                                    </Button>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Accessories Section */}
                <div className="mb-20">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('services.accessoriesTitle')}</h2>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            {t('services.accessoriesDesc')}
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {accessories.map((item, index) => (
                            <motion.div
                                key={`accessory-${index}`}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all border border-green-100 group"
                            >
                                <div className="bg-green-50 w-20 h-20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                    {item.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">
                                    {item.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed mb-4">
                                    {item.description}
                                </p>
                                <div className="mb-6">
                                    <h4 className="font-semibold text-gray-800 mb-2">{t('services.brands')}</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {item.brands.map((brand, i) => (
                                            <span key={i} className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                                                {brand}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <Link to={`/products?category=${item.category}`}>
                                    <Button variant="outline" className="w-full border-green-300 text-green-600 hover:bg-green-50 cursor-pointer">
                                        {t('services.browseBtn')}
                                    </Button>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* CTA Section */}
                <div className="mt-24 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-12 text-center text-white shadow-2xl relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-3xl font-bold mb-6">{t('services.ctaTitle')}</h2>
                        <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
                            {t('services.ctaDesc')}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to="/products">
                                <Button className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-6 text-lg font-bold shadow-lg cursor-pointer">
                                    <ShoppingCart className="w-5 h-5 mr-2" />
                                    {t('services.browseAll')}
                                </Button>
                            </Link>
                            <Link to="/contact">
                                <Button className="bg-transparent border-2 border-white hover:bg-white hover:text-blue-600 px-8 py-6 text-lg font-bold cursor-pointer">
                                    <Headphones className="w-5 h-5 mr-2" />
                                    {t('common.send')}
                                </Button>
                            </Link>
                        </div>
                    </div>
                    {/* Decor */}
                    <Zap className="absolute top-10 left-10 w-64 h-64 text-white opacity-5 rotate-12" />
                    <Globe className="absolute bottom-10 right-10 w-64 h-64 text-white opacity-5" />
                </div>
            </div>
        </div>
    );
};

export default ServicesPage;