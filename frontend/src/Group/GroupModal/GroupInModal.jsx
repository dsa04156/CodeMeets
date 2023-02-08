// 보이는화면
import styled from 'styled-components';
import Modal from '../../CommonComponents/Modal/Modal';

import { useState } from 'react';
import axios from 'axios';

import { APIroot } from '../../Store';
import { useRecoilValue } from 'recoil';

import { useLocation } from 'react-router-dom';

const GroupInModal = ({ onClose }) => {
  const Title = 'Group 가입';

  const API = useRecoilValue(APIroot);

  // 가입 url 넣기 위한 useState
  const [url, seturl] = useState('');
  const InputUrl = (e) => {
    const CurrentUrl = e.target.value;
    seturl(CurrentUrl);
  };

  const CancelHandler = () => {
    onClose?.();
    // Navigate(`${API}/my-page/${LoginUser.userPk}/meeting-list`)
  };

  // Modal에 내려줄 function -> 나중에 형이 만들더라도 이름을 맞춰서 넣어줘야 submit했을시 작동 가능
  const submitHandler = (e) => {
    e.preventDefault();
    console.log(url);
    axios({
      method: 'GET',
      url: `${API}/group/join/${url}`,
      headers: {
        'Content-Type': 'application/json',
        AccessToken: `${localStorage.getItem('ACCESS_TOKEN')}`,
      },
    })
    .then((response) => {
      console.log(response.data);
      alert("가입완료");
      onClose?.();
      useLocation.reload();
    })
    .catch((err) => console.log(err));
  };

  return (
    // ModalTitle: 모달상단 제목, submitHandler: 제출시 작동할 함수, buttonName: Modal의 button부분 이름
    // 키(submitHandler, buttonName) 값을 같게 보내야 받을 수 있음!!!!!!!!
    <Modal onClose={onClose} ModalTitle={Title}>
      {/* <form> */}
        <TitleStyle>
          <div className="name">Group URL</div>
          <div className="input">
            <input
              type="text"
              onChange={InputUrl}
              style={{ border: 'solid 2px grey' }}
            />
          </div>
        </TitleStyle>
        <TitleStyle>
          <CreateCancelButtonStyle>
            <button onClick={submitHandler}>Join</button>
          </CreateCancelButtonStyle>
          <CreateCancelButtonStyle>
            <button onClick={CancelHandler}>Cancel</button>
          </CreateCancelButtonStyle>
        </TitleStyle>
      {/* </form> */}
    </Modal>
  );
};

export default GroupInModal;

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
