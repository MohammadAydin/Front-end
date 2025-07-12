import image from "../assets/images/HeroImage.png";
import { HiDownload, HiOutlineSearch } from "react-icons/hi";

const Hero = () => {
  return (
    <div className="Hero">
      <div>
        <h1>
          Pflegekräfte und Altenheime unkompliziert vernetzen – mit
          <span> Wo & Wann</span>
        </h1>
        <h2>
          Pflegekraft oder Einrichtung? Werden Sie mit nur wenigen Klicks Teil
          eines starken Netzwerks – einfach registrieren und loslegen!
        </h2>
        <div className="HeroActions">
          <button className="DownloadBtn">
            <p className="Warning">Unsere App kommt bald</p>
            <HiDownload /> Herunterladen
          </button>
          <button className="LearnMoreBtn">
            <HiOutlineSearch /> Mehr Erfahrung
          </button>
        </div>
      </div>
      <img src={image} alt="" />
    </div>
  );
};

export default Hero;
