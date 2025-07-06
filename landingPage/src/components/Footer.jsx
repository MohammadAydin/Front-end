import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="Footer">
      <div className="FooterAction">
        <div className="Links">
          <Link onClick={() => window.scrollTo(0, 0)} to={"/Impressum"}>
            Impressum
          </Link>
          <Link
            onClick={() => window.scrollTo(0, 0)}
            to={"/Datenschutzerklärung"}
          >
            Datenschutzerklärung
          </Link>
        </div>

        <ul className="IconLinks">
          <a href="https://www.facebook.com/woundwann.job" target="_blank">
            <FaFacebookF size={20} />
          </a>
          <a
            target="_blank"
            href="https://www.instagram.com/woundwann.de?igsh=b3Jqc2d0cnR0dHJj"
          >
            <FaInstagram size={20} />
          </a>
          <a
            href="https://x.com/wo_wann2025?t=yNIU383daFD6gZogwaoNqg&s=08"
            target="_blank"
          >
            <FaXTwitter size={20} />
          </a>
        </ul>
      </div>
      <div>
        <hr />
      </div>
      <p>
        Copyrights © 2025 All Rights Reserved by <span>WoundWann</span>
      </p>
    </div>
  );
};

export default Footer;
