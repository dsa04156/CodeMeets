import styled from 'styled-components';
import '../../../App.css';

const TitleStyle = ({ TitleContent }) => {
  return (
    <div>
      <TitleBox>
        <div>{TitleContent}</div>
      </TitleBox>
    </div>
  );
};

export default TitleStyle;

const TitleBox = styled.div`
  border: 1px;
  display: flex;
  flex-direction: column;
  font-size: 3vh;
  margin: 2vh;
  .LikeBox {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    font-size: 2vh;
    font-family: 'Cafe24Ohsquareair';
  }
`;
