import Modal from "../../CommonComponents/Modal/Modal";
import styled from "styled-components";

const MeetingPlusModal = ({onClose}) => {
    const title = 'Meeting Create'
    return (
        <Modal onClose={onClose} ModalTitle={title}>
            <TitleStyle>
        <div className="name">회의명 </div>
        <div className="nickname">
          <input type="text" style={{border: 'solid 2px grey'}}/>
        </div>
      </TitleStyle>
      <TitleStyle>
        <div className="name">회의 개요 </div>
        <div className="nickname">
          <input type="text" style={{border: 'solid 2px grey'}}/>
        </div>
      </TitleStyle>
      {/* 여기 그룹다운으로 그룹 선택 만들어야됨*/}
      <TitleStyle>
        <div className="name">URL</div>
        <div className="nickname">
          <input type="text" style={{border: 'solid 2px grey'}}/>
        </div>
        <ButtonStyle><button>Copy</button></ButtonStyle>
      </TitleStyle>
      <TitleStyle>
        <div className="name">캡처 허용</div>
        <CheckBoxStyle className="nickname"><input type="checkbox" />불가능</CheckBoxStyle>
      </TitleStyle>
      <TitleStyle>
        <div className="name">화면 공유 허용</div>
        <CheckBoxStyle className="nickname"><input type="checkbox" />불가능</CheckBoxStyle>
      </TitleStyle>
      <TitleStyle>
      <CreateCancelButtonStyle>
      <button>Create</button>
      </CreateCancelButtonStyle>
      <CreateCancelButtonStyle>
      <button>Cancel</button>
      </CreateCancelButtonStyle>
      </TitleStyle>

      
        </Modal>
    );
};

export default MeetingPlusModal;

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
  .nickname {
    display: flex;
    width: 60%;
    
  };
`;
const CheckBoxStyle = styled.div`
  display: flex;
  align-items: center;
  input {
    width: 20px;
  }
`;

const ButtonStyle = styled.div`
    display: flex;
    width: 20px;
    height: 25px;
    margin-left: 5px;
`;

const CreateCancelButtonStyle = styled.div`
    /* align-items: center; */
    margin-left: 50px;
    padding-left: 50px;
    width: 5%;
    height: 25px;
`;