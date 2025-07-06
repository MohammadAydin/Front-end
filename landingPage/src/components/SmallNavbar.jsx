import { Link as RouterLink } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";

const SmallNavbar = ({ isOpen, setIsOpen }) => {
  return (
    <>
      {isOpen && (
        <div className="SmallNavbar">
          <div className="navItem">
            <ul>
              <li>
                <RouterLink onClick={() => setIsOpen(false)} to={"/"}>
                  HOME
                </RouterLink>
              </li>
              <li>
                <ScrollLink
                  onClick={() => setIsOpen(false)}
                  to="Registrieren"
                  smooth={true}
                  duration={500}
                >
                  ÜBERUNS
                </ScrollLink>
              </li>
              <li>
                <ScrollLink
                  onClick={() => setIsOpen(false)}
                  to="Contact"
                  smooth={true}
                  duration={500}
                >
                  CONTACT
                </ScrollLink>
              </li>
            </ul>
            <a className="SignInBtn" href="https://user.woundwann.de/">
              SIGNIN
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default SmallNavbar;
