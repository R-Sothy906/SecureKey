import React from 'react';
import { Helmet } from 'react-helmet';
import { ScrollText, Gavel, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const TermsPage = () => {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-slate-50 py-12 pt-24">
      <Helmet>
        <title>Terms of Service - SecureKey</title>
        <meta name="description" content="Terms of Service and conditions for using SecureKey services." />
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-full mb-4">
                 <ScrollText className="w-8 h-8 text-[#0ea5e9]" />
            </div>
            <h1 className="text-4xl font-bold text-slate-900 mb-4">{t('terms.title')}</h1>
            <p className="text-slate-500">{t('terms.subtitle')}</p>
        </div>

        <div className="space-y-8 bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-slate-100 text-slate-600 leading-relaxed">
            <section>
                <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900 mb-4">
                    <CheckCircle2 className="w-5 h-5 text-[#0ea5e9]" />
                    {t('terms.acceptance')}
                </h2>
                <p>{t('terms.acceptanceDesc')}</p>
            </section>

            <section>
                <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900 mb-4">
                     <Gavel className="w-5 h-5 text-[#0ea5e9]" />
                    {t('terms.licensing')}
                </h2>
                <p className="mb-3">{t('terms.licensingDesc')}</p>
                <ul className="list-disc pl-5 space-y-2">
                    <li>You agree not to use the keys for illegal purposes or distribute them unauthorizedly.</li>
                    <li>We are not responsible for software compatibility issues. Please verify system requirements before purchase.</li>
                    <li>Keys are sold for specific regions; it is your responsibility to ensure the region matches your location.</li>
                </ul>
            </section>

            <section>
                <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900 mb-4">
                    <AlertCircle className="w-5 h-5 text-[#0ea5e9]" />
                    {t('terms.liability')}
                </h2>
                <p>{t('terms.liabilityDesc')}</p>
            </section>

            <section>
                <h2 className="text-xl font-bold text-slate-900 mb-4">{t('terms.account')}</h2>
                <p>{t('terms.accountDesc')}</p>
            </section>

            <section>
                <h2 className="text-xl font-bold text-slate-900 mb-4">{t('terms.pricing')}</h2>
                <p>{t('terms.pricingDesc')}</p>
            </section>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;