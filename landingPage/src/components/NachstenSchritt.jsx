import image1 from "../assets/images/SectionImage1.png";
import image2 from "../assets/images/SectionImage2.png";

const Schritt = ({ image, title, description, url }) => {
  return (
    <div className="Schritt">
      <img src={image} alt="" />
      <h3>{title}</h3>
      <p>
        {description} <a href={url}>Wo & Wann</a>
      </p>
    </div>
  );
};
const NachstenSchritt = () => {
  return (
    <div className="NachstenSchritt">
      <Schritt
        image={image2}
        title={"bereit für den nächsten schritt?"}
        description={"Find deinen passenden Minijob noch heute mit"}
        url={"https://user.woundwann.de/"}
      />
      <Schritt
        image={image1}
        title={"Bereit für qualifiziertes Personal?"}
        description={"Finden Sie zuverlässige Pflegekräfte – noch heute mit"}
        url={"https://employer.woundwann.de/"}
      />
    </div>
  );
};

export default NachstenSchritt;
