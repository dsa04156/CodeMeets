import MeetingInModal from '../HomeComponents/MeetingInModal';
import MeetingPlusModal from '../HomeComponents/MeetingPlusModal';
import HomeMeetingList from '../HomeComponents/HomeMeetingList';

import styled from 'styled-components';

import { useState } from 'react';
import { IoEnterOutline } from 'react-icons/io5';
import { AiOutlinePlusCircle } from 'react-icons/ai';

const Home = () => {
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);

  const onClickButton1 = () => {
    setIsOpen1(true);
  };
  const onClickButton2 = () => {
    setIsOpen2(true);
  };
  return (
    <div>
      <PositionIcon>
        <IoEnterOutline
          onClick={onClickButton1}
          size="80"
          style={{ cursor: 'pointer' }}
          color="rgb(142,195,176)"
        ></IoEnterOutline>
        {isOpen1 && (
          <MeetingInModal
            open={isOpen1}
            onClose={() => {
              setIsOpen1(false);
            }}
          ></MeetingInModal>
        )}

        <AiOutlinePlusCircle
          onClick={onClickButton2}
          size="80"
          style={{ cursor: 'pointer' }}
          color="rgb(142,195,176)"
        ></AiOutlinePlusCircle>
        {isOpen2 && (
          <MeetingPlusModal
            open={isOpen2}
            onClose={() => {
              setIsOpen2(false);
            }}
          ></MeetingPlusModal>
        )}
      </PositionIcon>
      <HomeMeetDiv>
        <div style={{display: "flex", margin: "0px 100px 0px 100px"}}>
          <div style={{margin: "0px 260px 0px 125px"}}>
            <h1>참가</h1>
          </div>
          <div style={{margin: "0px 0px 0px 150px"}}>
            <h1>생성</h1>
          </div>
        </div>
      </HomeMeetDiv>
    </div>
  );
};

export default Home;

const PositionIcon = styled.div`
  padding-left: 1rem;
  padding-right: 1rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 10rem;
`;

const HomeMeetDiv = styled.div`
  padding: 10px;
  height: 350px;
`;
