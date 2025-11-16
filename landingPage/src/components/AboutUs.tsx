import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Building2, Users, Clock, Shield } from "lucide-react";
import { motion } from "framer-motion";
import logoHorizontal from "@/assets/logo-horizontal.png";

const AboutUs = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: Building2,
      title: t("about.feature1.title"),
      description: t("about.feature1.description"),
      color: "primary",
    },
    {
      icon: Users,
      title: t("about.feature2.title"),
      description: t("about.feature2.description"),
      color: "accent",
    },
    {
      icon: Clock,
      title: t("about.feature3.title"),
      description: t("about.feature3.description"),
      color: "success",
    },
    {
      icon: Shield,
      title: t("about.feature4.title"),
      description: t("about.feature4.description"),
      color: "primary",
    },
  ];

  const certifications = [
    {
      name: "GVP",
      title: "GVP Mitglied",
      description: "Tarifgebundenes Mitglied",
      color: "primary",
      href: "https://woundwann.s3.eu-central-1.amazonaws.com/company/2025-04-01_GVP-Mitgliedsurkunde.pdf",
    },
    {
      name: "AÜG",
      title: "Bundesagentur",
      description: "Erlaubnis zur Arbeitnehmerüberlassung",
      color: "accent",
      href: "https://woundwann.s3.eu-central-1.amazonaws.com/company/Erlaubnis+2025.pdf",
    },
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case "primary":
        return {
          bg: "bg-gradient-primary",
          text: "text-primary",
          border: "border-primary/20",
          light: "bg-primary/10",
          hover: "hover:border-primary/30",
        };
      case "success":
        return {
          bg: "bg-gradient-success",
          text: "text-success",
          border: "border-success/20",
          light: "bg-success/10",
          hover: "hover:border-success/30",
        };
      case "accent":
        return {
          bg: "bg-gradient-accent",
          text: "text-accent",
          border: "border-accent/20",
          light: "bg-accent/10",
          hover: "hover:border-accent/30",
        };
      default:
        return {
          bg: "bg-gradient-primary",
          text: "text-primary",
          border: "border-primary/20",
          light: "bg-primary/10",
          hover: "hover:border-primary/30",
        };
    }
  };

  return (
    <section id="about" className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              <span className="text-gradient-hero">{t("about.title")}</span>
            </h2>
            <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto">
              {t("about.subtitle")}
            </p>
          </motion.div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="prose prose-lg max-w-none">
                <p className="text-lg leading-relaxed text-muted-foreground mb-6">
                  {t("about.description1")}
                </p>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  {t("about.description2")}
                </p>
              </div>
            </motion.div>

            {/* Animated Logo */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="relative flex items-center justify-center"
            >
              <div className="relative">
                {/* Background Glow Effect */}
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-success/20 rounded-full blur-xl"
                />

                {/* Logo */}
                <motion.img
                  src={logoHorizontal}
                  alt={t("alt.logo")}
                  className="w-64 h-auto object-contain relative z-10"
                  whileHover={{
                    scale: 1.05,
                    rotate: [0, -2, 2, 0],
                  }}
                  transition={{
                    scale: { duration: 0.3 },
                    rotate: { duration: 0.6, ease: "easeInOut" },
                  }}
                  animate={{
                    y: [0, -5, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                {/* Floating Elements */}
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 5, 0],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center z-20"
                >
                  <Building2 className="w-3 h-3 text-primary" />
                </motion.div>

                <motion.div
                  animate={{
                    y: [0, 10, 0],
                    rotate: [0, -5, 0],
                  }}
                  transition={{
                    duration: 4.4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2,
                  }}
                  className="absolute -bottom-2 -left-2 w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center z-20"
                >
                  <Users className="w-3 h-3 text-accent" />
                </motion.div>

                <motion.div
                  animate={{
                    y: [0, -8, 0],
                    rotate: [0, 3, 0],
                  }}
                  transition={{
                    duration: 3.6,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 3,
                  }}
                  className="absolute top-1/2 -right-4 w-6 h-6 bg-success/20 rounded-full flex items-center justify-center z-20"
                >
                  <Clock className="w-3 h-3 text-success" />
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Features Circles */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12"
          >
            {features.map((feature, index) => {
              const colors = getColorClasses(feature.color);
              const IconComponent = feature.icon;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center text-center group"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                    className={`relative w-24 h-24 lg:w-28 lg:h-28 rounded-full ${colors.bg} ${colors.border} border-2 flex items-center justify-center mb-4 group-hover:shadow-lg transition-all duration-300`}
                  >
                    <IconComponent
                      className={`w-8 h-8 lg:w-10 lg:h-10 text-white`}
                    />
                    <div
                      className={`absolute inset-0 rounded-full ${colors.light} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                    ></div>
                  </motion.div>
                  <h3 className={`text-lg font-semibold mb-2 ${colors.text}`}>
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-32">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Certifications Circles */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-8 lg:gap-12 mt-16 max-w-2xl mx-auto"
          >
            {certifications.map((cert, index) => {
              const colors = getColorClasses(cert.color);

              return (
                <motion.a
                  key={index}
                  href={cert.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 1.4 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center text-center group cursor-pointer"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                    className={`relative w-24 h-24 lg:w-28 lg:h-28 rounded-full ${colors.bg} ${colors.border} border-2 flex items-center justify-center mb-4 group-hover:shadow-lg transition-all duration-300`}
                  >
                    <span className="text-white font-bold text-xl lg:text-2xl">
                      {cert.name}
                    </span>
                    <div
                      className={`absolute inset-0 rounded-full ${colors.light} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                    ></div>
                  </motion.div>
                  <h3 className={`text-lg font-semibold mb-2 ${colors.text}`}>
                    {cert.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-40">
                    {cert.description}
                  </p>
                </motion.a>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
