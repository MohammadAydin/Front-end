import image from "../assets/images/HeroImage.png";
import { HiDownload, HiOutlineSearch } from "react-icons/hi";
import { useTranslation } from "react-i18next";

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
          <a href="https://play.google.com/store/apps/details?id=com.w.wowann">
            <button className="DownloadBtn">
              <HiDownload /> Herunterladen
              <HiDownload /> {t("hero.download")}
            </button>
          </a>
          <button className="LearnMoreBtn">
            <HiOutlineSearch /> {t("hero.learnMore")}
          </button>
        </div>
      </div>
      <img src={image} alt="" />
    </div>
  );
};

export default Hero;
