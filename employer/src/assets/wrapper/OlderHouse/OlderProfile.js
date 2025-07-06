import styled from "styled-components";

const Wrapper = styled.div`
  font-family: "LamaSans";
  font-size: 16px;
  font-weight: bold;
  span {
    font-size: 70%;
    font-weight: 200;
  }
  .address-info p {
    font-family: "LamaSans-Light";
    font-weight: 500;
  }
  input {
    width: 100%;
    border: 0.2px solid black;
    border-radius: 5px;
    margin-top: 6px;
  }
  label {
    font-size: 90%;
    font-weight: 700;
  }
  .img-profile {
    box-shadow: 1px 1px 2px rgb(0, 0, 0, 0.1), -1px -1px 2px rgb(0, 0, 0, 0.1);
    border-radius: 5px;
  }
  .input {
    box-shadow: 1px 1px 2px rgb(0, 0, 0, 0.1), -1px -1px 2px rgb(0, 0, 0, 0.1);
    border-radius: 5px;
  }
  input {
    border: 1.2px solid #ccc;
    border-radius: 10px;
    padding: 8px;
  }
  .info {
    box-shadow: 1px 1px 2px rgb(0, 0, 0, 0.1), -1px -1px 2px rgb(0, 0, 0, 0.1);
    border-radius: 5px;
  }
  .address {
    box-shadow: 1px 1px 2px rgb(0, 0, 0, 0.1), -1px -1px 2px rgb(0, 0, 0, 0.1);
    border-radius: 5px;
  }
  .info-square {
    padding: 11.5px;
    box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2), -1px -1px 2px rgba(0, 0, 0, 0.1);

    border-radius: 8px;
    font-size: 14px;
  }
  .row-info {
    box-shadow: 0px 1px rgba(0, 0, 0, 0.1);
  }
`;

export default Wrapper;
