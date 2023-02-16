import styled from 'styled-components';
import defaultImage from '../../Images/Logo.png';
import { useState, useEffect } from 'react';
import { user, APIroot } from '../../Store';
import { useRecoilValue } from 'recoil';
import MyPageEditModal from './MyPageEditModal';
import '../../App.css';

const MyPageProfile = () => {
  const userInfo = useRecoilValue(user);
  const API = useRecoilValue(APIroot);

  const [imageNotExist, setImageNotExist] = useState('');
  const [editModalOpen, setEditModalOpen] = useState(false);

  const editModalOpenHandler = () => {
    setEditModalOpen(true);
    console.log(userInfo)
  };

  useEffect(() => {
    if (userInfo.profilePhoto === '') {
      setImageNotExist(defaultImage);
    } else {
      if (userInfo.profilePhoto.includes('http')) {
        setImageNotExist(`${userInfo.profilePhoto}`);
      } else {
        setImageNotExist(`${API}/file/images/${userInfo.profilePhoto}`);
      }
    }
  }, [userInfo]);

  return (
    <ProfileCard>
      <ProfileImage src={`${imageNotExist}`} />
      <ProfileInformation>
        <TitleStyle>
          <div className="name">{userInfo.userName}</div>
          <div className="nickname">( {userInfo.nickname} )</div>
        </TitleStyle>
        <TitleStyle>
          <div className="nickname">
            {userInfo.email}
            {userInfo.emailPublic == 0 ? <p> (비공개)</p> : <p> (공개)</p>}
          </div>
        </TitleStyle>
        <TitleStyle>
        <TitleStyle>
            <div className="nickname">
              {userInfo.tel}
              {userInfo.telPublic == 0 ? <p> (비공개)</p> : <p> (공개)</p>}
            </div>
          </TitleStyle>
          <div className="edit" onClick={editModalOpenHandler}>
            Edit
          </div>
          {editModalOpen && (
            <MyPageEditModal
              open={editModalOpen}
              onClose={() => {
                setEditModalOpen(false);
              }}
            ></MyPageEditModal>
          )}
        </TitleStyle>
      </ProfileInformation>
    </ProfileCard>
  );
};

export default MyPageProfile;

const ProfileCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 20px;
  height: 170px;
`;

const ProfileImage = styled.img`
  width: 150px;
  height: 150px;
  padding-left: 10px;
  padding-right: 10px;
`;

const ProfileInformation = styled.div`
  width: 75%;
  align-items: center;
`;

const TitleStyle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: end;
  height: 6vh;
  .name {
    display: flex;
    font-size: 2em;
    margin-right: 5px;
    font-family: 'yanoljaBold';
  }
  .nickname {
    display: flex;
    align-items: center;
    font-size: 1em;
  }
  .edit {
    margin-left: 70%;
    color: #5454e2;
    cursor: pointer;

    &:hover {
      color: #10f14c;
      transition: 0.5s;
      text-decoration: none;
    }
  }
`;
