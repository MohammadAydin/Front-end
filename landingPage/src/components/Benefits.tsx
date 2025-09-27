import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  Clock,
  Shield,
  Users,
  Star,
  TrendingUp,
  Calendar,
  MapPin,
  DollarSign,
  BarChart3,
  Award,
  FileText,
  Zap
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Benefits = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  const nursingHomeBenefits = [
    {
      icon: Clock,
      title: t('benefits.nursingHome1Title'),
      description: t('benefits.nursingHome1Desc'),
      highlight: t('benefits.nursingHome1Highlight')
    },
    {
      icon: Shield,
      title: t('benefits.nursingHome2Title'),
      description: t('benefits.nursingHome2Desc'),
      highlight: t('benefits.nursingHome2Highlight')
    },
    {
      icon: DollarSign,
      title: t('benefits.nursingHome3Title'),
      description: t('benefits.nursingHome3Desc'),
      highlight: t('benefits.nursingHome3Highlight')
    },
    {
      icon: BarChart3,
      title: t('benefits.nursingHome4Title'),
      description: t('benefits.nursingHome4Desc'),
      highlight: t('benefits.nursingHome4Highlight')
    },
    {
      icon: MapPin,
      title: t('benefits.nursingHome5Title'),
      description: t('benefits.nursingHome5Desc'),
      highlight: t('benefits.nursingHome5Highlight')
    },
    {
      icon: TrendingUp,
      title: t('benefits.nursingHome6Title'),
      description: t('benefits.nursingHome6Desc'),
      highlight: t('benefits.nursingHome6Highlight')
    }
  ];

  const caregiverBenefits = [
    {
      icon: Calendar,
      title: t('benefits.caregiver1Title'),
      description: t('benefits.caregiver1Desc'),
      highlight: t('benefits.caregiver1Highlight')
    },
    {
      icon: Star,
      title: t('benefits.caregiver2Title'),
      description: t('benefits.caregiver2Desc'),
      highlight: t('benefits.caregiver2Highlight')
    },
    {
      icon: FileText,
      title: t('benefits.caregiver3Title'),
      description: t('benefits.caregiver3Desc'),
      highlight: t('benefits.caregiver3Highlight')
    },
    {
      icon: DollarSign,
      title: t('benefits.caregiver4Title'),
      description: t('benefits.caregiver4Desc'),
      highlight: t('benefits.caregiver4Highlight')
    },
    {
      icon: Users,
      title: t('benefits.caregiver5Title'),
      description: t('benefits.caregiver5Desc'),
      highlight: t('benefits.caregiver5Highlight')
    },
    {
      icon: Award,
      title: t('benefits.caregiver6Title'),
      description: t('benefits.caregiver6Desc'),
      highlight: t('benefits.caregiver6Highlight')
    }
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

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const
      }
    }
  };

  const BenefitCard = ({ benefit, index, delay = 0 }: { benefit: typeof nursingHomeBenefits[0], index: number, delay?: number }) => (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{ delay: delay + index * 0.1 }}
      className="group"
    >
      <div className="card-elevated group-hover:shadow-lifted transition-all duration-500 h-full">
        <div className="flex items-start space-x-4">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="w-14 h-14 bg-gradient-primary rounded-xl flex items-center justify-center shadow-soft group-hover:shadow-strong transition-all duration-300 flex-shrink-0"
          >
            <benefit.icon className="w-7 h-7 text-white" />
          </motion.div>

          <div className="flex-1">
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-lg font-bold text-card-foreground group-hover:text-primary transition-colors duration-300">
                {benefit.title}
              </h3>
              <span className="text-xs font-medium text-success bg-success/10 px-2 py-1 rounded-full whitespace-nowrap ml-2">
                {benefit.highlight}
              </span>
            </div>

            <p className="text-muted-foreground text-sm leading-relaxed">
              {benefit.description}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <section id="benefits" className="section-padding bg-gradient-to-br from-muted/20 to-background relative overflow-hidden">
      {/* Enhanced Background Elements with Blur */}
      <div className="absolute inset-0 opacity-8">
        <div className="absolute top-32 left-10 w-96 h-96 bg-gradient-success rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-32 right-10 w-80 h-80 bg-gradient-accent rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-gradient-primary rounded-full blur-2xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-gradient-success rounded-full blur-2xl opacity-25 animate-pulse-slow" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="container-wide relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16 lg:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-gradient-hero">{t('benefits.title')}</span>
          </h2>
          <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('benefits.subtitle')}
          </p>
        </motion.div>

        <div className="space-y-16 lg:space-y-24">
          {/* Nursing Homes Benefits */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center space-x-3 bg-gradient-primary/10 border border-primary/20 rounded-full px-6 py-3 mb-6">
                <Shield className="w-6 h-6 text-primary" />
                <span className="text-lg font-semibold text-primary">{t('benefits.facilitiesTitle')}</span>
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold text-card-foreground mb-4">
                {t('benefits.facilitiesSubtitle')}
              </h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {t('benefits.facilitiesDesc')}
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
            >
              {nursingHomeBenefits.map((benefit, index) => (
                <BenefitCard key={benefit.title} benefit={benefit} index={index} delay={0} />
              ))}
            </motion.div>
          </div>

          {/* Divider */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
            transition={{ delay: 0.8, duration: 1, ease: "easeOut" }}
            className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent"
          />

          {/* Caregivers Benefits */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center space-x-3 bg-gradient-accent/10 border border-accent/20 rounded-full px-6 py-3 mb-6">
                <Users className="w-6 h-6 text-accent" />
                <span className="text-lg font-semibold text-accent">{t('benefits.caregiversTitle')}</span>
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold text-card-foreground mb-4">
                {t('benefits.caregiversSubtitle')}
              </h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {t('benefits.caregiversDesc')}
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
            >
              {caregiverBenefits.map((benefit, index) => (
                <BenefitCard key={benefit.title} benefit={benefit} index={index} delay={0.5} />
              ))}
            </motion.div>
          </div>
        </div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.5, duration: 0.8, ease: "easeOut" }}
          className="mt-16 lg:mt-24"
        >
          <div className="bg-gradient-primary rounded-3xl p-8 lg:p-12 text-center">
            <h3 className="text-2xl lg:text-3xl font-bold text-white mb-8">
              {t('benefits.trust')}
            </h3>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { value: "5,000+", label: t('benefits.activeCaregivers'), icon: Users },
                { value: "500+", label: t('benefits.partnerFacilities'), icon: Shield },
                { value: "98%", label: t('benefits.satisfactionRate'), icon: Star },
                { value: "24/7", label: t('benefits.availability'), icon: Clock }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 1.8 + index * 0.1, duration: 0.6 }}
                  className="text-white"
                >
                  <stat.icon className="w-8 h-8 mx-auto mb-3 opacity-80" />
                  <div className="text-3xl lg:text-4xl font-bold mb-2">{stat.value}</div>
                  <div className="text-sm lg:text-base opacity-90">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Benefits;