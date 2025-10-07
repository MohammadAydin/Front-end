import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
    Gift,
    Clock,
    Shield,
    CheckCircle,
    ArrowRight,
    Star,
    Zap,
    Users
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Registration = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const { t } = useLanguage();

    const features = [
        {
            icon: Zap,
            title: t('registration.feature1'),
            color: 'from-primary to-primary-light'
        },
        {
            icon: Gift,
            title: t('registration.feature2'),
            color: 'from-accent to-accent-light'
        },
        {
            icon: Clock,
            title: t('registration.feature3'),
            color: 'from-success to-success-light'
        },
        {
            icon: Shield,
            title: t('registration.feature4'),
            color: 'from-primary-dark to-primary'
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    return (
        <section className="relative py-16 lg:py-24 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5"></div>
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl"></div>

            <div ref={ref} className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="max-w-6xl mx-auto"
                >
                    {/* Main Registration Card */}
                    <motion.div
                        variants={itemVariants}
                        className="card-elevated bg-gradient-to-br from-primary/10 via-background to-accent/10 border border-primary/20 p-8 lg:p-12 rounded-3xl relative overflow-hidden"
                    >
                        {/* Decorative Elements */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-2xl"></div>
                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-accent/20 to-primary/20 rounded-full blur-2xl"></div>

                        <div className="relative z-10">
                            {/* Badge */}
                            <motion.div
                                variants={itemVariants}
                                className="inline-flex items-center space-x-2 bg-gradient-to-r from-accent to-accent-light text-white px-4 py-2 rounded-full text-sm font-semibold mb-6"
                            >
                                <Star className="w-4 h-4" />
                                <span>{t('registration.badge')}</span>
                            </motion.div>

                            {/* Title */}
                            <motion.h2
                                variants={itemVariants}
                                className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight"
                            >
                                <span className="text-gradient-hero">{t('registration.title')}</span>
                            </motion.h2>

                            {/* Subtitle */}
                            <motion.p
                                variants={itemVariants}
                                className="text-xl lg:text-2xl text-muted-foreground mb-8 max-w-4xl"
                            >
                                {t('registration.subtitle')}
                            </motion.p>

                            {/* Description */}
                            <motion.p
                                variants={itemVariants}
                                className="text-lg text-muted-foreground mb-8 max-w-3xl leading-relaxed"
                            >
                                {t('registration.description')}
                            </motion.p>

                            {/* Features Grid */}
                            <motion.div
                                variants={itemVariants}
                                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
                            >
                                {features.map((feature, index) => (
                                    <motion.div
                                        key={index}
                                        variants={itemVariants}
                                        whileHover={{ scale: 1.05, y: -5 }}
                                        className="card-elevated p-4 bg-background/80 backdrop-blur-sm border border-border/50 rounded-xl hover:border-primary/30 transition-all duration-300"
                                    >
                                        <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-3`}>
                                            <feature.icon className="w-6 h-6 text-white" />
                                        </div>
                                        <h4 className="font-semibold text-card-foreground text-sm">
                                            {feature.title}
                                        </h4>
                                    </motion.div>
                                ))}
                            </motion.div>

                            {/* CTA Buttons */}
                            <motion.div
                                variants={itemVariants}
                                className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6"
                            >
                                <motion.a
                                    href="https://user.woundwann.de/login"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{
                                        scale: 1.05,
                                        y: -4,
                                        boxShadow: "0 20px 40px rgba(31, 47, 133, 0.3)"
                                    }}
                                    whileTap={{ scale: 0.95 }}
                                    className="group relative overflow-hidden bg-gradient-to-r from-primary to-primary-light text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-strong hover:shadow-lifted transition-all duration-300 min-w-[200px] inline-block text-center"
                                >
                                    {/* Animated Background */}
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-r from-primary-light to-primary"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        whileHover={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.3 }}
                                    />

                                    {/* Content */}
                                    <div className="relative z-10 flex items-center justify-center">
                                        <motion.div
                                            whileHover={{ rotate: 360 }}
                                            transition={{ duration: 0.6 }}
                                        >
                                            <Gift className="w-6 h-6 mr-3" />
                                        </motion.div>
                                        <span className="font-bold">{t('registration.registerNow')}</span>
                                        <motion.div
                                            className="ml-3"
                                            whileHover={{ x: 4 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <ArrowRight className="w-6 h-6" />
                                        </motion.div>
                                    </div>

                                    {/* Shine Effect */}
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                                        initial={{ x: "-100%" }}
                                        whileHover={{ x: "100%" }}
                                        transition={{ duration: 0.6 }}
                                    />
                                </motion.a>

                                <motion.a
                                    href="#how-it-works"
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="btn-ghost text-lg px-6 py-4 rounded-2xl font-semibold transition-all duration-300 min-w-[160px] text-center"
                                >
                                    {t('registration.learnMore')}
                                </motion.a>
                            </motion.div>

                            {/* Bonus Highlight */}
                            <motion.div
                                variants={itemVariants}
                                className="mt-8 p-6 bg-gradient-to-r from-accent/20 to-primary/20 rounded-2xl border border-accent/30"
                            >
                                <div className="flex items-center justify-center space-x-3">
                                    <div className="w-12 h-12 bg-gradient-to-r from-accent to-accent-light rounded-xl flex items-center justify-center">
                                        <Gift className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="text-center">
                                        <h3 className="text-2xl font-bold text-accent">
                                            {t('registration.bonus')}
                                        </h3>
                                        <p className="text-sm text-muted-foreground mt-1">
                                            {t('registration.bonusFootnote')}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default Registration;
