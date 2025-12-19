import styled from "styled-components";

const Wrapper = styled.div`
  height: 100vh;
  width: 320px;
  background: linear-gradient(135deg, #194894 0%, #1e5ba8 30%, #194894 60%, #1e5ba8 100%);
  background-size: 400% 400%;
  animation: gradientShift 15s ease infinite;
  position: relative;

  a {
    padding: 3px;
  }
  .SideBar {
    background: linear-gradient(135deg, #194894 0%, #1e5ba8 30%, #194894 60%, #1e5ba8 100%);
    background-size: 400% 400%;
    animation: gradientShift 15s ease infinite;
    min-height: 100vh;
    border-radius: 0;
    position: relative;
    overflow: hidden;
    box-shadow: none;
  }

  @keyframes gradientShift {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  .SideBar::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
      circle at 20% 50%,
      rgba(244, 118, 33, 0.15) 0%,
      transparent 50%
    ),
    radial-gradient(
      circle at 80% 80%,
      rgba(59, 130, 246, 0.15) 0%,
      transparent 50%
    );
    pointer-events: none;
    animation: pulseGlow 4s ease-in-out infinite;
  }

  @keyframes pulseGlow {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.7;
    }
  }

  p {
    font-family: "LamaSans";
  }
  .admin {
    font-family: "LamaSans-Light";
  }

  .active {
    background: rgba(255, 255, 255, 0.95);
    color: #194894;
    border-radius: 8px;
    animation: fade 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    p {
      font-family: "LamaSans";
      font-weight: 600;
    }
  }

  ul {
    width: 100%;
    color: white;
    display: flex;
    flex-direction: column;
    gap: 8px;
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
      transform: scale(0.95);
    }
    100% {
      opacity: 1;
      padding: 10px 3px;
      transform: scale(1);
    }
  }

  @keyframes slide-up {
    0% {
      opacity: 0;
      transform: translateY(10px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-slide-up {
    animation: slide-up 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  }

  @media (max-width: 1440px) {
    width: 120px;
    .nav-item:hover {
      .SmallpageName {
        display: block;
        animation: fadeSlideIn 0.5s forwards;
      }
    }
  }
`;

export default Wrapper;
