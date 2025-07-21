import { IoPersonAddSharp } from "react-icons/io5";
import { IoIosCheckmarkCircle, IoMdTrophy } from "react-icons/io";
import { useTranslation } from 'react-i18next';

const HowItWork = () => {
  const { t } = useTranslation();

  const stepsList = t('howItWorks.steps', { returnObjects: true });

  const List = [
    {
      icon: <IoPersonAddSharp size={40} />,
      title: stepsList[0].title,
      des: stepsList[0].description,
    },
    {
      icon: <IoIosCheckmarkCircle size={40} />,
      title: stepsList[1].title,
      des: stepsList[1].description,
    },
    {
      icon: <IoMdTrophy size={40} />,
      title: stepsList[2].title,
      des: stepsList[2].description,
    },
  ];

  return (
    <div className="HowItWork">
      <h2>{t('howItWorks.title')}</h2>
      <div className="HowItWorkList">
        {List.map((item, index) => (
          <div key={index} className="HowItWorkListItem">
            <span>{item.icon}</span>
            <h4>{item.title}</h4>
            <p>{item.des}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWork;
