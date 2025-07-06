import image from "../assets/images/registrierenImage.png";

const Registrieren = () => {
  return (
    <div className="Registrieren">
      <h2>Jetzt registrieren</h2>
      <div>
        <img src={image} alt="" />
        <p>
          Ein Dienstleistungsprojekt, das Pflegekräfte und Pflegefachkräfte mit
          Altenheimen verbindet zusammenbringt. Über dieses Projekt können
          Altenheime bei bedarf eine Pflegekraft oder einen Assistenten
          anfordern, und diese können die Anfrageannehmen und darauf reagieren
        </p>
      </div>
    </div>
  );
};

export default Registrieren;
