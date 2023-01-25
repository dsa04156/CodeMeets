import styled from "styled-components";
import Modal from "../../CommonComponents/Modal/Modal";

const MeetingInModal = ({ onClose }) => {
  const title = "Meeting Enter";
  return (
    <Modal onClose={onClose} ModalTitle={title}>



      <input type="text" style={{border: 'solid 2px grey'}}/>
      <input type="text" style={{border: 'solid 2px grey'}}/>
      <input type="text" style={{border: 'solid 2px grey'}}/>
      <input type="text" style={{border: 'solid 2px grey'}}/>
      <input type="text" style={{border: 'solid 2px grey'}}/>



      
    </Modal>
  );
};

export default MeetingInModal;

styled.input``
