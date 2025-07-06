import { useState } from "react";
import LeadersHeader from "../components/Leaders/LeadersHeader";
import LeadersMain from "../components/Leaders/LeadersMain";
import AddLeaderForm from "../components/Leaders/AddNewLeader/AddLeaderForm";
import "./Css Responsive/LeadersResponsive.css";
const Leaders = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  if (isFormOpen) {
    document.body.classList.add("overflow-hidden");
  } else {
    document.body.classList.remove("overflow-hidden");
  }
  return (
    <div className="Leaders p-[28px] py-[58px]">
      <div>
        {" "}
        <LeadersHeader setIsFormOpen={setIsFormOpen} />{" "}
      </div>
      <div className="my-5">
        <LeadersMain />
      </div>
      <AddLeaderForm isFormOpen={isFormOpen} setIsFormOpen={setIsFormOpen} />
    </div>
  );
};

export default Leaders;
