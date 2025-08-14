import { useTranslation } from "react-i18next";
import imgLearn from "../assets/images/Learn.jpg";
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
      <h2>{t("features.title")}</h2>
      <div className="flex justify-center mt-2.5">
      <img className="imgLearn" src={imgLearn} alt="" />
      </div>
      <div className="FeaturesList">
        {featureList?.map((feature, index) => (
          <div key={index} className="Feature">
            <div>
              <span>0{index + 1}</span>
              <h4>{feature.title}</h4>
            </div>
            <p>{feature.des}</p>
            {feature.itemsList.map((item, itemIndex) => (
              <div key={itemIndex} className="list-item">
                <span className="index">0{itemIndex + 1}.</span>
                <p>{item}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
