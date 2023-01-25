import Modal from "../../CommonComponents/Modal/Modal";

const MeetingPlusModal = ({onClose}) => {
    const title = 'Meeting Create'
    return (
        <Modal onClose={onClose} ModalTitle={title}>
            <div>
                <p>여기에 내용</p>
            </div>
        </Modal>
    );
};

export default MeetingPlusModal;