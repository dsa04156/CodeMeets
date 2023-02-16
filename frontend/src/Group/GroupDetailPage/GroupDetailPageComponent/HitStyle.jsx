import styled from 'styled-components';

const HitStyle = ({ Hit }) => {
  return (
    <div>
      <HitBox>조회수 : {Hit}</HitBox>
    </div>
  );
};

export default HitStyle;

const HitBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  font-size: 2vh;
  margin-right: 3vh;
`;
