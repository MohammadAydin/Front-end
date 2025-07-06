import { MdOutlineHealthAndSafety } from "react-icons/md";
import { LuUserRound, LuBriefcaseBusiness, LuBanknote } from "react-icons/lu";
import { IoDocumentTextOutline } from "react-icons/io5";
import { FaSignature } from "react-icons/fa";
import { RiProfileLine } from "react-icons/ri";

const PersonalSections = [
  {
    icon: LuUserRound,
    label: "Personal Info",
    path: "/Personal info/complate",
    status_name: "personal_info",
  },
  {
    icon: RiProfileLine,
    label: "residence info",
    path: "/residence info",
    status_name: "residence_work_permit",
  },
  {
    icon: LuBanknote,
    label: "Banking Info",
    path: "/Banking info",
    status_name: "banking_info",
  },
  {
    icon: MdOutlineHealthAndSafety,
    label: "Social Security and Health Insurance",
    path: "/Social Insurance",
    status_name: "social_security",
  },
  {
    icon: LuBriefcaseBusiness,
    label: "Employment data",
    path: "/Employment data",
    status_name: "employment_data",
  },
  {
    icon: IoDocumentTextOutline,
    label: "Required documents",
    path: "/documents",
    status_name: "required_documents",
  },
  {
    icon: FaSignature,
    label: "Your signature",
    path: "/Signature",
    status_name: "signature",
  },
];

export default PersonalSections;
