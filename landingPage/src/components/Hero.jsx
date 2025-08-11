import image from "../assets/images/HeroImage.png";
import { HiDownload, HiOutlineSearch } from "react-icons/hi";
import { useTranslation } from "react-i18next";
import { FaApple } from "react-icons/fa";
import imgGooglePlay from "../assets/images/GooglePlay.png";
import { FaAndroid } from "react-icons/fa";

const Hero = () => {
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
              <div className="apple-download">
                <FaApple className="iconApple" />
                <div className="textapple">
                  <span className="textAppleSpan">Laden im</span>
                  <p className="textAppleP">App Store</p>
                </div>
                <p className="soonApple">Coming Soon ..</p>
              </div>
            <a href="https://play.google.com/store/apps/details?id=com.w.wowann">
              <div className="GooglePlay-download">
                <img className="iconGooglePlay" src={imgGooglePlay} alt="" />
                <div className="textaGoogle">
                  <span className="textGooglePlaySpan">JETEZT BEI</span>
                  <p className="textGooglePlayP">Google Play</p>
                </div>
              </div>
            </a>

            {/* <button className="LearnMoreBtn">
              <HiOutlineSearch /> {t("hero.learnMore")}
            </button> */}
          </div>
        </div>
      </div>
      <img src={image} alt="" />
    </div>
  );
};

export default Hero;
