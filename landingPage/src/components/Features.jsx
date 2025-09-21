import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { 
  FaMobileAlt, 
  FaHospital, 
  FaClock, 
  FaCalculator, 
  FaMoneyBillWave
} from "react-icons/fa";

const Features = () => {
  const { t } = useTranslation();

  const steps = t("features.steps", { returnObjects: true });
  const icons = [FaMobileAlt, FaHospital, FaClock, FaCalculator, FaMoneyBillWave];
  const colors = ["#20438e", "#f47621", "#20438e", "#f47621", "#20438e"];

  const stepsWithIcons = steps.map((step, index) => ({
    ...step,
    icon: icons[index],
    color: colors[index]
  }));

  return (
    <div className="Features">
      <motion.h2
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.6 }}
      >
        {t("features.title")}
      </motion.h2>

      <motion.h3
        className="features-subtitle"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
        viewport={{ once: true, amount: 0.6 }}
      >
        {t("features.subtitle")}
      </motion.h3>

      <div className="features-grid">
        {stepsWithIcons.map((step, index) => {
          const IconComponent = step.icon;
          return (
            <motion.div
              key={index}
              className="feature-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.6, 
                ease: "easeOut", 
                delay: 0.1 * index 
              }}
              viewport={{ once: true, amount: 0.3 }}
              whileHover={{ 
                y: -10,
                boxShadow: "0 20px 40px rgba(32, 67, 142, 0.15)"
              }}
            >
              <div className="card-number">{index + 1}</div>
              <div 
                className="card-icon"
                style={{ color: step.color }}
              >
                <IconComponent />
              </div>
              <div className="card-content">
                <h4>{step.title}</h4>
                <p>{step.description}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="FeaturesList">
        {[
          {
            title: t("features.userBenefits.title"),
            des: t("features.userBenefits.description"),
            itemsList: t("features.userBenefits.items", { returnObjects: true }),
          },
          {
            title: t("features.elderlyHomeBenefits.title"),
            des: t("features.elderlyHomeBenefits.description"),
            itemsList: t("features.elderlyHomeBenefits.items", {
              returnObjects: true,
            }),
          },
        ].map((feature, index) => (
          <motion.div
            key={index}
            className="Feature"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: index * 0.4 }}
            viewport={{ once: true, amount: 0.4 }}
          >
            <div>
              <span>0{index + 1}</span>
              <h4>{feature.title}</h4>
            </div>
            <p>{feature.des}</p>

            {feature.itemsList.map((item, itemIndex) => (
              <motion.div
                key={itemIndex}
                className="list-item"
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.6,
                  ease: "easeOut",
                  delay: index * 0.4 + itemIndex * 0.2,
                }}
                viewport={{ once: true, amount: 0.4 }}
              >
                <span className="index">0{itemIndex + 1}.</span>
                <p>{item}</p>
              </motion.div>
            ))}
          </motion.div>
        ))}
      </div>

    </div>
  );
};

export default Features;
