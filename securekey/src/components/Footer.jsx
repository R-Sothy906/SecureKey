import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, ShieldCheck, Mail, MapPin, Phone } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
const Footer = () => {
  const {
    t
  } = useLanguage();
  return <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand Column */}
                    <div>
                        <Link to="/" className="flex items-center gap-2 mb-6 group">
                            <ShieldCheck className="h-8 w-8 text-[#ff3b30]" strokeWidth={2.5} />
                            <div className="flex flex-col">
                                <span className="font-bold text-xl text-white tracking-wider">
                                    SECURE<span className="text-[#ff3b30]">|</span>KEY
                                </span>
                            </div>
                        </Link>
                        <p className="text-slate-400 text-sm leading-relaxed mb-6">
                            {t('footer.brandDesc')}
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="p-2 bg-slate-800 rounded-full hover:bg-[#0ea5e9] hover:text-white transition-all">
                                <Facebook className="w-4 h-4" />
                            </a>
                            <a href="#" className="p-2 bg-slate-800 rounded-full hover:bg-[#0ea5e9] hover:text-white transition-all">
                                <Twitter className="w-4 h-4" />
                            </a>
                            <a href="#" className="p-2 bg-slate-800 rounded-full hover:bg-[#0ea5e9] hover:text-white transition-all">
                                <Instagram className="w-4 h-4" />
                            </a>
                            <a href="#" className="p-2 bg-slate-800 rounded-full hover:bg-[#0ea5e9] hover:text-white transition-all">
                                <Linkedin className="w-4 h-4" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-6">{t('footer.quickLinks')}</h3>
                        <ul className="space-y-3 text-sm">
                            <li><Link to="/" className="hover:text-[#0ea5e9] transition-colors">{t('nav.home')}</Link></li>
                            <li><Link to="/products" className="hover:text-[#0ea5e9] transition-colors">{t('nav.products')}</Link></li>
                            <li><Link to="/services" className="hover:text-[#0ea5e9] transition-colors">{t('nav.services')}</Link></li>
                            <li><Link to="/about" className="hover:text-[#0ea5e9] transition-colors">{t('nav.about')}</Link></li>
                            <li><Link to="/contact" className="hover:text-[#0ea5e9] transition-colors">{t('nav.contact')}</Link></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-6">{t('footer.support')}</h3>
                        <ul className="space-y-3 text-sm">
                            <li><Link to="/faq" className="hover:text-[#0ea5e9] transition-colors">{t('footer.faq')}</Link></li>
                            <li><Link to="/privacy" className="hover:text-[#0ea5e9] transition-colors">{t('footer.privacy')}</Link></li>
                            <li><Link to="/terms" className="hover:text-[#0ea5e9] transition-colors">{t('footer.terms')}</Link></li>
                            <li><Link to="/shipping" className="hover:text-[#0ea5e9] transition-colors">{t('footer.shipping')}</Link></li>
                            <li><Link to="/returns" className="hover:text-[#0ea5e9] transition-colors">{t('footer.returns')}</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-6">{t('footer.contactUs')}</h3>
                        <ul className="space-y-4 text-sm">
                            <li className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-[#0ea5e9] mt-0.5" />
                                <span>គម្រោងសហគមន៍ផរទំនើប អុឹម សុី ក (MC Park) ផះេលខ 631<br />ន់ទី 1 យូនីត B22 បនប់េលខ 2, មវិថីពះមុនីេរ៉ត ផូវ 217,<br />Damnak Thum, Stueng Mean chey 2, Mean Chey, Phnom Penh, Cambodia</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-[#0ea5e9]" />
                                <span>+855 61 263 333</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-[#0ea5e9]" />
                                <span>pisethtouchstar@gmail.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
                    <p>&copy; {new Date().getFullYear()} SecureKey. {t('footer.rights')}</p>
                    <div className="flex gap-3">
                        <img alt="Payment methods including PayPal, Visa, Mastercard, and American Express" className="h-32 object-contain opacity-90 hover:opacity-100 transition-opacity" src="https://horizons-cdn.hostinger.com/5c0033fd-531e-484e-ab31-3b609f01c973/bca1c4051e86cb73d7027d7e42f13b6f.png" />
                    </div>
                </div>
            </div>
        </footer>;
};
export default Footer;