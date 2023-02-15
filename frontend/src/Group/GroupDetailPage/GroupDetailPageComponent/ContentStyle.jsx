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
  border-top: 1px solid black;
  padding-top: 3vh;
  margin: 2vh;
  height: 55vh;
  overflow-y: auto;
  white-space: pre-line;
`;
const HitBox = styled.div`
  display: flex;
  justify-content: right;
  margin-right: 3vh;
`;
