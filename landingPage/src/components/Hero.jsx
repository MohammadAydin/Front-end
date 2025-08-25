import image from "../assets/images/HeroImage.png";
import { HiDownload, HiOutlineSearch } from "react-icons/hi";
import { useTranslation } from "react-i18next";
import { FaApple } from "react-icons/fa";
import imgGooglePlay from "../assets/images/GooglePlay.png";
import { FaAndroid } from "react-icons/fa";
import { motion } from "framer-motion";

const Hero = () => {
  const containerVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      rotate: -5,
      y: 50,
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      y: 0,
      transition: {
        duration: 1,
        ease: [0.25, 0.1, 0.25, 1], 
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
    hover: {
      scale: 1.05,
      boxShadow: "0px 8px 20px rgba(0,0,0,0.2)",
      transition: { duration: 0.3 },
    },
    tap: { scale: 0.95 },
  };

  const { t } = useTranslation();

  return (
    <div className="Hero">
      <div>
        <h1>
          {t("hero.title")}
          <span> {t("common.brandName")}</span>
        </h1>
        <h2>{t("hero.subtitle")}</h2>
        <div className="HeroActions">
          <h2 className="h2">
            <span>Wo&Wann</span> App laden
          </h2>
          <div className="HeroActions-download">
            <a href="https://apps.apple.com/us/app/wowann/id6741417892">
              <motion.div
                className="apple-download"
                variants={buttonVariants}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                whileTap="tap"
                viewport={{ once: true, amount: 0.6 }}
              >
                <FaApple className="iconApple" />
                <div className="textapple">
                  <span className="textAppleSpan">Laden im</span>
                  <p className="textAppleP">App Store</p>
                </div>
              </motion.div>
            </a>
            <a href="https://play.google.com/store/apps/details?id=com.w.wowann">
              <motion.div
                className="GooglePlay-download"
                variants={buttonVariants}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                whileTap="tap"
                viewport={{ once: true, amount: 0.6 }}
              >
                <img className="iconGooglePlay" src={imgGooglePlay} alt="" />
                <div className="textaGoogle">
                  <span className="textGooglePlaySpan ">JETEZT BEI</span>
                  <p className="textGooglePlayP">Google Play</p>
                </div>
              </motion.div>
            </a>
          </div>
        </div>
      </div>
      <motion.img
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.7 }}
        src={image}
        alt=""
      />
    </div>
  );
};

export default Hero;
