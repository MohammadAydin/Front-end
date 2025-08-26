import {
  RiInformationLine,
  RiCameraLine,
  RiCheckboxCircleLine,
  RiImage2Line,
} from "react-icons/ri";
import { useTranslation } from "react-i18next";

const UploadGuidelines = () => {
  const { t } = useTranslation();

  const items = [
    {
      icon: <RiImage2Line className="text-xl shrink-0" />,
      text: t("residenceInfo.notes.flatSurface"),
    },
    {
      icon: <RiInformationLine className="text-xl shrink-0" />,
      text: t("residenceInfo.notes.nonReflective"),
    },
    {
      icon: <RiCameraLine className="text-xl shrink-0" />,
      text: t("residenceInfo.notes.straightPhoto"),
    },
    {
      icon: <RiCheckboxCircleLine className="text-xl shrink-0" />,
      text: t("residenceInfo.notes.clearReadable"),
    },
  ];

  return (
    <div className="mt-4 w-full rounded-2xl border border-slate-200 bg-white p-4 md:p-5 shadow-sm">
      <div className="mb-3 flex items-center gap-2">
        <RiInformationLine className="text-2xl" />
        <h3 className="text-base md:text-lg font-semibold">
          {t("residenceInfo.notes.title")}
        </h3>
      </div>
      <ul className="space-y-3">
        {items.map((it, idx) => (
          <li key={idx} className="flex items-start gap-3">
            <span className="mt-0.5">{it.icon}</span>
            <p className="text-sm md:text-[15px] leading-6 text-slate-700">
              {it.text}
            </p>
          </li>
        ))}
      </ul>
      <div className="mt-4 rounded-xl bg-slate-50 px-3 py-2 text-[13px] md:text-sm leading-6 text-slate-600">
        {t("residenceInfo.notes.tip")}
      </div>
    </div>
  );
};

export default UploadGuidelines;
