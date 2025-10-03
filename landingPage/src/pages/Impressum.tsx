import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Building2, MapPin, Mail, Globe, User, FileText, Shield, Copyright, AlertTriangle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import logoHorizontal from '@/assets/logo-horizontal.png';
import WhatsAppButton from '@/components/WhatsAppButton';
import ScrollToTop from '@/components/ScrollToTop';

const Impressum = () => {
    const { t } = useLanguage();

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
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    const companyInfo = [
        { icon: Building2, label: t('impressum.companyName') },
        { icon: MapPin, label: t('impressum.address') },
        { icon: MapPin, label: t('impressum.postalCode') },
        { icon: Mail, label: t('impressum.email') },
        { icon: Shield, label: t('impressum.privacyEmail') },
        { icon: Globe, label: t('impressum.website') },
        { icon: User, label: t('impressum.ceo') },
        { icon: FileText, label: t('impressum.registrationNumber') },
        { icon: Building2, label: t('impressum.registrationCourt') },
        { icon: FileText, label: t('impressum.taxNumber') },
        { icon: FileText, label: t('impressum.vatNumber') }
    ];

    const legalSections = [
        {
            icon: AlertTriangle,
            title: t('impressum.contentLiability'),
            content: [
                t('impressum.contentLiabilityText'),
                t('impressum.contentLiabilityText2'),
                t('impressum.contentLiabilityText3')
            ]
        },
        {
            icon: Shield,
            title: t('impressum.linkLiability'),
            content: [
                t('impressum.linkLiabilityText'),
                t('impressum.linkLiabilityText2')
            ]
        },
        {
            icon: Copyright,
            title: t('impressum.copyright'),
            content: [
                t('impressum.copyrightText'),
                t('impressum.copyrightText2'),
                t('impressum.copyrightText3')
            ]
        },
        {
            icon: Shield,
            title: t('impressum.dataProtection'),
            content: [
                t('impressum.dataProtectionText'),
                t('impressum.dataProtectionText2')
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <motion.header
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border"
            >
                <div className="container-wide py-4">
                    <div className="flex items-center justify-between">
                        <Link to="/" className="flex items-center space-x-3">
                            <img
                                src={logoHorizontal}
                                alt={t('alt.logo')}
                                className="h-8 w-auto object-contain"
                            />
                        </Link>

                        <Link
                            to="/"
                            className="flex items-center space-x-2 text-primary hover:text-primary-light transition-colors duration-300"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            <span className="text-sm font-medium">{t('privacy.backToHomepage')}</span>
                        </Link>
                    </div>
                </div>
            </motion.header>

            {/* Main Content */}
            <main className="container-wide py-12">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="max-w-4xl mx-auto"
                >
                    {/* Page Header */}
                    <motion.div variants={itemVariants} className="text-center mb-12">
                        <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                            <span className="text-gradient-hero">{t('impressum.title')}</span>
                        </h1>
                        <p className="text-lg text-muted-foreground">
                            {t('impressum.legalNotice')}
                        </p>
                    </motion.div>

                    {/* Company Information */}
                    <motion.div variants={itemVariants} className="mb-12">
                        <div className="card-elevated p-8">
                            <h2 className="text-2xl font-bold mb-6 flex items-center space-x-3">
                                <Building2 className="w-6 h-6 text-primary" />
                                <span>{t('impressum.legalNotice')}</span>
                            </h2>

                            <div className="grid gap-4">
                                {companyInfo.map((info, index) => (
                                    <div key={index} className="flex items-start space-x-3">
                                        <info.icon className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                                        <span className="text-foreground">{info.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Legal Sections */}
                    <div className="space-y-8">
                        {legalSections.map((section, index) => (
                            <motion.div key={index} variants={itemVariants}>
                                <div className="card-elevated p-8">
                                    <h3 className="text-xl font-bold mb-4 flex items-center space-x-3">
                                        <section.icon className="w-5 h-5 text-primary" />
                                        <span>{section.title}</span>
                                    </h3>

                                    <div className="space-y-4">
                                        {section.content.map((paragraph, pIndex) => (
                                            <p key={pIndex} className="text-muted-foreground leading-relaxed">
                                                {paragraph}
                                            </p>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Footer */}
                    <motion.div
                        variants={itemVariants}
                        className="mt-16 pt-8 border-t border-border text-center"
                    >
                        <p className="text-muted-foreground">
                            {t('privacy.copyright')}
                        </p>
                    </motion.div>
                </motion.div>
            </main>

            {/* WhatsApp Button */}
            <WhatsAppButton />

            {/* Scroll to Top Button */}
            <ScrollToTop />
        </div>
    );
};

export default Impressum;
