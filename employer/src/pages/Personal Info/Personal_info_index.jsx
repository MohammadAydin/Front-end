import { MdOutlineHealthAndSafety } from "react-icons/md";
import {
  LuUserRound,
  LuBriefcaseBusiness,
  LuBanknote,
  LuPhone,
} from "react-icons/lu";
import { IoDocumentTextOutline, IoLocationOutline } from "react-icons/io5";
import { FaSignature } from "react-icons/fa";
import { RiProfileLine } from "react-icons/ri";
import { useTranslation } from "react-i18next";

const PersonalSections = () => {
  const { t } = useTranslation();

  return [
    {
      icon: LuUserRound,
      label: "personalInfo",
      path: "/Personal info/complate",
      status_name: "personal_info",
    },
    {
      icon: LuPhone,
      label: "phoneNumber",
      path: "/phone number",
      status_name: "phone_number",
    },

    {
      icon: IoDocumentTextOutline,
      label: "requiredDocuments",
      path: "/documents",
      status_name: "required_documents",
    },
    {
      icon: IoLocationOutline,
      label: "yourLocations",
      path: "/addLoaction",
      status_name: "location",
    },

    {
      icon: FaSignature,
      label: "signature",
      path: "/Signature",
      status_name: "signature",
    },
  ];
};

export default PersonalSections;
