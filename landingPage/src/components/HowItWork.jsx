import { IoPersonAddSharp } from "react-icons/io5";
import { IoIosCheckmarkCircle, IoMdTrophy } from "react-icons/io";

const List = [
  {
    icon: <IoPersonAddSharp size={40} />,
    title: "Anmelden",
    des: "Erstellen Sie ein Konto als Pflegekraft oder Altenheim",
  },
  {
    icon: <IoIosCheckmarkCircle size={40} />,
    title: "Jobanfrage stellen oder annehmen",
    des: "Altenheime können Anfragen stellen, die Pflegekräfte direkt annehmen können.",
  },
  {
    icon: <IoMdTrophy size={40} />,
    title: "Vollständiger Online-Service",
    des: "Ohne Komplikationen, Aufwand oder Anrufe",
  },
];

const HowItWork = () => {
  return (
    <div className="HowItWork">
      <h2>Wie funktioniert Wo & Wann</h2>
      <div className="HowItWorkList">
        {List.map((item, index) => (
          <div key={index} className="HowItWorkListItem">
            <span>{item.icon}</span>
            <h4>{item.title}</h4>
            <p>{item.des}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWork;
