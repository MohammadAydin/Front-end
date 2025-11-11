import { useState } from "react";
import avatar from "../../assets/image/Img_Avatar.25.svg";
import { IoEyeOutline, IoEyeSharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import useData from "../../hooks/useData";
import { MdOutlineFileDownload } from "react-icons/md";
import { FaFileInvoiceDollar } from "react-icons/fa6";
import { FaFileAlt } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const DetailsList = ({ id, invoice_number, from, to, total_amount, url }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [loadingPdf, setLoadingPdf] = useState(false);
  
  // Fetch detailed invoice URL
  const { data: detailedInvoice, isLoading: isLoadingDetails } = useData(`/invoices/${id}/download/details`);

  return (
    <>
      <div className="flex border-b border-[#919eab63] border-dashed items-center">
        <FaFileInvoiceDollar className="text-2xl text-green-400" />

        <div className="DetailsList flex-1 flex items-center justify-around p-6 font-[500] pb-5">
          <div className="ListIndex Index w-[10vw] ">#{invoice_number}</div>

          {/* navigate to userprofile */}

          <div className="flex flex-col">
            <p className="Email text-[#919EAB] text-sm font-[100]">
              from :{" "}
              {from && !isNaN(new Date(from))
                ? new Date(from).toISOString().split("T")[0]
                : "Invalid date"}
            </p>
            <p className="text-[#919EAB] text-sm font-[100]">
              to :{" "}
              {to && !isNaN(new Date(to))
                ? new Date(to).toISOString().split("T")[0]
                : "Invalid date"}
            </p>
          </div>

          <div className="address text-wrap w-32">
            total_amount : {total_amount}
          </div>
        </div>
        <div className="flex items-center gap-3.5">
          <button
            onClick={() => navigate(`/invoiceDetails/${id}`)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            title={t('Invoices.viewDetails')}
          >
            {isHovered ? <IoEyeSharp size={25} /> : <IoEyeOutline size={25} />}
          </button>
          
          {/* Download Summary Invoice */}
          <a
            href={url}
            download={"invoice.pdf"}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            title={t('Invoices.downloadSummary')}
          >
            <MdOutlineFileDownload size={20} />
            <span className="text-sm font-medium">{t('Invoices.summary')}</span>
          </a>
          
          {/* Download Detailed Invoice */}
          {isLoadingDetails ? (
            <div className="flex items-center gap-2 px-3 py-2 bg-gray-300 text-white rounded-lg">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
              </svg>
              <span className="text-sm font-medium">{t('common.loading')}</span>
            </div>
          ) : detailedInvoice?.data?.url ? (
            <a
              href={detailedInvoice.data.url}
              download={`${invoice_number}_details.pdf`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              title={t('Invoices.downloadDetailed')}
            >
              <FaFileAlt size={18} />
              <span className="text-sm font-medium">{t('Invoices.detailed')}</span>
            </a>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default DetailsList;
