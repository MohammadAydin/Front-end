import { FaLocationDot, FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
const ContactInputs = [
  { name: "name", type: "text", placeholder: "Vollständig Namen" },
  { name: "email", type: "email", placeholder: "Email Addresse" },
  { name: "number", type: "tel", placeholder: "Kontakt Nummer" },
  { name: "message", type: "text", placeholder: "Nachricht" },
];

const info = [
  {
    icon: <FaLocationDot size={30} />,
    title: "Büro",
    des: "Haagstr.25 Friedberg 61169 Deutschland",
  },
  {
    icon: <MdEmail size={30} />,
    title: "E-Mail",
    des: "info@woundwann.de",
  },
  {
    icon: <FaPhone size={30} />,
    title: "Kontakt Nummer",
    des: "+49 15560 600555",
  },
];
export { ContactInputs, info };
