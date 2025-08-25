import { IoPersonAddSharp } from "react-icons/io5";
import { IoIosCheckmarkCircle, IoMdTrophy } from "react-icons/io";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const HowItWork = () => {
  const { t } = useTranslation();

  const stepsList = t("howItWorks.steps", { returnObjects: true });

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
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.6 }}
      >
        {t("howItWorks.title")}
      </motion.h2>

      <div className="HowItWorkList">
        {List.map((item, index) => (
          <motion.div
            key={index}
            className="HowItWorkListItem"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ delay: 0.4 + index * 0.3, duration: 0.6 }}
          >
            <span>{item.icon}</span>
            <h4>{item.title}</h4>
            <p>{item.des}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default HowItWork;
