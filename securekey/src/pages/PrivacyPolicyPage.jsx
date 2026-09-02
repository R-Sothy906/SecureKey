import React from 'react';
import { Helmet } from 'react-helmet';
import { Shield, Lock, Eye, Server } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const Section = ({ title, children, icon: Icon }) => (
  <div className="mb-10 p-6 bg-white rounded-xl shadow-sm border border-slate-100">
    <div className="flex items-center gap-3 mb-4 border-b border-slate-100 pb-4">
      {Icon && <Icon className="w-6 h-6 text-[#0ea5e9]" />}
      <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
    </div>
    <div className="prose prose-slate max-w-none text-slate-600">
      {children}
    </div>
  </div>
);

const PrivacyPolicyPage = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-slate-50 py-12 pt-24">
      <Helmet>
        <title>Privacy Policy - SecureKey</title>
        <meta name="description" content="Read our Privacy Policy to understand how we collect, use, and protect your personal information." />
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">{t('privacy.title')}</h1>
            <p className="text-slate-500">{t('privacy.lastUpdated')}</p>
        </div>

        <Section title={t('privacy.collect')} icon={Eye}>
          <p className="mb-4">
            {t('privacy.collectDesc')}
          </p>
        </Section>

        <Section title={t('privacy.use')} icon={Server}>
          <p className="mb-4">
            {t('privacy.useDesc')}
          </p>
        </Section>

        <Section title={t('privacy.security')} icon={Shield}>
          <p className="mb-4">
             {t('privacy.securityDesc')}
          </p>
        </Section>

        <Section title={t('privacy.cookies')} icon={Lock}>
          <p className="mb-4">
             {t('privacy.cookiesDesc')}
          </p>
        </Section>

        <div className="text-center mt-12 text-slate-500 text-sm">
          <p>{t('privacy.contact')} <a href="mailto:privacy@securekey.com" className="text-[#0ea5e9] hover:underline">privacy@securekey.com</a></p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;