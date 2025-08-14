import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import SmallNavbar from "../components/SmallNavbar";
import Footer from "../components/Footer";
import { IoLogoWhatsapp, IoMdClose } from "react-icons/io";
import imgWhatsapp from "../assets/images/whatsapp.png";
import { FaArrowRight } from "react-icons/fa";

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
        <div className="fixed top-52 right-0 z-50 flex ">
          <div className={`flex ${!showWhatsapp && "hidden"} relative`}>
            <img
              className={`w-[80%]  ml-auto justify-end rounded-2xl mt-[-50px] `}
              src={imgWhatsapp}
              alt=""
            />
            <a href="https://wa.link/q4lk2j">
              <button className="flex gap-2.5 items-center justify-center bg-green-400 rounded-2xl text-white p-2.5 absolute bottom-[-50px] right-0">
                Weiter zum Chat
                <FaArrowRight className="text-white" />
              </button>
            </a>
          </div>

          {!showWhatsapp ? (
            <IoLogoWhatsapp
              onClick={() => setshowWahatsapp(!showWhatsapp)}
              className="text-5xl text-green-500 text-right  cursor-pointer"
            />
          ) : (
            <IoMdClose
              onClick={() => setshowWahatsapp(!showWhatsapp)}
              className="text-5xl text-red-500 text-right"
            />
          )}
        </div>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
