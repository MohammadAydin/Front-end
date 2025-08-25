import { useTranslation } from "react-i18next";
import imgLearn from "../assets/images/Learn.jpg";
import { motion } from "framer-motion";

const Features = () => {
  const { t } = useTranslation();

  const featureList = [
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
  ];

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

      <div className="flex justify-center mt-2.5">
        <motion.img
          className="imgLearn"
          src={imgLearn}
          alt=""
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          viewport={{ once: true, amount: 0.6 }}
        />
      </div>

      <div className="FeaturesList">
        {featureList?.map((feature, index) => (
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
