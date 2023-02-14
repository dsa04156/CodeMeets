import styled from "styled-components";

const UserListItem = (props) => {
  return (
    <Item>
      <p>대화 상대 : {props.nickname} | 메시지 : {props.contents}</p>
    </Item>
  );
};

export default UserListItem;

const Item = styled.div`
  width: 100%;
  border: 1px solid black;
  height: 3rem;
  margin: 3 3 3 3;
`;