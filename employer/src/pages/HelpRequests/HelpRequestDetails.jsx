import { useNavigate, useParams } from "react-router-dom";
import RequestsDetailsTable from "../../components/HelpRequests/RequestDetails/RequestsDetailsTable";

import "../Css Responsive/HelpRequestResponsive/HelpRequestDetails.css";

const HelpRequestDetails = () => {
  const { id } = useParams();

  const navigate = useNavigate();
  return (
    <div className="HelpRequestDetails p-[28px] py-[58px]">
      <div className="font-extrabold">
        <span
          onClick={() => navigate("/helpRequests")}
          className="font-light cursor-pointer hover:text-[#F47621]"
        >
          Jop Posting &nbsp;
        </span>
        &gt; Jop Posting details
      </div>
      <div className="HelpRequestDetailsHeader my-5 flex justify-between items-center">
        <h2 className="font-extrabold text-2xl">Jop Posting details</h2>
      </div>
      <RequestsDetailsTable id={id} />
    </div>
  );
};

export default HelpRequestDetails;
