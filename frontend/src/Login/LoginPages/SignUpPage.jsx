import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {
  const imageinput = useRef();

  const [inputName, setInputName] = useState('');
  const [inputId, setInputId] = useState('');
  const [inputPw, setInputPw] = useState('');
  const [inputSecondPw, setInputSecondPw] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const [inputPhoneNum, setInputPhoneNum] = useState('');
  const [inputImage, setInputImage] = useState('');
  const [inputNicName, setInputNicName] = useState('Unregistered');
  const [privateEmail, setPrivateEmail] = useState(true);
  const [privatePhoneNum, setPrivatePhoneNum] = useState(true);
  const [checkInformation, setCheckInformation] = useState(false);

  const navigate = useNavigate();

  const inputNameHandler = (event) => {
    setInputName(event.target.value);
  };
  const inputIdHandler = (event) => {
    setInputId(event.target.value);
  };
  const inputPwHandler = (event) => {
    setInputPw(event.target.value);
  };
  const inputSecondPwHandler = (event) => {
    setInputSecondPw(event.target.value);
  };
  const inputEmailHandler = (event) => {
    setInputEmail(event.target.value);
  };
  const inputPhoneNumHandler = (event) => {
    setInputPhoneNum(event.target.value);
  };
  const inputImageHandler = (event) => {
    // setInputImage(event.target.value);
    event.preventDefault();
    setInputImage(URL.createObjectURL(event.target.files[0]))
  };
  const deleteFileImage = () => {
    URL.revokeObjectURL(inputImage);
    setInputImage('');
    imageinput.current.value = null
  };
  const inputNicNameHandler = (event) => {
    setInputNicName(event.target.value);
  };

  const changePrivateEmailHandler = () => {
    setPrivateEmail(!privateEmail);
  };
  const changePrivatePhoneNumHandler = () => {
    setPrivatePhoneNum(!privatePhoneNum);
  };

  const InfoAgreeCheck = () => {
    setCheckInformation(!checkInformation);
  }

  const JoinSuccessHandler = () => {
    //await 쓰려면 = async () => { 해줘야 됨
    console.log(
      JSON.stringify({
        email: inputEmail,
        emailPublic: +privateEmail, // 최종 privateEmail이 + true 면 1 ,  + false 면 0 결과로 보내줌
        nickname: inputNicName,
        password: inputPw,
        profilePhoto: inputImage,
        tel: inputPhoneNum,
        telPublic: +privatePhoneNum,
        userId: inputId,
        userName: inputName,
      })
    );
    if (inputPw !== inputSecondPw) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    if (
      inputName === '' ||
      inputId === '' ||
      inputPw === '' ||
      inputSecondPw === '' ||
      inputEmail === '' ||
      inputPhoneNum === ''
    ) {
      alert('필수사항 입력해주세요.');
      return;
    }
    if (checkInformation === false) {
      alert('정보 제공 동의는 필수입니다.')
      return;
    }
    // await fetch 를 쓸거면 양식 맞게 써준 뒤 if문으로 id 중복이 아니면 다음 fetch 검사하는 식으로 짜야 됨.

    fetch('http://aeoragy.iptime.org:18081/user/regist', {
      // await fetch : fetch를 하나씩 하나씩 실행되어 검사하는 것.
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        email: inputEmail,
        emailPublic: +privateEmail,
        nickname: inputNicName,
        password: inputPw,
        profilePhoto: inputImage,
        tel: inputPhoneNum,
        telPublic: +privatePhoneNum,
        userId: inputId,
        userName: inputName,
      }),
    })
      .then((response) => {
        if (response.ok) {
          alert(`${inputName}님, 반갑습니다.`)
          navigate('/codemeets/login');
        }
      })
      .catch((err) => console.log(err));
  };

  // 현재 등록되어 있는 아이디 admin01
  const IdOverlapConfirm = () => {
    fetch(`http://aeoragy.iptime.org:18081/user/overlap?userId=${inputId}`)
      .then((response) => response.json())
      .then((response) => {
        if (JSON.stringify(response) === '1') {
          alert('이미 존재하는 아이디 입니다.');
        } else{
          alert('사용 가능한 ID입니다.');
        }
      })
      .catch((err) => console.log(err));
  };

  // 사용중인 이메일 : ssafy@naver.com
  const EmailOverlapConfirm = () => {
    fetch(`http://aeoragy.iptime.org:18081/user/emailOverlap?email=${inputEmail}`)
    .then((response) => response.json())
    .then((response) => {
      if (JSON.stringify(response) === '1'){
        alert('이미 사용되고 있는 이메일 입니다.');
      } else {
        alert('사용 가능한 이메일 입니다.');
      }
    })
    .catch((err) => console.log(err))
  }

  // 사용중인 번호 : f
  const PhoneNumOverlapConfirm = () => {
    fetch(`http://aeoragy.iptime.org:18081/user/telOverlap?tel=${inputPhoneNum}`)
    .then((response) => response.json())
    .then((response) => {
      if (JSON.stringify(response) === '1'){
        alert('이미 등록된 번호 입니다.');
      } else {
        alert('사용가능한 번호 입니다.');
      }
    })
    .catch((err) => console.log(err))
  }
  
  const JoinCancelHandler = () => {
    navigate('/codemeets/login');
  };

  return (
    <div>
      <h2>회원가입 페이지</h2>
      <h4>필수 사항</h4>
      <div>
        <input type="text" placeholder="Name" onChange={inputNameHandler} />
      </div>
      <div>
        <span>
          <input type="text" placeholder="ID" onChange={inputIdHandler} />
          <button type="submit" onClick={IdOverlapConfirm}>
            중복 확인
          </button>
        </span>
      </div>
      <div>
        <input type="text" placeholder="Password" onChange={inputPwHandler} />
      </div>
      <div>
        <input
          type="text"
          placeholder="Password"
          onChange={inputSecondPwHandler}
        />
      </div>
      <div>
        <span>
          <input
            type="text"
            placeholder="E-mail"
            onChange={inputEmailHandler}
          />
          <button type="submit" onClick={EmailOverlapConfirm}>
            중복 확인
          </button>
          <input type="checkbox" onClick={changePrivateEmailHandler} /> 비공개
        </span>
      </div>
      <span>
        <input
          type="text"
          placeholder="Phone Number"
          onChange={inputPhoneNumHandler}
        />
        <button type="submit" onClick={PhoneNumOverlapConfirm}>
            중복 확인
          </button>
        <input type="checkbox" onClick={changePrivatePhoneNumHandler} /> 비공개
      </span>
      <h4>선택 사항</h4>
      프로필 이미지
      <div>
        {inputImage && (<img alt="sample" src={inputImage} />)}
        <input type="file" accept="image/*" onChange={inputImageHandler} ref={imageinput}/>
        <button type="button" onClick={() => deleteFileImage()}>삭제</button>
      </div>
      <div>
        <input
          type="text"
          placeholder="Nick Name"
          onChange={inputNicNameHandler}
        />
      </div>
      <div>
        <span>
          <input type="checkbox" onClick={InfoAgreeCheck}/>(필수)위 내용을 제공하는 것에 동의 합니다.
        </span>
      </div>
      <button type="button" onClick={JoinSuccessHandler}>
        가입
      </button>
      <button type="button" onClick={JoinCancelHandler}>
        취소
      </button>
    </div>
  );
};

export default SignUpPage;
