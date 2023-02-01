import styled from "styled-components";

const ContentStyle = ({ Content, Hit }) => {
  return (
    <div>
      <ContentBox>{Content}</ContentBox>
      <HitBox>조회수: {Hit}</HitBox>
    </div>
  );
};

export default ContentStyle;

const ContentBox = styled.div`
  border: 1px solid black;
  margin: 2vh;
  height: 60vh;
`;
const HitBox = styled.div`
  display: flex;
  justify-content: right;
  margin-right: 3vh;
`;
