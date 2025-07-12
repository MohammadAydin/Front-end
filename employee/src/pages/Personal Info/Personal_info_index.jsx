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

const PersonalSections = [
  {
    icon: LuUserRound,
    label: "Personal Info",
    path: "/Personal info/complate",
    status_name: "personal_info",
  },
  {
    icon: LuPhone,
    label: "Your Phone number",
    path: "/phone number",
    status_name: "phone_number",
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
    icon: IoDocumentTextOutline,
    label: "Required documents",
    path: "/documents",
    status_name: "required_documents",
  },

  {
    icon: IoLocationOutline,
    label: "Your Locations",
    path: "/locationInfo",
    status_name: "location",
  },

  {
    icon: LuBriefcaseBusiness,
    label: "Employment Eligibility & Health Info",
    path: "/Employment data",
    status_name: "employment_data",
  },
  {
    icon: FaSignature,
    label: "Your signature",
    path: "/Signature",
    status_name: "signature",
  },
];

export default PersonalSections;
