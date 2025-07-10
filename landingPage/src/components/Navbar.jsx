import { Link as RouterLink } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import logo from "../assets/images/Logo.svg";
import { HiOutlineViewList } from "react-icons/hi";

const Navbar = ({ isOpen, setIsOpen }) => {
  return (
    <header>
      <div className="Navbar">
        <RouterLink to={"/"}>
          <img src={logo} alt="logo" />
        </RouterLink>
        <div>
          <ul>
            <li>
              <RouterLink to={"/"}>START</RouterLink>
            </li>
            <li>
              <ScrollLink to="Registrieren" smooth={true} duration={500}>
                ÜBER UNS
              </ScrollLink>
            </li>
            <li>
              <ScrollLink to="Contact" smooth={true} duration={500}>
                KONTAKT
              </ScrollLink>
            </li>
          </ul>
          <a className="SignInBtn" href="https://user.woundwann.de/">
            SIGNIN
          </a>
        </div>
        <div onClick={() => setIsOpen(!isOpen)} className="NavIcon">
          <HiOutlineViewList size={40} />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
