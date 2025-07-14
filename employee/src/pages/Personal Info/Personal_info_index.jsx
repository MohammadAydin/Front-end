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
      label: t("personalInfoSections.personalInfo"),
      path: "/Personal info/complate",
      status_name: "personal_info",
    },
    {
      icon: LuPhone,
      label: t("personalInfoSections.phoneNumber"),
      path: "/phone number",
      status_name: "phone_number",
    },
    {
      icon: RiProfileLine,
      label: t("personalInfoSections.residenceInfo"),
      path: "/residence info",
      status_name: "residence_work_permit",
    },
    {
      icon: LuBanknote,
      label: t("personalInfoSections.bankingInfo"),
      path: "/Banking info",
      status_name: "banking_info",
    },
    {
      icon: MdOutlineHealthAndSafety,
      label: t("personalInfoSections.socialSecurity"),
      path: "/Social Insurance",
      status_name: "social_security",
    },
    {
      icon: IoDocumentTextOutline,
      label: t("personalInfoSections.requiredDocuments"),
      path: "/documents",
      status_name: "required_documents",
    },
    {
      icon: IoLocationOutline,
      label: t("personalInfoSections.yourLocations"),
      path: "/locationInfo",
      status_name: "location",
    },
    {
      icon: LuBriefcaseBusiness,
      label: t("personalInfoSections.employmentData"),
      path: "/Employment data",
      status_name: "employment_data",
    },
    {
      icon: FaSignature,
      label: t("personalInfoSections.signature"),
      path: "/Signature",
      status_name: "signature",
    },
  ];
};

export default PersonalSections;
