import { FaLocationDot, FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

export const getContactInputs = (t) => [
  { name: "name", type: "text", placeholder: t('contact.name') },
  { name: "email", type: "email", placeholder: t('contact.email') },
  { name: "number", type: "tel", placeholder: t('contact.phone') },
  { name: "message", type: "text", placeholder: t('contact.message') },
];

export const getContactInfo = (t) => [
  {
    icon: <FaLocationDot size={30} />,
    title: t('contact.office'),
    des: "Haagstr.25 Friedberg 61169 Deutschland",
  },
  {
    icon: <MdEmail size={30} />,
    title: t('contact.emailTitle'),
    des: "info@woundwann.de",
  },
  {
    icon: <FaPhone size={30} />,
    title: t('contact.phoneTitle'),
    des: "+49 15560 600555",
  },
];

// Keep the old exports for backward compatibility
const ContactInputs = [
  { name: "name", type: "text", placeholder: "Vollständig Namen" },
  { name: "email", type: "email", placeholder: "Email Addresse" },
  { name: "number", type: "tel", placeholder: "Kontakt Nummer" },
  { name: "message", type: "text", placeholder: "Nachricht" },
];

const info = [
  {
    icon: <FaLocationDot size={30} />,
    title: "Büro", // Keep German as fallback
    des: "Haagstr.25 Friedberg 61169 Deutschland",
  },
  {
    icon: <MdEmail size={30} />,
    title: "E-Mail", // Keep German as fallback
    des: "info@woundwann.de",
  },
  {
    icon: <FaPhone size={30} />,
    title: "Kontakt Nummer", // Keep German as fallback
    des: "+49 15560 600555",
  },
];

export { ContactInputs, info };
