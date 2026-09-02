import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShieldCheck, Users, Target, Award, Globe, Key, Zap, Headphones } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const AboutPage = () => {
    const { t } = useLanguage();

    return (
        <div className="min-h-screen bg-slate-50 pt-20 pb-20">
            <Helmet>
                <title>SecureKey - About Us | Our Mission</title>
                <meta name="description" content="Learn about SecureKey's mission to provide affordable, genuine software licenses with exceptional customer support." />
                <link rel="canonical" href="https://securekey.online/about" />
            </Helmet>
            {/* Hero */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                            {t('about.heroTitle')} <span className="text-blue-600">{t('about.heroTitleHighlight')}</span>
                        </h1>
                        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                            {t('about.heroDesc')}
                        </p>
                        <div className="flex gap-8">
                            <div>
                                <h3 className="text-3xl font-bold text-blue-600">50k+</h3>
                                <p className="text-sm text-gray-500">{t('about.statLicenses')}</p>
                            </div>
                            <div>
                                <h3 className="text-3xl font-bold text-blue-600">99%</h3>
                                <p className="text-sm text-gray-500">{t('about.statSuccess')}</p>
                            </div>
                            <div>
                                <h3 className="text-3xl font-bold text-blue-600">24/7</h3>
                                <p className="text-sm text-gray-500">{t('about.statSupport')}</p>
                            </div>
                        </div>
                    </motion.div>
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative"
                    >
                        <img 
                            alt="Software license activation and digital delivery" 
                            className="rounded-2xl shadow-2xl w-full h-96 object-cover" 
                            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                        />
                        <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl max-w-xs hidden md:block">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="bg-green-100 p-2 rounded-full">
                                    <Key className="w-6 h-6 text-green-600" />
                                </div>
                                <span className="font-bold text-gray-900">{t('about.officialReseller')}</span>
                            </div>
                            <p className="text-sm text-gray-500">{t('about.officialResellerDesc')}</p>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Mission Section */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="p-8 text-center"
                        >
                            <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Globe className="w-10 h-10" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">{t('about.missionTitle')}</h3>
                            <p className="text-blue-100">
                                {t('about.missionDesc')}
                            </p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="p-8 text-center"
                        >
                            <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Zap className="w-10 h-10" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">{t('about.instantTitle')}</h3>
                            <p className="text-blue-100">
                                {t('about.instantDesc')}
                            </p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="p-8 text-center"
                        >
                            <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Headphones className="w-10 h-10" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">{t('about.supportTitle')}</h3>
                            <p className="text-blue-100">
                                {t('about.supportDesc')}
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Values Section */}
            <div className="bg-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900">{t('about.valuesTitle')}</h2>
                        <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
                            {t('about.valuesSubtitle')}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="p-8 bg-slate-50 rounded-2xl text-center hover:bg-blue-50 transition-colors duration-300 group"
                        >
                            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                                <ShieldCheck className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">{t('about.valGenuine')}</h3>
                            <p className="text-gray-600">
                                {t('about.valGenuineDesc')}
                            </p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="p-8 bg-slate-50 rounded-2xl text-center hover:bg-blue-50 transition-colors duration-300 group"
                        >
                            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                                <Target className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">{t('about.valCustomer')}</h3>
                            <p className="text-gray-600">
                                {t('about.valCustomerDesc')}
                            </p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="p-8 bg-slate-50 rounded-2xl text-center hover:bg-blue-50 transition-colors duration-300 group"
                        >
                            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                                <Award className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">{t('about.valExpertise')}</h3>
                            <p className="text-gray-600">
                                {t('about.valExpertiseDesc')}
                            </p>
                        </motion.div>
                    </div>

                    {/* Why Choose Us */}
                    <div className="mt-24 bg-gradient-to-br from-slate-50 to-blue-50 rounded-3xl p-12">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('about.whyTitle')}</h2>
                            <p className="text-gray-600 max-w-3xl mx-auto">
                                {t('about.whySubtitle')}
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="text-center p-6">
                                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="font-bold">1</span>
                                </div>
                                <h4 className="font-bold text-gray-900 mb-2">{t('about.why1')}</h4>
                                <p className="text-sm text-gray-600">{t('about.why1Desc')}</p>
                            </div>
                            <div className="text-center p-6">
                                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="font-bold">2</span>
                                </div>
                                <h4 className="font-bold text-gray-900 mb-2">{t('about.why2')}</h4>
                                <p className="text-sm text-gray-600">{t('about.why2Desc')}</p>
                            </div>
                            <div className="text-center p-6">
                                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="font-bold">3</span>
                                </div>
                                <h4 className="font-bold text-gray-900 mb-2">{t('about.why3')}</h4>
                                <p className="text-sm text-gray-600">{t('about.why3Desc')}</p>
                            </div>
                            <div className="text-center p-6">
                                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="font-bold">4</span>
                                </div>
                                <h4 className="font-bold text-gray-900 mb-2">{t('about.why4')}</h4>
                                <p className="text-sm text-gray-600">{t('about.why4Desc')}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl font-bold mb-6"
                    >
                        {t('about.ctaTitle')}
                    </motion.h2>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto"
                    >
                        {t('about.ctaDesc')}
                    </motion.p>
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                    >
                        <Link to="/products">
                            <Button className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-lg text-lg font-bold shadow-lg transition-colors cursor-pointer">
                                {t('about.viewProducts')}
                            </Button>
                        </Link>
                        <Link to="/contact">
                            <Button className="bg-transparent border-2 border-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-lg text-lg font-bold transition-colors cursor-pointer">
                                {t('about.contactUs')}
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;