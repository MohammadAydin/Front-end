import HelpRequestsHeader from "../../components/HelpRequests/HelpRequestsHeader";
import HelpRequestsMain from "../../components/HelpRequests/HelpRequestsMain";
import RequestsForm from "../../components/HelpRequests/RequestsForm/RequestsForm";
import "../Css Responsive/HelpRequestResponsive/HelpRequest.css";

const HelpRequests = () => {
  return (
    <div className="HelpRequests p-[28px] py-[58px]">
      <div>
        <HelpRequestsHeader />
      </div>
      <div className="my-5">
        <HelpRequestsMain />
      </div>
      <RequestsForm />
    </div>
  );
};

export default HelpRequests;
