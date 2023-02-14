import React, { useEffect, useRef, useState } from 'react';
import Modal from '../../CommonComponents/Modal/Modal';
import { user } from '../../Store';
import { APIroot } from '../../Store';
import { useRecoilState, useRecoilValue } from 'recoil';
import axios from 'axios';
import styled from 'styled-components';
import imageCompression from 'browser-image-compression';
import { Navigate } from 'react-router-dom';

const MyPageEditModal = ({ onClose }) => {
  const title = 'My Profile Edit';
  const API = useRecoilValue(APIroot);
  const imageRef = useRef();
  const LoginUser = useRecoilValue(user);
  //   const userPk = useRecoilValue(user.userPk);
  const [newUserInfo, setNewUserInfo] = useRecoilState(user);

  // 이메일, 닉네임, 전화번호, 프로필 사진 새거로.
  const [newNickName, setNewNickName] = useState(newUserInfo.nickname);
  const [newEmail, setNewEmail] = useState(newUserInfo.email);
  const [newTel, setNewTel] = useState(newUserInfo.tel);
  const [newProfilePhoto, setNewProfilePhoto] = useState(
    newUserInfo.profilePhoto
  );
  const [previewImage, setPreviewImage] = useState(newUserInfo.profilePhoto);
  const [privateEmail, setPrivateEmail] = useState(newUserInfo.emailPublic);
  const [privatePhoneNum, setPrivatePhoneNum] = useState(newUserInfo.telPublic);

  // 유효성 검사
  const [isNickName, setIsNickName] = useState(true);
  const [isEmail, setIsEmail] = useState(true);
  const [isPhone, setIsPhone] = useState(true);
  const [isImgChange, setIsImgChange] = useState(true);

  // 중복 검사
  const [overlapEmail, setOverlapEmail] = useState(true);
  const [overlapPhone, setOverlapPhone] = useState(true);

  // 오류메세지 상태 저장
  const [nickNameMessage, setNickNameMessage] = useState('현재 닉네임입니다.');
  const [emailMessage, setEmailMessage] = useState('현재 이메일입니다.');
  const [phoneMessage, setPhoneMessage] = useState('현재 번호입니다.');

  useEffect(() => {
    if (previewImage !== newUserInfo.profilePhoto) setIsImgChange(true);
  }, [previewImage]);

  //   useEffect(() => {

  //     ToChangeNewNicknameHandler()
  //   },[isNickName]);

  const ToChangeNewNicknameHandler = (event) => {
    const currentName = event.target.value;
    console.log('길이------------------', currentName.length);
    setNewNickName(currentName);
    console.log(currentName);
    if (currentName === newUserInfo.nickname) {
      console.log('1');
      setIsNickName(true);
      setNickNameMessage('현재 닉네임입니다.');
    } else if (currentName.length < 3 || currentName.length > 9) {
      console.log('2');
      setNickNameMessage('닉네임은 3글자 이상 9글자 이하로 입력해주세요!');
      setIsNickName(false);
    } else {
      console.log('3');

      setNickNameMessage('사용가능한 닉네임 입니다.');
      setIsNickName(true);
    }
    console.log('----------------------------', isNickName);
  };

  const ToChangeEmailHandler = (event) => {
    const currentEmail = event.target.value;
    console.log(currentEmail);
    setNewEmail(currentEmail);
    fetch(`${API}/user/emailOverlap?email=${currentEmail}`)
      .then((response) => response.json())
      .then((response) => {
        if (currentEmail === newUserInfo.email) {
          setIsEmail(true);
          setOverlapEmail(true);
          setEmailMessage('현재 이메일입니다.');
        } else if (JSON.stringify(response) === '1') {
          setOverlapEmail(false);
          setEmailMessage('누군가 사용중인 이메일입니다.');
        } else {
          setOverlapEmail(true);
        }
      })
      .catch((error) => console.log(error));

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

  const ToChangeTelHandler = (event) => {
    const currentPhone = event.target.value;
    setNewTel(currentPhone);

    fetch(`${API}/user/telOverlap?tel=${currentPhone}`)
      .then((response) => response.json())
      .then((response) => {
        if (currentPhone === newUserInfo.tel) {
          setIsPhone(true);
          setOverlapPhone(true);
          setPhoneMessage('현재 번호입니다.');
        } else if (JSON.stringify(response) === '1') {
          setPhoneMessage('누군가 사용중인 번호입니다.');
          setOverlapPhone(false);
        } else {
          setOverlapPhone(true);
        }
      })
      .catch((error) => console.log(error));

    const phoneRegExp = /^01([0|1|6|7|8|9])([0-9]{3,4})([0-9]{4})$/;

    if (!phoneRegExp.test(currentPhone)) {
      setPhoneMessage('올바른 형식이 아닙니다!');
      setIsPhone(false);
    } else {
      setPhoneMessage('사용 가능한 번호입니다:-)');
      setIsPhone(true);
    }
  };

  const ToChangeImageHandler = (event) => {
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
      setNewProfilePhoto(newFile);
      console.log(newFile);
      console.log('여기가 넘어온거');
      const formData = new FormData();
      formData.append('files', newFile);
      //이미지 보내고 이미지에 관한 고유 이름 받아오기
      for (const keyValue of formData) console.log(keyValue);
      axios({
        method: 'POST',
        url: `${API}/file/images`,
        data: formData,
      })
        .then((response) => {
          console.log(response.data);
          setNewProfilePhoto(response.data);
        })
        .catch((err) => console.log(err));
    });
  };

  const changePrivateEmailHandler = () => {
    setPrivateEmail(!privateEmail);
  };

  const changePrivatePhoneHandler = () => {
    setPrivatePhoneNum(!privatePhoneNum);
  };

  console.log(newUserInfo);

  const ToChangeUserInfoHandler = (event) => {
    console.log('클릭 함수로 들어옴');
    console.log(
      isNickName === 'Unregistered' || isNickName === '' || isNickName !== '',
      isEmail,
      isPhone,
      overlapEmail,
      overlapPhone
    );
    event.preventDefault();
    console.log(
      isNickName && isEmail && isPhone && overlapEmail && overlapPhone
    );
    if (isNickName && isEmail && isPhone && overlapEmail && overlapPhone) {
      axios({
        method: 'PUT',
        url: `${API}/user/edit-profile`,
        headers: {
          'Content-Type': 'application/json',
          AccessToken: `${localStorage.getItem('ACCESS_TOKEN')}`,
        },
        data: JSON.stringify({
          email: newEmail,
          emailPublic: +privateEmail,
          nickname: newNickName,
          profilePhoto: `${newProfilePhoto}`,
          tel: newTel,
          telPublic: +privatePhoneNum,
        }),
      })
        .then((response) => {
          setNewUserInfo((prev) => {
            return {
              ...prev,
              email: newEmail,
              emailPublic: +privateEmail,
              nickname: newNickName,
              profilePhoto: `${newProfilePhoto}`,
              tel: newTel,
              telPublic: +privatePhoneNum,
            };
          });
          console.log(response.data);
          alert('수정 완료');
          onClose?.();
          //   Navigate(`/my-page/${newUserInfo.userPk}/meeting-list`)
        })
        .catch((error) => {
          console.log(error);

          alert('유효성 확인 바랍니다.');
        });
    }
  };
  console.log();
  const CancelHandler = () => {
    onClose?.();
    // Navigate(`${API}/my-page/${LoginUser.userPk}/meeting-list`)
  };

  return (
    <Modal onClose={onClose} ModalTitle={title}>
      <EditContainer isImgChange={isImgChange}>
        <TitleStyle>
          <div className="name">닉네임</div>
          <input
            type="text"
            style={{ border: 'solid 2px grey' }}
            onChange={ToChangeNewNicknameHandler}
            defaultValue={newUserInfo.nickname}
          />
        </TitleStyle>
        <MessageStyle>{nickNameMessage}</MessageStyle>
        <TitleStyle>
          <div className="name">이메일</div>
          <input
            type="text"
            style={{ border: 'solid 2px grey' }}
            onChange={ToChangeEmailHandler}
            defaultValue={newUserInfo.email}
          />
        </TitleStyle>
        <MessageStyle>{emailMessage}</MessageStyle>
        <CheckBoxStyle>
          <input type="checkbox" onClick={changePrivateEmailHandler} />
          공개 여부 변경
        </CheckBoxStyle>
        <TitleStyle>
          <div className="name">전화번호</div>
          <input
            type="text"
            style={{ border: 'solid 2px grey' }}
            onChange={ToChangeTelHandler}
            defaultValue={newUserInfo.tel}
          />
        </TitleStyle>
        <MessageStyle>{phoneMessage}</MessageStyle>
        <CheckBoxStyle>
          <input type="checkbox" onClick={changePrivatePhoneHandler} />
          공개 여부 변경
        </CheckBoxStyle>
        <TitleStyle>
          <ImageStyle>
            <label htmlFor="">프로필 이미지</label>
            <div>
              <img src={previewImage} />
              <InputStyle
                type="file"
                accept="image/*"
                onChange={(event) => ToChangeImageHandler(event)}
                ref={imageRef}
              />
            </div>
          </ImageStyle>
        </TitleStyle>
        <TitleStyle>
          <SubButtonStyle>
            <div className="position">
              <button
                className="custom-btn btn-8"
                onClick={ToChangeUserInfoHandler}
              >
                수정
              </button>
            </div>
          </SubButtonStyle>
          <SubButtonStyle>
            <button className="custom-btn btn-8" onClick={CancelHandler}>
              취소
            </button>
          </SubButtonStyle>
        </TitleStyle>
      </EditContainer>
    </Modal>
  );
};

export default MyPageEditModal;

const TitleStyle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end; // 세로 기준 맨 아래
  height: 6vh;
  .name {
    display: flex;
    /* margin-right: 5px; */
    width: 40%;
  }
  .nickname {
    display: flex;
    width: 60%;
  }
  .position {
    margin-left: 60px;
  }
  &:nth-child(6) {
    align-items: center !important;
  }
`;

const CheckBoxStyle = styled.div`
  display: flex;
  align-items: center;
  margin: 0 0 0 33%;

  input {
    width: fit-content;
  }
`;

const ButtonStyle = styled.div`
  margin-left: 100px;
  width: 15%;
  height: 25px;
`;

const InputStyle = styled.input`
  margin: 0 0 0 10px;
  padding-bottom: 10px;
`;

const ImageStyle = styled.div`
  display: flex;
  align-items: center;
  margin: auto;

  label {
    //107.8 21.6
    width: 101px;
  }

  div {
    display: flex;
    width: 70%;
    align-items: center;
    margin: 0 0 0 30px;
  }
`;

const MessageStyle = styled.p`
  font-size: 4px;
  margin: 5px 0 5px 140px;
  color: red solid;
`;

// 모달창 안 높이 조정. 이미지 변경하기 위해 파일 업로드를 한다면 380px로 높이 조정. 그렇지 않으면 모달 내 높이로 조정
const EditContainer = styled.div`
  height: ${(props) => (props.isImgChange ? '380px' : 'fit-content')};
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
