import image from "../assets/images/registrierenImage.png";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const Registrieren = () => {
  const { t } = useTranslation();

  return (
    <div className="Registrieren">
      <motion.h2
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.6 }}
      >
        {t("register.title")}
      </motion.h2>

      <div>
        <motion.img
          src={image}
          alt=""
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          viewport={{ once: true, amount: 0.6 }}
        />
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
          viewport={{ once: true, amount: 0.6 }}
        >
          {t("register.description")}
        </motion.p>
      </div>
    </div>
  );
};

export default Registrieren;
