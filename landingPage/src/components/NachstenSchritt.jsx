import image1 from "../assets/images/SectionImage1.png";
import image2 from "../assets/images/SectionImage2.png";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const itemVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const Schritt = ({ image, title, description, url }) => {
  const { t } = useTranslation();

  return (
    <motion.div
      className="Schritt"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      transition={{ staggerChildren: 0.3 }}
    >
      <motion.img src={image} alt="" variants={itemVariant} />
      <motion.h3 variants={itemVariant}>{title}</motion.h3>
      <motion.p variants={itemVariant}>
        {description} <a href={url}>{t("common.brandName")}</a>
      </motion.p>
    </motion.div>
  );
};

const NachstenSchritt = () => {
  const { t } = useTranslation();

  return (
    <motion.div
      className="NachstenSchritt"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      transition={{ staggerChildren: 0.4 }}
    >
      <Schritt
        image={image2}
        title={t("nextStep.caregiverTitle")}
        description={t("nextStep.caregiverDescription")}
        url={"https://user.woundwann.de/"}
      />
      <Schritt
        image={image1}
        title={t("nextStep.employerTitle")}
        description={t("nextStep.employerDescription")}
        url={"https://employer.woundwann.de/"}
      />
    </motion.div>
  );
};

export default NachstenSchritt;
