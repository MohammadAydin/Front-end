import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    Mail,
    Phone,
    MapPin,
    Facebook,
    Twitter,
    Linkedin,
    Instagram,
    Shield,
    Users,
    Clock
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import logoHorizontal from '@/assets/logo-horizontal.png';

const Footer = () => {
    const { t } = useLanguage();

    const serviceLinks = [
        { label: t('footer.howItWorks'), href: '#how-it-works' },
        { label: t('footer.benefits'), href: '#benefits' },
        { label: t('footer.testimonials'), href: '#testimonials' },
        { label: t('footer.appDownload'), href: '#app-download' }
    ];

    const supportLinks = [
        { label: t('footer.contact'), href: '#contact' }
    ];

    const legalLinks = [
        { label: t('footer.privacy'), href: '/privacy' },
        { label: t('footer.impressum'), href: '/impressum' }
    ];

    const socialLinks = [
        { icon: Facebook, href: 'https://www.facebook.com/woundwann.job', label: 'Facebook' },
        { icon: Twitter, href: 'https://x.com/wo_wann2025', label: 'Twitter/X' },
        { icon: Linkedin, href: 'https://www.linkedin.com/company/wo-und-wann-personal-service-gmbh/', label: 'LinkedIn' },
        { icon: Instagram, href: 'https://www.instagram.com/woundwann.de', label: 'Instagram' }
    ];

    const contactInfo = [
        { icon: Mail, text: 'info@woundwann.de', href: 'mailto:info@woundwann.de' },
        { icon: Phone, text: '+49 15560 600555', href: 'tel:+4915560600555' },
        { icon: MapPin, text: 'Haagstr.25, 61169 Friedberg, Deutschland', href: '#location' }
    ];

    const trustIndicators = [
        { icon: Users, label: '5,000+ Caregivers' },
        { icon: Shield, label: '500+ Facilities' },
        { icon: Clock, label: '24/7 Available' }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <footer className="bg-gradient-to-br from-muted/50 to-background border-t border-border">
            {/* Main Footer Content */}
            <div className="container-wide py-16 lg:py-20">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12"
                >
                    {/* Company Info */}
                    <motion.div variants={itemVariants} className="lg:col-span-1">
                        <Link to="/" className="flex items-center mb-6">
                            <img
                                src={logoHorizontal}
                                alt={t('alt.logo')}
                                className="h-12 w-auto object-contain"
                            />
                        </Link>
                        <p className="text-muted-foreground mb-6 leading-relaxed">
                            {t('footer.tagline')}
                        </p>

                        {/* Contact Info */}
                        <div className="space-y-3 mb-6">
                            {contactInfo.map((contact, index) => (
                                <motion.a
                                    key={index}
                                    href={contact.href}
                                    whileHover={{ x: 5 }}
                                    className="flex items-center space-x-3 text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
                                >
                                    <contact.icon className="w-4 h-4 flex-shrink-0" />
                                    <span>{contact.text}</span>
                                </motion.a>
                            ))}
                        </div>

                        {/* Location Map */}
                        <div className="mb-6">
                            <h4 className="font-medium text-foreground mb-3">{t('footer.location')}</h4>
                            <div className="relative w-full h-48 rounded-lg overflow-hidden border border-border">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2568.123456789!2d8.7545!3d50.3344!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTDCsDIwJzAzLjgiTiA4wrA0NScxNi4yIkU!5e0!3m2!1sde!2sde!4v1234567890123!5m2!1sde!2sde"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Woundwann Office Location - Haagstr. 25, 61169 Friedberg, Deutschland"
                                    className="absolute inset-0"
                                />
                            </div>
                            <motion.a
                                href="https://www.google.com/maps/search/Haagstr.+25,+61169+Friedberg,+Germany"
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.02 }}
                                className="inline-flex items-center space-x-2 text-sm text-primary hover:text-primary-light transition-colors duration-300 mt-2"
                            >
                                <MapPin className="w-4 h-4" />
                                <span>{t('footer.viewOnMaps')}</span>
                            </motion.a>
                        </div>

                        {/* Social Links */}
                        <div className="flex items-center space-x-4">
                            {socialLinks.map((social, index) => (
                                <motion.a
                                    key={index}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300"
                                    aria-label={social.label}
                                >
                                    <social.icon className="w-5 h-5" />
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Services Links */}
                    <motion.div variants={itemVariants}>
                        <h3 className="font-semibold text-foreground mb-6">{t('footer.services')}</h3>
                        <ul className="space-y-4">
                            {serviceLinks.map((link, index) => (
                                <li key={index}>
                                    <motion.a
                                        href={link.href}
                                        whileHover={{ x: 5 }}
                                        className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm"
                                    >
                                        {link.label}
                                    </motion.a>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Support & Legal */}
                    <motion.div variants={itemVariants}>
                        <h3 className="font-semibold text-foreground mb-6">{t('footer.support')}</h3>
                        <ul className="space-y-4 mb-8">
                            {supportLinks.map((link, index) => (
                                <li key={index}>
                                    <motion.a
                                        href={link.href}
                                        whileHover={{ x: 5 }}
                                        className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm"
                                    >
                                        {link.label}
                                    </motion.a>
                                </li>
                            ))}
                        </ul>

                        <h4 className="font-medium text-foreground mb-4">{t('footer.legal')}</h4>
                        <ul className="space-y-3">
                            {legalLinks.map((link, index) => (
                                <li key={index}>
                                    <motion.div whileHover={{ scale: 1.05 }}>
                                        {link.href.startsWith('/') ? (
                                            <Link
                                                to={link.href}
                                                className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
                                            >
                                                {link.label}
                                            </Link>
                                        ) : (
                                            <a
                                                href={link.href}
                                                className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
                                            >
                                                {link.label}
                                            </a>
                                        )}
                                    </motion.div>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </motion.div>
            </div>

            {/* Trust Indicators */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="bg-gradient-primary py-8"
            >
                <div className="container-wide">
                    <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-12">
                        {trustIndicators.map((indicator, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                className="flex items-center space-x-3 text-white"
                            >
                                <indicator.icon className="w-6 h-6" />
                                <span className="font-medium">{indicator.label}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* Bottom Bar */}
            <div className="border-t border-border bg-muted/30">
                <div className="container-wide py-6">
                    <div className="text-center">
                        <p className="text-sm text-muted-foreground">
                            {t('footer.rights')}
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
