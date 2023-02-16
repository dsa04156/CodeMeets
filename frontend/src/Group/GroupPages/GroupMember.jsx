import { useParams } from 'react-router-dom';

import MemberCard from '../GroupComponents/MemberCard';

import DefaultImage from '../../Images/Logo.png';
import styled from 'styled-components';
import axios from 'axios';
import { useEffect, useState } from 'react';

import { APIroot } from '../../Store';
import { useRecoilValue } from 'recoil';

const GroupMember = () => {
  const API = useRecoilValue(APIroot);

  const params = useParams();
  const [userList, setUserList] = useState([]);
  const [position, setPosition] = useState();

  useEffect(() => {
    axios({
      method: 'GET',
      url: `${API}/group/${params.group_pk}/member`,
      headers: {
        'Content-Type': 'application/json',
        AccessToken: `${localStorage.getItem('ACCESS_TOKEN')}`,
      },
    }).then((response) => {
      setUserList(response.data.List);
      setPosition(response.data.position);
    });
  }, [API, position]);

  const cardUserList = userList.map((useritem, index) => {
    return (
      <div>
        <MemberCard
          key={index}
          userName={useritem.userName}
          userId={useritem.userId}
          nickName={useritem.nickname}
          profilePhoto={
            useritem.profilePhoto !== ""
              ? (useritem.profilePhoto.includes('http')
                ? useritem.profilePhoto
                : `${API}/file/images/${useritem.profilePhoto}`
              )
              : DefaultImage
          } // 일단 null -> ""
          tel={useritem.tel}
          email={useritem.email}
          manager
          position={position}
        />
      </div>
    );
  });

  return <MainBox>{cardUserList}</MainBox>;
};

export default GroupMember;

const MainBox = styled.div`
  padding-top: 1vh;
  height: 63vh;
  overflow-y: scroll;
`;
