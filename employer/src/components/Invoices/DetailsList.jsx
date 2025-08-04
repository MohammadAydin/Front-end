import { useState } from "react";
import avatar from "../../assets/image/Img_Avatar.25.svg";
import { IoEyeOutline, IoEyeSharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import useData from "../../hooks/useData";
import { MdOutlineFileDownload } from "react-icons/md";
import { FaFileInvoiceDollar } from "react-icons/fa6";

const DetailsList = ({ id, invoice_number, from, to, total_amount }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const { data: invoiceDetials, error, isLoadnig } = useData(`/invoice/${id}`);
  console.log(invoiceDetials);

  return (
    <>
      <div className="flex border-b border-[#919eab63] border-dashed items-center">
        <FaFileInvoiceDollar className="text-2xl text-green-400" />

        <div className="DetailsList w-[70vw] flex items-center justify-around p-6 font-[500] pb-5">
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
          >
            {isHovered ? <IoEyeSharp size={25} /> : <IoEyeOutline size={25} />}
          </button>
          <div className="invoicesDownload text-[25px] mb-1 text-3xl">
            <MdOutlineFileDownload />
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailsList;
