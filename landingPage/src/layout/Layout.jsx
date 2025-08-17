import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import SmallNavbar from "../components/SmallNavbar";
import Footer from "../components/Footer";
import { IoLogoWhatsapp, IoMdClose } from "react-icons/io";
import iconWhatsapp from "../assets/images/whatsapp.png";

const Layout = () => {
  const [showWhatsapp, setshowWahatsapp] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  if (isOpen) {
    document.body.classList.add("overflow-hidden");
  } else {
    document.body.classList.remove("overflow-hidden");
  }

  return (
    <div className="App ">
      <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />
      <SmallNavbar isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="relative">
        <div className="fixed bottom-2 right-2 z-50 flex">
          <a href="https://wa.link/qjf0zs">
            <img src={iconWhatsapp} className="w-[50px]" alt="" />
            {/* <IoLogoWhatsapp className="text-5xl text-green-500 text-right  cursor-pointer" /> */}
          </a>
        </div>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
