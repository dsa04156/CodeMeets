import { useState } from "react";
import Modal from "./CommonComponents/Modal/Modal";
import styled from "styled-components";

const ModalOpenInfo = () => {
    // 여기서부터 모달
  const [isOpen, setIsOpen] = useState(false);

  const onClickButton = () => {
    setIsOpen(true);
  };
  // 여기까지 모달
    
    return (
      <AppWrap>
        <Button onClick={onClickButton}>Click Me !</Button>
        {isOpen && (
          <Modal
            open={isOpen}
            onClose={() => {
              setIsOpen(false);
            }}
          />
        )}
        </AppWrap>
    );
};

export default ModalOpenInfo


const Button = styled.button`
  font-size: 14px;
  padding: 10px 20px;
  border: none;
  background-color: #fa9f98;
  border-radius: 10px;
  color: white;
  font-style: italic;
  font-weight: 200;
  cursor: pointer;
  &:hover {
    background-color: #fac2be;
  }
`;

const AppWrap = styled.div`
  text-align: center;
  margin: 50px auto;
`;
