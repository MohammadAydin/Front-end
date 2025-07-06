import { useLocation, useNavigate } from "react-router-dom";
import UserDetails from "../components/HelpRequests/User Profile/UserDetails";
import UserReviews from "../components/HelpRequests/User Profile/UserReviews";
import "./Css Responsive/UserProfile.css";

const UserProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const previousPage = location.state.from || "/";
  return (
    <div className="UserProfile p-[28px] py-[58px]">
      <div className="font-extrabold">
        <span
          onClick={() => navigate(previousPage)}
          className="font-light cursor-pointer hover:text-[#F47621]"
        >
          {previousPage.slice(1, -1)} &nbsp;
        </span>
        &gt; User Profile
      </div>
      <UserDetails />
      <UserReviews />
    </div>
  );
};

export default UserProfile;
