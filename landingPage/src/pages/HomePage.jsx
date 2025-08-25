import { useState } from "react";
import Contact from "../components/Contact/Contact";
import Features from "../components/Features";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import HowItWork from "../components/HowItWork";
import NachstenSchritt from "../components/NachstenSchritt";
import Navbar from "../components/Navbar";
import Registrieren from "../components/Registrieren";
import SmallNavbar from "../components/SmallNavbar";
import Rewards from "../components/Rewards";
import euro from "../assets/images/euro.jpg";
import { IoArrowRedo } from "react-icons/io5";
import { FaTrowel } from "react-icons/fa6";
import { BsArrowDownLeftCircleFill } from "react-icons/bs";

const HomePage = () => {
  return (
    <div className="App">
      <Rewards />
      <Hero />
      <div className="flex justify-center my-8 flex-col items-center gap-8 p-4">
        <h2 className="text-4xl text-center text-wrap text-[var(--primary-color)] flex gap-2 ">
          <span className="text-[var(--secondary-color)]">
            Melde dich schnell an
          </span>{" "}
          , um das Angebot zu sichern!
          <a href="https://user.woundwann.de/login">
            <BsArrowDownLeftCircleFill className=" mt-4 animate-bounce text-[var(--secondary-color)]" />
          </a>
        </h2>
        <img className="rounded-[20px] w-2xl" src={euro} alt="" />
      </div>
      <NachstenSchritt />
      <Registrieren />
      <Features />
      <HowItWork />
      <Contact />
    </div>
  );
};

export default HomePage;
