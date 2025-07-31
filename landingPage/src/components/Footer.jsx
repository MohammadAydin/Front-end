import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LogoGVP from "../assets/images/GvPLogo.png";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <div className="Footer">
      <div className="FooterAction">
        <div className="Links">
          <Link onClick={() => window.scrollTo(0, 0)} to={"/Impressum"}>
            {t("footer.impressum")}
          </Link>
          <Link
            onClick={() => window.scrollTo(0, 0)}
            to={"/Datenschutzerklärung"}
          >
            {t("footer.privacy")}
          </Link>
          <a href="https://personaldienstleister.de/">
            <img className="LogoGvP" src={LogoGVP} alt="" />
          </a>
        </div>

        <ul className="IconLinks">
          <a href="https://www.facebook.com/woundwann.job" target="_blank">
            <FaFacebookF size={20} />
          </a>
          <a
            target="_blank"
            href="https://www.instagram.com/woundwann.de?igsh=b3Jqc2d0cnR0dHJj"
          >
            <FaInstagram size={20} />
          </a>
          <a
            href="https://x.com/wo_wann2025?t=yNIU383daFD6gZogwaoNqg&s=08"
            target="_blank"
          >
            <FaXTwitter size={20} />
          </a>
        </ul>
      </div>
      <div>
        <hr />
      </div>
      <p>
        {t("footer.copyright")} <span>{t("footer.company")}</span>
      </p>
    </div>
  );
};

export default Footer;
