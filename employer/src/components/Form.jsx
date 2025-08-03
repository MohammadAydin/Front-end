import Wrapper from "../assets/wrapper/Form";
import FormLogin from "./FormLogin";
import FormSignup from "./FormSignup";
import FormVerify from "./FormVerify";
import FormLastStep from "./FormLastStep";
import FormAddressPk from "./FormAddressPk";
import FormLicense from "./FormLicense";
import useFormLevel from "../store/Formlevel";

const Form = () => {
  // Storing Form States

  const Level = useFormLevel((s) => s.Level);

  return (
    // Form wrapping with Wrapper to format with styled components
    <Wrapper>
      {Level == 1 && <FormLogin />}
      {Level == 2 && <FormSignup />}
      {Level == 3 && <FormVerify />}
    </Wrapper>
  );
};

export default Form;
