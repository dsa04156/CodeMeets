import DefaultImage from '../../Images/Logo.png';

import { user, APIroot } from '../../Store';
import { useRecoilValue } from 'recoil';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const HeaderProfile = () => {
  const loginUser = useRecoilValue(user);
  const API = useRecoilValue(APIroot);
  const [profileImage, setProfileImage] = useState('');
  const navigate = useNavigate();

  const ToMyPage = () => {
    navigate(`/my-page/${loginUser.userPk}/meeting-list`);
  };

  useEffect(() => {
    if (
      loginUser != null &&
      typeof loginUser == 'object' &&
      !Object.keys(loginUser).length
    ) {
      setProfileImage(DefaultImage);
    } else if (loginUser.profilePhoto !== '') {
      if (loginUser.profilePhoto.includes('http')) {
        setProfileImage(`${loginUser.profilePhoto}`);
      } else {
        setProfileImage(`${API}/file/images/${loginUser.profilePhoto}`);
      }
    } 
  }, [loginUser]);

  return (
    <div>
      {loginUser?.userPk !== undefined ? (
        <ProfileStyle src={`${profileImage}`} onClick={ToMyPage} />
      ) : (
        <ProfileHidden src={`${profileImage}`} />
      )}
    </div>
  );
};

export default HeaderProfile;

const ProfileStyle = styled.img`
  height: 40px;
  cursor: pointer;
`;

const ProfileHidden = styled.img`
  display: none;
`;
