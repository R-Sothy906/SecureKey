import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle, MessageCircle, FileQuestion, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';

const FAQItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="border border-slate-200 rounded-xl bg-white overflow-hidden mb-4 shadow-sm hover:shadow-md transition-shadow">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between p-5 text-left bg-white hover:bg-slate-50 transition-colors"
      >
        <span className="font-semibold text-slate-900 text-lg pr-8">{question}</span>
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isOpen ? 'bg-[#0ea5e9] text-white' : 'bg-slate-100 text-slate-500'}`}>
          {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="p-5 pt-0 text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const { t } = useLanguage();

  const faqs = [
    {
      question: "How instantly are the keys delivered?",
      answer: "For 99% of our products, delivery is instant. As soon as your payment is confirmed, the license key is sent to your email address and also appears in your account dashboard. Occasionally, for security checks or out-of-stock items, it might take up to 1-2 hours."
    },
    {
      question: "Are the licenses legitimate and legal?",
      answer: "Absolutely. We are an authorized reseller for major software brands. All our keys come directly from the publishers or authorized distributors. We guarantee that every key sold is 100% genuine, legal, and eligible for official support and updates."
    },
    {
      question: "What if my key doesn't work?",
      answer: "In the rare event that a key doesn't work, we have a dedicated support team ready to help. First, check that you are activating the software on the correct platform and region. If issues persist, contact us with a screenshot of the error, and we will verify the key. If it's faulty, we provide an immediate replacement or full refund."
    },
    {
      question: "Do you offer refunds?",
      answer: "Yes, we offer refunds under specific conditions. If a key has not been viewed or redeemed, you can request a refund within 14 days. If the key is faulty and cannot be replaced, we also offer a full refund. Please refer to our Returns Policy for detailed information."
    },
    {
      question: "Can I use the software on a Mac?",
      answer: "It depends on the specific product. Many software licenses are platform-specific (Windows-only or Mac-only). Please check the product description carefully before purchasing. We clearly label compatibility for Windows, macOS, and Linux on every product page."
    },
    {
      question: "Do you provide installation support?",
      answer: "Yes! We provide official download links and basic installation instructions with every purchase. If you encounter technical difficulties during installation, our support team can guide you through the process or point you to the official manufacturer resources."
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-12 pt-24">
      <Helmet>
        <title>FAQ - SecureKey Software Licenses</title>
        <meta name="description" content="Frequently Asked Questions about our software licenses, delivery, and support." />
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-indigo-100 rounded-full mb-4">
            <HelpCircle className="w-8 h-8 text-[#6366f1]" />
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-4">{t('faq.title')}</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            {t('faq.subtitle')}
          </p>
        </div>

        <div className="space-y-2 mb-16">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
            />
          ))}
        </div>

        <div className="bg-slate-900 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 p-12 opacity-10">
            <Sparkles className="w-32 h-32 text-white" />
          </div>
          
          <div className="relative z-10">
            <h2 className="text-2xl font-bold text-white mb-4">{t('faq.stillQuestions')}</h2>
            <p className="text-slate-300 mb-8 max-w-xl mx-auto">
              We're sorry we couldn't answer your question. Our support team is available 24/7 to assist you with any inquiries.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button className="bg-[#0ea5e9] hover:bg-[#0284c7] text-white px-8 h-12 text-lg rounded-full">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  {t('faq.contactSupport')}
                </Button>
              </Link>
              <Link to="/contact">
                 <Button variant="outline" className="bg-transparent text-white border-white/20 hover:bg-white/10 px-8 h-12 text-lg rounded-full">
                    <FileQuestion className="w-5 h-5 mr-2" />
                    {t('faq.submitTicket')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;