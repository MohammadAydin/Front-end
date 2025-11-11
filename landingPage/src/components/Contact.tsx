import React, { useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
    Mail,
    Phone,
    MapPin,
    Clock,
    Send,
    CheckCircle,
    Building,
    User,
    MessageSquare,
    AlertCircle,
    Facebook,
    Twitter,
    Linkedin,
    Instagram
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { API_BASE_URL, getApiUrl } from '@/config/api';

const Contact = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const { t } = useLanguage();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        subject: '',
        message: ''
    });

    const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormStatus('sending');

        try {
            const payload = {
                email: formData.email,
                name: formData.name,
                phone: formData.phone,
                // Include subject/company context inside the message since API expects only message
                message: `${formData.subject ? `[${formData.subject}] ` : ''}${formData.company ? `(Company: ${formData.company}) ` : ''}${formData.message}`
            };

            const endpoint = import.meta.env.DEV ? '/v1/contact' : getApiUrl('/contact');
            const res = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (!res.ok) {
                throw new Error(`Request failed with status ${res.status}`);
            }

            setFormStatus('success');
            setFormData({
                name: '',
                email: '',
                phone: '',
                company: '',
                subject: '',
                message: ''
            });

            setTimeout(() => {
                setFormStatus('idle');
            }, 3000);
        } catch (error) {
            setFormStatus('error');
            setTimeout(() => {
                setFormStatus('idle');
            }, 3000);
        }
    };

    const contactInfo = [
        {
            icon: Phone,
            title: t('contact.info.phone'),
            value: '+49 15560 600555',
            href: 'tel:+4915560600555',
            color: 'from-primary to-primary-light'
        },
        {
            icon: Mail,
            title: t('contact.info.email'),
            value: 'info@woundwann.de',
            href: 'mailto:info@woundwann.de',
            color: 'from-accent to-accent-light'
        },
        {
            icon: MapPin,
            title: t('contact.info.address'),
            value: 'Haagstr.25, 61169 Friedberg, Deutschland',
            href: '#location',
            color: 'from-success to-success-light'
        },
        {
            icon: Clock,
            title: t('contact.info.hours'),
            value: t('contact.info.hoursDesc'),
            href: '#hours',
            color: 'from-primary-dark to-primary'
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    return (
        <section id="contact" className="section-padding bg-gradient-to-br from-background to-muted/20 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 opacity-6">
                <div className="absolute top-20 left-20 w-80 h-80 bg-gradient-primary rounded-full blur-3xl animate-pulse-slow"></div>
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-accent rounded-full blur-3xl animate-float"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-success rounded-full blur-2xl opacity-25 animate-float" style={{ animationDelay: '3s' }}></div>
            </div>

            <div className="container-wide relative z-10" ref={ref}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-center mb-16 lg:mb-20"
                >
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
                        <span className="text-gradient-hero">{t('contact.title')}</span>
                    </h2>
                    <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto">
                        {t('contact.subtitle')}
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
                    {/* Contact Form */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        className="space-y-8"
                    >
                        <motion.div variants={itemVariants}>
                            <div className="card-elevated p-8">
                                <div className="flex items-center space-x-3 mb-6">
                                    <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
                                        <MessageSquare className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-card-foreground">
                                        {t('contact.form.title')}
                                    </h3>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid sm:grid-cols-2 gap-6">
                                        <motion.div
                                            variants={itemVariants}
                                            className="space-y-2"
                                        >
                                            <label className="text-sm font-medium text-card-foreground">
                                                {t('contact.form.name')} *
                                            </label>
                                            <div className="relative">
                                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleInputChange}
                                                    required
                                                    className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                                                    placeholder={t('contact.form.namePlaceholder')}
                                                />
                                            </div>
                                        </motion.div>

                                        <motion.div
                                            variants={itemVariants}
                                            className="space-y-2"
                                        >
                                            <label className="text-sm font-medium text-card-foreground">
                                                {t('contact.form.email')} *
                                            </label>
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    required
                                                    className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                                                    placeholder="max@example.com"
                                                />
                                            </div>
                                        </motion.div>
                                    </div>

                                    <motion.div
                                        variants={itemVariants}
                                        className="space-y-2"
                                    >
                                        <label className="text-sm font-medium text-card-foreground">
                                            {t('contact.form.phone')}
                                        </label>
                                        <div className="relative">
                                            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                                                placeholder={t('contact.form.phonePlaceholder')}
                                            />
                                        </div>
                                    </motion.div>

                                    <motion.div
                                        variants={itemVariants}
                                        className="space-y-2"
                                    >
                                        <label className="text-sm font-medium text-card-foreground">
                                            {t('contact.form.company')}
                                        </label>
                                        <div className="relative">
                                            <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                            <input
                                                type="text"
                                                name="company"
                                                value={formData.company}
                                                onChange={handleInputChange}
                                                className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                                                placeholder={t('contact.form.companyPlaceholder')}
                                            />
                                        </div>
                                    </motion.div>

                                    <motion.div
                                        variants={itemVariants}
                                        className="space-y-2"
                                    >
                                        <label className="text-sm font-medium text-card-foreground">
                                            {t('contact.form.subject')} *
                                        </label>
                                        <select
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                                        >
                                            <option value="">{t('contact.form.subjectPlaceholder')}</option>
                                            <option value="general">{t('contact.form.subjectGeneral')}</option>
                                            <option value="support">{t('contact.form.subjectSupport')}</option>
                                            <option value="partnership">{t('contact.form.subjectPartnership')}</option>
                                            <option value="career">{t('contact.form.subjectCareer')}</option>
                                            <option value="other">{t('contact.form.subjectOther')}</option>
                                        </select>
                                    </motion.div>

                                    <motion.div
                                        variants={itemVariants}
                                        className="space-y-2"
                                    >
                                        <label className="text-sm font-medium text-card-foreground">
                                            {t('contact.form.message')} *
                                        </label>
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleInputChange}
                                            required
                                            rows={5}
                                            className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 resize-none"
                                            placeholder={t('contact.form.messagePlaceholder')}
                                        />
                                    </motion.div>

                                    <motion.button
                                        variants={itemVariants}
                                        type="submit"
                                        disabled={formStatus === 'sending'}
                                        className="w-full bg-gradient-to-r from-primary to-primary-light text-white py-4 px-6 rounded-xl font-semibold text-lg shadow-strong hover:shadow-lifted transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3"
                                    >
                                        {formStatus === 'sending' ? (
                                            <>
                                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                <span>Sende...</span>
                                            </>
                                        ) : (
                                            <>
                                                <Send className="w-5 h-5" />
                                                <span>{t('contact.form.send')}</span>
                                            </>
                                        )}
                                    </motion.button>

                                    {/* Status Messages */}
                                    {formStatus === 'success' && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="flex items-center space-x-2 text-success bg-success/10 p-3 rounded-xl"
                                        >
                                            <CheckCircle className="w-5 h-5" />
                                            <span className="font-medium">{t('contact.success')}</span>
                                        </motion.div>
                                    )}

                                    {formStatus === 'error' && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="flex items-center space-x-2 text-destructive bg-destructive/10 p-3 rounded-xl"
                                        >
                                            <AlertCircle className="w-5 h-5" />
                                            <span className="font-medium">{t('contact.error')}</span>
                                        </motion.div>
                                    )}
                                </form>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Contact Information */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        className="space-y-8"
                    >
                        <motion.div variants={itemVariants}>
                            <div className="text-center lg:text-left mb-8">
                                <h3 className="text-2xl font-bold text-card-foreground mb-4">
                                    {t('contact.info.title')}
                                </h3>
                                <p className="text-muted-foreground">
                                    {t('contact.info.desc')}
                                </p>
                            </div>
                        </motion.div>

                        <div className="space-y-6">
                            {contactInfo.map((info, index) => (
                                <motion.div
                                    key={index}
                                    variants={itemVariants}
                                    whileHover={{ scale: 1.02, y: -2 }}
                                    className="group cursor-pointer"
                                >
                                    <a
                                        href={info.href}
                                        className="card-elevated p-6 hover:shadow-lifted transition-all duration-300 block"
                                    >
                                        <div className="flex items-start space-x-4">
                                            <motion.div
                                                whileHover={{ scale: 1.1, rotate: 5 }}
                                                className={`w-14 h-14 bg-gradient-to-r ${info.color} rounded-xl flex items-center justify-center shadow-soft transition-all duration-300 flex-shrink-0`}
                                            >
                                                <info.icon className="w-7 h-7 text-white" />
                                            </motion.div>

                                            <div className="flex-1">
                                                <h4 className="font-semibold text-card-foreground mb-1 group-hover:text-primary transition-colors duration-300">
                                                    {info.title}
                                                </h4>
                                                <p className="text-muted-foreground group-hover:text-primary/80 transition-colors duration-300">
                                                    {info.value}
                                                </p>
                                            </div>
                                        </div>
                                    </a>
                                </motion.div>
                            ))}
                        </div>

                        {/* Social Media Links */}
                        <motion.div
                            variants={itemVariants}
                            className="card-elevated p-6"
                        >
                            <h4 className="font-semibold text-card-foreground mb-4">
                                {t('contact.social.title')}
                            </h4>
                            <p className="text-muted-foreground text-sm mb-4">
                                {t('contact.social.desc')}
                            </p>
                            <div className="flex items-center space-x-4">
                                <motion.a
                                    href="https://www.facebook.com/woundwann.job"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-12 h-12 bg-[#1877F2] rounded-xl flex items-center justify-center text-white hover:bg-[#166FE5] transition-all duration-300"
                                    aria-label="Facebook"
                                >
                                    <Facebook className="w-6 h-6" />
                                </motion.a>
                                <motion.a
                                    href="https://x.com/wo_wann2025"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-12 h-12 bg-black rounded-xl flex items-center justify-center text-white hover:bg-gray-800 transition-all duration-300"
                                    aria-label="Twitter/X"
                                >
                                    <Twitter className="w-6 h-6" />
                                </motion.a>
                                <motion.a
                                    href="https://www.linkedin.com/company/wo-und-wann-personal-service-gmbh/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-12 h-12 bg-[#0077B5] rounded-xl flex items-center justify-center text-white hover:bg-[#005885] transition-all duration-300"
                                    aria-label="LinkedIn"
                                >
                                    <Linkedin className="w-6 h-6" />
                                </motion.a>
                                <motion.a
                                    href="https://www.instagram.com/woundwann.de"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-12 h-12 bg-gradient-to-r from-[#E4405F] to-[#C13584] rounded-xl flex items-center justify-center text-white hover:from-[#D62976] hover:to-[#A020F0] transition-all duration-300"
                                    aria-label="Instagram"
                                >
                                    <Instagram className="w-6 h-6" />
                                </motion.a>
                            </div>
                        </motion.div>

                        {/* Additional Info Card */}
                        <motion.div
                            variants={itemVariants}
                            className="card-elevated p-6 bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/10"
                        >
                            <h4 className="font-semibold text-card-foreground mb-3">
                                {t('contact.guarantee.title')}
                            </h4>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                {t('contact.guarantee.desc')}
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
