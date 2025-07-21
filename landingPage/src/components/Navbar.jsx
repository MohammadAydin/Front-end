import { Link as RouterLink } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import logo from "../assets/images/Logo.svg";
import { HiOutlineViewList } from "react-icons/hi";
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

const Navbar = ({ isOpen, setIsOpen }) => {
  const { t } = useTranslation();

  return (
    <header>
      <div className="Navbar">
        <RouterLink to={"https://woundwann.s3.eu-central-1.amazonaws.com/company/logos/logo_de_h_.png"}>
          <img
            className=""
            src="https://woundwann.s3.eu-central-1.amazonaws.com/company/logos/logo_de_h_.png"
            alt="logo"
          />
        </RouterLink>
        <div>
          <ul>
            <li>
              <RouterLink to={"/"}>{t('nav.home')}</RouterLink>
            </li>
            <li>
              <ScrollLink to="Registrieren" smooth={true} duration={500}>
                {t('nav.about')}
              </ScrollLink>
            </li>
            <li>
              <ScrollLink to="Contact" smooth={true} duration={500}>
                {t('nav.contact')}
              </ScrollLink>
            </li>
          </ul>
          <LanguageSwitcher />
          <a className="SignInBtn" href="https://user.woundwann.de/">
            {t('nav.signIn')}
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
