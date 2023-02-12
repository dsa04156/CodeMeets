import styled from "styled-components";

const ContentStyle = ({ Content}) => {
  return (
    <div>
      <ContentBox>{Content}</ContentBox>
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
