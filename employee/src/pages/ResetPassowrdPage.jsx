
import Logo from "../assets/images/Logo Positions.svg";
import Wrapper from "../assets/wrapper/FormStyle/Form";
import ResetPasswordForm from "../components/FormAuth/ResetPasswordForm";

const ResetPassowrdPage = () => {
  return (
    <div className="LoginPage">
      <div className="backgorund h-fit">
        <div className="ballBackgorund large"></div>
        <div className="ballBackgorund meduim"></div>
        <div className="ballBackgorund small-one"></div>
        <div className="ballBackgorund small-two"></div>
      </div>
      <div className="LoginItems w-[75%] h-[100vh]  flex justify-between items-center m-auto">
        <img className="mb-[20%] w-[25%] logo" src={Logo} alt="" />
       <Wrapper>
       <ResetPasswordForm/>
        </Wrapper>
      </div>
    </div>
  );
};

export default ResetPassowrdPage;