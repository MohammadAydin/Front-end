import Logo from "../assets/image/Logo Positions.svg";
import FormForget from "../components/FormForget";
import LanguageSwitcher from "../components/LanguageSwitcher";

const ForgetPassword = () => {
  return (
    <div className="LoginPage relative">
      <div className="absolute top-4 right-4 z-50">
        <LanguageSwitcher />
      </div>
      <div className="backgorund h-fit">
        <div className="ballBackgorund large"></div>
        <div className="ballBackgorund meduim"></div>
        <div className="ballBackgorund small-one"></div>
        <div className="ballBackgorund small-two"></div>
      </div>
      <div className="LoginItems w-[75%] h-[100vh]  flex justify-between items-center m-auto">
        <img className="mb-[20%] w-[25%] logo" src={Logo} alt="" />

        <FormForget />
      </div>
    </div>
  );
};

export default ForgetPassword;
