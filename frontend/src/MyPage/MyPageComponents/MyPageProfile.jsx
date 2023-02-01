import styled from 'styled-components';
import defaultImage from '../../Images/Logo.png';
import { useState, useEffect } from 'react';
import { user, APIroot } from '../../Store';
import { useRecoilState, useRecoilValue } from 'recoil';

const MyPageProfile = () => {
  const userInfo = useRecoilValue(user);
  const API = useRecoilValue(APIroot);

  const [imageNotExist, setImageNotExist] = useState(defaultImage);
  useEffect(() => {
    console.log(userInfo.profilePhoto);
    if (userInfo.profileImage === '') {
      setImageNotExist(defaultImage);
    } else {
      setImageNotExist(`${API}/file/images/${userInfo.profilePhoto}`);
    }
  }, [userInfo]);
  console.log(userInfo);

  return (
    <ProfileCard>
      <ProfileImage src={`${imageNotExist}`} />
      <ProfileInformation>
        <TitleStyle>
            <div className='name'>{userInfo.userName}</div>
            <div className='nickname'>( {userInfo.nickname} )</div>
        </TitleStyle>
        <TitleStyle>
        <div>{userInfo.email}</div>
        </TitleStyle>
        <TitleStyle>
        <div>{userInfo.tel}</div>
        <div className='edit'>Edit</div>
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
  border: 1px solid black;
  border-radius: 20px;
  height: 170px;
`;

const ProfileImage = styled.img`
  width: 150px;
  height: 150px;
  border-right: 1px solid black;
  padding-left: 10px;
  padding-right: 10px;
`;

const ProfileInformation = styled.div`
  width: 75%;
`;

const TitleStyle = styled.div`
    display: flex;
  flex-direction: row;
  align-items: end; // 세로 기준 맨 아래
  height: 6vh;
  .name {
    display: flex;
    font-size: 2em;
    margin-right: 5px;
  };
  .nickname {
    display: flex;
    font-size: 1em;
  };
  .edit {
    margin-left: 70%;
    color: #5454e2;
  }
`;

