import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import SmallNavbar from "../components/SmallNavbar";
import Footer from "../components/Footer";

const Layout = () => {
  const [isOpen, setIsOpen] = useState(false);
  if (isOpen) {
    document.body.classList.add("overflow-hidden");
  } else {
    document.body.classList.remove("overflow-hidden");
  }

  return (
    <div className="App">
      <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />
      <SmallNavbar isOpen={isOpen} setIsOpen={setIsOpen} />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
