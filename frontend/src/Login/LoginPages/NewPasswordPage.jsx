import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { APIroot } from '../../Store';
import { useRecoilValue } from 'recoil';

const NewPasswordPage = () => {
  const [newPassword1, setNewPassword1] = useState('');
  const [newPassword2, setNewPassword2] = useState('');

  const [passwordMessage, setPasswordMessage] = useState('');
  const [passwordMessage2, setPasswordMessage2] = useState('');
  const [isPasswordConfirm1, setIsPasswordConfirm1] = useState(false);
  const [isPasswordConfirm2, setIsPasswordConfirm2] = useState(false);

  const API = useRecoilValue(APIroot);

  const navigate = useNavigate();
  const location = useLocation();
  const userId = location.state.findId;

  const NewPassword1Handler = (event) => {
    const currentPassword = event.target.value;
    setNewPassword1(currentPassword);
    const passwordRegExp =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    if (!passwordRegExp.test(currentPassword)) {
      setPasswordMessage(
        '숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!'
      );
      setIsPasswordConfirm1(false);
    } else {
      setPasswordMessage('안전한 비밀번호 입니다.');
      setIsPasswordConfirm1(true);
    }
  };

  const NewPassword2Handler = (event) => {
    const currentPassword2 = event.target.value;
    setNewPassword2(currentPassword2);
    if (newPassword1 !== currentPassword2) {
      setPasswordMessage2('비밀번호가 일치하지 않습니다.');
      setIsPasswordConfirm2(false);
    } else {
      setPasswordMessage2('똑같은 비밀번호를 입력했습니다.');
      setIsPasswordConfirm2(true);
    }
  };

  const ChangeToPassword = () => {
    if (newPassword1 == '' || newPassword2 == '') {
      alert('새 비밀번호를 입력해 주시기 바랍니다.');
      return;
    } else if (newPassword1 != newPassword2) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    } else if (isPasswordConfirm1 == true && isPasswordConfirm2 == true) {
      axios({
        method: 'PUT',
        url: `${API}/user/edit-pw?userId=${userId}&password=${newPassword1}`,
      }).then((response) => {
        if (response.data.message === 'success') {
          alert('비밀번호 변경 완료');
          navigate('/');
        }
      });
    } else {
      alert('양식을 맞춰주시기 바랍니다.');
    }
  };

  const CancelHandler = () => {
    navigate('/');
  };

  // 새 비밀번호 정규식 맞추기
  return (
    <MainStyle>
      <h1>Change Password</h1>
      <div style={{ marginTop: '40px', marginBottom: '40px' }}>
        <label htmlFor="">New Password</label>
        <div>
          <input
            type="password"
            placeholder="password"
            onChange={NewPassword1Handler}
          />
          <MessageStyle>{passwordMessage}</MessageStyle>
        </div>
      </div>
      <label>Check Password</label>
      <div>
        <input
          type="password"
          placeholder="password"
          onChange={NewPassword2Handler}
        />
        <MessageStyle>{passwordMessage2}</MessageStyle>
      </div>
      <div>
        <br />
        <button type="button" onClick={ChangeToPassword}>
          Submit
        </button>
        <button type="button" onClick={CancelHandler}>
          Cancel
        </button>
      </div>
    </MainStyle>
  );
};
export default NewPasswordPage;

const MainStyle = styled.div`
  input {
    margin: 8px;
    margin-left: 0px;
  }
`;
const MessageStyle = styled.p`
  font-size: 4px;
`;
