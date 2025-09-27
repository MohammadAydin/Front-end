import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import {
    Star,
    Quote,
    Building2,
    Heart,
    ChevronLeft,
    ChevronRight,
    User,
    MapPin
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Testimonials = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const { t } = useLanguage();
    const [activeTab, setActiveTab] = useState<'facilities' | 'caregivers'>('facilities');

    const facilityTestimonials = [
        {
            name: t('testimonials.facility1Name'),
            role: t('testimonials.facility1Role'),
            company: t('testimonials.facility1Company'),
            text: t('testimonials.facility1Text'),
            rating: t('testimonials.facility1Rating'),
            avatar: '👩‍⚕️'
        },
        {
            name: t('testimonials.facility2Name'),
            role: t('testimonials.facility2Role'),
            company: t('testimonials.facility2Company'),
            text: t('testimonials.facility2Text'),
            rating: t('testimonials.facility2Rating'),
            avatar: '👨‍💼'
        },
        {
            name: t('testimonials.facility3Name'),
            role: t('testimonials.facility3Role'),
            company: t('testimonials.facility3Company'),
            text: t('testimonials.facility3Text'),
            rating: t('testimonials.facility3Rating'),
            avatar: '👩‍⚕️'
        }
    ];

    const caregiverTestimonials = [
        {
            name: t('testimonials.caregiver1Name'),
            role: t('testimonials.caregiver1Role'),
            location: t('testimonials.caregiver1Location'),
            text: t('testimonials.caregiver1Text'),
            rating: t('testimonials.caregiver1Rating'),
            avatar: '👩‍⚕️'
        },
        {
            name: t('testimonials.caregiver2Name'),
            role: t('testimonials.caregiver2Role'),
            location: t('testimonials.caregiver2Location'),
            text: t('testimonials.caregiver2Text'),
            rating: t('testimonials.caregiver2Rating'),
            avatar: '👨‍⚕️'
        },
        {
            name: t('testimonials.caregiver3Name'),
            role: t('testimonials.caregiver3Role'),
            location: t('testimonials.caregiver3Location'),
            text: t('testimonials.caregiver3Text'),
            rating: t('testimonials.caregiver3Rating'),
            avatar: '👩‍⚕️'
        }
    ];

    const currentTestimonials = activeTab === 'facilities' ? facilityTestimonials : caregiverTestimonials;

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
        hidden: { opacity: 0, y: 30, scale: 0.95 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    const TestimonialCard = ({ testimonial, index }: { testimonial: typeof facilityTestimonials[0], index: number }) => (
        <motion.div
            variants={itemVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ delay: index * 0.1 }}
            className="group"
        >
            <div className="card-elevated h-full group-hover:shadow-lifted transition-all duration-500 relative overflow-hidden">
                {/* Quote Icon */}
                <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                    <Quote className="w-12 h-12 text-primary" />
                </div>

                {/* Rating Stars */}
                <div className="flex items-center space-x-1 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-5 h-5 fill-primary text-primary" />
                    ))}
                    <span className="ml-2 text-sm font-medium text-muted-foreground">
                        {testimonial.rating}
                    </span>
                </div>

                {/* Testimonial Text */}
                <blockquote className="text-muted-foreground leading-relaxed mb-6 relative z-10">
                    "{testimonial.text}"
                </blockquote>

                {/* Author Info */}
                <div className="flex items-center space-x-4 relative z-10">
                    <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-2xl">
                        {testimonial.avatar}
                    </div>
                    <div className="flex-1">
                        <h4 className="font-semibold text-card-foreground group-hover:text-primary transition-colors duration-300">
                            {testimonial.name}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                            {testimonial.role}
                        </p>
                        {testimonial.company && (
                            <p className="text-sm font-medium text-primary">
                                {testimonial.company}
                            </p>
                        )}
                        {testimonial.location && (
                            <div className="flex items-center space-x-1 mt-1">
                                <MapPin className="w-3 h-3 text-muted-foreground" />
                                <p className="text-xs text-muted-foreground">
                                    {testimonial.location}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );

    return (
        <section id="testimonials" className="section-padding bg-gradient-to-br from-background to-muted/20 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 opacity-8">
                <div className="absolute top-20 left-10 w-80 h-80 bg-gradient-primary rounded-full blur-3xl animate-pulse-slow"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-accent rounded-full blur-3xl animate-float"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-success rounded-full blur-2xl opacity-30 animate-float" style={{ animationDelay: '2s' }}></div>
            </div>

            <div className="container-wide relative z-10" ref={ref}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-center mb-16 lg:mb-20"
                >
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
                        <span className="text-gradient-hero">{t('testimonials.title')}</span>
                    </h2>
                    <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto">
                        {t('testimonials.subtitle')}
                    </p>
                </motion.div>

                {/* Tab Navigation */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="flex justify-center mb-12"
                >
                    <div className="bg-muted/50 rounded-2xl p-2 inline-flex">
                        <motion.button
                            onClick={() => setActiveTab('facilities')}
                            className={`relative px-8 py-4 rounded-xl font-medium transition-all duration-300 ${activeTab === 'facilities'
                                ? 'text-primary-foreground'
                                : 'text-muted-foreground hover:text-foreground'
                                }`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            {activeTab === 'facilities' && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute inset-0 bg-gradient-primary rounded-xl"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                            <div className="relative flex items-center space-x-3">
                                <Building2 className="w-5 h-5" />
                                <span>{t('testimonials.facilitiesTitle')}</span>
                            </div>
                        </motion.button>

                        <motion.button
                            onClick={() => setActiveTab('caregivers')}
                            className={`relative px-8 py-4 rounded-xl font-medium transition-all duration-300 ${activeTab === 'caregivers'
                                ? 'text-primary-foreground'
                                : 'text-muted-foreground hover:text-foreground'
                                }`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            {activeTab === 'caregivers' && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute inset-0 bg-gradient-accent rounded-xl"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                            <div className="relative flex items-center space-x-3">
                                <Heart className="w-5 h-5" />
                                <span>{t('testimonials.caregiversTitle')}</span>
                            </div>
                        </motion.button>
                    </div>
                </motion.div>

                {/* Testimonials Grid */}
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {currentTestimonials.map((testimonial, index) => (
                        <TestimonialCard key={`${activeTab}-${index}`} testimonial={testimonial} index={index} />
                    ))}
                </motion.div>

            </div>
        </section>
    );
};

export default Testimonials;
