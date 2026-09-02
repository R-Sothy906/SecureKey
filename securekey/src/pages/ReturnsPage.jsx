import React from 'react';
import { Helmet } from 'react-helmet';
import { RefreshCw, Ban, CheckCircle, AlertTriangle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const ReturnsPage = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-slate-50 py-12 pt-24">
      <Helmet>
        <title>Returns & Refunds - SecureKey</title>
        <meta name="description" content="Our Returns and Refund Policy for digital software licenses." />
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">{t('returns.title')}</h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                {t('returns.subtitle')}
            </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white p-8 rounded-xl shadow-sm border-t-4 border-green-500">
                <div className="flex items-center gap-3 mb-6">
                    <CheckCircle className="w-8 h-8 text-green-500" />
                    <h2 className="text-2xl font-bold text-slate-900">{t('returns.eligible')}</h2>
                </div>
                <ul className="space-y-4 text-slate-600">
                    <li className="flex gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>
                        <span><strong>{t('returns.unredeemed')}:</strong> {t('returns.unredeemedDesc')}</span>
                    </li>
                    <li className="flex gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>
                        <span><strong>{t('returns.faulty')}:</strong> {t('returns.faultyDesc')}</span>
                    </li>
                </ul>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border-t-4 border-red-500">
                <div className="flex items-center gap-3 mb-6">
                    <Ban className="w-8 h-8 text-red-500" />
                    <h2 className="text-2xl font-bold text-slate-900">{t('returns.notEligible')}</h2>
                </div>
                <ul className="space-y-4 text-slate-600">
                     <li className="flex gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0"></div>
                        <span><strong>{t('returns.redeemed')}:</strong> {t('returns.redeemedDesc')}</span>
                    </li>
                </ul>
            </div>
        </div>

        <div className="bg-orange-50 border border-orange-100 rounded-xl p-6 flex gap-4 items-start">
            <AlertTriangle className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
            <div>
                <h3 className="font-bold text-orange-900 mb-2">{t('returns.request')}</h3>
                <p className="text-orange-800 text-sm leading-relaxed">
                    {t('returns.contactSupport')} <strong className="text-orange-900">support@securekey.com</strong>.
                </p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ReturnsPage;