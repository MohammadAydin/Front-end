import { useLocation, useNavigate, useParams } from "react-router-dom";
import RequestsDetailsTable from "../../components/HelpRequests/RequestDetails/RequestsDetailsTable";
import { BiQrScan } from "react-icons/bi";
import AccessCode from "../../components/HelpRequests/RequestDetails/AccessCode";
import useRequestsStore from "../../store/HelpRequestsStore";
import "../Css Responsive/HelpRequestResponsive/HelpRequestDetails.css";
import useData from "../../hooks/useData";
import { useEffect, useState } from "react";
import ServicesDetailsTable from "../../components/HelpRequests/RequestDetails/ServiceRequests/ServicesDetailsTable";

const ServiceRequestsDetails = () => {
  const query = new URLSearchParams(location.search);
  const data = JSON.parse(decodeURIComponent(query.get("data")));
  const title = query.get("title");

  const { showCode, QrCodeOpen, PinCodeOpen } = useRequestsStore();

  if (showCode) {
    document.body.classList.add("overflow-hidden");
  } else {
    document.body.classList.remove("overflow-hidden");
  }

  const navigate = useNavigate();
  return (
    <div className="HelpRequestDetails p-[28px] py-[58px]">
      <div className="font-extrabold">
        <span
          onClick={() => navigate(-1)}
          className="font-light cursor-pointer hover:text-[#F47621]"
        >
          Jop Posting Details &nbsp;
        </span>
        &gt; Service Requests Details
      </div>
      <div className="HelpRequestDetailsHeader my-5 flex justify-between items-center">
        <h2 className="font-extrabold text-2xl">Service Requests Details</h2>
        <div className="HelpRequestDetailsActions flex items-center gap-2">
          <button
            onClick={QrCodeOpen}
            className="flex gap-1 items-center font-[900]  bg-[#F47621] text-white px-4 py-2 rounded-xl cursor-pointer"
          >
            <span className="mr-2">
              <BiQrScan size={20} />
            </span>
            Show QR code to clock in
          </button>
          <span className="text-sm text-[#8E90A6]">or</span>
          <button onClick={PinCodeOpen} className="font-extrabold">
            Show pin code
          </button>
        </div>
      </div>
      <ServicesDetailsTable data={data} title={title} />
      {showCode && <AccessCode id={data?.tasks[0]?.id} />}
    </div>
  );
};

export default ServiceRequestsDetails;
