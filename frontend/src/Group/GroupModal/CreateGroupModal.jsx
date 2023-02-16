import styled from 'styled-components';
import Modal from '../../CommonComponents/Modal/Modal';
import axios from 'axios';
import { APIroot } from '../../Store';

import { useRecoilValue } from 'recoil';
import { useState } from 'react';

const CreateGroupModal = ({ onClose, CreateURL }) => {
  const Title = 'Group Create';
  const API = useRecoilValue(APIroot);

  const [urlCopy, setUrlCopy] = useState(CreateURL);
  const [groupName, setGroupName] = useState('');

  const CreateGroupName = (event) => {
    setGroupName(event.target.value);
  };

  const CancelHandler = () => {
    onClose?.();
  };

  const enterClickHandler = (event) => {
    if (event.key === 'Enter') {
      submitHandler();
    }
  };

  const CopyHandler = (text) => {
    setUrlCopy(CreateURL);
    try {
      navigator.clipboard.writeText(text);
      alert('클립보드 복사완료');
    } catch (error) {
      alert('복사 실패');
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();
    axios({
      method: 'POST',
      url: `${API}/group/create`,
      headers: {
        AccessToken: `${localStorage.getItem('ACCESS_TOKEN')}`,
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({
        groupDesc: '',
        groupName: groupName,
        groupUrl: urlCopy,
        groupPk: '',
        managerId: '',
      }),
    }).then(() => {
      alert('그룹이 생성되었습니다.');
      onClose?.();
    });
  };

  return (
    <Modal onClose={onClose} ModalTitle={Title}>
      <TitleStyle>
        <div className="name">Group Name</div>
        <div className="input">
          <input
            type="text"
            onKeyPress={enterClickHandler}
            onChange={CreateGroupName}
            style={{ border: 'solid 2px grey' }}
          />
        </div>
      </TitleStyle>
      <TitleStyle>
        <div className="name">Group URL</div>
        <div className="input">
          <input
            type="text"
            defaultValue={CreateURL}
            style={{ border: 'solid 2px grey' }}
          />
        </div>
        <SubButtonStyle>
          <button
            className="custom-btn btn-8"
            style={{ margin: '0px 0px 0px 5px' }}
            onClick={() => CopyHandler(CreateURL)}
          >
            Copy
          </button>
        </SubButtonStyle>
      </TitleStyle>

      <TitleStyle>
        <SubButtonStyle>
          <div className="position">
            <button className="custom-btn btn-8" onClick={submitHandler}>
              Create
            </button>
          </div>
        </SubButtonStyle>
        <SubButtonStyle>
          <button className="custom-btn btn-8" onClick={CancelHandler}>
            Cancel
          </button>
        </SubButtonStyle>
      </TitleStyle>
    </Modal>
  );
};

export default CreateGroupModal;

const TitleStyle = styled.div`
  display: flex;
  align-items: end;
  height: 6vh;
  .name {
    display: flex;
    margin-right: 5px;
    width: 30%;
  }
  .input {
    display: flex;
    width: 50%;
  }
  .position {
    margin-left: 60px;
  }
  .button {
    height: 25px;
    margin-left: 5px;
  }
`;

const SubButtonStyle = styled.div`
  .custom-btn {
    width: 50px;
    height: 25px;
    color: #fff;
    border-radius: 5px;
    margin-left: 50px;
    padding: 10px 25px;
    font-family: 'Lato', sans-serif;
    font-weight: 500;
    background: transparent;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    display: flex;
    box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, 0.5),
      7px 7px 20px 0px rgba(0, 0, 0, 0.1), 4px 4px 5px 0px rgba(0, 0, 0, 0.1);
    outline: none;
    align-items: center;
    justify-content: center;
  }
  .btn-8 {
    background-color: #4dccc6;
    background-image: linear-gradient(315deg, #f0ecfc 0%, #4dccc6 74%);
    line-height: 42px;
    padding: 0;
    border: none;
  }
  .btn-8:before,
  .btn-8:after {
    position: absolute;
    content: '';
    right: 0;
    bottom: 0;
    background: #4dccc6;
    box-shadow: 4px 4px 6px 0 rgba(255, 255, 255, 0.5),
      -4px -4px 6px 0 rgba(116, 125, 136, 0.2),
      inset -4px -4px 6px 0 rgba(255, 255, 255, 0.5),
      inset 4px 4px 6px 0 rgba(116, 125, 136, 0.3);
    transition: all 0.3s ease;
  }
  .btn-8:before {
    height: 0%;
    width: 2px;
  }
  .btn-8:after {
    width: 0%;
    height: 2px;
  }
  .btn-8:hover:before {
    height: 100%;
  }
  .btn-8:hover:after {
    width: 100%;
  }
  .btn-8:hover {
    background: transparent;
    color: #4dccc6;
  }
`;