import styled from "styled-components";
import Modal from "../../CommonComponents/Modal/Modal";

const MeetingInModal = ({ onClose }) => {
  const title = "Meeting Enter";
  return (
    <Modal onClose={onClose} ModalTitle={title}>
      <TitleStyle>
        <div className="name">URL 입력 </div>
        <div className="input">
          <input type="text" style={{border: 'solid 2px grey'}}/>
        </div>
        <ButtonStyle><button>입장</button></ButtonStyle>
      </TitleStyle>
    </Modal>
  );
};

export default MeetingInModal;

const TitleStyle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: end; // 세로 기준 맨 아래
  height: 6vh;
  .name {
    display: flex;
    margin-right: 5px;
    width: 30%;
  };
  .input {
    display: flex;
    width: 60%;
  };
`;

const ButtonStyle = styled.div`
    display: flex;
    width: 50px;
    height: 25px;
    margin-left: 5px;
`;