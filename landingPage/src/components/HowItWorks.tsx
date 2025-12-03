import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  MapPin,
  Clock,
  Calendar,
  CheckCircle,
  ArrowRight,
  Building2,
  Heart
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const HowItWorks = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  const nursingHomeSteps = [
    {
      icon: MapPin,
      title: t('howItWorks.step1Title'),
      description: t('howItWorks.step1Desc'),
      color: "from-primary to-primary-light"
    },
    {
      icon: Clock,
      title: t('howItWorks.step4Title'),
      description: t('howItWorks.step4Desc'),
      color: "from-primary-dark to-primary"
    }
  ];

  const caregiverSteps = [
    {
      icon: Heart,
      title: t('howItWorks.caregiver1Title'),
      description: t('howItWorks.caregiver1Desc'),
      color: "from-primary to-primary-light"
    },
    {
      icon: Calendar,
      title: t('howItWorks.caregiver2Title'),
      description: t('howItWorks.caregiver2Desc'),
      color: "from-accent to-accent-light"
    },
    {
      icon: CheckCircle,
      title: t('howItWorks.caregiver3Title'),
      description: t('howItWorks.caregiver3Desc'),
      color: "from-success to-success-light"
    },
    {
      icon: ArrowRight,
      title: t('howItWorks.caregiver4Title'),
      description: t('howItWorks.caregiver4Desc'),
      color: "from-primary-dark to-primary"
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

  const stepVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const StepCard = ({ step, index, delay = 0 }: { step: typeof nursingHomeSteps[0], index: number, delay?: number }) => (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ delay: delay + index * 0.2, duration: 0.8, ease: "easeOut" }}
      className="relative group"
    >
      <div className="card-feature relative overflow-hidden">
        <div className="flex items-start space-x-4">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className={`w-16 h-16 bg-gradient-to-r ${step.color} rounded-2xl flex items-center justify-center shadow-strong group-hover:shadow-lifted transition-all duration-300`}
          >
            <step.icon className="w-8 h-8 text-white" />
          </motion.div>
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-3">
              <span className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center text-white text-sm font-bold">
                {index + 1}
              </span>
              <h3 className="text-xl font-bold text-card-foreground group-hover:text-primary transition-colors duration-300">
                {step.title}
              </h3>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              {step.description}
            </p>
          </div>
        </div>

        {/* Connection Line */}
        {index < 1 && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ delay: delay + index * 0.2 + 0.5, duration: 0.6 }}
            className="absolute -bottom-6 left-8 w-0.5 h-12 bg-gradient-to-b from-primary to-transparent origin-top"
          />
        )}
      </div>
    </motion.div>
  );

  return (
    <section id="how-it-works" className="section-padding bg-gradient-to-br from-background to-muted/30 relative overflow-hidden">
      {/* Enhanced Background Elements with Blur */}
      <div className="absolute inset-0 opacity-8">
        <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-primary rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-accent rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-1/2 left-10 w-48 h-48 bg-gradient-success rounded-full blur-2xl opacity-30 animate-float" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute bottom-1/3 right-1/3 w-56 h-56 bg-gradient-primary rounded-full blur-2xl opacity-25 animate-pulse-slow" style={{ animationDelay: '3s' }}></div>
      </div>

      <div className="container-wide relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16 lg:mb-24"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-gradient-hero">{t('howItWorks.title')}</span>
          </h2>
          <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('howItWorks.subtitle')}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Nursing Homes Section */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <div className="text-center mb-12">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="inline-flex items-center space-x-3 bg-gradient-primary/10 border border-primary/20 rounded-full px-6 py-3 mb-6"
              >
                <Building2 className="w-6 h-6 text-primary" />
                <span className="text-lg font-semibold text-primary">{t('howItWorks.nursingHomes')}</span>
              </motion.div>
              <h3 className="text-2xl lg:text-3xl font-bold text-card-foreground mb-4">
                {t('howItWorks.nursingHomesTitle')}
              </h3>
              <p className="text-muted-foreground">
                {t('howItWorks.nursingHomesSubtitle')}
              </p>
            </div>

            <div className="space-y-8">
              {nursingHomeSteps.map((step, index) => (
                <StepCard key={step.title} step={step} index={index} delay={0} />
              ))}
            </div>
          </motion.div>

          {/* Caregivers Section */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <div className="text-center mb-12">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                className="inline-flex items-center space-x-3 bg-gradient-accent/10 border border-accent/20 rounded-full px-6 py-3 mb-6"
              >
                <Heart className="w-6 h-6 text-accent" />
                <span className="text-lg font-semibold text-accent">{t('howItWorks.caregivers')}</span>
              </motion.div>
              <h3 className="text-2xl lg:text-3xl font-bold text-card-foreground mb-4">
                {t('howItWorks.caregiversTitle')}
              </h3>
              <p className="text-muted-foreground">
                {t('howItWorks.caregiversSubtitle')}
              </p>
            </div>

            <div className="space-y-8">
              {caregiverSteps.map((step, index) => (
                <StepCard key={step.title} step={step} index={index} delay={0.4} />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.5, duration: 0.8, ease: "easeOut" }}
          className="text-center mt-16 lg:mt-24"
        >
          <h3 className="text-2xl font-bold text-card-foreground mb-6">
            {t('howItWorks.readyToStart')}
          </h3>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            {/* Start as Facility Button */}
            <motion.a
              href="https://employer.woundwann.de/login"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{
                scale: 1.05,
                y: -4,
                boxShadow: "0 20px 40px rgba(31, 47, 133, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
              className="group relative overflow-hidden bg-gradient-to-r from-primary to-primary-light text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-strong hover:shadow-lifted transition-all duration-300 min-w-[220px] inline-block text-center"
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
                  <Building2 className="w-6 h-6 mr-3" />
                </motion.div>
                <span className="font-bold">{t('howItWorks.startAsFacility')}</span>
              </div>

              {/* Shine Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.6 }}
              />
            </motion.a>

            {/* Start as Caregiver Button */}
            <motion.a
              href="https://user.woundwann.de/login"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{
                scale: 1.05,
                y: -4,
                boxShadow: "0 20px 40px rgba(248, 112, 12, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
              className="group relative overflow-hidden bg-gradient-to-r from-accent to-accent-light text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-strong hover:shadow-lifted transition-all duration-300 min-w-[220px] inline-block text-center"
            >
              {/* Animated Background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-accent-light to-accent"
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
                  <Heart className="w-6 h-6 mr-3" />
                </motion.div>
                <span className="font-bold">{t('howItWorks.startAsCaregiver')}</span>
              </div>

              {/* Shine Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.6 }}
              />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;