import { Link as RouterLink } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

const SmallNavbar = ({ isOpen, setIsOpen }) => {
  const { t } = useTranslation();

  return (
    <>
      {isOpen && (
        <div className="SmallNavbar">
          <div className="navItem">
            <ul>
              <li>
                <RouterLink onClick={() => setIsOpen(false)} to={"/"}>
                  {t('nav.home')}
                </RouterLink>
              </li>
              <li>
                <ScrollLink
                  onClick={() => setIsOpen(false)}
                  to="Registrieren"
                  smooth={true}
                  duration={500}
                >
                  {t('nav.about')}
                </ScrollLink>
              </li>
              <li>
                <ScrollLink
                  onClick={() => setIsOpen(false)}
                  to="Contact"
                  smooth={true}
                  duration={500}
                >
                  {t('nav.contact')}
                </ScrollLink>
              </li>
            </ul>
            <LanguageSwitcher />
            <a className="SignInBtn" href="https://user.woundwann.de/">
              {t('nav.signIn')}
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default SmallNavbar;
