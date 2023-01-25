import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NewPasswordPage = () => {
  const [newPassword1, setNewPassword1] = useState('');
  const [newPassword2, setNewPassword2] = useState('');
  
  const NewPassword1Handler = (event) => {
    setNewPassword1(event.target.value);
  };
  const NewPassword2Handler = (event) => {
    setNewPassword2(event.target.value);
  };

  const ChangeToPassword = () => {
    console.log(newPassword1);
    console.log(newPassword2);
    if (newPassword1 === newPassword2){
      navigate('/codemeets/login');
    } else {
      alert('비밀번호가 일치하지 않습니다.');
    };
  }

  const navigate = useNavigate();

  // const ToLoginHandler = () => {
  //   navigate('/login');
  // };
  return (
    <div>
      <h2>비밀번호 변경</h2>
      <div>
        <h5>새 비밀번호 </h5>
        <input type="password" placeholder="password" onChange={NewPassword1Handler}/>
        <br />
      </div>
      <div>
        <h5>새 비밀번호 확인 </h5>
        <input type="password" placeholder="password" onChange={NewPassword2Handler}/>
      </div>
      <div>
        <br />
        <button type="button" onClick={ChangeToPassword}>
          확인
        </button>
      </div>
    </div>
  );
};
export default NewPasswordPage;