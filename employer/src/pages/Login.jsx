
import Logo from "../assets/image/Logo Positions.svg";
import Form from "../components/Form";

const Login = () => {
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
        <Form />
      </div>
    </div>
  );
};

export default Login;
