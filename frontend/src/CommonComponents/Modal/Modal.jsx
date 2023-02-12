import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ModalContainer from "./ModalContainer";
import { AiOutlineClose } from "react-icons/ai";

const Modal = ({ onClose, children, ModalTitle }) => {

  // 모달의 button 부분이름 바꾸기 위한 useState 부모의 buttonName을 받아옴

  const handleClose = () => {
    console.log("실행은 됩니다.");
    onClose?.();
  };

  useEffect(() => {
    const $body = document.querySelector("body");
    $body.style.overflow = "hidden";
    return () => ($body.style.overflow = "auto");
  }, []);

  return (
    <ModalContainer>
      <Overlay>
        <ModalWrap>
          <Header>
            <CloseButton>
              <ModalTitleStyle>{ModalTitle}</ModalTitleStyle>
              <AiOutlineClose
                onClick={handleClose}
                style={{ cursor: "pointer" }}
              />
            </CloseButton>
          </Header>
          <Contents>
            <div>
            {children}
            </div>
            </Contents>
        </ModalWrap>
      </Overlay>
    </ModalContainer>
  );
};

const Overlay = styled.div`
  position: fixed;
  width: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.2);
  z-index: 9999;
`;

const ModalWrap = styled.div`
  width: 500px;
  height: fit-content;
  border-radius: 15px;
  background-color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  overflow: hidden;
`;

const CloseButton = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Header = styled.div`
  height: 30px;
  padding-top: 10px;
  padding-right: 14px;
  background: rgb(150,126,118);
background: linear-gradient(149deg, rgba(150,126,118,0.5439425770308124) 100%, rgba(222,245,229,0.28904061624649857) 100%);
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
  margin-left: 50px;
  margin-right: 50px;
  input { 
    width: 300px;
    z-index: 1;
    height: 20px;
  }
`;

const ModalTitleStyle = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding-left: 4px;
`;

export default Modal;
