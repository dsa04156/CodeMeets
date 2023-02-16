import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import imageCompression from 'browser-image-compression'; // npm install browser-image-compression --save
import styled from 'styled-components';

import { APIroot } from '../../Store';
import { useRecoilValue } from 'recoil';

import axios from 'axios';
import FormData from 'form-data';

const SignUpPage = () => {
  const imageinput = useRef();
  const API = useRecoilValue(APIroot);

  // 초기값 세팅 - 이름, 아이디, 비밀번호 등
  const [inputName, setInputName] = useState('');
  const [inputId, setInputId] = useState('');
  const [inputPw, setInputPw] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const [inputPhoneNum, setInputPhoneNum] = useState('');
  const [inputImage, setInputImage] = useState('');
  const [previewImage, setPreviewImage] = useState('');
  const [inputNickName, setInputNickName] = useState('Unregistered');

  // 초기값 세팅 -  비공개
  const [privateEmail, setPrivateEmail] = useState(true);
  const [privatePhoneNum, setPrivatePhoneNum] = useState(true);
  const [checkInformation, setCheckInformation] = useState(false);

  // 오류메세지 상태 저장
  const [idMessage, setIdMessage] = useState('');
  const [nameMessage, setNameMessage] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState('');
  const [emailMessage, setEmailMessage] = useState('');
  const [phoneMessage, setPhoneMessage] = useState('');

  // 유효성 검사
  const [isId, setIsId] = useState(false);
  const [isname, setIsName] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [isPhone, setIsPhone] = useState(false);

  // 중복 검사
  const [overlapId, setOverlapId] = useState(false);
  const [overlapPhone, setOverlapPhone] = useState(false);
  const [overlapEmail, setOverlapEmail] = useState(false);

  const navigate = useNavigate();

  const inputNameHandler = (event) => {
    setInputName(event.target.value);
  };

  const inputIdHandler = (e) => {
    const currentId = e.target.value;
    setInputId(currentId);
    const idRegExp = /^[a-zA-z0-9]{4,12}$/;

    if (!idRegExp.test(currentId)) {
      setIdMessage('4-12사이 대소문자 또는 숫자만 입력해 주세요!');
      setIsId(false);
    } else {
      setIdMessage('사용가능한 아이디 입니다.');
      setIsId(true);
    }
  };

  const inputPwHandler = (e) => {
    const currentPassword = e.target.value;
    setInputPw(currentPassword);
    const passwordRegExp =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    if (!passwordRegExp.test(currentPassword)) {
      setPasswordMessage(
        '숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!'
      );
      setIsPassword(false);
    } else {
      setPasswordMessage('안전한 비밀번호 입니다.');
      setIsPassword(true);
    }
  };

  const inputSecondPwHandler = (e) => {
    const currentPasswordConfirm = e.target.value;
    // setInputSecondPw(currentPasswordConfirm);
    if (inputPw !== currentPasswordConfirm) {
      setPasswordConfirmMessage('비밀번호가 일치하지 않습니다.');
      setIsPasswordConfirm(false);
    } else {
      setPasswordConfirmMessage('똑같은 비밀번호를 입력했습니다.');
      setIsPasswordConfirm(true);
    }
  };

  const inputEmailHandler = (e) => {
    const currentEmail = e.target.value;
    setInputEmail(currentEmail);
    const emailRegExp =
      /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$/;

    if (!emailRegExp.test(currentEmail)) {
      setEmailMessage('이메일의 형식이 올바르지 않습니다!');
      setIsEmail(false);
    } else {
      setEmailMessage('사용 가능한 이메일 입니다.');
      setIsEmail(true);
    }
  };

  const inputPhoneNumHandler = (e) => {
    const currentPhone = e.target.value;
    setInputPhoneNum(currentPhone);
    const phoneRegExp = /^01([0|1|6|7|8|9])([0-9]{3,4})([0-9]{4})$/;

    if (!phoneRegExp.test(currentPhone)) {
      setPhoneMessage('올바른 형식이 아닙니다!');
      setIsPhone(false);
    } else {
      setPhoneMessage('사용 가능한 번호입니다:-)');
      setIsPhone(true);
    }
  };

  const inputImageHandler = (event) => {
    //이미지 미리보기 코드 해석 참고: https://velog.io/@devyouth94/react-%EC%9D%B4%EB%AF%B8%EC%A7%80-%EB%A6%AC%EC%82%AC%EC%9D%B4%EC%A7%95%EC%9D%84-%ED%95%B4%EB%B3%B4%EC%9E%90-%EC%9D%B4%EB%AF%B8%EC%A7%80-%EB%AF%B8%EB%A6%AC%EB%B3%B4%EA%B8%B0
    const encodeFile = (file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      return new Promise((resolve) => {
        reader.onload = () => {
          setPreviewImage(reader.result);
          resolve();
        };
      });
    };

    // 이미지 리사이징
    const [file] = event.target.files;
    imageCompression(file, {
      maxSizeMB: 1,
      maxWidthOrHeight: 100,
    }).then((compressedFile) => {
      const newFile = new File([compressedFile], file.name, {
        type: file.type,
      });

      //이미지 미리보기 관련
      encodeFile(newFile);
      setInputImage(newFile);
      const formData = new FormData();
      formData.append('files', newFile);
      //이미지 보내고 이미지에 관한 고유 이름 받아오기
      axios({
        method: 'POST',
        url: `${API}/file/images`,
        data: formData,
      })
        .then((response) => {
          setInputImage(response.data);
        })
        .catch((err) => console.log(err));
    });
  };

  const deleteFileImage = () => {
    setPreviewImage(null);
    setInputImage('');
    imageinput.current.value = null;
  };

  const inputNickNameHandler = (e) => {
    const currentName = e.target.value;
    setInputNickName(currentName);

    if (currentName.length < 3 || currentName.length > 9) {
      setNameMessage('닉네임은 3글자 이상 9글자 이하로 입력해주세요!');
      setIsName(false);
    } else {
      setNameMessage('사용가능한 닉네임 입니다.');
      setIsName(true);
    }
  };

  const changePrivateEmailHandler = () => {
    setPrivateEmail(!privateEmail);
  };

  const changePrivatePhoneNumHandler = () => {
    setPrivatePhoneNum(!privatePhoneNum);
  };

  const InfoAgreeCheck = () => {
    setCheckInformation(!checkInformation);
  };

  const JoinSuccessHandler = (e) => {
    e.preventDefault();
    if (
      isId &&
      (inputNickName === 'Unregistered' || inputNickName === '' || isname) &&
      isPassword &&
      isPasswordConfirm &&
      isEmail &&
      isPhone &&
      overlapId &&
      overlapPhone &&
      overlapEmail &&
      checkInformation
    ) {
      axios({
        method: 'POST',
        url: `${API}/user/regist`,
        headers: {
          'Content-Type': 'application/json',
        },
        data: JSON.stringify({
          email: inputEmail,
          emailPublic: +privateEmail, // 최종 privateEmail이 + true 면 1 ,  + false 면 0 결과로 보내줌
          nickname: inputNickName,
          password: inputPw,
          profilePhoto: `${inputImage}`,
          tel: inputPhoneNum,
          telPublic: +privatePhoneNum,
          userId: inputId,
          userName: inputName,
        }),
      })
        .then(() => {
          navigate('/');
        })
        .catch((error) => {
          alert(error);
        });
    } else {
      alert('입력을 확인해주시기 바랍니다.');
    }
  };

  const IdOverlapConfirm = () => {
    fetch(`${API}/user/overlap?userId=${inputId}`)
      .then((response) => response.json())
      .then((response) => {
        if (JSON.stringify(response) === '1') {
          alert('이미 존재하는 아이디 입니다.');
          setOverlapId(false);
        } else {
          alert('사용 가능한 ID입니다.');
          setOverlapId(true);
        }
      })
      .catch((err) => console.log(err));
  };

  const EmailOverlapConfirm = () => {
    fetch(`${API}/user/emailOverlap?email=${inputEmail}`)
      .then((response) => response.json())
      .then((response) => {
        if (JSON.stringify(response) === '1') {
          alert('이미 사용되고 있는 이메일 입니다.');
          setOverlapEmail(false);
        } else {
          alert('사용 가능한 이메일 입니다.');
          setOverlapEmail(true);
        }
      })
      .catch((err) => console.log(err));
  };

  const PhoneNumOverlapConfirm = () => {
    fetch(`${API}/user/telOverlap?tel=${inputPhoneNum}`)
      .then((response) => response.json())
      .then((response) => {
        if (JSON.stringify(response) === '1') {
          alert('이미 등록된 번호 입니다.');
          setOverlapPhone(false);
        } else {
          alert('사용가능한 번호 입니다.');
          setOverlapPhone(true);
        }
      })
      .catch((err) => console.log(err));
  };

  const JoinCancelHandler = () => {
    navigate('/');
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <FormStyle>
        <h4 style={{ marginTop: '0px' }}>필수 사항</h4>
        <label htmlFor="">Name</label>
        <span>
          <InputStyle
            type="text"
            placeholder="Name"
            onChange={inputNameHandler}
          />
        </span>
        <label htmlFor="">ID</label>
        <div>
          <span>
            <InputStyle
              type="text"
              placeholder="ID"
              onChange={inputIdHandler}
            />
            <button type="submit" onClick={IdOverlapConfirm}>
              중복 확인
            </button>
          </span>
          <MessageStyle>{idMessage}</MessageStyle>
        </div>
        <label htmlFor="">Password</label>
        <div>
          <InputStyle
            type="password"
            placeholder="Password"
            onChange={inputPwHandler}
          />
          <MessageStyle>{passwordMessage}</MessageStyle>
        </div>
        <label htmlFor="">Password Check</label>
        <div>
          <InputStyle
            type="password"
            placeholder="Password"
            onChange={inputSecondPwHandler}
          />
          <MessageStyle>{passwordConfirmMessage}</MessageStyle>
        </div>
        <label htmlFor="">E-mail</label>
        <div>
          <span>
            <InputStyle
              type="text"
              placeholder="E-mail"
              onChange={inputEmailHandler}
            />
            <button type="submit" onClick={EmailOverlapConfirm}>
              중복 확인
            </button>
            <MessageBox>
              <MessageStyle>{emailMessage}</MessageStyle>
              <CheckBoxStyle>
                <input type="checkbox" onClick={changePrivateEmailHandler} />
                비공개
              </CheckBoxStyle>
            </MessageBox>
          </span>
        </div>
        <label htmlFor="">Phone number</label>
        <span>
          <InputStyle
            type="text"
            placeholder="Phone Number"
            onChange={inputPhoneNumHandler}
          />
          <button type="submit" onClick={PhoneNumOverlapConfirm}>
            중복 확인
          </button>
          <MessageBox>
            <MessageStyle>{phoneMessage}</MessageStyle>
            <CheckBoxStyle>
              <input type="checkbox" onClick={changePrivatePhoneNumHandler} />
              비공개
            </CheckBoxStyle>
          </MessageBox>
        </span>
        <h4>선택 사항</h4>
        <label htmlFor="">프로필 이미지</label>
        <div>
          <img src={previewImage} />
          <InputStyle
            type="file"
            accept="image/*"
            onChange={(event) => inputImageHandler(event)}
            ref={imageinput}
            style={{ height: '25px' }}
          />
          <button type="button" onClick={() => deleteFileImage()}>
            삭제
          </button>
        </div>
        <label htmlFor="">닉네임</label>
        <div>
          <InputStyle
            type="text"
            placeholder="Nick Name"
            onChange={inputNickNameHandler}
          />
        </div>
        <MessageStyle>{nameMessage}</MessageStyle>
        <div>
          <LastCheckBox>
            <input type="checkbox" onClick={InfoAgreeCheck} />
            (필수)위 내용을 제공하는 것에 동의 합니다.
          </LastCheckBox>
        </div>
        <div>
          <button
            type="button"
            onClick={JoinSuccessHandler}
            style={{ marginRight: '5px' }}
          >
            가입
          </button>
          <button type="button" onClick={JoinCancelHandler}>
            취소
          </button>
        </div>
      </FormStyle>
    </div>
  );
};

export default SignUpPage;

const InputStyle = styled.input`
  margin: 3px;
`;

const CheckBoxStyle = styled.div`
  display: flex;
  align-items: center;
  input {
    width: 20px;
  }
`;

const FormStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  padding-left: 7rem;
  height: 33rem;
  width: 25rem;
  padding-bottom: 30px;
  overflow-y: scroll;
`;

const LastCheckBox = styled.div`
  display: flex;
  input {
    width: 20px;
  }
`;

const MessageStyle = styled.p`
  font-size: 4px;
`;

const MessageBox = styled.span`
  display: flex;
  justify-content: space-between;
  width: 18rem;
`;
