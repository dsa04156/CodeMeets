import styled from 'styled-components';
import Modal from '../../CommonComponents/Modal/Modal';
import axios from 'axios';
import { APIroot } from '../../Store';
import { user } from '../../Store';
import { useRecoilValue } from 'recoil';
import { useState } from 'react';

const CreateGroupModal = ({onClose}) => {
    const Title = 'Group Create';

    const API = useRecoilValue(APIroot);
    const UserPk = useRecoilValue(user);

    const [groupName, setGroupName] = useState('');

    const CreateGroupName = (event) => {
        setGroupName(event.target.value);
    }

    const CancelHandler = () => {
        onClose?.();
    };

    // const submitHandler = (event) => {
    //     event.preventDefault();

    //     axios({
    //         method: "POST",
    //         url: `${API}/group/create`,
    //         headers: {
    //             AccessToken: `${localStorage.getItem('ACCESS_TOKEN')}`,
    //             'Content-Type': 'application/json',
    //         },
    //         data: JSON.stringify({
    //             groupDesc: ,
    //             groupName: groupName,
    //             groupUrl: ,
    //             managerId: UserPk
    //         })
    //     })
    // }

    return (
        <Modal onClose={onClose} ModalTitle={Title}>
        <TitleStyle>
            <div className='name'>Group Name</div>
            <div className='input'>
                <input type="text" onChange={CreateGroupName} style={{ border: 'solid 2px grey' }}/>
            </div>
        </TitleStyle>
        <TitleStyle>
          {/* <CreateCancelButtonStyle>
            <button onClick={submitHandler}>Create</button>
          </CreateCancelButtonStyle> */}
          <CreateCancelButtonStyle>
            <button onClick={CancelHandler}>Cancel</button>
          </CreateCancelButtonStyle>
        </TitleStyle>

        </Modal>
    )
}

export default CreateGroupModal;

const TitleStyle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: end; // 세로 기준 맨 아래
  height: 6vh;
  .name {
    display: flex;
    margin-right: 5px;
    width: 30%;
  }
  .input {
    display: flex;
    width: 60%;
  }
`;

const ButtonStyle = styled.div`
  display: flex;
  width: 50px;
  height: 25px;
  margin-left: 5px;
`;

const CreateCancelButtonStyle = styled.div`
  margin-left: 50px;
  padding-left: 50px;
  width: 5%;
  height: 25px;
`;