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
  const idJopPosting = query.get("jobId");
  console.log(idJopPosting);

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
        <h2 className="font-extrabold text-2xl">
          Job On {data?.date ? new Date(data.date).toLocaleDateString('en-GB', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }) : 'Unknown Date'} Details
        </h2>
      </div>
      <ServicesDetailsTable
        data={data}
        title={title}
        idJopPosting={idJopPosting}
      />
    </div>
  );
};

export default ServiceRequestsDetails;
