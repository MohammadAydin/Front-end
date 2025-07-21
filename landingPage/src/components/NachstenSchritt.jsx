import image1 from "../assets/images/SectionImage1.png";
import image2 from "../assets/images/SectionImage2.png";
import { useTranslation } from 'react-i18next';

const Schritt = ({ image, title, description, url }) => {
  const { t } = useTranslation();

  return (
    <div className="Schritt">
      <img src={image} alt="" />
      <h3>{title}</h3>
      <p>
        {description} <a href={url}>{t('common.brandName')}</a>
      </p>
    </div>
  );
};

const NachstenSchritt = () => {
  const { t } = useTranslation();

  return (
    <div className="NachstenSchritt">
      <Schritt
        image={image2}
        title={t('nextStep.caregiverTitle')}
        description={t('nextStep.caregiverDescription')}
        url={"https://user.woundwann.de/"}
      />
      <Schritt
        image={image1}
        title={t('nextStep.employerTitle')}
        description={t('nextStep.employerDescription')}
        url={"https://employer.woundwann.de/"}
      />
    </div>
  );
};

export default NachstenSchritt;
