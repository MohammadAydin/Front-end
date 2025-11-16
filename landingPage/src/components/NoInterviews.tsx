import React from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Zap,
  Users,
  Shield,
  Clock,
  ArrowRight,
  CheckCircle,
  Rocket,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const NoInterviews = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  const features = [
    {
      icon: Rocket,
      title: t("noInterviews.feature1"),
      description: t("noInterviews.feature1Desc"),
      color: "from-primary to-primary-light",
    },
    {
      icon: Clock,
      title: t("noInterviews.feature2"),
      description: t("noInterviews.feature2Desc"),
      color: "from-accent to-accent-light",
    },
    {
      icon: Shield,
      title: t("noInterviews.feature3"),
      description: t("noInterviews.feature3Desc"),
      color: "from-success to-success-light",
    },
    {
      icon: Users,
      title: t("noInterviews.feature4"),
      description: t("noInterviews.feature4Desc"),
      color: "from-primary-dark to-primary",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      ref={ref}
      className="section-padding bg-gradient-to-br from-muted/30 to-background relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-6">
        <div className="absolute top-20 right-20 w-80 h-80 bg-gradient-primary rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-accent rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-success rounded-full blur-2xl opacity-25 animate-float"
          style={{ animationDelay: "3s" }}
        ></div>
      </div>

      <div className="container-wide relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center"
        >
          {/* Left Column - Content */}
          <motion.div variants={itemVariants}>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={
                isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
              }
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center space-x-2 bg-gradient-accent/10 border border-accent/20 rounded-full px-4 py-2 mb-6"
            >
              <Zap className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-accent">
                {t("noInterviews.stats")}
              </span>
            </motion.div>

            {/* Title */}
            <motion.h2
              variants={itemVariants}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6"
            >
              <span className="text-gradient-hero">
                {t("noInterviews.title")}
              </span>
            </motion.h2>

            {/* Subtitle */}
            <motion.h3
              variants={itemVariants}
              className="text-xl lg:text-2xl text-foreground mb-6"
            >
              {t("noInterviews.subtitle")}
            </motion.h3>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-lg text-muted-foreground mb-8 leading-relaxed"
            >
              {t("noInterviews.description")}
            </motion.p>

            {/* CTA Button */}
            <motion.div variants={itemVariants}>
              <motion.a
                href="https://employer.woundwann.de/login"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{
                  scale: 1.05,
                  y: -4,
                  boxShadow: "0 20px 40px rgba(248, 112, 12, 0.3)",
                }}
                whileTap={{ scale: 0.95 }}
                className="group relative overflow-hidden bg-gradient-to-r from-accent to-accent-light text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-strong hover:shadow-lifted transition-all duration-300 inline-flex items-center space-x-3"
              >
                {/* Animated Background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-accent-light to-accent"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                />

                {/* Content */}
                <div className="relative z-10 flex items-center">
                  <span className="font-bold">{t("noInterviews.cta")}</span>
                  <motion.div
                    className="ml-3"
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ArrowRight className="w-5 h-5" />
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
          </motion.div>

          {/* Right Column - Visual Elements */}
          <motion.div variants={itemVariants} className="relative">
            {/* Main Image Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
              animate={
                isInView
                  ? { opacity: 1, scale: 1, rotate: 0 }
                  : { opacity: 0, scale: 0.8, rotate: 5 }
              }
              transition={{ delay: 0.6, duration: 1, ease: "easeOut" }}
              className="relative"
            >
              {/* Professional Healthcare Image */}
              <div className="relative w-full h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/healthcare-professional.jpeg"
                  alt="Professional healthcare team working together"
                  className="w-full h-full object-cover"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>

              {/* Floating Feature Cards */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={
                  isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }
                }
                transition={{ delay: 1.4, duration: 0.8 }}
                className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-strong max-w-xs"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-success rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground text-sm">
                      No Interviews
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Instant placement
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: 2 + index * 0.1, duration: 0.6 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="card-elevated p-6 text-center group hover:shadow-lifted transition-all duration-300"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className={`w-14 h-14 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mx-auto mb-4 shadow-soft transition-all duration-300`}
              >
                <feature.icon className="w-7 h-7 text-white" />
              </motion.div>
              <h3 className="font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default NoInterviews;
