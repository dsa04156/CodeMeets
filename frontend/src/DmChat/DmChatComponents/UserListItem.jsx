import styled from "styled-components";

const UserListItem = (props) => {
  return (
    <Item>
      {props.userId}
    </Item>
  );
};

export default UserListItem;

const Item = styled.div`
  width: 100%;
  border: 1px solid black;
  height: 3rem;
  margin: 0;
`;