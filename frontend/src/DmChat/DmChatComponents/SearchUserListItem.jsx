import styled from "styled-components";

import { useRecoilValue } from "recoil";
import { APIroot } from "../../Store";

const SearchUserListItem = (props) => {
  const API = useRecoilValue(APIroot);

  return (
    <Item>
      <ProfileStyle src={`${API}/file/images/${props.profilePhoto}`} />
      {"  "} {props.nickname} | {props.email}
    </Item>
  );
};

export default SearchUserListItem;

const Item = styled.div`
  width: 100%;
  border: 1px solid black;
  height: 3rem;
  margin: 3 3 3 3;
`;

const ProfileStyle = styled.img`
    height: 30px;
    border-radius: 70%;
    overflow: hidden;
`;