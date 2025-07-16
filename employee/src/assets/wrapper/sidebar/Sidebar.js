import styled from "styled-components";

const Wrapper = styled.div`
  height: 100vh;
  width: 320px;

  a {
    padding: 3px;
  }
  .SideBar {
    background-color: #194894;
    height: 100vh;
    border: 20px white solid;
    border-radius: 36px;
  }
  p {
    font-family: "LamaSans";
  }
  .admin {
    font-family: "LamaSans-Light";
  }

  .active {
    background-color: white;
    color: #194894;
    border-radius: 6px;
    animation: fade 0.3s forwards;
    p {
      font-family: "LamaSans";
      font-weight: 900;
    }
  }
  ul {
    width: 100%;
    color: white;
    display: flex;
    flex-direction: column;
    gap: 25px;
    font-size: 18px;
  }
  .pageName {
    font-size: 16px;
    font-family: "LamaSans-Light";
  }

  @keyframes fadeSlideIn {
    0% {
      opacity: 0;
      transform: translateX(-10px);
      visibility: hidden;
    }
    100% {
      opacity: 1;
      transform: translateX(0);
      visibility: visible;
    }
  }
  @keyframes fade {
    0% {
      opacity: 0;
      padding: 3px;
    }
    100% {
      opacity: 1;
      padding: 10px 3px;
    }
  }

  @media (max-width: 1440px) {
    width: 120px;
    .SideBar {
      width: 120px;
    }
    .nav-item:hover {
      .SmallpageName {
        display: block;
        animation: fadeSlideIn 0.5s forwards;
      }
    }
  }
`;

export default Wrapper;
