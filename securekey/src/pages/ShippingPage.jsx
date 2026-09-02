import React from 'react';
import { Helmet } from 'react-helmet';
import { Zap, Mail, Clock, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';

const ShippingPage = () => {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-slate-50 py-12 pt-24">
      <Helmet>
        <title>Shipping & Delivery - SecureKey</title>
        <meta name="description" content="Information about our digital delivery process and shipping policies." />
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-12">
            <div className="bg-[#6366f1] p-8 md:p-12 text-center text-white">
                <Zap className="w-16 h-16 mx-auto mb-4 text-yellow-300" />
                <h1 className="text-3xl md:text-4xl font-bold mb-4">{t('shipping.title')}</h1>
                <p className="text-lg text-indigo-100 max-w-2xl mx-auto">
                    {t('shipping.subtitle')}
                </p>
            </div>
            
            <div className="p-8 md:p-12">
                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    <div className="flex items-start gap-4">
                        <div className="bg-blue-100 p-3 rounded-lg">
                            <Clock className="w-6 h-6 text-[#0ea5e9]" />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg text-slate-900 mb-2">{t('shipping.instantTitle')}</h3>
                            <p className="text-slate-600">
                                {t('shipping.instantDesc')}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <div className="bg-green-100 p-3 rounded-lg">
                            <Mail className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg text-slate-900 mb-2">{t('shipping.emailTitle')}</h3>
                            <p className="text-slate-600">
                                {t('shipping.emailDesc')}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <div className="bg-orange-100 p-3 rounded-lg">
                            <Globe className="w-6 h-6 text-orange-600" />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg text-slate-900 mb-2">{t('shipping.physicalTitle')}</h3>
                            <p className="text-slate-600">
                                {t('shipping.physicalDesc')}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <div className="bg-purple-100 p-3 rounded-lg">
                            <Zap className="w-6 h-6 text-purple-600" />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg text-slate-900 mb-2">{t('shipping.verificationTitle')}</h3>
                            <p className="text-slate-600">
                                {t('shipping.verificationDesc')}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="border-t border-slate-100 pt-8 text-center">
                    <h3 className="text-xl font-bold text-slate-900 mb-4">{t('shipping.questionsTitle')}</h3>
                    <p className="text-slate-500 mb-6">
                        {t('shipping.questionsDesc')}
                    </p>
                    <Link to="/contact">
                        <Button className="bg-[#0ea5e9] hover:bg-[#0284c7] text-white">{t('common.submit')}</Button>
                    </Link>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingPage;