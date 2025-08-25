import { Link, Link as RouterLink } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import logo from "../assets/images/Logo.svg";
import { HiOutlineViewList } from "react-icons/hi";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";
import { motion } from "framer-motion";
const Navbar = ({ isOpen, setIsOpen }) => {
  const { t } = useTranslation();

  return (
    <header>
      <div className="Navbar">
        <motion.div
          className="logo-container z-20"
          style={{ display: "inline-block", cursor: "pointer" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <motion.img
            src="https://woundwann.s3.eu-central-1.amazonaws.com/company/logos/logo_de_h_.png"
            alt="logo"
            drag
          />
        </motion.div>

        <div>
          <ul>
            <li>
              <RouterLink to={"/"}>{t("nav.home")}</RouterLink>
            </li>
            <li>
              <ScrollLink to="Registrieren" smooth={true} duration={500}>
                {t("nav.about")}
              </ScrollLink>
            </li>
            <li>
              <ScrollLink to="Contact" smooth={true} duration={500}>
                {t("nav.contact")}
              </ScrollLink>
            </li>
          </ul>
          <LanguageSwitcher />
          <a className="SignInBtn" href="https://user.woundwann.de/">
            {t("nav.signIn")}
          </a>
        </div>
        <div onClick={() => setIsOpen(!isOpen)} className="NavIcon">
          <HiOutlineViewList size={40} />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
