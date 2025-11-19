import styled from "styled-components";

const Wrapper = styled.div`
  width: 320px;

  a {
    padding: 3px;
  }
  .SideBar {
    background: linear-gradient(180deg, #194894 0%, #1a4fa0 50%, #194894 100%);
    border: 20px white solid;
    border-radius: 36px;
    position: relative;
    overflow: hidden;
  }

  .SideBar::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.1),
      transparent
    );
  }
  p {
    font-family: "LamaSans";
  }
  .admin {
    font-family: "LamaSans-Light";
  }

  .active {
    background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
    color: #194894;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(255, 255, 255, 0.2),
      0 2px 4px rgba(0, 0, 0, 0.1);
    animation: fade 0.3s forwards;
    position: relative;
    p {
      font-family: "LamaSans";
      font-weight: 700;
    }
  }

  .active::before {
    content: "";
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 4px;
    height: 60%;
    background: linear-gradient(180deg, #F47621 0%, #3b82f6 100%);
    border-radius: 0 4px 4px 0;
  }
  ul {
    width: 100%;
    color: white;
    display: flex;
    flex-direction: column;
    gap: 20px;
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
