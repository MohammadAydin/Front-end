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

const HomePage = () => {
  return (
    <div className="App">
      <Rewards />
      <Hero />
      <NachstenSchritt />
      <Registrieren />
      <Features />
      <HowItWork />
      <Contact />
    </div>
  );
};

export default HomePage;
