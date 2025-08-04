import HelpRequestsHeader from "../../components/HelpRequests/HelpRequestsHeader";
import HelpRequestsMain from "../../components/HelpRequests/HelpRequestsMain";
import RequestsForm from "../../components/HelpRequests/RequestsForm/RequestsForm";
import CompletePersonalinfo from "../../components/MoreElements/CompletePersonalinfo";
import useStatusAccount from "../../store/storeStatusAccount";
import statusAccount from "../../utils/statusAccountReturn";
import "../Css Responsive/HelpRequestResponsive/HelpRequest.css";

const HelpRequests = () => {
    const status = useStatusAccount((state) => state.status);
 
  if (status !== "approved") {
    return statusAccount(status);
  }
  return (
    <div className="HelpRequests p-[28px] py-[58px]">
      <CompletePersonalinfo />
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
