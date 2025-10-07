import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, Lock, Mail, FileText, Users, AlertCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import logoHorizontal from '@/assets/logo-horizontal.png';
import WhatsAppButton from '@/components/WhatsAppButton';
import ScrollToTop from '@/components/ScrollToTop';

const Privacy = () => {
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

    const sectionVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut"
            }
        }
    };

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <motion.header
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-background/95 backdrop-blur-md border-b border-border sticky top-0 z-50"
            >
                <div className="container-wide py-4">
                    <div className="flex items-center justify-between">
                        <Link to="/" className="flex items-center">
                            <img
                                src={logoHorizontal}
                                alt={t('alt.logo')}
                                className="h-10 w-auto object-contain"
                            />
                        </Link>

                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors duration-300"
                        >
                            <Link to="/" className="flex items-center space-x-2">
                                <ArrowLeft className="w-4 h-4" />
                                <span className="text-sm font-medium">{t('privacy.backToHomepage')}</span>
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </motion.header>

            {/* Main Content */}
            <main className="container-wide py-16">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="max-w-4xl mx-auto"
                >
                    {/* Title Section */}
                    <motion.div variants={itemVariants} className="text-center mb-16">
                        <div className="inline-flex items-center space-x-3 bg-gradient-primary/10 border border-primary/20 rounded-full px-6 py-3 mb-6">
                            <Shield className="w-6 h-6 text-primary" />
                            <span className="text-lg font-semibold text-primary">{t('privacy.title')}</span>
                        </div>
                        <h1 className="text-4xl lg:text-5xl font-bold text-gradient-hero mb-6">
                            {t('privacy.title')}
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            {t('privacy.generalInfo')}
                        </p>
                    </motion.div>

                    {/* Content Sections */}
                    <div className="space-y-12">
                        {/* Responsible Party */}
                        <motion.section variants={sectionVariants} className="card-elevated">
                            <div className="flex items-start space-x-4 mb-6">
                                <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center flex-shrink-0">
                                    <Users className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-card-foreground mb-2">
                                        {t('privacy.responsibleParty')}
                                    </h2>
                                    <p className="text-muted-foreground">
                                        {t('privacy.responsiblePartyDesc')}
                                    </p>
                                </div>
                            </div>

                            <div className="bg-muted/50 rounded-lg p-6 space-y-2">
                                <p className="font-semibold text-foreground">{t('privacy.companyName')}</p>
                                <p className="text-muted-foreground">{t('privacy.contactPerson')}</p>
                                <p className="text-muted-foreground">{t('privacy.address')}</p>
                                <p className="text-muted-foreground">{t('privacy.city')}</p>
                                <div className="flex items-center space-x-2 mt-3 pt-3 border-t border-border">
                                    <Shield className="w-4 h-4 text-primary" />
                                    <p className="text-muted-foreground">{t('privacy.privacyEmail')}</p>
                                </div>
                            </div>

                            <p className="mt-4 text-muted-foreground leading-relaxed">
                                {t('privacy.dataProcessing')}
                            </p>
                        </motion.section>

                        {/* Consent Withdrawal */}
                        <motion.section variants={sectionVariants} className="card-elevated">
                            <div className="flex items-start space-x-4 mb-6">
                                <div className="w-12 h-12 bg-gradient-accent rounded-xl flex items-center justify-center flex-shrink-0">
                                    <AlertCircle className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-card-foreground mb-2">
                                        {t('privacy.consentWithdrawal')}
                                    </h2>
                                </div>
                            </div>

                            <p className="text-muted-foreground leading-relaxed">
                                {t('privacy.consentWithdrawalDesc')}
                            </p>
                        </motion.section>

                        {/* Complaint Right */}
                        <motion.section variants={sectionVariants} className="card-elevated">
                            <div className="flex items-start space-x-4 mb-6">
                                <div className="w-12 h-12 bg-gradient-success rounded-xl flex items-center justify-center flex-shrink-0">
                                    <FileText className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-card-foreground mb-2">
                                        {t('privacy.complaintRight')}
                                    </h2>
                                </div>
                            </div>

                            <p className="text-muted-foreground leading-relaxed">
                                {t('privacy.complaintRightDesc')}
                            </p>
                        </motion.section>

                        {/* Data Portability */}
                        <motion.section variants={sectionVariants} className="card-elevated">
                            <div className="flex items-start space-x-4 mb-6">
                                <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center flex-shrink-0">
                                    <FileText className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-card-foreground mb-2">
                                        {t('privacy.dataPortability')}
                                    </h2>
                                </div>
                            </div>

                            <p className="text-muted-foreground leading-relaxed">
                                {t('privacy.dataPortabilityDesc')}
                            </p>
                        </motion.section>

                        {/* Data Rights */}
                        <motion.section variants={sectionVariants} className="card-elevated">
                            <div className="flex items-start space-x-4 mb-6">
                                <div className="w-12 h-12 bg-gradient-accent rounded-xl flex items-center justify-center flex-shrink-0">
                                    <Shield className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-card-foreground mb-2">
                                        {t('privacy.dataRights')}
                                    </h2>
                                </div>
                            </div>

                            <p className="text-muted-foreground leading-relaxed">
                                {t('privacy.dataRightsDesc')}
                            </p>
                        </motion.section>

                        {/* SSL Encryption */}
                        <motion.section variants={sectionVariants} className="card-elevated">
                            <div className="flex items-start space-x-4 mb-6">
                                <div className="w-12 h-12 bg-gradient-success rounded-xl flex items-center justify-center flex-shrink-0">
                                    <Lock className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-card-foreground mb-2">
                                        {t('privacy.sslEncryption')}
                                    </h2>
                                </div>
                            </div>

                            <p className="text-muted-foreground leading-relaxed">
                                {t('privacy.sslEncryptionDesc')}
                            </p>
                        </motion.section>

                        {/* Contact Form */}
                        <motion.section variants={sectionVariants} className="card-elevated">
                            <div className="flex items-start space-x-4 mb-6">
                                <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center flex-shrink-0">
                                    <Mail className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-card-foreground mb-2">
                                        {t('privacy.contactForm')}
                                    </h2>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <p className="text-muted-foreground leading-relaxed">
                                    {t('privacy.contactFormDesc1')}
                                </p>
                                <p className="text-muted-foreground leading-relaxed">
                                    {t('privacy.contactFormDesc2')}
                                </p>
                                <p className="text-muted-foreground leading-relaxed">
                                    {t('privacy.contactFormDesc3')}
                                </p>
                            </div>
                        </motion.section>
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

export default Privacy;
