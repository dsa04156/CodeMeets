import { Outlet } from "react-router-dom";
import styled from "styled-components";
import SideSwiper from "./SideSwiper";

const LoginFrame = () => {
  return (
    <MainFrame>
      <ImageFrame>
        <SideSwiper />
      </ImageFrame>
      <ChangeFrame>
        <Outlet />
      </ChangeFrame>
    </MainFrame>
  );
};

export default LoginFrame;

const MainFrame = styled.div`
  height: 38rem;
  display: flex;
  justify-content: center;
  align-items: center;
  h1 {
    text-align: center;
    align-items: top;
  }
  input {
    width: 13rem;
    height: 20px;
  }
`;

const ChangeFrame = styled.div`
  display: flex;
  width: 30rem;
  justify-content: center;
  align-items: center;
  height: 38rem;
`;

const ImageFrame = styled.div`
  width: 30rem;
  height: 38rem;
`;
