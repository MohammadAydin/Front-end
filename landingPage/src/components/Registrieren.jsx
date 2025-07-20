import image from "../assets/images/registrierenImage.png";
import { useTranslation } from 'react-i18next';

const Registrieren = () => {
  const { t } = useTranslation();

  return (
    <div className="Registrieren">
      <h2>{t('register.title')}</h2>
      <div>
        <img src={image} alt="" />
        <p>
          {t('register.description')}
        </p>
      </div>
    </div>
  );
};

export default Registrieren;
