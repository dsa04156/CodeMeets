import styled from 'styled-components';
import logoBlack from '../../assets/logo-black.png';

import { useRecoilValue } from 'recoil';
import { APIroot } from '../../Store';

const SearchUserListItem = (props) => {
  const API = useRecoilValue(APIroot);

  return (
    <Item>
      &nbsp;
      {/* 프로필 사진이 없는 경우 */}
      {props.profilePhoto === '' ? (
        <ProfileStyle src={logoBlack} />
      ) : // 프로필 사진은 있는데 ...
      props.profilePhoto.includes('http') ? (
        // 소셜로그인하고 프로필 사진 변경한적 없는 경우
        <ProfileStyle src={`${props.profilePhoto}`} />
      ) : (
        // 사진 이미지를 업로드 하여 사용중인 경우
        <ProfileStyle src={`${API}/file/images/${props.profilePhoto}`} />
      )}
      &nbsp; {props.nickname} | {props.email}
    </Item>
  );
};

export default SearchUserListItem;

const Item = styled.div`
  width: 100%;
  height: 3rem;
  margin: 3 3 3 3;
  display: flex;
  align-items: center;
`;

const ProfileStyle = styled.img`
  height: 30px;
  border-radius: 70%;
  overflow: hidden;
`;
