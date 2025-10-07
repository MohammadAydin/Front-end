import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import {
    Smartphone,
    Download,
    QrCode,
    Bell,
    Users,
    MessageCircle,
    FileText,
    Apple,
    Play,
    Star,
    CheckCircle
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const AppDownload = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const { t } = useLanguage();
    const [activeFeature, setActiveFeature] = useState(0);

    const features = [
        {
            icon: Bell,
            title: t('appDownload.feature1'),
            description: t('appDownload.feature1Desc'),
            color: 'from-primary to-primary-light'
        },
        {
            icon: Users,
            title: t('appDownload.feature2'),
            description: t('appDownload.feature2Desc'),
            color: 'from-accent to-accent-light'
        },
        {
            icon: MessageCircle,
            title: t('appDownload.feature3'),
            description: t('appDownload.feature3Desc'),
            color: 'from-success to-success-light'
        },
        {
            icon: FileText,
            title: t('appDownload.feature4'),
            description: t('appDownload.feature4Desc'),
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

    const phoneVariants = {
        hidden: { opacity: 0, scale: 0.8, rotateY: -15 },
        visible: {
            opacity: 1,
            scale: 1,
            rotateY: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut"
            }
        }
    };

    const FeatureCard = ({ feature, index }: { feature: typeof features[0], index: number }) => (
        <motion.div
            variants={itemVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ delay: index * 0.1 }}
            className="group cursor-pointer"
            onClick={() => setActiveFeature(index)}
        >
            <div className={`card-elevated h-full transition-all duration-300 ${activeFeature === index
                ? 'ring-2 ring-primary shadow-lifted scale-105'
                : 'hover:shadow-strong hover:scale-102'
                }`}>
                <div className="flex items-start space-x-4">
                    <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className={`w-14 h-14 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center shadow-soft transition-all duration-300 flex-shrink-0`}
                    >
                        <feature.icon className="w-7 h-7 text-white" />
                    </motion.div>

                    <div className="flex-1">
                        <h3 className={`text-lg font-bold mb-2 transition-colors duration-300 ${activeFeature === index ? 'text-primary' : 'text-card-foreground group-hover:text-primary'
                            }`}>
                            {feature.title}
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            {feature.description}
                        </p>
                    </div>

                    {activeFeature === index && (
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="flex-shrink-0"
                        >
                            <CheckCircle className="w-6 h-6 text-primary" />
                        </motion.div>
                    )}
                </div>
            </div>
        </motion.div>
    );

    return (
        <section id="app-download" className="section-padding bg-gradient-to-br from-muted/30 to-background relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 opacity-6">
                <div className="absolute top-20 right-20 w-80 h-80 bg-gradient-primary rounded-full blur-3xl animate-pulse-slow"></div>
                <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-accent rounded-full blur-3xl animate-float"></div>
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
                        <span className="text-gradient-hero">{t('appDownload.title')}</span>
                    </h2>
                    <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto">
                        {t('appDownload.subtitle')}
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Left Column - Phone Mockup & Features */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        className="space-y-12"
                    >
                        {/* Phone Mockup */}
                        <motion.div
                            variants={phoneVariants}
                            className="relative mx-auto lg:mx-0"
                        >
                            <div className="relative w-72 h-[580px] mx-auto">
                                {/* Phone Frame */}
                                <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-900 rounded-[3rem] p-2 shadow-2xl">
                                    <div className="w-full h-full bg-black rounded-[2.5rem] p-3">
                                        {/* Screen */}
                                        <div className="w-full h-full bg-gradient-to-br from-primary/20 via-accent/10 to-success/20 rounded-[2rem] relative overflow-hidden">
                                            {/* Status Bar */}
                                            <div className="flex justify-between items-center p-4 text-white text-sm">
                                                <span>9:41</span>
                                                <div className="flex space-x-1">
                                                    <div className="w-1 h-1 bg-white rounded-full"></div>
                                                    <div className="w-1 h-1 bg-white rounded-full"></div>
                                                    <div className="w-1 h-1 bg-white rounded-full"></div>
                                                </div>
                                            </div>

                                            {/* App Content */}
                                            <div className="p-6 space-y-6">
                                                {/* Header */}
                                                <div className="text-center">
                                                    <div className="w-16 h-16 bg-gradient-primary rounded-2xl mx-auto mb-3 flex items-center justify-center">
                                                        <Smartphone className="w-8 h-8 text-white" />
                                                    </div>
                                                    <h3 className="text-white font-bold text-lg">Woundwann</h3>
                                                    <p className="text-white/70 text-sm">Healthcare Staffing</p>
                                                </div>

                                                {/* Active Feature Display */}
                                                <motion.div
                                                    key={activeFeature}
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                    className="bg-white/10 backdrop-blur-sm rounded-2xl p-4"
                                                >
                                                    <div className="flex items-center space-x-3 mb-3">
                                                        <div className={`w-8 h-8 bg-gradient-to-r ${features[activeFeature].color} rounded-lg flex items-center justify-center`}>
                                                            {React.createElement(features[activeFeature].icon, { className: "w-4 h-4 text-white" })}
                                                        </div>
                                                        <h4 className="text-white font-semibold text-sm">
                                                            {features[activeFeature].title}
                                                        </h4>
                                                    </div>
                                                    <p className="text-white/70 text-xs leading-relaxed">
                                                        {features[activeFeature].description}
                                                    </p>
                                                </motion.div>

                                                {/* Notifications */}
                                                <div className="space-y-2">
                                                    <div className="bg-success/20 backdrop-blur-sm rounded-xl p-3">
                                                        <div className="flex items-center space-x-2">
                                                            <Bell className="w-4 h-4 text-success" />
                                                            <span className="text-white text-xs">New job available</span>
                                                        </div>
                                                    </div>
                                                    <div className="bg-primary/20 backdrop-blur-sm rounded-xl p-3">
                                                        <div className="flex items-center space-x-2">
                                                            <MessageCircle className="w-4 h-4 text-primary" />
                                                            <span className="text-white text-xs">Message from facility</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Floating Elements */}
                                <motion.div
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center shadow-strong"
                                >
                                    <Download className="w-6 h-6 text-white" />
                                </motion.div>

                                <motion.div
                                    animate={{ y: [0, -8, 0] }}
                                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                                    className="absolute -bottom-6 -left-6 w-16 h-16 bg-gradient-accent rounded-full flex items-center justify-center shadow-strong"
                                >
                                    <QrCode className="w-8 h-8 text-white" />
                                </motion.div>
                            </div>
                        </motion.div>

                        {/* Features Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
                            {features.map((feature, index) => (
                                <FeatureCard key={index} feature={feature} index={index} />
                            ))}
                        </div>
                    </motion.div>

                    {/* Right Column - Download Buttons & QR Code */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        className="space-y-8"
                    >
                        {/* Download Buttons */}
                        <div className="space-y-6">
                            <h3 className="text-2xl font-bold text-card-foreground text-center lg:text-left">
                                {t('appDownload.availableOn')}
                            </h3>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                {/* App Store Button */}
                                <motion.a
                                    href="https://apps.apple.com/us/app/wo-wann/id6741417892"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="group bg-black text-white rounded-2xl p-4 flex items-center space-x-4 shadow-strong hover:shadow-lifted transition-all duration-300"
                                >
                                    <Apple className="w-10 h-10" />
                                    <div className="text-left">
                                        <div className="text-xs text-gray-300">{t('appDownload.downloadOn')}</div>
                                        <div className="font-semibold text-lg">{t('appDownload.appStore')}</div>
                                    </div>
                                </motion.a>

                                {/* Google Play Button */}
                                <motion.a
                                    href="https://play.google.com/store/apps/details?id=com.w.wowann"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="group bg-black text-white rounded-2xl p-4 flex items-center space-x-4 shadow-strong hover:shadow-lifted transition-all duration-300"
                                >
                                    <Play className="w-10 h-10" />
                                    <div className="text-left">
                                        <div className="text-xs text-gray-300">{t('appDownload.downloadOn')}</div>
                                        <div className="font-semibold text-lg">{t('appDownload.googlePlay')}</div>
                                    </div>
                                </motion.a>
                            </div>


                        </div>

                        {/* QR Code Section */}
                        <motion.div
                            variants={itemVariants}
                            className="card-elevated text-center p-8"
                        >
                            <QrCode className="w-16 h-16 text-primary mx-auto mb-4" />
                            <h4 className="font-semibold text-card-foreground mb-2">
                                {t('appDownload.qrTitle')}
                            </h4>
                            <p className="text-sm text-muted-foreground mb-6">
                                {t('appDownload.qrSubtitle')}
                            </p>

                            {/* QR Codes */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-md mx-auto">
                                <div>
                                    <div className="rounded-2xl border border-border overflow-hidden bg-background p-3">
                                        <img
                                            src="/apple.jpeg"
                                            alt="App Store QR"
                                            className="w-full h-48 object-contain"
                                        />
                                    </div>
                                    <p className="mt-2 text-xs text-muted-foreground">iOS</p>
                                </div>
                                <div>
                                    <div className="rounded-2xl border border-border overflow-hidden bg-background p-3">
                                        <img
                                            src="/android.png"
                                            alt="Google Play QR"
                                            className="w-full h-48 object-contain"
                                        />
                                    </div>
                                    <p className="mt-2 text-xs text-muted-foreground">Android</p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default AppDownload;
