import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Mail, Phone, Send, MessageSquare, Clock, ArrowRight, User, Hash, FileText, ShieldCheck, Zap, Headphones } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/customSupabaseClient';
import { useLanguage } from '@/context/LanguageContext';

const ContactPage = () => {
    const { toast } = useToast();
    const { t } = useLanguage();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

    const validate = (values) => {
        const errors = {};
        
        if (!values.name.trim()) {
            errors.name = t('common.required');
        } else if (values.name.length < 2) {
            errors.name = "Name must be at least 2 characters";
        }

        if (!values.email.trim()) {
            errors.email = t('common.required');
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
            errors.email = "Invalid email address";
        }

        if (!values.subject.trim()) {
            errors.subject = t('common.required');
        } 

        if (!values.message.trim()) {
            errors.message = t('common.required');
        } 

        return errors;
    };

    const handleBlur = (e) => {
        setTouched({ ...touched, [e.target.name]: true });
        const validationErrors = validate(formData);
        setErrors(validationErrors);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const validationErrors = validate(formData);
        setErrors(validationErrors);
        setTouched({
            name: true,
            email: true,
            subject: true,
            message: true
        });

        if (Object.keys(validationErrors).length > 0) {
            toast({
                variant: "destructive",
                title: "Please check the form",
                description: "There are errors in your submission.",
            });
            return;
        }

        setIsSubmitting(true);
        
        try {
            // 1. Send to Telegram via Edge Function
            try {
                const { error: telegramError } = await supabase.functions.invoke('telegram-notification', {
                    body: {
                        type: 'contact',
                        data: formData
                    }
                });
                if (telegramError) console.error("Telegram Notification Error:", telegramError);
            } catch (notifyError) {
                console.error("Notification failed:", notifyError);
            }
            
            // 2. Store in Supabase
            const { error: contactError } = await supabase
                .from('contact_messages')
                .insert([{
                    user_id: null,
                    name: formData.name,
                    email: formData.email,
                    subject: formData.subject,
                    message: formData.message,
                    status: 'pending'
                }]);

            if (contactError) throw contactError;
            
            toast({
                title: "Message Sent Successfully!",
                description: "We've received your message and will respond shortly.",
                className: "bg-green-50 border-green-200 text-green-800",
            });
            setFormData({ name: '', email: '', subject: '', message: '' });
            setErrors({});
            setTouched({});
            
        } catch (error) {
            console.error("Submission error:", error);
            toast({
                variant: "destructive",
                title: "Failed to Send Message",
                description: "Please try again or contact us directly.",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        
        if (touched[name]) {
            const validationErrors = validate({ ...formData, [name]: value });
            setErrors(prev => ({ ...prev, [name]: validationErrors[name] }));
        }
    };

    const getInputClass = (fieldName) => {
        const hasError = touched[fieldName] && errors[fieldName];
        const isValid = touched[fieldName] && !errors[fieldName] && formData[fieldName].length > 0;
        
        let baseClass = "h-12 transition-all duration-300 border-2 rounded-lg text-slate-900 px-4 focus:outline-none focus:ring-2 focus:ring-offset-1";
        
        if (hasError) {
            return `${baseClass} bg-red-50 border-red-300 focus:border-red-500 focus:ring-red-100`;
        }
        if (isValid) {
            return `${baseClass} bg-green-50 border-green-300 focus:border-green-500 focus:ring-green-100`;
        }
        return `${baseClass} bg-slate-50 border-slate-200 focus:border-blue-500 focus:ring-blue-100`;
    };

    const contactInfo = [
        {
            icon: <MessageSquare className="w-6 h-6" />,
            title: t('contact.emailSupport'),
            description: t('contact.emailDesc'),
            value: "support@securekey.com",
            color: "bg-blue-50 text-blue-600",
            link: "mailto:support@securekey.com"
        },
        {
            icon: <Phone className="w-6 h-6" />,
            title: t('contact.phoneSupport'),
            description: t('contact.phoneDesc'),
            value: "+1 (555) 123-4567",
            color: "bg-green-50 text-green-600",
            link: "tel:+15551234567"
        },
        {
            icon: <Clock className="w-6 h-6" />,
            title: t('contact.responseTime'),
            description: t('contact.responseDesc'),
            value: t('contact.hours'),
            color: "bg-amber-50 text-amber-600"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 pt-20 pb-20 px-4">
            <Helmet>
                <title>SecureKey - Contact Us | Support</title>
                <meta name="description" content="Get in touch with SecureKey support team. We're here to help with your software license inquiries 24/7." />
                <link rel="canonical" href="https://securekey.online/contact" />
            </Helmet>
            <div className="max-w-7xl mx-auto">
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16 max-w-3xl mx-auto"
                >
                    <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-full mb-6">
                        <MessageSquare className="w-8 h-8 text-blue-600" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                        {t('contact.heroTitle')} <span className="text-blue-600">{t('contact.heroTitleHighlight')}</span>
                    </h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        {t('contact.heroDesc')}
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-6"
                    >
                        {contactInfo.map((info, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ scale: 1.02 }}
                                className="bg-white p-6 rounded-xl shadow-sm border border-slate-100"
                            >
                                <div className="flex items-start gap-4">
                                    <div className={`p-3 rounded-lg ${info.color}`}>
                                        {info.icon}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-slate-900 mb-1">{info.title}</h3>
                                        <p className="text-sm text-slate-500 mb-2">{info.description}</p>
                                        {info.link ? (
                                            <a 
                                                href={info.link}
                                                className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1 group"
                                            >
                                                {info.value}
                                                <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                                            </a>
                                        ) : (
                                            <p className="text-slate-900 font-medium text-sm">{info.value}</p>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 text-white"
                        >
                            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                                <ShieldCheck className="w-5 h-5" />
                                {t('contact.supportFeatures')}
                            </h3>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <Zap className="w-4 h-4 text-blue-200" />
                                    <span className="text-sm text-blue-100">{t('contact.feat1')}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Headphones className="w-4 h-4 text-blue-200" />
                                    <span className="text-sm text-blue-100">{t('contact.feat2')}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <ShieldCheck className="w-4 h-4 text-blue-200" />
                                    <span className="text-sm text-blue-100">{t('contact.feat3')}</span>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="lg:col-span-2"
                    >
                        <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
                            <div className="p-8 md:p-10">
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="p-2 bg-blue-100 rounded-lg">
                                        <Send className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-slate-900">{t('contact.formTitle')}</h2>
                                        <p className="text-slate-500">{t('contact.formSubtitle')}</p>
                                    </div>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-3">
                                            <Label htmlFor="name" className="text-slate-700 font-medium flex items-center gap-2">
                                                <User className="w-4 h-4" /> {t('contact.name')} *
                                            </Label>
                                            <Input
                                                id="name"
                                                name="name"
                                                placeholder="John Doe"
                                                value={formData.name}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                className={getInputClass('name')}
                                            />
                                            {touched.name && errors.name && (
                                                <p className="text-red-500 text-xs">{errors.name}</p>
                                            )}
                                        </div>

                                        <div className="space-y-3">
                                            <Label htmlFor="email" className="text-slate-700 font-medium flex items-center gap-2">
                                                <Mail className="w-4 h-4" /> {t('contact.email')} *
                                            </Label>
                                            <Input
                                                id="email"
                                                name="email"
                                                type="email"
                                                placeholder="john@example.com"
                                                value={formData.email}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                className={getInputClass('email')}
                                            />
                                            {touched.email && errors.email && (
                                                <p className="text-red-500 text-xs">{errors.email}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <Label htmlFor="subject" className="text-slate-700 font-medium flex items-center gap-2">
                                            <FileText className="w-4 h-4" /> {t('contact.subject')} *
                                        </Label>
                                        <Input
                                            id="subject"
                                            name="subject"
                                            placeholder="e.g., Windows License Activation Issue"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className={getInputClass('subject')}
                                        />
                                        {touched.subject && errors.subject && (
                                            <p className="text-red-500 text-xs">{errors.subject}</p>
                                        )}
                                    </div>

                                    <div className="space-y-3">
                                        <Label htmlFor="message" className="text-slate-700 font-medium flex items-center gap-2">
                                            <Hash className="w-4 h-4" /> {t('contact.message')} *
                                        </Label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            rows="6"
                                            className="w-full rounded-lg border-2 border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 resize-none transition-all duration-300"
                                            placeholder="Please describe your inquiry in detail..."
                                            value={formData.message}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        {touched.message && errors.message && (
                                            <p className="text-red-500 text-xs">{errors.message}</p>
                                        )}
                                    </div>

                                    <Button
                                        type="submit"
                                        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white h-12 text-lg font-semibold shadow-lg shadow-blue-200 transition-all duration-300 rounded-lg"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? (
                                            <span className="flex items-center gap-2">
                                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                {t('contact.sending')}
                                            </span>
                                        ) : (
                                            <>
                                                <Send className="w-4 h-4 mr-2" />
                                                {t('contact.sendMessage')}
                                            </>
                                        )}
                                    </Button>

                                    <p className="text-xs text-slate-400 text-center mt-4">
                                        {t('contact.privacyNote')}
                                    </p>
                                </form>
                            </div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4"
                        >
                            <div className="bg-white p-4 rounded-lg border border-slate-100 text-center">
                                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                                    <Zap className="w-5 h-5 text-green-600" />
                                </div>
                                <p className="text-sm font-medium text-slate-900">{t('contact.fastResponse')}</p>
                                <p className="text-xs text-slate-500">{t('contact.responseDesc')}</p>
                            </div>
                            <div className="bg-white p-4 rounded-lg border border-slate-100 text-center">
                                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                                    <ShieldCheck className="w-5 h-5 text-blue-600" />
                                </div>
                                <p className="text-sm font-medium text-slate-900">{t('contact.securePrivate')}</p>
                                <p className="text-xs text-slate-500">Your data is protected</p>
                            </div>
                            <div className="bg-white p-4 rounded-lg border border-slate-100 text-center">
                                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                                    <Headphones className="w-5 h-5 text-purple-600" />
                                </div>
                                <p className="text-sm font-medium text-slate-900">{t('contact.expertSupport')}</p>
                                <p className="text-xs text-slate-500">Software license specialists</p>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;