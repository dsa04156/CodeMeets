import styled from "styled-components";

const UserListItem = (props) => {
  let msg = String(props.contents)
  if (msg.length > 10) {
    msg = msg.substr(0, 8) + " ...";
  }
  return (
    <Item>
      <p>{props.nickname} | {msg}</p>
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