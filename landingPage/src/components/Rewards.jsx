import React from "react";
import money from "../assets/images/editmoneypng.png";
import { IoRocket } from "react-icons/io5";
import { motion } from "framer-motion";
import euro from "../assets/images/euro.jpg";

const Rewards = () => {
  const containerVariants = {
    hidden: {
      opacity: 0,
      y: -250,
    },
    visible: {
      opacity: 1,
      y: -10,
      transition: {
        delay: 0.4,
        duration: 0.5,
        type: "spring",
        stiffness: 200,
      },
    },
  };
  return (
    <div className=" bg-white border border-gray-200 rounded-2xl shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-0.5">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex items-center justify-around Rewards flex-wrap max-[1041px]:flex-col mb-8 p-6"
      >
        <div className="text-[var(--font-color)] text-3xl flex flex-col max-[1041px]:order-2 max-[1041px]:items-center max-[1041px]:text-2xl max-[500px]:text-xl max-[400px]:text-xs gap-6 max-[1041px]:mt-2.5">
          <p>
            Melde dich jetzt schnell bei <span> Wo&Wann</span>
          </p>
          <p>an, um Geld zu verdienen</p>
          <a
            className="bg-[var(--secondary-color)] w-fit rounded-[12px] text-2xl text-white p-3 flex items-center gap-2.5 border hover:border-[var(--secondary-color)] hover:bg-white hover:text-[var(--secondary-color)] transition ease-in-out duration-200"
            href="https://user.woundwann.de/login"
          >
            Jetzt anmelden!
            <IoRocket />
          </a>
        </div>
        <div className="relative imgmoney">
          {/* <img src={money} alt="" className="w-full h-auto" />
            <div className="flex justify-center my-8 flex-col items-center gap-8 p-4">
        <h2 className="text-4xl text-center text-wrap text-[var(--primary-color)] flex gap-2 ">
          <span className="text-[var(--secondary-color)]">
            Melde dich schnell an
          </span>{" "}
          , um das Angebot zu sichern!
          <a href="https://user.woundwann.de/login">
            <BsArrowDownLeftCircleFill className=" mt-4 animate-bounce text-[var(--secondary-color)]" />
          </a>
        </h2> */}
          <img className="rounded-[20px] w-xl" src={euro} alt="" />
          {/* </div> */}

          {/* <div className="flex flex-col  items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-center mb-4 money max-[350px]:gap-0 gap-4">
            <p className=" text-lg md:text-xl font-semibold max-[350px]:text-[15px]">
              Jetzt anmelden und
            </p>
            <p className="text-2xl md:text-3xl font-extrabold text-[var(--primary-color)] italic max-[350px]:text-[15px]">
              20€
            </p>
            <p className="text-lg md:text-xl max-[350px]:text-[15px]">
              Bonus sichern!
            </p>
          </div> */}
          {/* <div className="absolute right-20 bottom-8 text-white  text-[7px]">
            <p className="">Erhalte deinen 20€ Bonus</p>
            <p className=" "> nach erfolgreich abgeschlossener </p>
            <p className="">ersten Schicht!</p>
            <p className="">nur für erste 100 Mitarbeiteren</p>
          </div> */}
        </div>
      </motion.div>
    </div>
  );
};

export default Rewards;
