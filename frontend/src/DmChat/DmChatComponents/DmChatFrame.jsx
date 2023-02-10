import { Outlet } from "react-router-dom";
import styled from "styled-components";
import SideSwiper from "./SideSwiper";

const DmChatFrame = () => {
  return (
    <MainFrame>
      <ImageFrame>
        <SideSwiper />
      </ImageFrame>
      <ImageFrame>
        <SideSwiper />
      </ImageFrame>
    </MainFrame>
  );
};

export default DmChatFrame;

const MainFrame = styled.div`
  height: 38rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
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
  border: 1px solid black;
  height: 38rem;
`;

const ImageFrame = styled.div`
  width: 30rem;
  border: 1px solid black;
  height: 38rem;
`;
