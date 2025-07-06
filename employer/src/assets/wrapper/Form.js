import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 5px;
  width: 40%;

  font-family: "LamaSans";
  .input-control {
    width: 100%;
    height: 50px;
    border: 1.5px solid;
    padding: 7px 15px;
    border-radius: 10px;
    border-color: rgba(145, 158, 171, 0.5);
    font-weight: 100;
  }
  .input-control-code {
    width: 50px;
    border: 1.5px solid;
    padding: 7px 15px;
    border-radius: 10px;
    border-color: rgba(145, 158, 171, 0.5);
    font-weight: 100;
  }
  .label-email {
    color: var(--secondary-color);
    transition: 0.5s;
    color: #919eab;
  }
  .input-group input:focus ~ label,
  .input-group input:not(:placeholder-shown) ~ label {
    top: 0;
    font-size: 14px;
    color: var(--secondary-color);
  }

  /* Change Fox's primary color and add another */
  input:focus {
    outline: none;
    border-color: var(--secondary-color);
  }
  .button-login {
    padding: 10px;
    margin-top: 30px;
    margin-bottom: 3px;
    cursor: pointer;
    /* background-color: var(--secondary-color); */
  }
  .icon-eye {
    cursor: pointer;
  }
  .vergessen {
    cursor: pointer;
  }
  .Upload-License {
  }
  @media (min-width: 600px) and (max-width: 1024px) {
    width: 70%;
  }
  @media (max-width: 600px) {
    width: 90%;
  }
`;

export default Wrapper;
