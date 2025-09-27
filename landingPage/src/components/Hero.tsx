import { motion } from 'framer-motion';
import { ArrowRight, Shield, MapPin, Users, CheckCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Hero = () => {
  const { t } = useLanguage();


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
        duration: 0.8,
        ease: "easeOut" as const
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut" as const
      }
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-muted/30 to-background pt-20 lg:pt-24">
      {/* Enhanced Background Pattern with Blur Effects */}
      <div className="absolute inset-0 opacity-15">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-primary rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-accent rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-success rounded-full blur-3xl opacity-25"></div>

        {/* Additional Blur Elements */}
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-gradient-primary rounded-full blur-2xl opacity-20 animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-gradient-accent rounded-full blur-2xl opacity-15 animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container-wide relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center"
        >
          {/* Left Column - Main Content */}
          <div className="text-center lg:text-left">
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center space-x-2 bg-gradient-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6"
            >
              <Shield className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">{t('hero.badge')}</span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display font-bold leading-tight mb-6"
            >
              <span className="text-gradient-hero">{t('hero.title1')}</span>
              <br />
              <span className="text-foreground">{t('hero.title2')}</span>
              <br />
              <span className="text-foreground">{t('hero.title3')}</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg lg:text-xl text-muted-foreground mb-8 lg:mb-10 max-w-2xl mx-auto lg:mx-0"
            >
              {t('hero.subtitle')}
            </motion.p>

            {/* Enhanced Split CTAs */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start mb-12"
            >
              {/* Find Staff Button */}
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
                className="group relative overflow-hidden bg-gradient-to-r from-primary to-primary-light text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-strong hover:shadow-lifted transition-all duration-300 min-w-[200px] inline-block text-center"
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
                    <MapPin className="w-6 h-6 mr-3" />
                  </motion.div>
                  <span className="font-bold">{t('hero.findStaff')}</span>
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

              {/* Find Work Button */}
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
                className="group relative overflow-hidden bg-gradient-to-r from-accent to-accent-light text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-strong hover:shadow-lifted transition-all duration-300 min-w-[200px] inline-block text-center"
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
                    <Users className="w-6 h-6 mr-3" />
                  </motion.div>
                  <span className="font-bold">{t('hero.findWork')}</span>
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
            </motion.div>

          </div>

          {/* Right Column - Visual Elements */}
          <div className="relative">
            <motion.div
              variants={floatingVariants}
              animate="animate"
              className="relative"
            >
              {/* Main Card - Nursing Home */}
              <motion.div
                initial={{ opacity: 0, x: 50, rotate: 5 }}
                animate={{ opacity: 1, x: 0, rotate: 0 }}
                transition={{ delay: 0.8, duration: 1, ease: "easeOut" }}
                className="card-elevated max-w-xs sm:max-w-sm mx-auto lg:mx-0 lg:ml-auto bg-gradient-to-br from-card to-muted/50 mb-8 sm:mb-12"
              >
                <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
                    <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-card-foreground text-sm sm:text-base">{t('hero.facilityName')}</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">{t('hero.location')}</p>
                  </div>
                </div>
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs sm:text-sm text-muted-foreground">{t('hero.needs')}</span>
                    <span className="text-xs sm:text-sm font-medium">{t('hero.caregivers')}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs sm:text-sm text-muted-foreground">{t('hero.shift')}</span>
                    <span className="text-xs sm:text-sm font-medium">{t('hero.nightShift')}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs sm:text-sm text-muted-foreground">{t('hero.time')}</span>
                    <span className="text-xs sm:text-sm font-medium text-success">{t('hero.inMinutes')}</span>
                  </div>
                  <button className="btn-success w-full text-xs sm:text-sm py-2 sm:py-3">
                    <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                    {t('hero.staffFound')}
                  </button>
                </div>
              </motion.div>

              {/* Floating Elements */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="absolute -top-4 sm:-top-6 -left-4 sm:-left-6 bg-success text-success-foreground px-2 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium shadow-strong"
              >
                {t('hero.available')}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.4, duration: 0.8 }}
                className="absolute -bottom-2 sm:-bottom-4 -right-2 sm:-right-4 bg-accent text-accent-foreground px-2 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium shadow-strong"
              >
                {t('hero.fixedPrices')}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.6, duration: 0.8 }}
                className="absolute top-1/2 -right-4 sm:-right-8 bg-primary text-primary-foreground px-2 sm:px-3 py-1 rounded-full text-xs font-medium shadow-strong"
              >
                {t('hero.verified')}
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-2 bg-muted-foreground/50 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;